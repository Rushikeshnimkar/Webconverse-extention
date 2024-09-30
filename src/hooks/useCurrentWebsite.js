import { useState, useEffect } from 'react';

export function useCurrentWebsite() {
  const [currentWebsite, setCurrentWebsite] = useState('');

  useEffect(() => {
    const getCurrentTab = async () => {
      // eslint-disable-next-line no-undef
      if (chrome && chrome.tabs) {
        try {
          // eslint-disable-next-line no-undef
          const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
          if (tab && tab.url) {
            const url = new URL(tab.url);
            if (url.protocol.startsWith('chrome-extension')) {
              // If it's a chrome extension page, we don't set the website
              console.log('Extension page detected, not setting currentWebsite');
              setCurrentWebsite('');
            } else {
              setCurrentWebsite(url.hostname);
              console.log('Current website:', url.hostname);
            }
          }
        } catch (error) {
          console.error('Error getting current tab:', error);
        }
      }
    };

    getCurrentTab();
  }, []);

  return currentWebsite;
}