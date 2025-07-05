"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log("CRL Loaded");
function fetchPageTitle(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            const html = yield response.text();
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            return titleMatch ? titleMatch[1].trim() : url;
        }
        catch (error) {
            console.error("Failed to fetch page title:", error);
            return url;
        }
    });
}
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
chrome.contextMenus.create({
    id: "save-link-to-reading-list",
    title: "save this link into reading list",
    contexts: ["link"]
});
chrome.contextMenus.onClicked.addListener((info, tab) => __awaiter(void 0, void 0, void 0, function* () {
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
    else if (info.menuItemId === "save-link-to-reading-list" && info.linkUrl) {
        const title = yield fetchPageTitle(info.linkUrl);
        const entryObj = {
            title: title,
            url: info.linkUrl,
            hasBeenRead: false
        };
        console.log("Adding link to reading list:", entryObj);
        chrome.readingList.addEntry(entryObj);
    }
}));
