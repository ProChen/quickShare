let request = require('request');

const mongoConfig = require('../config.js').mongoConfig

let mongoAddress = 'mongodb://' + mongoConfig.user + ':' + mongoConfig.password + '@' + mongoConfig.address + ':' + mongoConfig.port + '/' + mongoConfig.database;


/**
 * 获取easyIot平台的token
 * 
 */
function getEasyIoTToken() {
    let options = {
        url: 'https://www.easy-iot.cn/idev/3rdcap/server/login',
        method: 'POST',
        json: true,
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            "serverId": "gzjkwldev01",
            "password": "123456aB"
        }
    }
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                reject(error);
            }
            resolve(response.body.accessToken);
        })
    });
}

/**
 * 打开NB-IoT智能锁
 * 
 */
async function openLock() {
    console.log('mongo地址：', mongoAddress);
    //获取EasyIoT平台的Token
    let accessToken = await getEasyIoTToken();

    //打开NB-IoT锁
    let options = {
        url: 'https://www.easy-iot.cn/idev/3rdcap/dev-control/urt-command',
        method: 'POST',
        json: true,
        headers: {
            'serverID': 'gzjkwldev01',
            'accessToken': accessToken,
            'Content-Type': 'application/json'
        },
        body: {
            "devSerial": "863703033019899",
            "method": "command2",
            "params": { "lock_1": 1 }
        }
    }
    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                reject(error);
            }
            resolve(response.body.optResult);
        });
    });
}

module.exports = {
    getEasyIoTToken: getEasyIoTToken,
    openLock: openLock
}
