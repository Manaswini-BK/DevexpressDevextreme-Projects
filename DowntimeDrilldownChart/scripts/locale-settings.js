(function() {

    var locale = (window.navigator.languages) ? window.navigator.languages[0] :
        (window.navigator.userLanguage || window.navigator.language);

    var supportedLocales = ['en-US', 'ko', 'zh-CN', 'it', 'fr', 'es', 'de', 'ja', 'nl', 'pl', 'pt-BR', 'ru', 'sv', 'ar', 'da', 'fi', 'he', 'sl', 'tr'];
    var langFile = "/custom/default/KeyPerformanceIndicator/scripts/i18n/" + locale + ".json";
    var defaultScript = '/custom/default/KeyPerformanceIndicator/scripts/i18n/en-US.json';

    // Check if the current locale is part of supported locales. Else fall back to default language - English
    var scriptName = (supportedLocales.findIndex((e) => { return e == locale; }) !== -1) ? langFile : defaultScript;
    var retryCount = 0;
    window.localeData = window.localeData || {};
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status === 404) {
                if (retryCount <= 1) {
                    retryCount++;
                    scriptName = defaultScript;
                    xmlhttp.open("GET", scriptName, true);
                    xmlhttp.send();
                } else {
                    console.error(`Unable to load localization file ${scriptName}`);
                }
            } else {
                window.localeData = Object.assign({}, window.localeData, JSON.parse(xmlhttp.response));
                window.localeData['currentLocale'] = locale;
            }
        }
    };
    xmlhttp.open("GET", scriptName, true);
    xmlhttp.send();

})();