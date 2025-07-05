console.log("CRL Loaded")

async function fetchPageTitle(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return titleMatch ? titleMatch[1].trim() : url;
  } catch (error) {
    console.error("Failed to fetch page title:", error);
    return url;
  }
}

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

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "save-to-reading-list" && tab) {
    const entryObj = {
      title: tab.title ?? 'title not found',
      url: tab.url ?? "url not found.",
      hasBeenRead: false
    }

    console.log("Adding to reading list:", entryObj)
    chrome.readingList.addEntry(entryObj)
  } else if (info.menuItemId === "save-link-to-reading-list" && info.linkUrl) {
    const title = await fetchPageTitle(info.linkUrl);
    const entryObj = {
      title: title,
      url: info.linkUrl,
      hasBeenRead: false
    }

    console.log("Adding link to reading list:", entryObj)
    chrome.readingList.addEntry(entryObj)
  }
});