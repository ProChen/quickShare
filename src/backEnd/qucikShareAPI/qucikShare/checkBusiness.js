let request = require('request');

const common = require('../qucikShare/common.js')
const mongoCommon = require('../qucikShare/mongoCommon.js')
const nbiot = require('../qucikShare/nbiot.js')

const yuLeiAPI = require('../config.js').yuLeiAPI


/**
 * 设置箱格租用价格
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function setCabinetPrice(requestBody, res) {
    //先查询 cabinetPrice 集合
    let queryDoc = await mongoCommon.retrieveDoc(
        'cabinetPriceModel',
        {
            cabinet_id: requestBody.cabinet_id
        }
    );
    //没有找到柜号，插入 cabinetPrice 集合
    if (queryDoc.length === 0){
        let insertResult = await mongoCommon.createDoc('cabinetPriceModel', requestBody);
        if (insertResult.length != 0){
            res.send(common.responseObject(200, "设置箱格租用价格成功", null));
            return ;
        }
    }
    //找到柜号，更新 cabinetPrice 集合
    else{
        console.log('更新数据');
        let updateResult = await mongoCommon.updateDoc(
            'cabinetPriceModel',
            {
                cabinet_id:requestBody.cabinet_id
            },
            requestBody
        );
        if (updateResult.length != 0) {
            res.send(common.responseObject(200, "设置箱格租用价格成功", null));
            return;
        }
    }
}

/**
 * 获取箱格租用价格
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function getCabinetPrice(requestBody, res) {
    //先查询 cabinetPrice 集合
    let queryDoc = await mongoCommon.retrieveDoc(
        'cabinetPriceModel',
        {
            cabinet_id: requestBody.cabinet_id
        },
        {
            _id:0,
            __v:0
        }

    );
    //没有找到柜号，返回错误
    if (queryDoc.length === 0) {
        res.send(common.responseObject(4000, "箱格号不存在", null));
        return;
    }
    //找到柜号，租用价格
    else {
        res.send(common.responseObject(200, "获取箱格租用价格成功", queryDoc));
        return;
    }
}

/**
 * 设置押金额度
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function setDepositPrice(requestBody, res) {
    //先查询 cabinetDeposit 集合
    let queryDoc = await mongoCommon.retrieveDoc(
        'cabinetDepositModel',
        {
            cabinet_id: requestBody.cabinet_id
        }
    );
    //没有找到柜号，插入 cabinetDeposit 集合
    if (queryDoc.length === 0) {
        let insertResult = await mongoCommon.createDoc('cabinetDepositModel', requestBody);
        if (insertResult.length != 0) {
            res.send(common.responseObject(200, "设置箱格租用押金成功", null));
            return;
        }
    }
    //找到柜号，更新 cabinetDeposit 集合
    else {
        console.log('更新数据');
        let updateResult = await mongoCommon.updateDoc(
            'cabinetDepositModel',
            {
                cabinet_id: requestBody.cabinet_id
            },
            requestBody
        );
        if (updateResult.length != 0) {
            res.send(common.responseObject(200, "设置箱格租用押金成功", null));
            return;
        }
    }

}

/**
 * 获取押金额度
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function getDepositPrice(requestBody, res) {
    //先查询 cabinetDeposit 集合
    let queryDoc = await mongoCommon.retrieveDoc(
        'cabinetDepositModel',
        {
            cabinet_id: requestBody.cabinet_id
        },
        {
            _id: 0,
            __v: 0
        }

    );
    //没有找到柜号，返回错误
    if (queryDoc.length === 0) {
        res.send(common.responseObject(4000, "箱格号不存在", null));
        return;
    }
    //找到柜号，租用价格
    else {
        res.send(common.responseObject(200, "获取箱格租用价格成功", queryDoc));
        return;
    }
}

/**
 * 充值押金
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function payDeposit(requestBody, res) {
    //先查询 userDeposit 集合
    let queryDoc = await mongoCommon.retrieveDoc(
        'userDepositModel',
        {
            userPhone: requestBody.userPhone
        }
    );
    //没有找到用户，插入 userDeposit 集合
    if (queryDoc.length === 0) {
        let insertResult = await mongoCommon.createDoc('userDepositModel', requestBody);
        if (insertResult.length != 0) {
            res.send(common.responseObject(200, "充值押金成功", null));
            return;
        }
    }
    //找到用户，更新 userDeposit 集合
    else {
        console.log('更新数据');
        let updateResult = await mongoCommon.updateDoc(
            'userDepositModel',
            {
                userPhone: requestBody.userPhone
            },
            {
                deposit: queryDoc[0].deposit + requestBody.deposit
            }
        );
        if (updateResult.length != 0) {
            res.send(common.responseObject(200, "充值押金成功", null));
            return;
        }
    }
}

/**
 * 退押金
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function redundDeposit(requestBody, res) {
    //先查询 userDeposit 集合
    let queryDoc = await mongoCommon.retrieveDoc(
        'userDepositModel',
        {
            userPhone: requestBody.userPhone
        }
    );
    //没有找到用户，插入 userDeposit 集合
    if (queryDoc.length === 0) {
        res.send(common.responseObject(4000, "用户不存在", null));
        return;
    }
    //找到用户，更新 userDeposit 集合
    else {
        console.log('更新数据');
        let updateResult = await mongoCommon.updateDoc(
            'userDepositModel',
            {
                userPhone: requestBody.userPhone
            },
            {
                deposit: 0
            }
        );
        if (updateResult.length != 0) {
            res.send(common.responseObject(200, "退押金成功", null));
            return;
        }
    }
}

/**
 * 查询用户的押金
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function queryDeposit(requestBody, res) {
    //先查询 userDeposit 集合
    let queryDoc = await mongoCommon.retrieveDoc(
        'userDepositModel',
        {
            userPhone: requestBody.userPhone
        },
        {
            _id: 0,
            __v: 0
        }
    );
    //没有找到用户，插入 userDeposit 集合
    if (queryDoc.length === 0) {
        res.send(common.responseObject(4000, "用户不存在", null));
        return;
    }
    //找到用户，返回用户押金余额
    else {
        res.send(common.responseObject(200, "获取用户押金余额成功", queryDoc));
        return;
    }
}

/**
 * 开始租用箱格
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function rentCabinet(requestBody, res) {
    let startTime = new Date().toLocaleString();
    let endTime = new Date().toLocaleString();

    let rentTime = getRentTime(startTime, endTime);
    console.log('租用价格：',rentTime);
    let boxType = await getBoxType(requestBody.cabinet_id, requestBody.box_no);
    console.log('箱格类型：',boxType);
    let cost = await getBoxCost(requestBody.cabinet_id, requestBody.box_no, rentTime);
    console.log('箱格价格：',cost);

    let location = await getBoxLocation(requestBody.cabinet_id);
    console.log('箱格地址：',location);
    
    
    //判断箱格是否被占用
    let boxState = await getBoxState(requestBody.cabinet_id, requestBody.box_no);
    if (boxState === '02'){
        console.log('箱格被占用');
        res.send(common.responseObject(4000, "箱格已经被占用", null));
    }
    console.log('箱格未被占用');

    //初始化userRentInfo集合
    let insertResult = await mongoCommon.createDoc(
        'userRentInfoModel', 
        {
            userPhone: requestBody.userPhone,
            cabinet_id: requestBody.cabinet_id,
            box_no: requestBody.box_no,
            box_style: boxType,
            startTime: startTime,
            endTime: endTime,
            rentTime: rentTime,
            cost: cost,
            location: location
        }
    );
    //打开箱格
    let openResult = await openBox(requestBody.cabinet_id, requestBody.box_no);
    if (openResult !== 200) {
        console.log('打开箱格失败');
        res.send(common.responseObject(4001, "租用箱格失败", '打开箱格失败'));
        return;
    }
    //占用箱格
    let occupyResult = await occupyBox(requestBody.cabinet_id, requestBody.box_no);
    if (occupyResult !== 200) {
        console.log('占用箱格失败');
        res.send(common.responseObject(4001, "租用箱格失败", '占用箱格失败'));
        return;
    }
    
    res.send(common.responseObject(200, "租用箱格成功", null));
}

/**
 * 获取指定箱格的租用信息
 * 
 * @param {any} requestBody http请求body
 */
