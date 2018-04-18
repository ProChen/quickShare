/**
 * 共用常量
 */
const common = {

    /**
     * 返回一个标准的网络响应,用户返回网络请求 
     * 
     * @param {number} code 要返回元信息中的状态码
     * @param {string} message 要返回元信息中的信息
     * @param {object} body 要返回的数据
     * @example 
     * {
     *  meta:{
     *    code:200,
     *    message:"申请成功"
     *  },
     *  body:{
     *    data:"123"
     *  }
     * }
     */
    responseObject: function (code, message, body) {
        return {
            meta: {
                code: code,
                message: message
            },
            body: body
        };
    },


    /**
     * 头部校验
     * @param {object} requestHead http请求头部 
     * 
     * @return {object} result - 校验结果
     * 
     */
    checkHead:function checkHead(requestHead) {
        let result = {
            pass:false
        };
        if (requestHead.password === '95951a18-5a9e-da26-ad13-64dcc6e11208') {
            result.pass = true;
        }

        return result;
    },

    /**
     * 用于对外函数的参数检查,返回对象，非必填参数可以加undefined。不支持嵌套。
     * @param {object} checkList - 所要检查的具体要求
     * @param {object} input - 要被检查的对象
     * @return {object} result - result.pass为true时表明没错,result.err_list数组带错误信息。
     * 
     * @example
     *   //参数检查
     *  let check = common.checkParam({
     *   company_name:["string",true],
     *   device_id:["string",true],
     *   cmd:["string",true],
     *   task:["objcet",true]
     *  },req.body);
     *
     * if(! check.pass){
     *  res.send(common.responseObject(400,"参数有误",check.errMsg));
     *  return ;
     * }
     */
    checkParam: function checkParam(checkList, input) {
        let result = {
            pass: true,
            errMsg: {
                err_list: []
            }
        };
        for (let prop in checkList) {
            if (checkList[prop][1]) { //必填属性
                if (typeof input[prop] !== checkList[prop][0]) {
                    result.pass = false;
                    result.errMsg.err_list.push("" + prop + " is " + typeof input[prop] + ",should be " + checkList[prop][0]);
                }

            } else { //非必填属性也可以是undefined
                if ((typeof input[prop] !== checkList[prop][0]) && (typeof input[prop] !== "undefined")) {
                    result.pass = false;
                    result.errMsg.err_list.push("" + prop + " is " + typeof input[prop] + ",should be " + checkList[prop][0]);
                }
            }
        }
        return result;
    },
    /**
     * 为回调函数添加默认静态处理,即当callback不为function类型时，为其添加空函数
     * 
     * @param {function} callback 
     * @returns function
     * @example callback=common.setCallback(callback);
     */
    setCallback: function setCallback(callback) {
        return typeof callback === "function" ?
            callback :
            function doNothing() {};
    }
};

module.exports = common;