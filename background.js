const logId = 'sticky-pinned-tabs [extension]';
console.log(`${logId}: starting background script`);

function initPinnedTab() {
  browser.tabs
    .query({
      currentWindow: true,
      active: true,
      pinned: true,
    })
    .then((tabs) => {
      if (tabs.length > 0) {
        return browser.storage.local.get().then((settings) => {
          browser.tabs.sendMessage(tabs[0].id, {
            fixPinnedTabLinks: true,
            sitesToIgnore: settings.option || [],
            stickDomain: settings.optionStickDomain || false,
          });
        });
      }
    })
    .catch((error) => console.error(`${logId}: Error: ${error}`));
}

browser.tabs.onUpdated.addListener(initPinnedTab);
