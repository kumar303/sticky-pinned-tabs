const getOptions = () => document.querySelectorAll('.optionValue');

// Fetch stored settings and update the UI with them.
browser.storage.local.get().then(
  (restoredSettings) => {
    getOptions().forEach(
      function(item) {
        item.value = [].concat(restoredSettings[item.id]).join("\n");
        item.checked = (item.value === 'true');
      }
    );
  },
  (error) => console.error(error),
);

document.querySelector('.saveButton').addEventListener('click', () => {
  const infoContainer = document.querySelector('.info span');
  infoContainer.innerHTML = '';

  var option = document.getElementById('option').value.split('\n')
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
    
  var optionStickDomain = document.getElementById('optionStickDomain').checked;
    
  browser.storage.local.set({ 
    option: option,
    optionStickDomain: optionStickDomain
   });
});
