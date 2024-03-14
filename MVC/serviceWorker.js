const channel = new BroadcastChannel('Alex21CBrodcastingChannel');

// channel.onmessage = (msg) => {
//  console.log('message received from popup', msg);
//  channel.postMessage({ msg: 'Hello popup from service worker'});
// };


let urlsToOpen = {
  NSE_TimeoutIntervalDelay : 500,
  MISC_TimeoutIntervalDelay : 200,
  NSE: [
    "https://www.nseindia.com/get-quotes/equity?symbol=SILVERBEES",
    "https://www.nseindia.com/get-quotes/equity?symbol=NIFTYBEES",
    "https://www.nseindia.com/get-quotes/equity?symbol=MID150BEES",
    "https://www.nseindia.com/get-quotes/equity?symbol=JUNIORBEES",
    "https://www.nseindia.com/get-quotes/equity?symbol=GOLDBEES",
    "https://www.nseindia.com/get-quotes/equity?symbol=BANKBEES",
  ],
  Misc:[
    {
      name: 'InvestmentLog',
      url: "https://docs.google.com/spreadsheets/d/19npH4RUkGQkyMe76aWWuMyFctQY2VzaEcLmg7-6y2TM/edit#gid=136912115"
    },
    {
      name: 'Angel One GTT',
      url: "https://www.angelone.in/trade/orders/gtt"
    },
    {
      name: 'Angel One Equity',
      url: "https://www.angelone.in/trade/portfolio/equity"
    },

  ]
};

function openNewTab(url){
  // console.log('opening ', url);
  // return;
  chrome.tabs.create({
    url: url,
    active: false

  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.action === "openTabs"){
      // console.log('opening');
      let timeoutInterval = 0;
      // opening Misc URLS
        urlsToOpen.Misc.forEach((tab)=>{
          setTimeout(()=>{
            let msg = `Opening ${tab.name}`;
            // sendMessageToViewJS(msg);
             openNewTab(tab.url);
             channel.postMessage({ status: msg});
          }, timeoutInterval);
          timeoutInterval+=urlsToOpen.MISC_TimeoutIntervalDelay;
        });        

      // Opening the NSE URLS
        timeoutInterval = urlsToOpen.NSE_TimeoutIntervalDelay;
        urlsToOpen.NSE.forEach((url)=>{
          setTimeout(()=>{
            let msg = `Opening NSE ${url.replace('https://www.nseindia.com/get-quotes/equity?symbol=', '')}`;
            openNewTab(url);
            channel.postMessage({ status: msg});
          }, timeoutInterval);
          timeoutInterval+=urlsToOpen.NSE_TimeoutIntervalDelay;
        });

      // tell all done
          setTimeout(()=>{            
            channel.postMessage({ status: 'all done!'});
          }, timeoutInterval);
      


    }
      
  }
);


// // // Injecting Controller.js

// //   // chrome.tabs.onActivated.addListener((tab) => {
// //   //   console.log(tab)
// //   //   chrome.tabs.get(tab.tabId, (CurrentTabData) => {
// //   //       if (CurrentTabData.url === "https://www.youtube.com/") {
// //   //           chrome.scripting.executeScript({
// //   //               target: { tabId: CurrentTabData.id },
// //   //               files: ['/MVC/Controller.js']
// //   //           });
// //   //           setTimeout(() => {
// //   //               chrome.tabs.sendMessage(
// //   //                   tab.tabId,
// //   //                   "SERVICEWORKER: controller.js injected into tab: " + tab.tabId,
// //   //                   (response) => {
// //   //                       console.log(response)
// //   //                   }
// //   //               )
// //   //           }, 0)
// //   //       }
// //   //   })
// //   // })

// // // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// // //   console.log(message)
// // //   console.log(sender)

// // //   sendResponse("hi")
// // // })


// // // first time when extension is installed greet user!
// //   chrome.runtime.onInstalled.addListener(({reason}) => {
// //     if (reason === 'install') {
// //       chrome.tabs.create({
// //         url: "installationCompleted.html"
// //       });
// //     }
// //   });

// // // /// (BEGIN OF ) BASIC CODE SNIPPET FROM CHROME DOCUMENTATION FOR MESSAGE PASSING BETWEEN serviceWorker and controller.js
// // // // chrome.runtime.onMessage.addListener(
// // // //   function(request, sender, sendResponse) {
// // // //     console.log(sender.tab ?
// // // //                 "from a content script:" + sender.tab.url :
// // // //                 "from the extension");
// // // //     if (request.greeting === "hello"){
// // // //       (async () => {
// // // //         const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
// // // //         const response = await chrome.tabs.sendMessage(tab.id, {tabId: "921384982109842190"});
// // // //         // do something with response here, not outside the function
// // // //         console.log(response);
// // // //       })();

// // // //       sendResponse({farewell: "goodbye"});
// // // //     }
// // // //   }
// // // // );
// // // /// (END OF) BASIC CODE SNIPPET FROM CHROME DOCUMENTATION FOR MESSAGE PASSING BETWEEN serviceWorker and controller.js



// //   // looking actively for new tab and checking if that new tab is playing youtube video
// //   // attaching event listener

// //   // chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{    
// //   //   console.log(request);

// //   // });


// //   // whenever new tab is loaded or refresh check if it contains youtube video
// //   chrome.tabs.onUpdated.addListener((tabId, tab)=>{
// //     if(tab.url?.includes("youtube.com/watch")){
// //       // inject controller.js
// //         setTimeout(()=>{
// //           chrome.scripting.executeScript({
// //             target: { tabId: tabId },
// //             files: ['/MVC/Controller.js']          
// //           });
  
// //         },2000);



// //       // console.log('Yes its youtube video');
// //       // get the unique ID of video from the query string
// //         // console.log(tab.url.split('?'));
// //         let videoQueryString = tab.url.split('?')[1];
// //         // extracting unique video ID using URLSearchParams
// //           let uniqueVideoID = new URLSearchParams(videoQueryString).get('v');
// //           // console.log('it is ' , uniqueVideoID);
  
// //       // now Notifying the Controller that new Video has been loaded
// //       // it returns a Promise
// //       // SendMessage: Sends a single message to the content script(s) in the specified tab, with an optional callback to run when a response is sent back. 
// //       let msg = {
// //         action : "ServiceWorker:NEW_YT_VIDEO_LOADED",
// //         uniqueVideoID: uniqueVideoID
// //       }



    
// //       // chrome.tabs.sendMessage(tabId, msg);             
// //         console.log('Sending Msg:', msg);
// //         console.log(tabId, msg);
// //         setTimeout(()=>{
// //           chrome.tabs.sendMessage(
// //             tabId,msg
// //           );
// //         },4000);
  

       
// //     }else{
// //     //  // not a youtube page
// //     //  // tell the view.js about it so as to display a msg not a youtube video page
// //     //     let msg = {
// //     //       action : "ServiceWorker:NOT_A_YT_VIDEO"          
// //     //     }     
// //     //     setTimeout(()=>{
// //     //       chrome.tabs.sendMessage(
// //     //         tabId,msg
// //     //       );
// //     //     },1000);

// //   }
// // });
  

  
  
  
