const logId = 'sticky-pinned-tabs [extension]';

// TODO: observe dom mutation, maybe?

function fixAllLinkTargets() {
  console.log(
    `${logId}: Changing all links to open in target=_blank`,
  );
  for (const link of window.document.getElementsByTagName('a')) {
    if (link.href !== '' && link.href.indexOf('#') !== 0) {
      link.target = '_blank';
    }
  }
}

browser.runtime.onMessage.addListener((request) => {
  if (request.fixPinnedTabLinks) {
    fixAllLinkTargets();
  }
});
