console.log("CRL Loaded")

chrome.action.onClicked.addListener(() => {
  console.log("CRL Clicked ")

  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    tabs.forEach((tab) => {
      const entryObj = {
        title: tab.title ?? 'title not found',
        url: tab.url ?? "url not found.",
        hasBeenRead: false
      }

      console.log(entryObj)
      chrome.readingList.addEntry(entryObj)
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

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "save-to-reading-list" && tab) {
    const entryObj = {
      title: tab.title ?? 'title not found',
      url: tab.url ?? "url not found.",
      hasBeenRead: false
    }

    console.log("Adding to reading list:", entryObj)
    chrome.readingList.addEntry(entryObj)
  } else if (info.menuItemId === "save-link-to-reading-list" && info.linkUrl) {
    const entryObj = {
      title: info.selectionText || info.linkUrl,
      url: info.linkUrl,
      hasBeenRead: false
    }

    console.log("Adding link to reading list:", entryObj)
    chrome.readingList.addEntry(entryObj)
  }
});