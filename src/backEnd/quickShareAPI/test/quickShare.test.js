let expect = require('chai').expect;

const quickShare = require('../quickShare/quickShareBusiness.js')

describe('开门测试 - 异步', () => {
    let result;
    it('开门成功', async () => {
        result = await quickShareBusiness.openBox('111129', 1);
        console.log('result: ',result);
        expect(result).to.be.equal(200);
    });
    
});