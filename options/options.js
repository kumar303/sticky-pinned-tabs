const getOption = () => document.querySelector('.optionValue');

// Fetch stored settings and update the UI with them.
browser.storage.local.get().then(
  (restoredSettings) => {
    getOption().value = restoredSettings.option.join("\n");
  },
  (error) => console.error(error),
);

document.querySelector('.saveButton').addEventListener('click', () => {
  const infoContainer = document.querySelector('.info span');
  infoContainer.innerHTML = '';

  const option = getOption().value
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
        infoContainer.innerHTML = `<span class="error">${error}</span>`;
      } else {
        infoContainer.innerHTML = 'Preferences saved';
      }
      return opt;
    });

  browser.storage.local.set({ option });
});
