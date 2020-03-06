const parser = require('./main');

/*
 * 필수 : 구글 문서 파일 > 웹에 게시한 사용
 */
const spreadsheetId = '1LxdwIqUGpJ6dMDkCGak8wt_y9Y2_H4ReKKyNb89dHiQ';
const spreadsheetIndex = 1;
const options = {
  separator: '_',
  localeList: ['ko', 'en'],
  fallbackLocale: 'ko',
  codeName: 'code',
  encoding: 'utf-8'
};

function writeJson(output, content, encoding='utf-8') {
  const fs = require('fs');
  const path = require('path');
  fs.writeFile(path.resolve(__dirname, output), content, encoding, (err) => {
    if (err)
      throw new Error(err);
  })
}

console.log('spreadsheet downloading...');

parser.parseSpreadsheet(spreadsheetId, spreadsheetIndex,function (err, data) {
  if (err) {
    console.log(err);
  }
  else if (data) {
    console.log('locale parsing...');
    let parsed = parser.parseLocale(data, options);
    for (let locale in parsed) {
      let output = `lang/${locale}.json`;
      writeJson(output, JSON.stringify(parsed[locale], null, 2));
      console.log(`convert to file : "${output}"`);
    }
    console.log('complete!');
  }
});