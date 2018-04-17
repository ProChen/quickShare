var express = require('express');
var router = express.Router();

const nbiot = require('../qucikShare/nbiot.js')
const common = require('../qucikShare/common.js')
const mongoCommon = require('../qucikShare/mongoCommon.js')
const checkBusiness = require('../qucikShare/checkBusiness.js')


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
    res.render('checkCabinet', { title: 'Express' });
});

/* 
*POST /checkCabinet/test
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
*POST /checkCabinet/setCabinetPrice
*设置箱格租用价格
*/
router.post('/setCabinetPrice', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误",null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        cabinet_id: ["string", true],
        bigBox: ["number", true],
        mediumBox: ["number", true],
        smallBox: ["number", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    checkBusiness.setCabinetPrice(req.body, res);

});

/* 
 * POST / checkCabinet / getCabinetPrice
 *获取箱格租用价格
 */
router.post('/getCabinetPrice', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        cabinet_id: ["string", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    checkBusiness.getCabinetPrice(req.body, res);
});

/* 
 * POST / checkCabinet / setDepositPrice
 *设置押金额度
 */
router.post('/setDepositPrice', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        cabinet_id: ["string", true],
        deposit: ["number", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    checkBusiness.setDepositPrice(req.body, res);
});

/* 
 * POST / checkCabinet / getDepositPrice
 *获取押金额度
 */
router.post('/getDepositPrice', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        cabinet_id: ["string", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    checkBusiness.getDepositPrice(req.body, res);
});

/* 
 * POST / checkCabinet / payDeposit
 *充值押金
 */
router.post('/payDeposit', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        userPhone: ["string", true],
        deposit: ["number", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    checkBusiness.payDeposit(req.body, res);
});

/* 
 * POST / checkCabinet / redundDeposit
 *退押金
 */
router.post('/redundDeposit', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        userPhone: ["string", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    checkBusiness.redundDeposit(req.body, res);
});


/* 
 * POST / checkCabinet / queryDeposit
 *查询用户的押金
 */
router.post('/queryDeposit', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        userPhone: ["string", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    checkBusiness.queryDeposit(req.body, res);
});

/* 
 * POST / checkCabinet / rentCabinet
 *开始租用箱格
 */
router.post('/rentCabinet', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        userPhone: ["string", true],
        cabinet_id: ["string", true],
        box_no: ["number", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    checkBusiness.rentCabinet(req.body, res);
});

/* 
 * POST / checkCabinet / getRentInfo
 *获取指定箱格的租用信息
 */
router.post('/getRentInfo', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        userPhone: ["string", true],
        cabinet_id: ["string", true],
        box_no: ["number", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    checkBusiness.getRentInfo(req.body, res);
});

/* 
 * POST / checkCabinet / stopRentCabinet
 *结束租用箱格
 */
router.post('/stopRentCabinet', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        userPhone: ["string", true],
        cabinet_id: ["string", true],
        box_no: ["number", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    checkBusiness.stopRentCabinet(req.body, res);
});

/* 
 * POST / checkCabinet / getRentBox
 *获取正在租用的箱格
 */
router.post('/getRentBox', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        userPhone: ["string", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    checkBusiness.getRentBox(req.body, res);
});

/* 
 * POST / checkCabinet / getRentBoxLog
 *获取租用箱格的历史记录
 */
router.post('/getRentBoxLog', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        userPhone: ["string", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    checkBusiness.getRentBoxLog(req.body, res);
});

/* 
 * POST / checkCabinet / userSuggest
 * 用户提建议
 */
router.post('/userSuggest', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        userPhone: ["string", true],
        userSuggestion: ["string", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    checkBusiness.userSuggest(req.body, res);
});

/* 
 * POST / checkCabinet / getUserStatus
 * 判断用户是不是第一次使用
 */
router.post('/getUserStatus', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        userPhone: ["string", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    checkBusiness.getUserStatus(req.body, res);
});

/* 
 * POST / checkCabinet / getSurplusBox
 * 查询箱格剩余数量
 */
router.post('/getSurplusBox', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        cabinet_id: ["string", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    checkBusiness.getSurplusBox(req.body, res);
});

/* 
 * POST / checkCabinet / chooseBoxType
 * 选择箱格类型
 */
router.post('/chooseBoxType', function (req, res, next) {
    console.log('请求数据：', req.body);
    //头部校验
    let checkHeadReslut = common.checkHead(req.headers);
    if (!checkHeadReslut.pass) {
        res.send(common.responseObject(400, "头部校验有误", null));
        return;
    }
    //参数检查
    let check = common.checkParam({
        cabinet_id: ["string", true],
        box_style: ["string", true]
    }, req.body);

    if (!check.pass) {
        res.send(common.responseObject(400, "参数有误", check.errMsg));
        return;
    }
    checkBusiness.chooseBoxType(req.body, res);
});





module.exports = router;