async function getRentInfo(requestBody, res) {
    //查询userRentInfo集合
    let queryDoc = await mongoCommon.retrieveDoc(
        'userRentInfoModel',
        {
            userPhone: requestBody.userPhone,
            cabinet_id: requestBody.cabinet_id,
            box_no: requestBody.box_no
        },
        {
            _id:0,
            __v:0
        }
    );
    console.log('查找到的信息：', queryDoc);
    //没有找到租用信息
    if (queryDoc.length === 0) {
        res.send(common.responseObject(4000, "获取指定箱格租用信息失败", '没有找到租用信息'));
        return;
    }
    let startTime = queryDoc[0].startTime;

    //更新userRentInfo集合,（endTime，rentTime，cost字段）
    let endTime = new Date().toLocaleString();
    let rentTime = getRentTime(startTime, endTime);
    let cost = await getBoxCost(requestBody.cabinet_id, requestBody.box_no, rentTime);

    //临时打印
    console.log('endTime',endTime);
    console.log('rentTime',rentTime);
    console.log('cost',cost);
    

    //更新userRentInfo集合,（endTime，rentTime，cost字段）
    let updateDoc = await mongoCommon.updateDoc(
        'userRentInfoModel',
        {
            userPhone: requestBody.userPhone,
            cabinet_id: requestBody.cabinet_id,
            box_no:requestBody.box_no
        },
        {
            endTime:endTime,
            rentTime:rentTime,
            cost:cost
        }
    );
    //更新租用信息失败
    if (updateDoc.length === 0) {
        res.send(common.responseObject(4000, "获取指定箱格租用信息失败", '更新租用信息失败'));
        return;
    }
    //查询userRentInfo集合
    let queryRentDoc = await mongoCommon.retrieveDoc(
        'userRentInfoModel',
        {
            userPhone: requestBody.userPhone,
            cabinet_id: requestBody.cabinet_id,
            box_no: requestBody.box_no
        },
        {
            _id: 0,
            __v: 0
        }
    );
    //没有找到租用信息
    if (queryRentDoc.length === 0) {
        res.send(common.responseObject(4000, "获取指定箱格租用信息失败", '没有找到租用信息'));
        return;
    }
    //返回租用信息
    res.send(common.responseObject(200, "获取指定箱格租用信息成功", queryRentDoc[0]));
    return;
}

