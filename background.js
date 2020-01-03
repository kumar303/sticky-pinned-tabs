import { helper } from './helper/helper.js';
helper.log('startup', `starting background script`);

function initPinnedTab() {
  browser.tabs
    .query({
      currentWindow: true,
      active: true,
      pinned: true,
    })
    .then((tabs) => {
      if (tabs.length > 0) {
        return browser.storage.local.get().then(
          (options) => {
          browser.tabs.sendMessage(tabs[0].id, {
            fixPinnedTabLinks: true,
            urlList: options.urlList || [],
            urlListType: options.urlListType || 'blacklist',
          });
        });
      }
    })
    .catch((error) => helper.log('error', `Error: ${error}`));
}

browser.tabs.onUpdated.addListener(initPinnedTab);

//TODO: Find a better way to log in content.js
browser.runtime.onMessage.addListener((request) => {
  helper.log(request.type, request.message);
});