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
chrome.contextMenus.create({
    id: "save-to-reading-list",
    title: "save this page into reading list",
    contexts: ["page"]
});
chrome.contextMenus.onClicked.addListener((info, tab) => {
    var _a, _b;
    if (info.menuItemId === "save-to-reading-list" && tab) {
        const entryObj = {
            title: (_a = tab.title) !== null && _a !== void 0 ? _a : 'title not found',
            url: (_b = tab.url) !== null && _b !== void 0 ? _b : "url not found.",
            hasBeenRead: false
        };
        console.log("Adding to reading list:", entryObj);
        chrome.readingList.addEntry(entryObj);
    }
});