/**
 * 结束租用箱格
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function stopRentCabinet(requestBody, res) {
    //查询userRentInfo集合
    let queryDoc = await mongoCommon.retrieveDoc(
        'userRentInfoModel',
        {
            userPhone: requestBody.userPhone,
            cabinet_id: requestBody.cabinet_id,
            box_no: requestBody.box_no
        },
        {
            _id: 0,
            __v: 0
        }
    );
    //没有找到租用信息
    if (queryDoc.length === 0) {
        res.send(common.responseObject(4000, "获取指定箱格租用信息失败", '没有找到租用信息'));
        return;
    }
    let startTime = queryDoc[0].startTime;
    let endTime = new Date().toLocaleString();
    let rentTime = getRentTime(startTime, endTime);
    let cost = await getBoxCost(requestBody.cabinet_id, requestBody.box_no, rentTime);

    //更新userRentInfo集合,（endTime，rentTime，cost字段）
    let updateDoc = await mongoCommon.updateDoc(
        'userRentInfoModel',
        {
            userPhone: requestBody.userPhone,
            cabinet_id: requestBody.cabinet_id,
            box_no: requestBody.box_no
        },
        {
            endTime: endTime,
            rentTime: rentTime,
            cost: cost
        }
    );
    //更新租用信息失败
    if (updateDoc.length === 0) {
        res.send(common.responseObject(4000, "获取指定箱格租用信息失败", '更新租用信息失败'));
        return;
    }
    //查询userRentInfo集合
    let queryRentDoc = await mongoCommon.retrieveDoc(
        'userRentInfoModel',
        {
            userPhone: requestBody.userPhone,
            cabinet_id: requestBody.cabinet_id,
            box_no: requestBody.box_no
        },
        {
            _id:0,
            __v:0
        }
    );
    //没有找到租用信息
    if (queryRentDoc.length === 0) {
        res.send(common.responseObject(4000, "获取指定箱格租用信息失败", '没有找到租用信息'));
        return;
    }
    console.log('queryRentDoc文档: ', queryRentDoc[0]);
    
    //增加文档到集合userRentLog
    let insertResult = await mongoCommon.createDoc(
        'userRentLogModel', 
        {
            userPhone: queryRentDoc[0].userPhone,
            cabinet_id: queryRentDoc[0].cabinet_id,
            box_no: queryRentDoc[0].box_no,
            box_style: queryRentDoc[0].box_style,
            startTime: queryRentDoc[0].startTime,
            endTime: queryRentDoc[0].endTime,
            rentTime: queryRentDoc[0].rentTime,
            cost: queryRentDoc[0].cost,
            location: queryRentDoc[0].location
        }
    );
    
    if (insertResult.length === 0) {
        res.send(common.responseObject(4000, "获取指定箱格租用信息失败", '增加文档到集合userRentLog失败'));
        return;
    }

    //删除集合userRentInfo中的文档
    let deleteDoc = await mongoCommon.deleteDoc(
        'userRentInfoModel',
        {
            userPhone: requestBody.userPhone,
            cabinet_id: requestBody.cabinet_id,
            box_no: requestBody.box_no
        }
    );
    if (deleteDoc.length === 0){
        res.send(common.responseObject(4000, "获取指定箱格租用信息失败", '删除集合userRentInfo中的文档失败'));
        return;
    }
    //打开箱格
    let openResult = await openBox(requestBody.cabinet_id, requestBody.box_no);
    if (openResult !== 200) {
        console.log('打开箱格失败');
        res.send(common.responseObject(4001, "租用箱格失败", '打开箱格失败'));
        return;
    }
    //释放箱格
    let releaseResult = await releaseBox(requestBody.cabinet_id, requestBody.box_no);
    if (releaseResult !== 200) {
        console.log('释放箱格失败');
        res.send(common.responseObject(4001, "停止租用箱格失败", '释放箱格失败'));
        return;
    }

    res.send(common.responseObject(200, "停止租用箱格成功", null));
    return;
}

/**
 * 获取正在租用的箱格
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function getRentBox(requestBody, res) {
    //查询userRentInfo集合
    let queryDoc = await mongoCommon.retrieveDoc(
        'userRentInfoModel',
        {
            userPhone: requestBody.userPhone
        },
        {
            _id: 0,
            __v: 0
        }
    );
    //没有找到租用信息
    if (queryDoc.length === 0) {
        res.send(common.responseObject(4000, "获取正在租用的箱格信息失败", '没有找到用户'));
        return;
    }
    //TODO更新userRentInfo集合中的每一个文档,（endTime，rentTime，cost字段）
    for (let item in queryDoc){
        let startTime = queryDoc[item].startTime;
        let endTime = new Date().toLocaleString();
        let rentTime = getRentTime(startTime, endTime);
        let cost = await getBoxCost(queryDoc[item].cabinet_id, queryDoc[item].box_no, rentTime);

        //更新userRentInfo集合,（endTime，rentTime，cost字段）
        let updateDoc = await mongoCommon.updateDoc(
            'userRentInfoModel',
            {
                userPhone: requestBody.userPhone,
                cabinet_id: queryDoc[item].cabinet_id,
                box_no: queryDoc[item].box_no
            },
            {
                endTime: endTime,
                rentTime: rentTime,
                cost: cost
            }
        );
        //更新租用信息失败
        if (updateDoc.length === 0) {
            res.send(common.responseObject(4000, "获取用户租用信息失败", '更新租用信息失败'));
            return;
        }
    }
    //查询userRentInfo集合
    let queryRentDoc = await mongoCommon.retrieveDoc(
        'userRentInfoModel',
        {
            userPhone: requestBody.userPhone
        },
        {
            _id: 0,
            __v: 0
        }
    );
    //没有找到租用信息
    if (queryRentDoc.length === 0) {
        res.send(common.responseObject(4000, "获取用户租用信息失败", '没有找到用户信息'));
        return;
    }
    //返回租用信息
    res.send(common.responseObject(200, "获取用户租用信息成功", queryRentDoc));
    return;
}

/**
 * 获取租用箱格的历史记录
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function getRentBoxLog(requestBody, res) {
    //查询userRentLog集合
    let queryDoc = await mongoCommon.retrieveDoc(
        'userRentLogModel',
        {
            userPhone: requestBody.userPhone
        },
        {
            _id: 0,
            __v: 0
        }
    );
    //没有找到租用信息
    if (queryDoc.length === 0) {
        res.send(common.responseObject(4000, "获取租用箱格的历史记录失败", '没有找到用户'));
        return;
    }
    //返回租用信息
    res.send(common.responseObject(200, "获取租用箱格的历史记录成功", queryDoc));
    return;
}

/**
 * 用户提建议
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function userSuggest(requestBody, res) {
    //增加文档到集合userSuggest
    let insertResult = await mongoCommon.createDoc('userSuggestModel', requestBody);
    if (insertResult.length === 0) {
        res.send(common.responseObject(4000, "用户提建议失败", '增加文档到集合userSuggest失败'));
        return;
    }
    res.send(common.responseObject(200, "用户提建议成功", null));
    return;
}

/**
 * 判断用户是不是第一次使用
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function getUserStatus(requestBody, res) {
    //查询集合userRentInfo
    let queryDoc = await mongoCommon.retrieveDoc(
        'userRentInfoModel',
        {
            userPhone: requestBody.userPhone
        },
        {
            _id: 0,
            __v: 0
        }
    );
    //找到租用信息
    if (queryDoc.length != 0) {
        res.send(common.responseObject(200, "获取用户使用状态成功", {firstUse:'no'}));
        return;
    }

    //查询集合userRentLogModel
    let queryLogDoc = await mongoCommon.retrieveDoc(
        'userRentLogModel',
        {
            userPhone: requestBody.userPhone
        },
        {
            _id: 0,
            __v: 0
        }
    );
    //找到租用历史信息
    if (queryLogDoc.length != 0) {
        res.send(common.responseObject(200, "获取用户使用状态成功", { firstUse: 'no' }));
        return;
    }
    //返回用户使用信息
    res.send(common.responseObject(200, "获取用户使用状态成功", { firstUse: 'yes' }));
    return;
}

/**
 * 查询箱格剩余数量
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function getSurplusBox(requestBody, res) {
    let boxType;
    let boxNum = {
        bigBoxNum: 0,
        mediumBoxNum: 0,
        smallBoxNum: 0
    };

    let boxInfo = await getBoxInfo(requestBody.cabinet_id);
    console.log('箱格信息：',boxInfo);
    if ( boxInfo.meta.code != 200 ){
        res.send(common.responseObject(200, "查询箱格剩余数量失败", boxInfo.meta.message));
        return;
    }
    //统计大中小空闲箱格的数量
    for (let item in boxInfo.body) {
        if (boxInfo.body[item].box_state === '00'){
            switch (boxInfo.body[item].box_style) {
                case '07':
                    boxNum.bigBoxNum++;
                    break;
                case '06':
                    boxNum.mediumBoxNum++;
                    break;
                case '05':
                    boxNum.smallBoxNum++;
                    break;
            
                default:
                    break;
            }
        }
    }
    console.log('箱格数量：',boxNum);
    
    res.send(common.responseObject(200, "查询箱格剩余数量成功", boxNum ));
    return;
}

/**
 * 选择箱格类型
 * 
 * @param {any} requestBody http请求body
 * @param {any} res http请求返回值
 */
