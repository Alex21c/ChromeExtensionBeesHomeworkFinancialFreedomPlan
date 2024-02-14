// some helper functions import from lib.util.alex21c
import {fetchBookmarksFromChromeStorageAPI, consoleLogBookmarksFromChromeStorage} from '/MVC/Model.js';

// Fetching dom
  let spanInsideInfoMsg = document.querySelector('span#spanInsideInfoMsg');
  let ulInfoMsg = document.querySelector('ul#ulInfoMsg');
  let ulBookmarks = document.querySelector('ul#ulBookmarks');
  let uniqueVideoID = null;
  // attaching event lister
    ulBookmarks.addEventListener('click', async (event)=>{
      if(event.target.nodeName.toUpperCase() === 'I'){
        // if(event.target.getAttribute('title'))
        let tab = await getCurrentTab();
        let timestamp = event.target.parentNode.getAttribute('data-currentvideotimestampinseconds');
        if(event.target.hasAttribute('title')){
          if(event.target.getAttribute('title') === "Play Bookmark"){
            // console.log('wait, jumping to bookmark timestamp!');
           
            let msg = {
              action : "VIEW:PLAY_BOOKMARK",
              currentVideoTimeStampInSeconds: timestamp
            }
            // console.log(tab);
            chrome.tabs.sendMessage(
              tab.id,msg
            );


          }else if(event.target.getAttribute('title') === "Delete Bookmark"){
            console.log('wait, deleting bookmark');

            let msg = {
              action : "VIEW:DELETE_BOOKMARK",
              currentVideoTimeStampInSeconds: timestamp
            }
            // console.log(tab);

            chrome.tabs.sendMessage(
              tab.id,msg
            );

            // refresh bookmarks gui
            setTimeout(async ()=>{
              let bookmarksForCurrentVideo = await fetchBookmarksFromChromeStorageAPI(uniqueVideoID);
              generateBookmarksInsideGUI(bookmarksForCurrentVideo);
            },1000);

            event.target.parentNode.parentNode.removeChild(event.target.parentNode);

            // console.log(event.target.hasAttribute('title'), event.target.getAttribute('title'), event);
          }
        }

      }
    });

async function getCurrentTab(){
  let queryOptions = {active: true, currentWindow:true};
  let [tabObj] = await chrome.tabs.query(queryOptions);
  return tabObj;
}
// testing the output of getCurrentTab()
// setTimeout(async ()=>{
//   let tab  = await getCurrentTab();
//   console.log(tab);
// });

// now its time to add event listener to the DOM
document.addEventListener('DOMContentLoaded', async()=>{
  let tab = await getCurrentTab();
  if(tab.url?.includes("youtube.com/watch")){
    console.log('user is currently watching youtube video.');
    // check for any bookmarks user might have in chrome.stroage
    console.log('fetching bookmarks if any');
    let videoQueryString = tab.url.split('?')[1];
    // extracting unique video ID using URLSearchParams
      uniqueVideoID = new URLSearchParams(videoQueryString).get('v');
      let bookmarksForCurrentVideo = await fetchBookmarksFromChromeStorageAPI(uniqueVideoID);
      if(bookmarksForCurrentVideo.length>0){
        // spanInsideInfoMsg.innerText = "Loading yours bookmarks";

        
        generateBookmarksInsideGUI(bookmarksForCurrentVideo);


      }else{
        ulInfoMsg.classList.remove('displayNone');
        spanInsideInfoMsg.innerText = "No Bookmarks to show!";
      }

  }else{
    // console.log('user might be on other tabs or not watching youtube video');
    // is user Not on youtube.com?
    if(tab.url?.includes("youtube.com")){
      // just show the msg no book marks to show as bookmarks are meant fo individual video pages
      // console.log('No Bookmarks to show!');
      ulInfoMsg.classList.remove('displayNone');
      spanInsideInfoMsg.innerText = "No Bookmarks to show!";
    }else{
      // user is for sure not on youtube.com its some other tab or wesite
       console.log('Current tab of user is not Youtube.com');
       ulInfoMsg.classList.remove('displayNone');
       spanInsideInfoMsg.innerText = "This is not a YouTube video webpage!";
    }
  }
});

function generateBookmarksInsideGUI(bookmarksForCurrentVideo){
  ulInfoMsg.classList.remove('displayNone');
  ulInfoMsg.classList.add('displayNone');
  
  ulBookmarks.innerHTML = "";
  bookmarksForCurrentVideo.forEach((bookmark)=>{
    console.log(bookmark);
    let li = document.createElement('li');
    li.className='flex flex-row gap-[1rem] p-[.5rem] text-[1.5rem] bg-slate-700 rounded-md select-none items-center justify-center p-[1rem] pl-[1.5rem] pr-[1.5rem]';
    li.setAttribute('data-currentVideoTimeStampInSeconds', bookmark.currentVideoTimeStampInSeconds);
    // note capturing of event is done on basis of i.title for play and delete bookmarks
    li.innerHTML = `
    <i class="fa-solid fa-bookmark"></i>
    <span class="text-[1.2rem] text-zinc-50 hover:text-zinc-100 font-semibold transition delay-100" >${bookmark.formattedTimeStampForUser}</span>
    <i title = "Play Bookmark" class="fa-duotone fa-play text-green-600  hover:text-green-400 transition delay-100 cursor-pointer"></i>
    <i title = "Delete Bookmark" class="fa-solid fa-trash text-red-600 hover:text-red-400 transition delay-100 cursor-pointer"></i>
    `;
    
    ulBookmarks.append(li);
    
  });          
}