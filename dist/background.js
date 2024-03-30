"use strict";
chrome.browserAction.onClicked.addListener(() => {
    chrome.bookmarks.search({ 'title': 'Reading list' }, (results) => {
        console.log(results);
        if (results.length > 0) {
            const readingListId = results[0].id;
            chrome.tabs.query({ currentWindow: true }, (tabs) => {
                tabs.forEach((tab) => {
                    chrome.bookmarks.create({
                        'parentId': readingListId,
                        'title': tab.title,
                        'url': tab.url
                    });
                });
            });
        }
        else {
            console.log('Reading List not found.');
        }
    });
});
