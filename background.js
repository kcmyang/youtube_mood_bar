chrome.tabs.onUpdated.addListener(
  (tabId, changeInfo, tab) => {
    // send message on URL change
    if (changeInfo.url) {
      chrome.tabs.sendMessage(tabId, { message: 'url_change' });
    }
  }
)
