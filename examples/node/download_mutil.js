

const http = require("http");
require("tsharp");
const { default: log, buildAsciiProgress } = require("../../dist/index");

let downLoadData = [
    {
        host: 'cachefly.cachefly.net',
        path: '/1mb.test'
    },
    {
        host: 'cachefly.cachefly.net',
        path: '/1mb.test'
    },
    {
        host: 'cachefly.cachefly.net',
        path: '/1mb.test'
    },
    {
        host: 'cachefly.cachefly.net',
        path: '/1mb.test'
    },
    {
        host: 'cachefly.cachefly.net',
        path: '/1mb.test'
    },
]

let downLoadProgress = new Array(downLoadData.length).fill(null);
function updateTick(index, total, downloaded) {
    downLoadProgress[index] = {
        total,
        downloaded
    }
    let lines = downLoadProgress.map((info, index) => {
        if (info) {
            let percent = info.downloaded / info.total;
            let barinfo = buildAsciiProgress(percent, { fillCh: '+', emptyCh: '.', columns: 20 });
            return String.format("[file {0#red}] {1,7:p2} {2#green} {3#blue:S}/{4:S}", index, percent, barinfo, info.downloaded, info.total);
        } else {
            return String.format("[file {0#red}] starting...", index);
        }
    });
    log.tick(lines);
}

log.beginTick();
Promise.all(downLoadData.map((p, index) => downLoadFile(p, (total, downloaded) => {
    updateTick(index, total, downloaded);
}))).then(() => {
    log.endTick();
    log.debug("download all success!!!");
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



