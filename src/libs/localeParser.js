module.exports = (list, separator='_', localeList=['ko', 'en'], fallbackLocale = 'en', encoding='utf-8') => {
  const fs = require('fs');
  const path = require('path');


  let localeSet = {};
  for (let locale of localeList)
    localeSet[locale] = {};

  let obj = {};
  for (let o of list) {
    const splited = o.code.split(separator);
    const key = splited.shift();
    const subKey = splited.join(separator);
    for (let locale of localeList) {
      const value = o[locale] || o[fallbackLocale] || '';
      if (subKey) {
        if (!localeSet[locale][key])
          localeSet[locale][key] = {};
        localeSet[locale][key][subKey] = value;
      }
      else {
        localeSet[locale][key] = o[locale] || o[fallbackLocale] || '';
      }
    }
  }
  return localeSet;
};
