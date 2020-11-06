const logId = 'sticky-pinned-tabs [extension]';

// TODO: observe dom mutation, maybe?

function fixAllLinkTargets(stickDomain) {
  console.log(
    `${logId}: ${
      window.location.href
    } Changing all links to open in target=_blank`,
  );
  for (const link of window.document.getElementsByTagName('a')) {
    if (link.href !== '' && link.href.indexOf('#') !== 0) {
      if (!stickDomain || link.href.indexOf(window.location.origin) === 0) {
        link.target = '_blank';
      }
    }
  }
}

function shouldFixThisTab(sitesToIgnore) {
  if (
    sitesToIgnore.some((pattern) => {
      return new RegExp(pattern, 'i').test(window.location.href);
    })
  ) {
    return false;
  }

  return true;
}

browser.runtime.onMessage.addListener((request) => {
  if (request.fixPinnedTabLinks && shouldFixThisTab(request.sitesToIgnore)) {
    fixAllLinkTargets(request.stickDomain);
  }
});
