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