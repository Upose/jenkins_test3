/*是否用户*/
export function isvalidUsername(str) {
    const valid_map = ['admin', 'editor']
    return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}
/**
 * var Level2Regex = new Regex(@"
    (?=.*[0-9])                     #必须包含数字
    (?=.*[a-z])                     #必须包含小写字母
    (?=.*[A-Z])                     #必须包含大写字母
    (?=([\x21-\x7e]+)[^a-zA-Z0-9])  #必须包含特殊符号
    .{8,30}                         #至少8个字符，最多30个字符
", RegexOptions.Multiline | RegexOptions.IgnorePatternWhitespace);
var Level1Regex = new Regex(@"
    (?=.*[0-9])                     #必须包含数字
    (?=.*[a-z])                     #必须包含小写字母
    (?=.*[A-Z])                     #必须包含大写字母
    .{8,30}                         #至少8个字符，最多30个字符
", RegexOptions.Multiline | RegexOptions.IgnorePatternWhitespace);
var Level0Regex = new Regex(@"
    (?=.*[0-9])                     #必须包含数字
    (?=.*[a-zA-Z])                  #必须包含字母
    .{6,30}                         #至少6个字符，最多30个字符
", RegexOptions.Multiline | RegexOptions.IgnorePatternWhitespace);
 * */
export function validatePassword(password, level = 0) {
    if (level == 0) {
        let reg = /\d{6,16}/;
        return reg.exec(password);
    } else if (level == 1) {
        let reg = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,16}/;
        return reg.exec(password);
    } else {
        let reg = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=([\x21-\x7e]+)[^a-zA-Z0-9]).{8,16}/;
        return reg.exec(password);
    }
}
export function validatePasswordMsg(level = 0) {
    let v_pass = {
        0: {
            reg: /.{6,16}/,
            msg: '6至16个字符'
        },
        1: {
            reg: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,16}/,
            msg: '6至16个字符;必须包含小写字母、大写字母、数字'
        },
        2: {
            reg: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=([\x21-\x7e]+)[^a-zA-Z0-9]).{8,16}/,
            msg: '8至16个字符;必须包含小写字母、大写字母、数字、特殊符号（. @$!%*#_~?&^）'
        }
    }
    return v_pass[level];
}

/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
}

import httpHelp from "@/assets/public/js/http";

