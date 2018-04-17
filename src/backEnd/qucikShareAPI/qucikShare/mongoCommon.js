let request = require('request');
let mongoose = require("mongoose");

const mongoConfig = require('../config.js').mongoConfig

//从配置文件生成mongoDB访问地址
let mongoAddress = 'mongodb://' + mongoConfig.user + ':' + mongoConfig.password + '@' + mongoConfig.address + ':' + mongoConfig.port + '/' + mongoConfig.database;


/**
 * 创建model 用户信息
 * 集合 userInfo
 */
    let entitySchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    });
    let userInfoModel = mongoose.model('userInfo', entitySchema, 'userInfo');


/**
 * 创建model 箱格租用单价
 * 集合 cabinetPrice
 */
    entitySchema = mongoose.Schema({
        cabinet_id: {
            type: String,
            required: true
        },
        bigBox: {
            type: Number,
            required: true
        },
        mediumBox: {
            type: Number,
            required: true
        },
        smallBox: {
            type: Number,
            required: true
        }
    });
    let cabinetPriceModel = mongoose.model('cabinetPrice', entitySchema, 'cabinetPrice');


/**
 * 创建model 柜子租用押金
 * 集合 cabinetDeposit
 */
    entitySchema = mongoose.Schema({
        cabinet_id: {
            type: String,
            required: true
        },
        deposit: {
            type: Number,
            required: true
        }
    });
    let cabinetDepositModel = mongoose.model('cabinetDeposit', entitySchema, 'cabinetDeposit');

/**
 * 创建model 用户押金余额
 * 集合 userDeposit
 */
    entitySchema = mongoose.Schema({
        userPhone: {
            type: String,
            required: true
        },
        deposit: {
            type: Number,
            required: true
        }
    });
    let userDepositModel = mongoose.model('userDeposit', entitySchema, 'userDeposit');

/**
 * 创建model 用户租用信息
 * 集合 userRentInfo
 */
    entitySchema = mongoose.Schema({
        rentTime: {
            rentHour: {
                type: Number,
                required: true
            },
            rentMinute: {
                type: Number,
                required: true
            },
            rentSecond: {
                type: Number,
                required: true
            }
        },
        location: {
            address: {
                type: String,
                required: true
            },
            longitude: {
                type: String,
                required: true
            },
            latitude: {
                type: String,
                required: true
            }
        },
        userPhone: {
            type: String,
            required: true
        },
        cabinet_id: {
            type: String,
            required: true
        },
        box_no: {
            type: Number,
            required: true
        },
        box_style: {
            type: String,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true
        }
    });
    let userRentInfoModel = mongoose.model('userRentInfo', entitySchema, 'userRentInfo');

/**
 * 创建model 用户租用信息
 * 集合 userRentLog
 */
    entitySchema = mongoose.Schema({
        rentTime: {
            rentHour: {
                type: Number,
                required: true
            },
            rentMinute: {
                type: Number,
                required: true
            },
            rentSecond: {
                type: Number,
                required: true
            }
        },
        location: {
            address: {
                type: String,
                required: true
            },
            longitude: {
                type: String,
                required: true
            },
            latitude: {
                type: String,
                required: true
            }
        },
        userPhone: {
            type: String,
            required: true
        },
        cabinet_id: {
            type: String,
            required: true
        },
        box_no: {
            type: Number,
            required: true
        },
        box_style: {
            type: String,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true
        }
    });
    let userRentLogModel = mongoose.model('userRentLog', entitySchema, 'userRentLog');

/**
 * 创建model 用户押金余额
 * 集合 userSuggest
 */
    entitySchema = mongoose.Schema({
        userPhone: {
            type: String,
            required: true
        },
        userSuggestion: {
            type: String,
            required: true
        }
    });
    let userSuggestModel = mongoose.model('userSuggest', entitySchema, 'userSuggest');


/********************************************
 * 以上为集合和model的定义,以后每增加一个集合，就要修改CURD4个函数，加入对应的内容(switch里面修改)
 * 创建好的集合model有：
 * userInfoModel
 * cabinetPriceModel
 * cabinetDepositModel
 * userDepositModel
 * userRentInfoModel
 * userRentLogModel
 * userSuggestModel
 * 
 * 以下数据库CURD操作
 ******************************************/

