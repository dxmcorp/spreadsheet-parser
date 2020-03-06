# spreadsheet-parser
google spreadsheet parser

# sheet example
```
==================================
code           |   kr     |   en
==================================
TestKey        | 테스트 키 |  Test Key
Group_login   |  로그인   |  Login
Group_confirm |  확인     |  Confirm
----------------------------------
```

# code example
```
const parser = require('@dxmcorp/spreadsheet-parser');

const spreadsheetId = '1aPnMLwzbWkwdHxWIuRGuWKUDXg6sXnBiYHGM-hezIy4';
const spreadsheetIndex = 1;
const options = {
  separator: '_',
  localeList: ['ko', 'en'],
  fallbackLocale: 'ko',
  codeName: 'code',
  encoding: 'utf-8'
};

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
      parser.writeJson(output, JSON.stringify(parsed[locale], null, 2));
      console.log(`convert to file : "${output}"`);
    }
    console.log('complete!');
  }
});
```

# output file
`lang/ko.json`
```json
{
    "TestKey": "테스트 키",
    "Group": {
        "login": "로그인",
        "confirm": "확인"
    }
}
```

`lang/en.json`
```json
{
    "TestKey": "Test Key",
    "Group": {
        "login": "Login",
        "confirm": "Confirm"
    }
}
```
