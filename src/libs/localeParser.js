module.exports = (list, options={}) => {
  const fs = require('fs');
  const path = require('path');

  let separator = options.separator || '_';
  let localeList = options.localeList || ['ko', 'en'];
  let fallbackLocale = options.fallbackLocale || 'en';
  let encoding = options.encoding || 'utf-8';
  let codeName = options.codeName || 'code';

  let localeSet = {};
  for (let locale of localeList)
    localeSet[locale] = {};

  let obj = {};
  for (let o of list) {
    const splited = o[codeName].split(separator);
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
