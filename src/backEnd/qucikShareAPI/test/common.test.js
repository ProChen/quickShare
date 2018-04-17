let expect = require('chai').expect;

const common = require('../checkCabinet/common.js')


describe('头部校验测试-同步', () => {
    let requestHead = {
        password: null
    };
    let checkResult;

    it('头部校验失败', () => {
        requestHead = {
            password: '123'
        }
        checkResult = common.checkHead(requestHead);
        expect(checkResult.pass).to.be.equal(false);
    });

    it('头部校验成功', () => {
        requestHead = {
            password: '95951a18-5a9e-da26-ad13-64dcc6e11208'
        }
        checkResult = common.checkHead(requestHead);
        expect(checkResult.pass).to.be.equal(true);
    });
});

describe('http请求参数校验', () => {
    let checkList;
    let reqBody;
    let result;

    it('http请求参数校验失败', () => {
        checkList = {
            phone_no: ["string", true]
        };
        reqBody = {
            phone_no: 13570508312
        };
        result = common.checkParam(checkList, reqBody);
        expect(result.pass).to.be.equal(false);
    });

    it('http请求参数校验成功', () => {
        checkList = {
            phone_no: ["string", true]
        };
        reqBody = {
            phone_no: '13570508312'
        };
        result = common.checkParam(checkList, reqBody);
        expect(result.pass).to.be.equal(true);
    });
    
});
