// Injecting Controller.js

  // chrome.tabs.onActivated.addListener((tab) => {
  //   console.log(tab)
  //   chrome.tabs.get(tab.tabId, (CurrentTabData) => {
  //       if (CurrentTabData.url === "https://www.youtube.com/") {
  //           chrome.scripting.executeScript({
  //               target: { tabId: CurrentTabData.id },
  //               files: ['/MVC/Controller.js']
  //           });
  //           setTimeout(() => {
  //               chrome.tabs.sendMessage(
  //                   tab.tabId,
  //                   "SERVICEWORKER: controller.js injected into tab: " + tab.tabId,
  //                   (response) => {
  //                       console.log(response)
  //                   }
  //               )
  //           }, 0)
  //       }
  //   })
  // })

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log(message)
//   console.log(sender)

//   sendResponse("hi")
// })


// first time when extension is installed greet user!
  chrome.runtime.onInstalled.addListener(({reason}) => {
    if (reason === 'install') {
      chrome.tabs.create({
        url: "installationCompleted.html"
      });
    }
  });

// /// (BEGIN OF ) BASIC CODE SNIPPET FROM CHROME DOCUMENTATION FOR MESSAGE PASSING BETWEEN serviceWorker and controller.js
// // chrome.runtime.onMessage.addListener(
// //   function(request, sender, sendResponse) {
// //     console.log(sender.tab ?
// //                 "from a content script:" + sender.tab.url :
// //                 "from the extension");
// //     if (request.greeting === "hello"){
// //       (async () => {
// //         const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
// //         const response = await chrome.tabs.sendMessage(tab.id, {tabId: "921384982109842190"});
// //         // do something with response here, not outside the function
// //         console.log(response);
// //       })();

// //       sendResponse({farewell: "goodbye"});
// //     }
// //   }
// // );
// /// (END OF) BASIC CODE SNIPPET FROM CHROME DOCUMENTATION FOR MESSAGE PASSING BETWEEN serviceWorker and controller.js



  // looking actively for new tab and checking if that new tab is playing youtube video
  // attaching event listener

  chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{    
    console.log(request);

  });


  // whenever new tab is loaded or refresh check if it contains youtube video
  chrome.tabs.onUpdated.addListener((tabId, tab)=>{
    if(tab.url?.includes("youtube.com/watch")){
      // inject controller.js
        setTimeout(()=>{
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['/MVC/Controller.js']          
          });
  
        },2000);



      // console.log('Yes its youtube video');
      // get the unique ID of video from the query string
        // console.log(tab.url.split('?'));
        let videoQueryString = tab.url.split('?')[1];
        // extracting unique video ID using URLSearchParams
          let uniqueVideoID = new URLSearchParams(videoQueryString).get('v');
          // console.log('it is ' , uniqueVideoID);
  
      // now Notifying the Controller that new Video has been loaded
      // it returns a Promise
      // SendMessage: Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. 
      let msg = {
        action : "ServiceWorker:NEW_YT_VIDEO_LOADED",
        uniqueVideoID: uniqueVideoID
      }



    
      // chrome.tabs.sendMessage(tabId, msg);             
        console.log('Sending Msg:', msg);
        console.log(tabId, msg);
        setTimeout(()=>{
          chrome.tabs.sendMessage(
            tabId,msg
          );
        },4000);
  

       
    }else{
    //  // not a youtube page
    //  // tell the view.js about it so as to display a msg not a youtube video page
    //     let msg = {
    //       action : "ServiceWorker:NOT_A_YT_VIDEO"          
    //     }     
    //     setTimeout(()=>{
    //       chrome.tabs.sendMessage(
    //         tabId,msg
    //       );
    //     },1000);

  }
});
  

  
  
  