/**
 * 插入数据到指定集合中
 * 
 * @param {any} mongoModel model选择
 * @param {any} mongoDoc 信息文档
 */
function createDoc(mongoModel,mongoDoc) {
    let entityDoc;
    return new Promise(function (resolve, reject) {
        mongoose.connect(mongoAddress, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("mongodb geeku connect.");
            //model 选择
            switch (mongoModel) {
                case 'userInfoModel':
                    entityDoc = new userInfoModel(mongoDoc);
                    entityDoc.save(function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        console.log('插入数据成功');
                        resolve(doc);
                    })
                    break;
                case 'cabinetPriceModel':
                    entityDoc = new cabinetPriceModel(mongoDoc);
                    entityDoc.save(function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        console.log('插入数据成功');
                        resolve(doc);
                    })
                    break;
                case 'cabinetDepositModel':
                    entityDoc = new cabinetDepositModel(mongoDoc);
                    entityDoc.save(function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        console.log('插入数据成功');
                        resolve(doc);
                    })
                    break;
                case 'userDepositModel':
                    entityDoc = new userDepositModel(mongoDoc);
                    entityDoc.save(function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        console.log('插入数据成功');
                        resolve(doc);
                    })
                    break;
                case 'userRentInfoModel':
                    entityDoc = new userRentInfoModel(mongoDoc);
                    entityDoc.save(function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        console.log('插入数据成功');
                        resolve(doc);
                    })
                    break;
                case 'userRentLogModel':
                    entityDoc = new userRentLogModel(mongoDoc);
                    entityDoc.save(function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        console.log('插入数据成功');
                        resolve(doc);
                    })
                    break;
                case 'userSuggestModel':
                    entityDoc = new userSuggestModel(mongoDoc);
                    entityDoc.save(function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        console.log('插入数据成功');
                        resolve(doc);
                    })
                    break;

                default:
                    break;
            }

        });
    });
}

/**
 * 删除指定集合中的数据
 * 
 * @param {any} mongoModel model选择
 * @param {any} conditionDoc 条件文档
 */
function deleteDoc(mongoModel, conditionDoc) {
    return new Promise(function (resolve, reject) {
        mongoose.connect(mongoAddress, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("mongodb geeku connect.");
            //model 选择
            switch (mongoModel) {
                case 'userInfoModel':
                    userInfoModel.deleteMany(conditionDoc)
                        .exec((err, doc) => {
                            if (err) {
                                reject(err);
                            }
                            console.log('删除数据成功');
                            resolve(doc);
                        });
                    break;
                case 'cabinetPriceModel':
                    cabinetPriceModel.deleteMany(conditionDoc)
                        .exec((err, doc) => {
                            if (err) {
                                reject(err);
                            }
                            console.log('删除数据成功');
                            resolve(doc);
                        });
                    break;
                case 'cabinetDepositModel':
                    cabinetDepositModel.deleteMany(conditionDoc)
                        .exec((err, doc) => {
                            if (err) {
                                reject(err);
                            }
                            console.log('删除数据成功');
                            resolve(doc);
                        });
                    break;
                case 'userDepositModel':
                    userDepositModel.deleteMany(conditionDoc)
                        .exec((err, doc) => {
                            if (err) {
                                reject(err);
                            }
                            console.log('删除数据成功');
                            resolve(doc);
                        });
                    break;
                case 'userRentInfoModel':
                    userRentInfoModel.deleteMany(conditionDoc)
                        .exec((err, doc) => {
                            if (err) {
                                reject(err);
                            }
                            console.log('删除数据成功');
                            resolve(doc);
                        });
                    break;
                case 'userRentLogModel':
                    userRentLogModel.deleteMany(conditionDoc)
                        .exec((err, doc) => {
                            if (err) {
                                reject(err);
                            }
                            console.log('删除数据成功');
                            resolve(doc);
                        });
                    break;
                case 'userSuggestModel':
                    userSuggestModel.deleteMany(conditionDoc)
                        .exec((err, doc) => {
                            if (err) {
                                reject(err);
                            }
                            console.log('删除数据成功');
                            resolve(doc);
                        });
                    break;

                default:
                    break;
            }

        });
    });
}

/**
 * 查找指定集合中的数据
 * 
 * @param {any} mongoModel model选择
 * @param {any} conditionDoc 条件文档
 * @param {any} returnDoc 返回文档选择
 */
