let expect = require('chai').expect;

const checkBusiness = require('../checkCabinet/checkBusiness.js')


describe('开门测试 - 异步', () => {
    let result;
    it('开门成功', async () => {
        result = await checkBusiness.openBox('111129', 1);
        console.log('result: ',result);
        expect(result).to.be.equal(200);
    });
    
});