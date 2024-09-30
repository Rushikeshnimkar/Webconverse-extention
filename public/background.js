chrome.runtime.onInstalled.addListener(() => {
    chrome.action.onClicked.addListener((tab) => {
      chrome.tabs.create({ url: 'index.html' });
    });
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_current_website') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.url) {
          const url = new URL(tabs[0].url);
          sendResponse({ website: url.hostname });
        } else {
          sendResponse({ website: '' });
        }
      });
      return true; // Indicates that the response is sent asynchronously
    }
  });