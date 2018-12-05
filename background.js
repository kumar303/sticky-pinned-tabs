const logId = 'sticky-pinned-tabs [extension]';
console.log(`${logId}: starting background script`);

function initPinnedTab() {
  browser.tabs
    .query({
      currentWindow: true,
      active: true,
      pinned: true,
    })
    .then(
      (tabs) => {
        if (tabs.length > 0) {
          browser.tabs.sendMessage(tabs[0].id, {
            fixPinnedTabLinks: true,
          });
        }
      },
      (error) => console.error(`${logId}: Error: ${error}`),
    );
}

browser.tabs.onUpdated.addListener(initPinnedTab);