async function chooseBoxType(requestBody, res) {
    let boxInfo = await getBoxInfo(requestBody.cabinet_id);
    console.log('箱格信息 ：', boxInfo);
    if (boxInfo.meta.code != 200) {
        res.send(common.responseObject(4000, "选择箱格类型失败", boxInfo.meta.message));
        return;
    }
    for(let item in boxInfo.body) {
        if ((boxInfo.body[item].box_state === '00') && (boxInfo.body[item].box_style === requestBody.box_style)) {
            let typeBoxNum = boxInfo.body[item].box_no;
            res.send(common.responseObject(200, "选择箱格类型成功", {
                        'box_no': typeBoxNum
                    }));
            return;
        }
    }


    res.send(common.responseObject(4000, "选择箱格类型失败", null));
    return;
}

/***********************************
*以上是和API直接相关的业务代码
*
*以下是辅助功能代码
************************************/

/**
 * 获取租用时间
 * 
 * @param {any} startTime 开始时间
 * @param {any} endTime 结束时间
 * @returns 租用时间
 */
function getRentTime(startTime, endTime) {
    let d1 = new Date(startTime);
    let d2 = new Date(endTime);

    rentHour = parseInt( parseInt(d2 - d1) / 1000 / 60 / 60 );
    rentMinute = parseInt( parseInt(d2 - d1) / 1000 / 60 ) - rentHour*60;
    rentSecond = parseInt( parseInt(d2 - d1) / 1000 ) - (rentMinute * 60)- (rentHour * 60 * 60);
    let rentTime = {
        'rentHour': rentHour,
        'rentMinute': rentMinute,
        'rentSecond': rentSecond,
    }

    return rentTime;
}

