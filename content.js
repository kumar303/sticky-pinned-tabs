// TODO: observe dom mutation, maybe?
function fixAllLinkTargets() {
  helper.log('debug', `${window.location.href} Changing all links to open in target=_blank`);
  for (const link of window.document.getElementsByTagName('a')) {
    if (link.href !== '' && link.href.indexOf('#') !== 0) {
      link.target = '_blank';
    }
  }
}

function shouldFixThisTab(urlListType, urlList) {
  helper.log('debug', `Checking ${window.location.href} - mode: ${urlListType}`);
  if(urlListType === 'whitelist') {
    return isSticky(urlList, false);
  }  else  {
    if(urlListType !== 'blacklist') {
      helper.log('error', `${urlListType} is invalid please select either whitelist or blacklist - defaulting to blacklist`) 
    }
    return isSticky(urlList, true);
  }
}

browser.runtime.onMessage.addListener((request) => {
  if (request.fixPinnedTabLinks && shouldFixThisTab(request.urlListType, request.urlList)) {
    fixAllLinkTargets();
  }
});

function isSticky(urlList, defaultReturn) {
  if (urlList.some((pattern) => { return new RegExp(pattern, 'i').test(window.location.href);})) {
    return !defaultReturn;
  }

  return defaultReturn;
}

//TODO: Find a better way to impoort helper into content.js
var helper= {
   log : function (type, message) {
    browser.runtime.sendMessage({type,  message});
  }
}