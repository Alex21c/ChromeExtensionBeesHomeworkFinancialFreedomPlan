export function fetchBookmarksFromChromeStorageAPI(uniqueVideoID){
  return new Promise(
    (resolve, reject)=>{
      chrome.storage.sync.get([uniqueVideoID], (obj)=>{
        // console.log('here is the chrome.storage.get result: ',obj);
        resolve(obj[uniqueVideoID]? JSON.parse(obj[uniqueVideoID]) : [] );
      } );
    }
  );
}

export function saveBookmarksUsingChromeStorageAPI(uniqueVideoID, allBookmarks){
     // using chrome storage api to sync it across all devices where user is logged in
    chrome.storage.sync.set(
      {
        [uniqueVideoID]: JSON.stringify([...allBookmarks].sort((a, b)=>a.time-b.time))
      }
    );
}


  // for testing purpose only to see current bookmarks
  export function consoleLogBookmarksFromChromeStorage(uniqueVideoID){
      setTimeout(async ()=>{
        let data = await fetchBookmarksFromChromeStorageAPI(uniqueVideoID); 
      console.log(data);
      },2000)
    }
