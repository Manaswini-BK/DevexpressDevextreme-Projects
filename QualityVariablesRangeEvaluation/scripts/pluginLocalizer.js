/* exported pluginLocalizer */

pluginLocalizer = function() {
	'use strict';
    var pluginLocalizationInstances = {};

    function init(name) {
        var pluginName = name; // something like GETrendCard
        var preferredLanguages; // something like ["en-US", "en"]
        var primaryLanguage; // first selection, such as "en-US"
        var languageData = {};
        var pathOverride = null;

        var numericFormatOptions = {
            minimumIntegerDigits: 1,
            minimumFractionDigits: 2,
            maximumFractionDigits: 3
        };

        var numericFormatter = null;

        function _setPreferredLanguages(languageArray) {
            //console.log("setPreferredLanguages(%O)", languageArray);
            preferredLanguages = languageArray;
            if(preferredLanguages.length) {
                primaryLanguage = preferredLanguages[0].trim();
            }
            //console.log("\tprimaryLanguage=%s", primaryLanguage);

            // if module is available - make backwards-compatible for plugins that don't include this module
            try {
                numericFormatter = new intlFormatter();
                numericFormatter.init(primaryLanguage, null);
            } catch (e) {
                console.log("International numeric formatter module unavailable");
            }
        }

        function _setTranslationFileLocation(path) {
            pathOverride = path;
        }

        function _loadLanguages(callback) {
            var langRequestCount = 0;
            var totalLangsRequested = preferredLanguages.length;
            _.each(preferredLanguages, function(lang) {
                lang = lang.trim();
                var langFile = "/custom/default/"+pluginName+"/scripts/i18n/"+lang+".json";
                if(pathOverride) {
                    langFile = pathOverride+"/"+lang+".json";
                }
                //console.log("loading language data from %s", langFile);
                jQuery.getJSON( langFile, function( data ) {
                    languageData[lang] = data[lang];
                }).always(function() {
                    langRequestCount++;
                    if(langRequestCount===totalLangsRequested) {
                        callback();
                    }
                });
            });
        }

        function _getPreferredLocale() {
            return primaryLanguage;
        }

        function _translate(stringKey) {
            var translation = null;
            _.each(preferredLanguages, function(lang) {
                lang = lang.trim();
                // get first matching translation
                if(translation===null && languageData.hasOwnProperty(lang)) {
                    var data = languageData[lang];
                    if(data.hasOwnProperty(stringKey)) {
                        translation = data[stringKey];
                    }
                }
            });
            if(translation===null) {
                console.log("Missing translation: %s", stringKey);
                return stringKey;
            }
            return translation;
        }

        function _getDecimalSeparator() {
            var n = 1.1;
            return _numberToLocalizedString(n, false).substring(1,2);
        }
        function _getThousandsSeparator() {
            var n = 1000;
            return _numberToLocalizedString(n, false).substring(1,2);
        }
        function _numberToLocalizedString(num, bUseFormatOptions = false) {
            if(bUseFormatOptions) {
                return num.toLocaleString(primaryLanguage, numericFormatOptions);
            }
            return num.toLocaleString(primaryLanguage);
        }

        function _getNumericFormatter() {
            return numericFormatter;
        }

        return ({
            setPreferredLanguages: _setPreferredLanguages,
            setTranslationFileLocation: _setTranslationFileLocation,
            loadLanguages: _loadLanguages,
            getPreferredLocale: _getPreferredLocale,
            translate: _translate,
            getDecimalSeparator: _getDecimalSeparator,
            getThousandsSeparator: _getThousandsSeparator,
            numberToLocalizedString: _numberToLocalizedString,
            getNumericFormatter: _getNumericFormatter
        });
    }

    return {
        getInstance: function (pluginName) {
            if(!pluginLocalizationInstances.hasOwnProperty(pluginName)) {
                pluginLocalizationInstances[pluginName] = init(pluginName);
            }
            var instance = pluginLocalizationInstances[pluginName];
            return instance;
        },
    };
}(
	console.log('pluginLocalizer initializing...')
);