/**
 * 获取箱格类型
 * 
 * @param {any} cabinet_id 柜号
 * @param {any} box_no 箱格号
 * @returns 箱格类型（大中小/765）
 */
async function getBoxType(cabinet_id, box_no) {
    let boxType;
    let boxInfo = await getBoxInfo(cabinet_id);
    if (boxInfo.meta.code != 200) {
        console.log('获取箱格信息失败');
        return;
    }
    for (let item in boxInfo.body) {
        if (boxInfo.body[item].box_no = box_no) {
            boxType = boxInfo.body[item].box_style;
        }
    }

    return (boxType);
}

/**
 * 获取箱格租用费用
 * 
 * @param {any} cabinet_id 柜号
 * @param {any} box_no 箱格号
 * @param {any} rentTime 租用时间
 * @returns 箱格租用价格
 */
async function getBoxCost(cabinet_id, box_no, rentTime) {
    let rentPrice = await getBoxRentPrice(cabinet_id, box_no);
    let boxCost = rentPrice * ( rentTime.rentHour + 1 );  //不满1小时，按1小时计算

    return boxCost;
}

/**
 * 获取租用箱格单价
 * 
 * @param {any} cabinet_id 柜号
 * @param {any} box_no 箱格号
 * @returns 箱格租用单价
 */
