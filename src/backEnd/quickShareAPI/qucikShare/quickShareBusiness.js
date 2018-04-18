let request = require('request');

const common = require('../qucikShare/common.js')
const mongoCommon = require('../qucikShare/mongoCommon.js')

const yuLeiAPI = require('../config.js').yuLeiAPI


/**
 * 获取随机数
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function getRandomNum(requestBody, res) {
    let randomData = {};
    while (1) {
        randomData.randomData = getRandom(1000, 9999);
        console.log(randomData);
        //查询 shareData 集合
        let queryDoc = await mongoCommon.retrieveDoc(
            'shareDataModel',
            {
                code: randomData.randomData
            }
        );
        //集合shareData中，code不存在，返回code
        if (queryDoc.length === 0) {
            res.send(common.responseObject(200, "获取随机数成功", randomData));
            return;
        }
    }
}

/**
 * 发送数据
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function sendData(requestBody, res) {
    let insertResult = await mongoCommon.createDoc('shareDataModel', requestBody);
    if (insertResult.length != 0) {
        res.send(common.responseObject(200, "数据发送成功", null));
        return;
    }
}

/**
 * 接收数据
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function getData(requestBody, res) {
    //先查询 shareData 集合
    let queryDoc = await mongoCommon.retrieveDoc(
        'shareDataModel',
        {
            code: requestBody.code
        },
        {
            _id:0,
            __v:0,
            code:0
        }
    );
    //没有找到code，返回失败：code不存在
    if (queryDoc.length === 0) {
        res.send(common.responseObject(4000, "接收数据失败", "code不存在"));
        return;
    }
    console.log('查找结果：', queryDoc);
    //找到code
    res.send(common.responseObject(200, "接收数据成功", queryDoc[0]));
    return;
}

/**
 * 删除数据
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function deleteData(requestBody, res) {
    //先查询 shareData 集合
    let queryDoc = await mongoCommon.deleteDoc(
        'shareDataModel',
        {
            code: requestBody.code
        }
    );
    console.log('删除结果：',queryDoc)
    //没有找到code，返回失败：code不存在
    if (queryDoc.n === 0) {
        res.send(common.responseObject(4000, "删除数据失败", "code不存在"));
        return;
    }
    //找到code
    res.send(common.responseObject(200, "删除数据成功", null));
    return;
}

/**
 * 获取一定范围内随机数
 * 
 * @param {any} beginNum 开始数字
 * @param {any} endNum 结束数字
 * @returns 
 */
function getRandom(beginNum,endNum) {
    let randomData;
    let difference = endNum - beginNum;
    Math.random() * difference
    randomData = Math.random() * difference + beginNum;
    randomData = parseInt(randomData, 10);

    return randomData;
}


module.exports = {
    getRandomNum: getRandomNum,
    sendData: sendData,
    getData: getData,
    deleteData: deleteData
}
