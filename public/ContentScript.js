window.getCurrentWebsite = function(callback) {
    chrome.runtime.sendMessage({ message: 'get_current_website' }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        callback(window.location.hostname);
      } else {
        callback(response.website);
      }
    });
  };