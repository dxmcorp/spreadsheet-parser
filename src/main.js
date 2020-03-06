module.exports = {
  parseLocale: require('./libs/localeParser'),
  parseSpreadsheet: require('./libs/spreadsheetParser'),
  writeJson(output, jsonstring, encoding='utf-8') {
    const fs = require('fs');
    const path = require('path');
    fs.writeFile(path.resolve(__dirname, output), jsonstring, encoding, (err) => {
      if (err)
        throw new Error(err);
    })
  }
};