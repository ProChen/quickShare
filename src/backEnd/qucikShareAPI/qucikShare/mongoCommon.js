let request = require('request');
let mongoose = require("mongoose");

const mongoConfig = require('../config.js').mongoConfig

//从配置文件生成mongoDB访问地址
let mongoAddress = 'mongodb://' + mongoConfig.user + ':' + mongoConfig.password + '@' + mongoConfig.address + ':' + mongoConfig.port + '/' + mongoConfig.database;


/**
 * 创建model 信息分享
 * 集合 shareData
 */
    let entitySchema = mongoose.Schema({
        data: {
            type: String,
            required: true
        },
        code: {
            type: Number,
            required: true
        }
    });
    let shareDataModel = mongoose.model('shareData', entitySchema, 'shareData');

/********************************************
 * 以上为集合和model的定义,以后每增加一个集合，就要修改CURD4个函数，加入对应的内容(switch里面修改)
 * 创建好的集合model有：
 * shareDataModel
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
                case 'shareDataModel':
                    entityDoc = new shareDataModel(mongoDoc);
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
                case 'shareDataModel':
                    shareDataModel.deleteMany(conditionDoc)
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
                case 'shareDataModel':
                    shareDataModel.find(conditionDoc, returnDoc)
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
                case 'shareDataModel':
                    shareDataModel.updateMany(conditionDoc, updateDoc, function (err, doc) {
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