async function getBoxRentPrice(cabinet_id, box_no) {
    let rentPrice;
    //获取箱格类型
    let boxType = await getBoxType(cabinet_id, box_no);
    //查询集合cabinetPrice，获取类型单价
    let cabinetPriceDoc = await mongoCommon.retrieveDoc(
        'cabinetPriceModel',
        {
            cabinet_id: cabinet_id
        },
        {
            _id: 0,
            __v: 0
        }
    );
    switch (boxType) {
        case '05':
            rentPrice = cabinetPriceDoc[0].smallBox;
            break;
        case '06':
            rentPrice = cabinetPriceDoc[0].mediumBox;
            break;
        case '07':
            rentPrice = cabinetPriceDoc[0].bigBox;
            break;
    
        default:
            break;
    }

    return rentPrice;
}

/**
 * 获取箱格位置信息
 * 
 * @param {any} cabinet_id 柜号
 * @returns 箱格位置：地址，经度，纬度
 */
function getBoxLocation(cabinet_id) {
    let options = {
        url: yuLeiAPI.baseUrl + 'index.php/RestAPI/Cabinet/getCabinetAddress',
        method: 'POST',
        json: true,
        headers: {
            'user': cabinet_id,
            'companyname': yuLeiAPI.companyname,
            'password': yuLeiAPI.password,
            'Content-Type': 'application/json'
        },
        body: {
            'cabinet_id': cabinet_id
        }
    }

    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                reject(error);
            }
            let location = {
                address: response.body.body.address,
                longitude: response.body.body.baidu_lon,
                latitude: response.body.body.baidu_lat
            }; 
            resolve(location);
        });
    });
} 

/**
 * 获取箱格是否被占用
 * 
 * @param {any} cabinet_id 柜号
 * @param {any} box_no 箱格号
 * @returns 箱格占用情况  02-占用； 00-空闲
 */
async function getBoxState(cabinet_id, box_no) {
    let boxState;
    let boxInfo = await getBoxInfo(cabinet_id);
    if (boxInfo.meta.code != 200) {
        console.log('获取箱格信息失败');
        return;
    }
    for(let item in boxInfo.body){
        if ( boxInfo.body[item].box_no = box_no  ) {
            boxState = boxInfo.body[item].box_state;
        }
    }
    return (boxState);
}


