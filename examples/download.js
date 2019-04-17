const http = require("http");
const { default: log, buildAsciiProgress } = require("../dist/index");

const fileurl = {
    host: 'cachefly.cachefly.net',
    path: '/5mb.test'
}
log.beginTick();
downLoadFile(fileurl, (total, downloaded) => {
    let percent=downloaded/total;
    let barinfo = buildAsciiProgress(percent, { fillCh: '+', emptyCh: '.' });
    log.tick('{0:p2} {1#yellow} {2#red:S}/{3#blue:S}', percent, barinfo, downloaded, total);
}).then(() => {
    log.endTick();
    log.debug("download success!!!")
})


function downLoadFile(info, tickback) {
    return new Promise(function (resolve) {
        var req = http.request(info);
        req.on('response', function (res) {
            //var body = "";
            let totalLen = parseInt(res.headers['content-length'], 10);
            let downLoadLen = 0;
            res.on('data', function (chunk) {
                // save data code
                downLoadLen += chunk.length;
                if (tickback) tickback(totalLen, downLoadLen);
            });
            res.on('end', function () {
                resolve(info);
            });
        });
        req.end();
    });
}

