"use strict";
console.log("CRL Loaded");
chrome.action.onClicked.addListener(() => {
    console.log("CRL Clicked ");
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
        tabs.forEach((tab) => {
            var _a, _b;
            const entryObj = {
                title: (_a = tab.title) !== null && _a !== void 0 ? _a : 'title not found',
                url: (_b = tab.url) !== null && _b !== void 0 ? _b : "url not found.",
                hasBeenRead: false
            };
            console.log(entryObj);
            chrome.readingList.addEntry(entryObj);
        });
    });
});
