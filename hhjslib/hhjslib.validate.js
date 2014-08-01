
/**
 * @version			$Id$
 * @create 			2012-8-30 16:04:14 By xjiujiu
 * @package 		hhjslib
 * @Copyright 		Copyright (c) 2011-2012 http://www.xjiujiu.com.All right reserved
 * HongJuZi Framework
 */
 (function($) {

     /**
      * HHJsLib的验证基础库 
      * 
      * 常用的空值检测，长度判断，邮箱验证等 
      * 
      * @author xjiujiu <xjiujiu@foxmail.com>
      * @package hhjslib
      * @since HHJsLib 1.0.0
      */
	 var Validate     = {
        
        /**
         * 验证当前对象是否为空 
         * 
         * 包括对空对象，空对象的检测 
         * <pre>
         *      HHJsLib.isEmptyById('');  //true | false
         *      HHJsLib.isEmptyById('', '名称');  //异常提示
         *      HHJsLib.isEmptyById('', '名称', '我是默认的');    //异常提示
         * </pre>
         * 
         * @author 			xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} value 需要检测的值
         * @param  {String} name 当前对象的名称
         * @param  {Mixed} def 默认值
         * @return {Object} HHJsLib 对象 | Boolean 是否为空
         * @throws Exception
         */
        isEmpty: function(value, name, def) {
        	try {
        		if(typeof value == 'undefined' || value == '') {
		            throw name + HHJsLib.lang('CAN_NOT_EMPTY');
	            }
	            if(arguments.length == 3 && value == def) {
		            throw name + HHJsLib.lang('CAN_NOT_EMPTY');
	            }
	            return arguments.length == 1 ? false : this;
        	} catch(e) {
	        	if(arguments.length == 1) {
		        	return true;
	        	}
        		throw e;
        	}

            return this;
        },

        /**
         * 查看DOM元素的值是否为空
         * 
         * <pre>
         *      HHJsLib.isEmptyById('tag', '名称', '我是默认的');
         *      HHJsLib.isEmptyById('.className', '名称', '我是默认的');
         *      HHJsLib.isEmptyById('#domId', '名称', '我是默认的');
         * </pre>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} target 需要操作的DOM
         * @param  {String} name 当前的dom的元素名称
         * @param  {Mixed} def 里面的默认值
         * @return {Object} HHJsLib对象 | Boolean 是否为空
         * @throws Exception 
         */
        isEmptyByDom: function(target, name, def) {
            if('undefined' == typeof(def) && $(target).attr('data-def')) {
                def = $(target).attr('data-def');
            }
            return this._isValidateByDom(this.isEmpty, target, [name, def]);
        },
        
        /**
         * 验证字符串长度 
         * 
         * 对当前串进行长度验证 ,
         * <pre>
         *    HHJsLib.isStrLen("xjiujiu", "用户名", 1, 20); //ok
         *    HHJsLib.isStrLen("", "用户名", 1, 20); //Exception
         * </pre>
         * 
         * @author 			xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} value 需要验证的字串
         * @param  {String} name 当前字串的名称
         * @param  int min 最少长度
         * @param  int max 最大长度
         * @return {Object} HHJsLib对象 | Boolean 是否为空
         * @throws Exception
         */
        isStrLen: function(value, name, min, max) {
            var lenInfo     = 'undefined' === typeof(max) ? min + '个字符以上' : min + '～' + max;
            if(!value || value.length < min || max < value.length) {
                throw name + HHJsLib.lang('LEN_INAVALIBLE') + lenInfo + "。";
            }
            
            return this;
        },

        /**
         * 通过文档元素的ID来验证当前值的长度是否合法 
         * 
         * <pre>
         *      HHJsLib.isStrLenByDom("domId", "名称", 2, 10);
         * </pre>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} target 需要操作的DOM
         * @param  {String} name 当前元素的名称
         * @param  int min 最少值
         * @param  int max 最大值
         * @return {Object} HHJsLib | Boolean 是否符合要求
         * @throws Exception 
         */
        isStrLenByDom: function(target, name, min, max) {
            return this._isValidateByDom(this.isStrLen, target, [name, min, max]);
        },

        /**
         * 验证当前的邮箱地址是否合法 
         * 
         * 对已知的邮箱地址进行合法性验证，如：
         * <pre>
         *   HHJsLib.isEmail("xjiujiu@foxmai.com"); //ok
         *   HHJsLib.isEmail("aa@aaa"); //Exception
         * </pre>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} value 需要验证的目标邮箱地址
         * @return {Object} HHJsLib对象 | Boolean 是否为空
         * @throws Exception 
         */
        isEmail: function(value) {
            var emailRegExp     = /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/i; 
            if(!emailRegExp.test(value)) {
                throw HHJsLib.lang('EMAIL_FORMAT_ERROR');
            }
            
            return this;
        },

        /**
         * 通过文档的ID来验证邮箱值是否合法 
         * 
         * <pre>
         *      HHJsLib.isEmailById('#email_id'); 
         * </pre>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} target 检测目标
         * @return {Object} HHJsLib对象 | Boolean 是否为空
         * @throws Exception
         */
        isEmailByDom: function(target) {
            return this._isValidateByDom(this.isEmail, target);
        },

        /**
         * 验证电话号码是否合法 
         * 
         * <pre>
         *      HHJsLib.isPhone('127123132'); //throw Exception
         *      HHJsLib.isPhone('0745-2658963');  //正确 no Exception
         * </pre>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} value 电话值
         * @return {Object} HHJsLib对象 | Boolean 是否为空
         * @throws Exception
         */
        isPhone: function(value) {
            var phoneRegExp     = /^1[3584]?\d{5,9}$/; 
            var telRegExp       = /^(([0+]\d{2,3}-)?(0\d{2,3})-)?(\d{6,8})(-(\d{3,}))?$/;
            if(!phoneRegExp.test(value) && !telRegExp.test(value)) {
                throw HHJsLib.lang('PHONE_ERROR');
            }            
        },

        /**
         * 通过当前DOM ID来验证值是否为正确的电话号码 
         * 
         * <pre>
         *      HHJsLib.isPhoneById('#phone_id');
         * </pre>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} target 检测目标
         * @return {HHJsLib} 对象 | Boolean 是否有效
         * @throws Exception 
         */
        isPhoneByDom: function(target) {
            return this._isValidateByDom(this.isPhone, target);
        },

        
        /**
         * 验证值是否全为数字 
         * 
         * <pre>
         *      HHJsLib.isNumber(121323);   //Yes..
         *      HHJsLib.isNumber('est');   //异常抛出
         * </pre>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} num 需要检测的值
         * @param  {String} name 当前检测的元素名称
         * @return {HHJsLib} 对象 
         * @throws Exception 
         */
        isNumber: function (num, name) {
            if(!/^-?\d+.?\d*$/.test(num)) {
                throw name + HHJsLib.lang('INAVALIBLE_NUMBER');
            }
            
            return this;
        },
        
        /**
         * 通过当前DOM ID来验证值是否全为数字
         * 
         * <pre>
         *      HHJsLib.isNumberById('#dom-id', '名称');
         * </pre>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} target 检测目标
         * @param  {String} name 名称
         * @return {HHJsLib} 对象
         * @throws Exception 
         */
        isNumberByDom: function(target, name) {
            return this._isValidateByDom(this.isNumber, target, [name]);
        },
        
		/**
		 * 是否为IE浏览器 
		 * 
		 * <pre>
		 *  HHJsLib.isIE();
		 * </pre>
		 * 
		 * @author xjiujiu <xjiujiu@foxmail.com>
         * @return boolean 是否为IE浏览器
		 */
        isIE: function() {
        	return !-[1,];
        },
       
        /**
		 * 是否支持当前的文件类型 
		 * 
		 * <pre>
		 *  HHJsLib.isFileType("#file-id", ".jpg,.gif");
		 * </pre>
		 * 
		 * @author xjiujiu <xjiujiu@foxmail.com>
         * @throws Exception 是否验证成功
         */
        isFileType: function(types) {
        	var path 			= this.$target.val();
        	var regFileType 	= "," + types + ",";
        	var fileType 		= "," + path.substring(path.lastIndexOf('.')) + ",";
        	if(-1 == regFileType.indexOf(fileType)) {
        		throw {message: HHJsLib.lang('NOT_SUPPORT_THE_FILE_TYPE'), dom: this.target };
        	}
        	
        	return this;
        },
        
        /**
		 * 是否支持当前所要求的日期格式
		 * 
		 * <pre>
		 *  HHJsLib.isDateById("#date-id", "出生年月", "yyyy-mm");
		 * </pre>
         * 
		 * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} target 检测目标
         * @param  {String} name 当前的检测项目名称
         * @param  {String} format 功能所支持的日期格式
         * @throws Exception 是否验证成功
         * @return {HHJsLib} 对象 
         */
        isDateByDom: function(target, name, format) {
            return this._isValidateByDom(this.isDate, target, [name, format]);
        },
        
        /**
		 * 是否支持当前所要求的日期格式
		 * 
		 * <pre>
		 *  HHJsLib.isDate("200304", "出生年月", "yyyy-mm");
		 * </pre>
		 * 
		 * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} value 需要检测的值
         * @param  {String} name 当前的检测项目名称
         * @param  {String} format 功能所支持的日期格式
         * @throws Exception 是否验证成功
         * @return {HHJsLib} 对象 
         */
        isDate: function(value, name, format) {
        	var dateFormatMap 	= {
        		"yyyy/mm/dd": /^\d{4}\/\d{2}\/\d{2}$/,
        		"yyyy/mm": /^\d{4}\/\d{2}$/,
        		"yyyy-mm-dd": /^\d{4}-\d{2}-\d{2}$/,
        		"yyyy-mm": /^\d{4}-\d{2}$/,
        		"yyyymmdd": /^\d{8}$/,
        		"yyyymm": /^\d{6}$/
        	};
        	if(typeof format == 'undefined') {
        		format 	= 'yyyymmdd';
        	}
        	if(!dateFormatMap[format].test(value)) {
        		throw name + "时间格式不正确，请参考说明认真填写！";
        	}
    		value 		= value.replace(/-|\//g, "");
    		var year 	= parseInt(value.substr(0, 4));
    		if(year > 2037) {
        		throw name + "日期值太大，不能超过2037年！";
    		}
    		var month 	= parseInt(value.substr(4, 2));
    		if(12 < month) {
        		throw name + "日期格式无效！";
    		}
    		var day		= parseInt(value.substr(6, 2));
    		if(day > 31) {
        		throw name + "日期格式无效！";
    		}
    		if(month == 2 && day > 29) {
        		throw name + "日期格式无效！2月最大只有29天~";
    		}
    		
    		return this;
        },
        
        /**
		 * 是否支持当前所要求的日期格式
		 * 
		 * <pre>
		 *  HHJsLib.isDateById("#date-id", "出生年月", "yyyy-mm");
		 * </pre>
         * 
		 * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} target 检测目标
         * @param  {String} name 当前的检测项目名称
         * @param  {String} format 功能所支持的日期格式
         * @throws Exception 是否验证成功
         * @return {HHJsLib} 对象 
         */
        isDateTimeByDom: function(target, name, format) {
            return this._isValidateByDom(this.isDateTime, target, [name, format]);
        },

        /**
         * 检测是否相等
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @return 当前对像
         * @throws HVerifyException 验证异常
         */
        isEqualByDom: function(targets, name) {
            if(!targets) { return; } 
            var val     = $(targets[0]).val();
            for(var i = 1; i < targets.length; i ++) {
                if(val !== $(targets[i]).val()) {
                    throw {dom: $(targets[0]), message: name + '不一致！'} 
                }
            }

            return this;
        },

        /**
		 * 是否支持当前所要求的日期格式
		 * 
		 * <pre>
		 *  HHJsLib.isDateTime("2003-04-01 12:23:43", "开始时间", "yyyy-mm-dd hh:mm:ss");
		 * </pre>
		 * 
		 * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} value 需要检测的值
         * @param  {String} name 当前的检测项目名称
         * @param  {String} format 功能所支持的日期格式
         * @throws Exception 是否验证成功
         * @return {HHJsLib} 对象
         */
        isDateTime: function(value, name, format) {
        	var dateFormatMap 	= {
        		"yyyy/mm/dd hh:mm:ss": /^\d{4}\/\d{2}\/\d{2}\s\d{2}:\d{2}:\d{2}$/,
        		"yyyy/mm hh:mm:ss": /^\d{4}\/\d{2}\s\d{2}:\d{2}:\d{2}$/,
        		"yyyy-mm-dd hh:mm:ss": /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/,
        		"yyyy-mm-dd hh:mm": /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}$/,
        		"yyyy-mm hh:mm:ss": /^\d{4}-\d{2}\s\d{2}:\d{2}:\d{2}$/,
        		"yyyymmdd hh:mm:ss": /^\d{8}\s\d{2}:\d{2}:\d{2}$/,
        		"yyyymm hh:mm:ss": /^\d{6}\s\d{2}:\d{2}:\d{2}$/
        	};
        	if(typeof format == 'undefined') {
        		format 	= 'yyyy-mm-dd hh:mm:ss';
        	}
        	if(!dateFormatMap[format].test(value)) {
        		throw name + "时间格式不正确，请参考说明认真填写！";
        	}
        },

        /**
		 * 身份证格式是否正确
		 * 
		 * <pre>
		 *  HHJsLib.isIdCardByDom("#cardid_id");
		 * </pre>
		 * 
		 * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} target 检测目标
         * @throws Exception 是否验证成功
         * @return {HHJsLib} 对象 
         */
        isIdCardByDom: function(target) {
            return this._isValidateByDom(this.isIdCard, target);
        },
        
        /**
		 * 身份证格式是否正确
		 * 
		 * <pre>
		 *  HHJsLib.isIdCard("29u0u8080u09009");
		 * </pre>
		 * 
		 * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} value 需要检测的值
         * @throws Exception 是否验证成功
         * @return {HHJsLib} 对象 
         */
        isIdCard: function(value) {
        	if(!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(value))) {
        		throw HHJsLib.lang('CARD_ID_ERROR');
        	}
        	
        	return this;
        },
        
        /**
		 * 名族格式是否正确
         *
		 * <pre>
		 *  HHJsLib.isNation("#nation");
		 * </pre>
		 * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} target 需要检测的对象
         * @throws Exception 是否验证成功
         * @return {HHJsLib} 对象 
         */ 
        isNationByDom: function(target) {
            return this._isValidateByDom(this.isNation, target);
        },
        
        /**
		 * 名族格式是否正确
		 * 
		 * <pre>
		 *  HHJsLib.isNation("汉族");
		 * </pre>
		 * 
		 * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} value 需要检测的值
         * @throws Exception 是否验证成功
         * @return {HHJsLib} 对象 
         */
        isNation: function(value) {
        	var nations = ",汉族,壮族,满族,回族,苗族,维吾尔族,土家族,彝族," +
			"蒙古族,藏族,布依族,侗族,瑶族,朝鲜族,白族,哈尼族,哈萨克族," +
			"黎族,傣族,畲族,傈僳族,仡佬族,东乡族,高山族,拉祜族,水族," +
			"佤族,纳西族,羌族,土族,仫佬族,锡伯族,柯尔克孜族,达斡尔族," +
			"景颇族,毛南族,撒拉族,布朗族,塔吉克族,阿昌族,普米族,鄂温克族," +
			"怒族,京族,基诺族,德昂族,保安族,俄罗斯族,裕固族,乌兹别克族," +
			"门巴族,鄂伦春族,独龙族,塔塔尔族,赫哲族,珞巴族,";
        	
        	return this.isHasStr(nations, value, "民族");
        },
        
        /**
		 * 是否包含当前需要查找的字符串
		 * 
		 * <pre>
		 *  HHJsLib.isHasStr(",1,2,3,", 1, "数字");
		 * </pre>
		 * 
		 * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} target 检测目标
         * @param  {String} str 需要查找的字串
         * @param  {String} name 当前的内容名称
         * @param  {String} ch 限定范围字符串 默认为：,
         * @throws Exception 是否验证成功
         * @return {HHJsLib} 对象 
         */
        isHasStrByDom: function(target, str, name, ch) {
            return this._isValidateByDom(this.isHasStr, target, [str, name, ch]);
        },
        
        /**
		 * 是否包含当前需要查找的字符串
		 * 
		 * <pre>
		 *  HHJsLib.isHasStr(",1,2,3,", 1, "数字");
		 * </pre>
		 * 
		 * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} str 对比的模板
         * @param  {String} needle 需要查找的字串
         * @param  {String} name 当前的内容名称
         * @param  {String} ch 限定范围字符串 默认为：,
         * @throws Exception 是否验证成功
         * @return {HHJsLib} 对象 
         */
        isHasStr: function(str, needle, name, ch) {
        	if(typeof ch == 'undefined') {
        		var ch 	= ',';
        	}
        	if(0 > str.indexOf(ch + needle + ch)) {
        		throw name + HHJsLib.lang('HAS_INVALIDATE_INFO');
        	}
        	
        	return this;
        },

        /**
         * 检测复选框是否选择
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} target 检测目标
         * @param  {String} name 对象名称
         * @throws VerifyException 验证异常 
         * @return {HHJsLib} 对象 
         */
        isCheckedByDom: function(target, name) {
            $(target).each(function() {
                if(1 > $(this).find("input:checked").length) {
                    throw {dom: $(this), message: name + HHJsLib.lang('NO_SELECTED') }
                }
            });
        },

        /**
		 * 是否包含当前需要查找的字符串
		 * 
		 * <pre>
		 *  HHJsLib.isUrlByDom(",1,2,3,", "http://www.hongjuzi.net", "红橘子");
		 * </pre>
		 * 
		 * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} target 检测目标
         * @param  {String} name 当前的内容名称
         * @throws Exception 是否验证成功
         * @return {HHJsLib} 对象 
         */
        isUrlByDom: function(target, name) {
            return this._isValidateByDom(this.isUrl, target, [name]);
        },

        /**
         * 验证是否为合法URL地址
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {String} url 检测的URL
         * @param  {String} name 名称
         * @throws Exception 验证异常
         */
        isUrl: function(url, name) {
            var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
                + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" /*ftp的user@*/
                + '(([0-9]{1,3}.){3}[0-9]{1,3}' /* IP形式的URL- 199.194.52.184*/
                + '|' /*允许IP和DOMAIN（域名）*/
                + "([0-9a-z_!~*'()-]+.)*" /* 域名- www.*/
                + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' /* 二级域名*/
                + '[a-z]{2,6})' /* first level domain- .com or .museum*/
                + '(:[0-9]{1,4})?' /* 端口- :80*/
                + '((/?)|' /* a slash isn't required if there is no file name*/
                + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
             var re=new RegExp(strRegex);
             if(false === re.test(url)) {
                 throw name + "Url地址不合法，正确格式如：http://www.example.com";
             }
        },

        /**
         * 内部使用的通过DOM验证验证方法
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @return {HHJsLib}当前HHJsLib对象
         * @throws Exception 验证异常 
         */
        _isValidateByDom: function(func, target, params) {
            try {
                params   = 'undefined' == typeof params ? [] : params;
                $(target).each(function() {
                    HHJsLib.$target     = $(this);
                    params.unshift(HHJsLib.$target.val());
                    func.apply(Validate, params);
                });

                return this;
            } catch(e) {
                throw { message: e, dom: HHJsLib.$target };
            }
        }
     };
     //扩展到HHJsLib库中
     HHJsLib.extend(Validate);
	 //添加验证的语言字典
     HHJsLib.mergeDict({
		'zh-cn': {
			'CAN_NOT_EMPTY': '不能为空！',
			'LEN_INAVALIBLE': '长度不符合要求，要求字符范围：',
			'EMAIL_FORMAT_ERROR': '邮箱地址不合法！正确格式为：example@example.com。',
			'PHONE_ERROR': '电话号码不合法！正确格式,如：13745623698 或 0745-2864032。',
			'INAVALIBLE_NUMBER': '不是有效的数字！',
			'CARD_ID_ERROR': "身份证号码格式不正确！",
			'HAS_INVALIDATE_INFO': "信息不正确，请认真核对！",
			'NOT_SUPPORT_THE_FILE_TYPE': '文件类型不支持，请参考上传说明！',
            'NO_SELECTED': '没有选择'
		},
		'zh-tw': {
			'CAN_NOT_EMPTY': '不能爲空！',
			'LEN_INAVALIBLE': '長度不符合要求，要求字符範圍：',
			'EMAIL_FORMAT_ERROR': '郵箱地址不合法！正確格式爲：example@example.com',
			'PHONE_ERROR': '電話號碼不合法！正確格式,如：13745623698 或 0745-2864032。',
			'INAVALIBLE_NUMBER': '不是有效的數字！',
			'CARD_ID_ERROR': "身份證號碼格式不正確！",
			'HAS_INVALIDATE_INFO': "信息不正確，請認真核對！",
			'NOT_SUPPORT_THE_FILE_TYPE': '文件類型不支持，請參考上傳說明！',
            'NO_SELECTED': '沒有選擇'
		},
		'en': {
			'CAN_NOT_EMPTY': 'Can not be empty!',
			'LEN_INAVALIBLE': 'length not avalible, the length should between: ',
			'EMAIL_FORMAT_ERROR': 'The phone number error, example：13745623698 or 0745-2864032.',
			'INAVALIBLE_NUMBER': 'The value is not a number!',
			'CARD_ID_ERROR': "CardId number format error!",
			'HAS_INVALIDATE_INFO': "The file type not support, please see the comments clear!",
            'NO_SELECTED': 'Not be selected!'
		}
	});
 })(jQuery);
