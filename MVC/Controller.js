

let allCurrentVideoBookmarks = [];
let uniqueVideoID = "";
let currentVideoTimeStampInSeconds = null;
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('CONTROLLER.JS');
  console.log(msg);
  if(msg.action === "ServiceWorker:NEW_YT_VIDEO_LOADED") {    
    uniqueVideoID = msg.uniqueVideoID;
    newVideoLoaded(msg.uniqueVideoID)
  }else if(msg.action === "VIEW:PLAY_BOOKMARK") {    
    currentVideoTimeStampInSeconds = msg.currentVideoTimeStampInSeconds;
    let youtubeVideoStream = document.querySelector('video.video-stream');
    youtubeVideoStream.currentTime =currentVideoTimeStampInSeconds;
  }else if(msg.action === "VIEW:DELETE_BOOKMARK") {    
    console.log(msg);
    currentVideoTimeStampInSeconds = msg.currentVideoTimeStampInSeconds;
    allCurrentVideoBookmarks = allCurrentVideoBookmarks.filter(
      (bookmark)=>{
        console.log(bookmark, bookmark.currentVideoTimeStampInSeconds, currentVideoTimeStampInSeconds);
      return bookmark.currentVideoTimeStampInSeconds != currentVideoTimeStampInSeconds;
    })
    console.log('bookmarks after deletion:', allCurrentVideoBookmarks);
    saveBookmarksUsingChromeStorageAPI(uniqueVideoID, [...allCurrentVideoBookmarks]);
    sendResponse(true);
  }

});

async function bookmarkCurrentVideoTimeStamp(uniqueVideoID){
  //console.log('bookmarking video now', uniqueVideoID);
  let youtubeVideoStream = document.querySelector('video.video-stream');
  // console.log(youtubeVideoStream);
  let currentVideoTimeStampInSeconds = youtubeVideoStream.currentTime;
  let formattedTimeStampForUser = formatSecondsIntoHHMMSS(currentVideoTimeStampInSeconds);
  let newBookmark = {
    currentVideoTimeStampInSeconds: currentVideoTimeStampInSeconds,
    formattedTimeStampForUser : formattedTimeStampForUser
  };
  // console.log(newBookmark);
  // fetching fresh bookmarks from chrome.stroage
    allCurrentVideoBookmarks= await fetchBookmarksFromChromeStorageAPI(uniqueVideoID);

  // // using chrome storage api to sync it across all devices where user is logged in
  // chrome.storage.sync.set(
  //   {
  //     [uniqueVideoID]: JSON.stringify([...allCurrentVideoBookmarks, newBookmark].sort((a, b)=>a.time-b.time))
  //   }
  // );

  saveBookmarksUsingChromeStorageAPI(uniqueVideoID, [...allCurrentVideoBookmarks, newBookmark]);

}




const formatSecondsIntoHHMMSS = t => {
  var date = new Date(0);
  date.setSeconds(t);
  return date.toISOString().slice(11,19); //1970-01-01T00:03:49.000Z gives 00:03:49
};




async function newVideoLoaded(uniqueVideoID){
  // fetching bookmarks if any from chrome.stroage
    allCurrentVideoBookmarks = await fetchBookmarksFromChromeStorageAPI(uniqueVideoID);

  console.log('oh youtube video loaded, hmm wait!', uniqueVideoID);
  // test if bookmark img exist?
  if(!document.querySelector('div#divWrapperAlex21cYTVideoBookmarker')){
    let divWrapperAlex21cYTVideoBookmarker= document.createElement('div');
    divWrapperAlex21cYTVideoBookmarker.setAttribute('id', "divWrapperAlex21cYTVideoBookmarker");    
    divWrapperAlex21cYTVideoBookmarker.addEventListener('click', ()=>{
      alert('bookmark added! You can access this bookmark from the extension by clicking on the extesion icon abvoe bookmark bar.');
      bookmarkCurrentVideoTimeStamp(uniqueVideoID);
    });

    // then add one bookmark btn kind of img
    divWrapperAlex21cYTVideoBookmarker.innerHTML = `<img
                          class="ytp-button bookmark-btn" 
                          src="${chrome.runtime.getURL('Assests/Favicon/favicon-64.png')}"
                          title = "Click to add to bookmark current video timestamp!"                      
                      ">`;



    // append it to yt player left controls
      document.querySelector('div.ytp-left-controls').append(divWrapperAlex21cYTVideoBookmarker);      
  }

  // newVideoLoaded();
  

}
      



// copied from Model.js as when serviceworker is injecting this script into the DOM of youtube page
// it is not allowing to inject this script as module, and only modules can import functions from Model.js
// so this is a quick fix, and original copy of this functions is in the Model.js
function fetchBookmarksFromChromeStorageAPI(uniqueVideoID){
  return new Promise(
    (resolve, reject)=>{
      chrome.storage.sync.get([uniqueVideoID], (obj)=>{
        // console.log('here is the chrome.storage.get result: ',obj);
        resolve(obj[uniqueVideoID]? JSON.parse(obj[uniqueVideoID]) : [] );
      } );
    }
  );
}


  // for testing purpose only to see current bookmarks
  function consoleLogBookmarksFromChromeStorage(uniqueVideoID){
      setTimeout(async ()=>{
        let data = await fetchBookmarksFromChromeStorageAPI(uniqueVideoID); 
      console.log(data);
      },2000)
    }


    function saveBookmarksUsingChromeStorageAPI(uniqueVideoID, allBookmarks){
      // using chrome storage api to sync it across all devices where user is logged in
     chrome.storage.sync.set(
       {
         [uniqueVideoID]: JSON.stringify([...allBookmarks].sort((a, b)=>a.time-b.time))
       }
     );
 }
     