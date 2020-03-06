const https = require('https');

function v3Api(sheetId, sheetIndex) {
  return {
    method: 'GET',
    hostname: 'spreadsheets.google.com',
    port: null,
    path: `/feeds/list/${sheetId}/${sheetIndex}/public/values?alt=json-in-script`,
    headers: {
      'cache-control': 'no-cache'
    }
  };
}

module.exports = (sheetId, sheetIndex, callback) => {
  let req = https.request(v3Api(sheetId, sheetIndex), function (res) {
    let chunks = [];

    res.on('data', function (chunk) {
      chunks.push(chunk);
    });

    res.on('end', function () {
      let rawdata = Buffer.concat(chunks).toString();
      let body = rawdata.split('gdata.io.handleScriptLoaded(')[1];
      body = '[' + body;
      body = body.replace(');', ']');

      try {
        let entry = JSON.parse(body)[0]['feed']['entry'];
        let obj = [];
        for (let row of entry) {
          let rowObj = {};
          for (let gsx in row) {
            let keys = gsx.split('gsx$');
            let key = keys[1];
            if (key !== undefined && !key.startsWith('unuse')) {
              rowObj[key] = row[gsx]['$t'];
            }
          }
          obj.push(rowObj);
        }

        if (callback)
          callback(null, obj);
        
      } catch (e) {
        console.log('rawdata: ', rawdata);
        callback(e);
      }
    });
  });
  req.end();
};