function retrieveDoc(mongoModel, conditionDoc, returnDoc) {
    return new Promise(function (resolve, reject) {
        mongoose.connect(mongoAddress, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("mongodb geeku connect.");
            //model选择
            console.log('model选择: ', mongoModel);
            switch (mongoModel) {
                case 'userInfoModel':
                    userInfoModel.find(conditionDoc, returnDoc)
                        .exec((err, doc) => {
                            if (err) {
                                reject(err);
                            }
                            console.log('查找数据成功');
                            resolve(doc);
                        });
                    break;
                case 'cabinetPriceModel':
                    cabinetPriceModel.find(conditionDoc, returnDoc)
                        .exec((err, doc) => {
                            if (err) {
                                reject(err);
                            }
                            console.log('查找数据成功');
                            resolve(doc);
                        });
                    break;
                case 'cabinetDepositModel':
                    cabinetDepositModel.find(conditionDoc, returnDoc)
                        .exec((err, doc) => {
                            if (err) {
                                reject(err);
                            }
                            console.log('查找数据成功');
                            resolve(doc);
                        });
                    break;
                case 'userDepositModel':
                    userDepositModel.find(conditionDoc, returnDoc)
                        .exec((err, doc) => {
                            if (err) {
                                reject(err);
                            }
                            console.log('查找数据成功');
                            resolve(doc);
                        });
                    break;
                case 'userRentInfoModel':
                    userRentInfoModel.find(conditionDoc, returnDoc)
                        .exec((err, doc) => {
                            if (err) {
                                reject(err);
                            }
                            console.log('查找数据成功');
                            resolve(doc);
                        });
                    break;
                case 'userRentLogModel':
                    userRentLogModel.find(conditionDoc, returnDoc)
                        .exec((err, doc) => {
                            if (err) {
                                reject(err);
                            }
                            console.log('查找数据成功');
                            resolve(doc);
                        });
                    break;
                case 'userSuggestModel':
                    userSuggestModel.find(conditionDoc, returnDoc)
                        .exec((err, doc) => {
                            if (err) {
                                reject(err);
                            }
                            console.log('查找数据成功');
                            resolve(doc);
                        });
                    break;
            
                default:
                    break;
            }

            
        });
    });
}

/**
 * 更新指定集合中的数据
 * 
 * @param {any} mongoModel model选择
 * @param {any} conditionDoc 条件文档
 * @param {any} updateDoc 更新文档
 */
function updateDoc(mongoModel, conditionDoc,updateDoc) {
    return new Promise(function (resolve, reject) {
        mongoose.connect(mongoAddress, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("mongodb geeku connect.");
            //model 选择
            switch (mongoModel) {
                case 'userInfoModel':
                    userInfoModel.updateMany(conditionDoc, updateDoc, function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        console.log('更新数据成功');
                        resolve(doc);
                    });
                    break;
                case 'cabinetPriceModel':
                    cabinetPriceModel.updateMany(conditionDoc, updateDoc, function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        console.log('更新数据成功');
                        resolve(doc);
                    });
                    break;
                case 'cabinetDepositModel':
                    cabinetDepositModel.updateMany(conditionDoc, updateDoc, function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        console.log('更新数据成功');
                        resolve(doc);
                    });
                    break;
                case 'userDepositModel':
                    userDepositModel.updateMany(conditionDoc, updateDoc, function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        console.log('更新数据成功');
                        resolve(doc);
                    });
                    break;
                case 'userRentInfoModel':
                    userRentInfoModel.updateMany(conditionDoc, updateDoc, function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        console.log('更新数据成功');
                        resolve(doc);
                    });
                    break;
                case 'userRentLogModel':
                    userRentLogModel.updateMany(conditionDoc, updateDoc, function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        console.log('更新数据成功');
                        resolve(doc);
                    });
                    break;
                case 'userSuggestModel':
                    userSuggestModel.updateMany(conditionDoc, updateDoc, function (err, doc) {
                        if (err) {
                            reject(err);
                        }
                        console.log('更新数据成功');
                        resolve(doc);
                    });
                    break;

                default:
                    break;
            }
        });
    });
}


module.exports = {
    createDoc: createDoc,
    deleteDoc: deleteDoc,
    retrieveDoc: retrieveDoc,
    updateDoc: updateDoc
}
