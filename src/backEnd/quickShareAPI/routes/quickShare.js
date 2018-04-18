var express = require('express');
var router = express.Router();

const common = require('../qucikShare/common.js')
const mongoCommon = require('../qucikShare/mongoCommon.js')
const quickShareBusiness = require('../qucikShare/quickShareBusiness.js')


/* GET home page. */
router.get('/', function (req, res, next) {
    let userInfoModel = mongoCommon.createUserInfoModel();
    mongoCommon.retrieveDoc(
        userInfoModel,
        {
            password: '12345'
        },
        {
            password: 0
        }
    );
    res.render('quickShare', { title: 'Express' });
});

/* 
*POST /quickShareBusiness/test
*测试API
*/
router.post('/test', function (req, res, next) {
    console.log('请求数据：',req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass){
        res.send(common.responseObject(400, "头部校验有误", check.errMsg));
        return;
    }
    //参数检查
    let check = common.checkParam({
        phone_no: ["string", true],
        password: ["string", true],
        company_name: ["string", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    //TODO处理业务
    res.send(common.responseObject(200, "提交任务成功", null));
});

/* 
*POST /quickShare/getRandomNum
*获取4位随机数
*/
router.post('/getRandomNum', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误",null));
        return;
    }
    //参数检查
    let check = common.checkParam({

    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    quickShareBusiness.getRandomNum(req.body, res);

});

/* 
 * POST /quickShare/sendData
 *发送数据
 */
router.post('/sendData', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        data: ["string", true],
        code: ["number", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    quickShareBusiness.sendData(req.body, res);
});

/* 
 * POST /quickShare/getData
 *接收数据
 */
router.post('/getData', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        code: ["number", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    quickShareBusiness.getData(req.body, res);
});

/* 
 * POST /quickShare/deleteData
 *接收数据
 */
router.post('/deleteData', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        code: ["number", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    quickShareBusiness.deleteData(req.body, res);
});

module.exports = router;
