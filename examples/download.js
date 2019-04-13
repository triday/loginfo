let http=require("https");

const console = require("../dist/index");
var req = http.request({
    host: 'npm.taobao.org',
    port: 443,
    path: '/mirrors/node/v10.15.3/node-v10.15.3-x64.msi'
});

req.on('response', function (res) {
    //var body = "";
    var len = parseInt(res.headers['content-length'], 10);
    console.info(len.toString());
    console.beginTick();
   
    res.on('data', function (chunk) {
        //body += chunk;
        let barinfo = console.buildAsciiBar(0.5);
        console.tick(barinfo);
    });

    res.on('end', function () {
        console.endTick(false);
        console.info("ok");
    });

});

req.end();