import { helper } from '../helper/helper.js';
const getUrlList = () => document.querySelector('.optionValue');
const getUrlListType = () => document.querySelector('.siteListType:checked');
const getLogMethods = () => Array.from(document.querySelectorAll('.logMethod:checked'));
// Fetch stored settings and update the UI with them.
browser.storage.local.get().then(
  (restoredSettings) => {
    console.log(restoredSettings);
    if(restoredSettings.logMethods) {
      console.log(restoredSettings.logMethods)
      restoredSettings.logMethods.forEach((currentValue) => {
        document.querySelector(`#logMethod-${currentValue}`).checked = true;
      });
    }
    if(restoredSettings.urlList) {
      getUrlList().value = restoredSettings.urlList.join("\n");
    }
    if(restoredSettings.urlListType) {
      document.querySelector(`#siteListType-${restoredSettings.urlListType}`).checked = true;
    } else {
      getUrlListType().value = 'blacklist';
    }
  },
  (error) => helper.log('error', error),
);

document.querySelector('.saveButton').addEventListener('click', () => {
  const infoContainer = document.querySelector('.info .success');
  const errorContainer = document.querySelector('.info .error');
  infoContainer.textContent = '';
  errorContainer.textContent = ''

  const logMethods = getLogMethods().map((currentNode) => {return currentNode.value});
  const urlListType = getUrlListType().value || 'whitelist';
  const urlList = getUrlList().value
    .split('\n')
    .map((opt) => opt.trim())
    .map((opt) => {
      let error;
      try {
        if (!new RegExp(opt)) {
          error = `${opt}: invalid regular expression`;
        }
      } catch (regExpError) {
        error = `RegExp('${opt}'): ${regExpError}`
      }
      if (error) {
        errorContainer.textContent = `<span class="error">${error}</span>`;
      } else {
        infoContainer.textContent = 'Preferences saved';
      }
      return opt;
    });

  browser.storage.local.set({ "urlListType": urlListType, "urlList": urlList, "logMethods": logMethods });
});
