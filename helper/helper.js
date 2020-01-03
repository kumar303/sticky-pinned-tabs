export var helper = {
    log: function (type, message) {
        const logId = '[extension] sticky-pinned-tabs';
        browser.storage.local.get().then(
            (storage) => {
                console.log(storage);
                let logMethods = 'logMethods' in storage ? storage['logMethods'] : ['startup', 'error'];
                if (logMethods.includes(type)) {
                    console.log(
                        `[${type}] ${logId}: ${message}`,
                    );
                }
          });
    }
};