/**
 * 打开箱格
 * 
 * @param {any} cabinet_id 柜号
 * @param {any} box_no 箱格号
 * @returns 打开结果
 */
function openBox(cabinet_id, box_no) {
    let options = {
        url: yuLeiAPI.baseUrl + 'RestAPI/BasicBox/openBox',
        method: 'POST',
        json: true,
        headers: {
            'user': cabinet_id,
            'companyname': yuLeiAPI.companyname,
            'password': yuLeiAPI.password,
            'Content-Type': 'application/json'
        },
        body: {
            'cabinet_id': cabinet_id,
            'box_no':box_no
        }
    }

    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                reject(error);
            }
            let openResult = response.body.meta.code;
            resolve (openResult);
        });
    });
} 


/**
 * 获取所有箱子信息
 * 
 * @param {any} cabinet_id 柜号
 * @returns 获取箱格信息结果
 */
function getBoxInfo(cabinet_id) {
    let options = {
        url: yuLeiAPI.baseUrl + 'RestAPI/BasicBox/BoxMesApi',
        method: 'POST',
        json: true,
        headers: {
            'user': cabinet_id,
            'companyname': yuLeiAPI.companyname,
            'password': yuLeiAPI.password,
            'Content-Type': 'application/json'
        },
        body: {
            'cabinet_id': cabinet_id
        }
    }

    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                reject(error);
            }
            let boxInfo = response.body;
            resolve(boxInfo);
        });
    });
}

/**
 * 占用箱格
 * 
 * @param {any} cabinet_id 柜号
 * @param {any} box_no 箱格号
 * @returns 打开结果
 */
function occupyBox(cabinet_id, box_no) {
    let options = {
        url: yuLeiAPI.baseUrl + 'RestAPI/BasicBox/batchOccupyBox',
        method: 'POST',
        json: true,
        headers: {
            'user': cabinet_id,
            'companyname': yuLeiAPI.companyname,
            'password': yuLeiAPI.password,
            'Content-Type': 'application/json'
        },
        body: {
            "cabinet_id": cabinet_id,
            "box_occupy_list": [
                {
                    "box_no": box_no,
                    "once_box": "1",
                    "receiver_phone": "13570508312",
                    "sender_phone": "13570508312",
                    "rent_time": "2088-03-26 11:00:00",
                    "next_pay_time": "2088-03-27 00:00:00",
                    "t_package_no": "111111111111111111"
                }
            ]
        }
    };

    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                reject(error);
            }
            let occupyResult = response.body.meta.code;
            resolve(occupyResult);
        });
    });
} 

/**
 * 释放箱格
 * 
 * @param {any} cabinet_id 柜号
 * @param {any} box_no 箱格号
 * @returns 打开结果
 */
function releaseBox(cabinet_id, box_no) {
    let options = {
        url: yuLeiAPI.baseUrl + 'RestAPI/BasicBox/recoveryBox',
        method: 'POST',
        json: true,
        headers: {
            'user': cabinet_id,
            'companyname': yuLeiAPI.companyname,
            'password': yuLeiAPI.password,
            'Content-Type': 'application/json'
        },
        body: {
            'cabinet_id': cabinet_id,
            'box_no': box_no
        }
    }

    return new Promise(function (resolve, reject) {
        request(options, function (error, response, body) {
            if (error) {
                reject(error);
            }
            let releaseResult = response.body.meta.code;
            resolve(releaseResult);
        });
    });
} 






module.exports = {
    setCabinetPrice: setCabinetPrice,
    getCabinetPrice: getCabinetPrice,
    setDepositPrice: setDepositPrice,
    getDepositPrice: getDepositPrice,
    payDeposit: payDeposit,
    redundDeposit: redundDeposit,
    queryDeposit: queryDeposit,
    rentCabinet: rentCabinet,
    getRentInfo: getRentInfo,
    stopRentCabinet: stopRentCabinet,
    getRentBox: getRentBox,
    getRentBoxLog: getRentBoxLog,
    userSuggest: userSuggest,
    getUserStatus: getUserStatus,
    getSurplusBox: getSurplusBox,
    chooseBoxType: chooseBoxType,
    
    openBox: openBox
}