var customValidate = {
    //非负数数字(最多两位小数) 金额、重量等
    amount: "^\\d+(\\.{0,1}\\d{1,2}){0,1}$",
    //非负数数字(最多四位小数) 金额、重量等
    amount4: "^\\d+(\\.{0,1}\\d{1,4}){0,1}$",
    //非负数数字(最多六位小数) 金额、重量等
    amount6: "^\\d+(\\.{0,1}\\d{1,6}){0,1}$",
    //非负数且不能为0的数字(最多两位小数) 金额、重量等
    notZeroAmount: "^(?!(0[0-9]{0,}$))[0-9]{1,}(\\.{0,1}\\d{1,2}){0,1}$",
    //带负数数字(最多两位小数) 金额、重量等
    minusAmount: "^-?\\d+(\\.{0,1}\\d{1,2}){0,1}$",
    //带负数数字(最多两位小数) 金额、重量等
    minusAmount6: "^-?\\d+(\\.{0,1}\\d{1,6}){0,1}$",
    //大于零数字(最多三位小数) 体积、长度、宽度、高度等
    // valume: "^\\d+(\\.{0,1}\\d{1,3}){0,1}$",
    valume: "^(?!(0[0-9]{0,}$))[0-9]{1,}(\\.{0,1}\\d{1,3}){0,1}$",
    //大于零数字(最多6位小数)
    valume6: "^(?!(0[0-9]{0,}$))[0-9]{1,}(\\.{0,1}\\d{1,6}){0,1}$",
    //大于零数字(最多10位小数)
    valume10: "^(?!(0[0-9]{0,}$))[0-9]{1,}(\\.{0,1}\\d{1,10}){0,1}$",
    //整数正则
    interger: "\\d*\\.{0}$",
    //非零正整数
    notZeroInterger: "^[1-9]+[0-9]*$",
    //零正整数
    zeroInterger: "^[0-9]*$",
    //域名正则(格式:www.xxx.xxx)
    domain: "^www.[^.]+.\\w+$",
    //匹配邮箱地址
    email: "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",
    //匹配手机号码 必须11位数字
    // mobile: "^(1[3-9][0-9])\\d{8}$",
    mobile: "^[0-9\\-\\+\\(\\)]*$",
    //匹配身份证
    idCard: "^((\d{18})|([0-9x]{18})|([0-9X]{18}))$",

    //验证正则表达式
    validatePattern: function (rule, value, callback) {
        if (value == "" || value == null || value == undefined) {
            return callback();
        }
        var reg = new RegExp(rule.pattern);
        if (reg.test(value)) {
            return callback();
        } else {
            return callback(new Error(rule.message));
        }
    },
    //远程验证
    ajax(rule, value, callback) {
        httpHelp.postJson(rule.url, rule.data)
            .then(response => {
                if (response.data.isSuccess) {
                    return callback();
                }
                if (rule.message) {
                    return callback(new Error(rule.message));
                }
                callback(new Error(response.data.message));
            }).catch(e => {
                callback(new Error(e.response ? e.response.data.message : e.message));
            });
    },
    //范围验证
    range(rule, value, callback) {
        if (rule.min != undefined) {
            if (parseFloat(value) <= rule.min) {
                return callback(new Error(rule.message));
            }
        }
        if (rule.max) {
            if (parseFloat(value) > rule.max) {
                return callback(new Error(rule.message));
            }
        }
        return callback();
    },
    //范围验证
    rangeAll(rule, value, callback) {
        if (rule.min != undefined) {
            if (parseFloat(value) < rule.min) {
                return callback(new Error(rule.message));
            }
        }
        if (rule.max) {
            if (parseFloat(value) > rule.max) {
                return callback(new Error(rule.message));
            }
        }
        return callback();
    },
    baseValid(rule, value, callback, customValid) {
        if (value === "" || value == null || value == undefined) {
            return callback();
        }
        if (customValid()) {
            return callback();
        } else {
            return callback(new Error(rule.message));
        }
    },
    //大于验证
    gt(rule, value, callback) {
        customValidate.baseValid(rule, value, callback, () => {
            return value * 1 > rule.value * 1;
        });
    },

    //小于于验证
    lt(rule, value, callback) {
        customValidate.baseValid(rule, value, callback, () => {
            return value * 1 < rule.value * 1;
        });
    },
    //大于等于
    gteq(rule, value, callback) {
        customValidate.baseValid(rule, value, callback, () => {
            return value * 1 >= rule.value * 1;
        });
    },
    //小于等于
    lteq(rule, value, callback) {
        customValidate.baseValid(rule, value, callback, () => {
            var _v = rule.value;
            if (typeof rule.value === 'function') {
                _v = rule.value();
            }
            return value * 1 <= _v * 1;
        });
    },

    validArray(arr, ruleConfig) {
        var arrayRule = ruleConfig.arrayRule;
        var hasArr = this.hasValue(arr) && arr.length > 0;
        if (arrayRule != null || arrayRule != undefined) {
            if (arrayRule.required) {
                if (!hasArr) {
                    return {
                        valid: false,
                        message: arrayRule.requiredMessage
                    }
                }
            }
        }
        if (!hasArr) {
            return {
                valid: true,
            }
        }
        var rule = ruleConfig.rule;
        var validFail = ruleConfig.validFail;
        var hasValidFail = this.hasValue(validFail);

        var hasRule = this.hasValue(rule);
        var allValid = ruleConfig.allValid;
        var hasAllValid = this.hasValue(allValid) && this.hasValue(allValid.fieldConfig);
        var fields = [];
        if (hasAllValid) {
            for (const key in allValid.fieldConfig) {
                fields.push(key);
            }
        }
        for (let index = 0; index < arr.length; index++) {
            const item = arr[index];
            if (hasRule) {
                for (const key in rule) {
                    var v = item[key];
                    var config = rule[key];
                    var hasV = this.hasValue(v);
                    if (config.required) {
                        if (!hasV) {
                            if (hasValidFail) {
                                validFail(item);
                            }
                            return {
                                valid: false,
                                message: config.requiredMessage || (key + '必填')
                            }
                        }
                    }
                    if (hasV && (config.validCalls || []).length > 0) {
                        for (let _i = 0; _i < config.validCalls.length; _i++) {
                            const callConfig = config.validCalls[_i];
                            //验证回调
                            var result = callConfig.call(v, item, key);
                            if (!result.valid) {
                                if (hasValidFail) {
                                    validFail(item);
                                }
                                return result;
                            }
                        }
                    }
                }
            }
            if (hasAllValid) {
                for (let j = 0; j < fields.length; j++) {
                    const key = fields[j];
                    const v = item[key];
                    for (let n = 0; n < allValid.validCalls.length; n++) {
                        const callConfig = allValid.validCalls[n];
                        var result = callConfig.call(v, item, key, allValid.fieldConfig[key]);
                        if (!result.valid) {
                            return result;
                        }
                    }
                }
            }
        }
        return {
            valid: true
        }
    },
    hasValue(value) {
        return !(value === '' || value == null || value == undefined);
    },

}

export default customValidate;