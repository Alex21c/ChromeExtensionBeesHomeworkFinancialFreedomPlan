# Youtube Videos Bookmarker || Google Chrome Extension || Geekster Module #4 Geekathon Project
![](Screenshots/posterImage.png)

## 1. Credits
1. [Geekster](https://www.geekster.in/)
2. [Trisha Das](https://www.linkedin.com/in/trisha-das1308/) Mam (Mentor)
3. [Sudhendra Singh](https://www.linkedin.com/in/sudhendra-singh-168831130/) Sir (Educator)
4. [Akhil Sharma](https://www.linkedin.com/in/akhil-sh06/) Sir (Educator)
5. [Ankit Singh](https://www.linkedin.com/in/asingh88029/) Sir (Educator Assistant)
6. [Aanchal Parnami](https://www.geekster.in/) Mam, (Success Manager)
7. [Priyanshu Choudhary](https://www.linkedin.com/in/priyanshuchoudhary/) Sir, (For providing assignments and projects)
8. [Saquib Khan](https://www.geekster.in/) Sir, (For checking Projects & Assignments and providing feedback)
9. [Manan Bansal](https://www.geekster.in/) Sir, (For checking Projects & Assignments and providing feedback)
10. [MySelf Abhishek Kumar](https://www.linkedin.com/in/alex21c/), ([Geekster](https://geekster.in/) MERN Stack FS-14 Batch) || Team-12

## 2. Objectives:
+ Developing a chrome extension.
- Creating the UI of extension & Implement the chrome extension, on the browser.

## 3. Introduction : Bookmark YouTube Videos
This extension will help you to bookmark yours youtube videos by saving video timeline intervals and allows you to jump to specific timeline interval for that particular video, helpful for resuming video you added to watch later or making important notes for the lectures you're watching or bookmarking the begining of yours favourite songs!

## 4. Learnings
+ How to develop the User Interface for the chrome extension and link it with the browser 
+ Concept of Web Workers for creating chrome extension, How web worker & content scripts commuicate together using chrome.runtime.onMessage && chrome.tabs.onMessage
+ Use the chrome.tabs API to interact with the browser's tab system
+ Using chromeScriptingAPI for Injecting contents scripts to modify any webpage DOM
+ Using chrome.stoageAPI.sync to synchronize data across all devices where the user is signed in to Chrome and has the extension installed, using set and get methods of it
+ Asynchronous programming using promises, and trust me there are lots of promises being used for developing the chrome extension
+ Browser Extension Architecture: Gained an understanding of how browser extensions work, including their components, manifest files, and permissions.
+ Chrome Extension APIs: Explore the various Chrome Extension APIs, such as storage, tabs, messaging, and notifications, for building different features within the extension.
+ Content Scripts: Learn to inject and interact with content scripts in web pages, allowing the extension to modify and enhance web content.

## 5. MVC Diagram
![](MVC/MVCDiagram.png)

## 6. Tech Stack Used
+ [Google chrome StorageAPI](https://developer.chrome.com/docs/extensions/reference/api/storage)
+ [Google chrome ScriptingAPI](https://developer.chrome.com/docs/extensions/reference/api/scripting)
+ [Google chrome NativeMessagingAPI](https://developer.chrome.com/docs/extensions/reference/api/tabs)
+ [Google chrome RuntimeAPI](https://developer.chrome.com/docs/extensions/reference/api/runtime)
+ [HTML5](https://en.wikipedia.org/wiki/HTML5)
+ [CSS3](https://en.wikipedia.org/wiki/CSS)
+ [Tailwind CSS](https://tailwindcss.com/)
+ [JavaScript ES6](https://en.wikipedia.org/wiki/JavaScript)
+ [Font Awesome](https://fontawesome.com/icons)
+ [Google Fonts](https://fonts.google.com/)
+ [Git](https://en.wikipedia.org/wiki/Git)
+ [GitHub](https://github.com/)
+ [VS Code](https://code.visualstudio.com/)


## 7. Extension ScreenShots
![](Screenshots/1-non-youtube-website.png)
![](Screenshots/2.addBookmarkControl.png)
![](Screenshots/3.ExtensionWithBookmarks.png)


## 8. How to set up the development environment on yours local machine
### 1.1 Installation (npm will automatically downlaod and install the required dependencies from package.json)
```bash
git clone https://github.com/Alex21c/YoutubeVideosBookmarker-GoogleChromeExtension-GeeksterModule4GeekathonProject.git 
npm install 
```

### 1.2 Run 
```bash
npm run start
```

## 9. For Installing this extension directly on Google chrome
+ Just Import the manifest.json file/Directory into google chrome load unpacked extensions and it will be installed on yours Google Chrome, here is the guide
![](Screenshots/InstallationOnChrome/step-1-open-google-chrome.png)
![](Screenshots/InstallationOnChrome/step-2-choose-manage-extensions.png)
![](Screenshots/InstallationOnChrome/step-3-copying-repo-dir-path.png)
![](Screenshots/InstallationOnChrome/step-4-choose-load-unpacked-extensions.png)
![](Screenshots/InstallationOnChrome/step-5-extension-installed-successfully.png)
![](Screenshots/InstallationOnChrome/step-6-pin-the-extension-for-quick-access.png)
![](Screenshots/InstallationOnChrome/step-7-click-on-the-extension-icon.png)
![](Screenshots/InstallationOnChrome/step-8-open-any-random-youtube-video-of-yours-choice.png)
![](Screenshots/InstallationOnChrome/step-9-click-on-the-extension-bookmark-button.png)
![](Screenshots/InstallationOnChrome/step-10-click-on-the-extension-button-and-notice-the-timestamp-bookmark.png)
![](Screenshots/InstallationOnChrome/step-11-navigate-video-and-mark-another-book-mark.png)
![](Screenshots/InstallationOnChrome/step-12-notice-two-bookmakrs-added.png)
![](Screenshots/InstallationOnChrome/step-13-one-more-bookmark-add.png)
![](Screenshots/InstallationOnChrome/step-14-notice-all-three-bookmarks.png)
![](Screenshots/InstallationOnChrome/step-15-click-on-bookmark-2nd.png)
![](Screenshots/InstallationOnChrome/step-16-jumping-to-first-bookmark.png)
![](Screenshots/InstallationOnChrome/step-17-deleting-third-bookmark.png)
![](Screenshots/InstallationOnChrome/step-18-notice-third-bookmark-deleted.png)
![](Screenshots/InstallationOnChrome/step-19-notice-all-bookmarks-deleted.png)
![](Screenshots/InstallationOnChrome/step-20-removing-extension.png)
![](Screenshots/InstallationOnChrome/step-21-make-a-wish-for-my-financial-freedom.png)

## 10. License
[GNU General Public License](https://en.wikipedia.org/wiki/GNU_General_Public_License)
Imagine you have a delicious recipe you created. A GNU license is like a special way of sharing the recipe. It allows people to:
1. **Cook the recipe (use the software):** Everyone can freely use the software for whatever they want.
2. **Learn the recipe (understand how it works):** They can access the code and see how the software works internally.
3. **Share the recipe with others (share the software):** They can freely copy and distribute the software to their friends.
4. **Improve the recipe (modify the software):** If they want, they can even change the code to make the software better and then share their improvements with everyone.
5. **But there's a twist:** if they share their improved recipe (modified software), they have to share it under the same "recipe card" (license) so everyone can benefit from their changes. This ensures the software remains free and open for everyone.
# ChromeExtensionBeesHomeworkFinancialFreedomPlan
