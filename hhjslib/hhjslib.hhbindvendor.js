
/**
 * @version			$Id$
 * @create 			2012-8-20 15:32:53 By xjiujiu
 * @package 		render
 * @copyRight 		Copyright (c) 2011-2012 http://www.xjiujiu.com.All right reserved
 * HongJuZi Framework
 */

 /**
  * 对第三方JS效果插件的绑定 
  * 
  * 如：editor、lightbox、uploadify等 
  * 
  * @author 	xjiujiu <xjiujiu@foxmail.com>
  * @package 	None
  * @since 	    1.0.0
  */
(function($) {

    //绑定第三方工具类
	var HHBindVendor 	= {

        /**
         * @var Object editor: {} 编辑器对象
         */
        editor: {},

        /**
         * 绑定Ajax上传插件：Uploadify 
         * 
         * 用法：
         * <code>
         * //html代码
         * <div id="uploadify_id"></div>
         * //js 代码
         *  HHJsLib("#uploadify_id").bindUploadify(baseUrl);
         * </code>
         * 
         * @author 			xjiujiu <xjiujiu@foxmail.com>
         * @access public
         * @param  String baseUrl 相对路径
         * @return HHJsLib 对象
         */
        bindUploadify: function(baseUrl, options){
            var _this   = this;
        	this.importCss([baseUrl + "/uploadify/uploadify.css"]);
        	this.importJs(
    			[baseUrl + "/uploadify/jquery.uploadify.min.js"],
    			function() {
                    var defOpts     = {
						'auto': 		true,
						'height': 		30,
						'width': 		120,
						'multi': 		true,
						'buttonText': 	"选择文件",
						'buttonImage': 	baseUrl + "/uploadify/browse-btn.png",
						'swf': 			baseUrl + "/uploadify/uploadify.swf",
						'uploader': 	siteUrl + "/index.jsp/admin/user/uploadimage"
					};
                    if('object' === typeof(options)) {
                        for(var ele in options) {
                            defOpts[ele]    = options[ele];
                        }
                    }
					_this.$target.uploadify(defOpts);
    			}
			);

            return this;
		},

        /**
         * 绑定lightBox
         * 
         * 用法：
         * <code>
         * //HTML代码
         * <a href="http://xxx.xxx.xx/images/xxx.jgp" class="lightbox other-class">other demo</a>
         * //JS代码
         * HHJsLib("a.lightbox").bindLightBox(baseUrl);
         * </code>
         * 
         * @author 			xjiujiu <xjiujiu@foxmail.com>
         * @access public
         * @param String baseUrl 相对的基本路径
         * @return HHJsLib 对象
         */
	    bindLightBox: function(target, baseUrl){
	    	this.importCss([baseUrl + "/lightbox.css"]);
	    	this.importJs(
    			[baseUrl + "/lightbox.js"],
    			function() {
			        $(target).lightBox({
			            overlayBgColor: '#ccc',
			            overlayOpacity: 0.6,
			            imageLoading: baseUrl + '/lightbox-ico-loading.gif',
			            imageBtnClose: baseUrl + '/lightbox-btn-close.gif',
			            imageBtnPrev: baseUrl + '/lightbox-btn-prev.gif',
			            imageBtnNext: baseUrl + '/lightbox-btn-next.gif',
			            imageBlank: baseUrl + '/lightbox-blank.gif',
			            containerResizeSpeed: 350,
			            txtImage: 'Imagem',
			            txtOf: 'de'
					});
    			}
	        );

            return this;
	    },

        /**
         * 绑定HTML在线编辑器 
         * 
         * @desc
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @access public
         * @param  String editor 编辑器类型
         * @param  String model 编辑器的模式：full, simple, base 三种
         * @return HHJsLib 对象
         */
        bindEditor: function(target, baseUrl, editor, model) {
            if(1 > $('#' + target).length) { return ; }
        	model 	= this._getEditorModel(model);
            switch(editor) {
                case 'ueditor':
                    this.bindUeditor(target, baseUrl, model);
                    break;
                case 'xheditor':
                    this.bindXheditor(target, baseUrl, model);
                    break;
                case 'tinymce':
                    this.bindTinymce(target, baseUrl, model);
                    break;
                case 'wysiwyg':
                default:
                    this.bindWysiwyg(target, baseUrl, model);
                    break;
            }
            
            return this;
        },
        
        /**
         * 得到编辑器的显示模式
         * 
         * @desc
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @access public
         * @param  String model 编辑器的模式：full, simple, base 三种, 默认为：full
         * @return String 模式标识
         */
        _getEditorModel: function(model) {
        	if(typeof model == 'undefined') {
        		return 'full';
        	}
        	if(-1 == 'full,simple,base'.indexOf(model)) {
        		return 'full';
        	}
        	
        	return model;
        },

        /**
         * 绑定Ueditor编辑器 
         * 
         * Example:
         * <code>
         *  HHJsLib(".editor").bindUeditor("http://www.xjiujiu.com/editor");
         * </code>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @access public
         * @param  String baseUrl 相对路径
         * @param  String model 编辑器的模式：full, simple, base 三种
         * @return HHJsLib 对象
         */
        bindUeditor: function(target, baseUrl, model) {
        	var modelMap 	= {
        		full: [[
    	            'fullscreen', 'source', '|', 'undo', 'redo', '|',
	                'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch','autotypeset','blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist','selectall', 'cleardoc', '|',
	                'rowspacingtop', 'rowspacingbottom','lineheight','|',
	                'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
	                'directionalityltr', 'directionalityrtl', 'indent', '|',
	                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','touppercase','tolowercase','|',
	                'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright','imagecenter', '|',
	                'insertimage', 'emotion','scrawl', 'insertvideo','music','attachment', 'map', 'gmap','pagebreak','template','background', '|',
	                'horizontal', 'date', 'time', 'spechars','snapscreen', 'wordimage', '|',
	                'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', '|',
	                'print', 'preview', 'searchreplace','help'
                ]],
        		simple: [[
    	            'fullscreen', '|', 'undo', 'redo', '|',
	                'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch','autotypeset','blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist','selectall', 'cleardoc', '|',
	                'rowspacingtop', 'rowspacingbottom','lineheight','|',
	                'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
	                'directionalityltr', 'directionalityrtl', 'indent', '|',
	                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','touppercase','tolowercase','|',
	                'link', 'unlink', 'anchor', '|', 'insertimage', 'imagenone', 'imageleft', 'imageright','imagecenter', '|',
	                'horizontal', 'date', 'time', 'spechars', '|',
	                'print'
                ]],
        		base: [[
    	            'fullscreen', '|', 'undo', 'redo', '|',
	                'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch','selectall', 'cleardoc', '|',
	                'directionalityltr', 'directionalityrtl', 'indent', '|',
	                'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
	                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
	                'print'
                ]],
        		album: [['fullscreen', 'insertimage']]
        	};
            window.UEDITOR_HOME_URL = baseUrl + "/";
            var $target     = $('#' + target);
        	
            return this.importJs(
                [
                 	baseUrl + "/ueditor.config.js",
                    baseUrl + "/ueditor.all.min.js"
                ],
                function() {
                	var width 	= "" != $target.attr("width") ? parseInt($target.attr("width")) : 800;
                	var height 	= "" != $target.attr("height") ? parseInt($target.attr("height")) : 100;
                	HHBindVendor.editor[target]     = UE.getEditor(
                		target,
                		{
                			initialContent: '',
		                    theme:"default", //皮肤
		                    lang:'zh-cn', //语言
	                    	initialFrameWidth: width,
	                    	initialFrameHeight: height,
	                    	toolbars: modelMap[model]//工具栏
                		}
                	);
                }
            );

            return this;
        },

        /**
         * 绑定xheditor编辑器 
         * 
         * Example:
         * <code>
         *  HHJsLib(".editor").bindXheditor("http://www.xjiujiu.com/editor");
         * </code>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @access public
         * @param  String baseUrl 相对路径
         * @param  String model 编辑器的模式：full, simple, base 三种
         * @return HHJsLib 对象
         */
        bindXheditor: function(target, baseUrl, model) {

            return this;
        },

        /**
         * 绑定tinymce编辑器 
         * 
         * Example:
         * <code>
         *  HHJsLib(".editor").bindTinymce("http://www.xjiujiu.com/editor");
         * </code>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @access public
         * @param  String baseUrl 相对路径
         * @param  String model 编辑器的模式：full, simple, base 三种
         * @return HHJsLib 对象
         */
        bindTinymce: function(target, baseUrl, model) {

            return this;
        },

        /**
         * 绑定Wysiwyg编辑器 
         * 
         * Example:
         * <code>
         *  HHJsLib(".editor").bindWysiwyg("http://www.xjiujiu.com/editor");
         * </code>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @access public
         * @param  String baseUrl 相对路径
         * @param  String model 编辑器的模式：full, simple, base 三种
         * @return HHJsLib 对象
         */
        bindWysiwyg: function(target, baseUrl, model) {
            var _this   = this;
            this.importCss([baseUrl + "/jquery.wysiwyg.css"]);
            this.importJs(
                [baseUrl + "/jquery.wysiwyg.js"],
                function() {
                    _this.$target.wysiwyg();
                }
            );

            return this;
        },
        
        /**
         * 绑定Date插件,显示格式：1990-09-09
         * 
         * Example:
         * <code>
         *  HHJsLib(".create_time").bindDate("http://www.xjiujiu.com/editor");
         * </code>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @access public
         * @param  String baseUrl 相对路径
         * @param  String format 日期格式
         * @return HHJsLib 对象
         */
        bindDate: function(baseUrl, format) {
        	if(typeof format == 'undefined') {
        		format 	= 'yy-mm-dd';
        	}
            $(this.$target).datepicker({
                clickInput: true,
                changeMonth: true,
                changeYear: true,
                dateFormat: format
            });

            return this;
        },
        
        /**
         * 设定当前日期的语言为中文
         * 
         * Example:
         * <code>
         *  HHJsLib._setDatePickerZhCnLang();
         * </code>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @access public
         */
        _setDatePickerZhCnLang: function() {
        	$.datepicker.regional['zh-CN'] = {
                closeText: '关闭',
                prevText: '<上月',
                nextText: '下月>',
                currentText: '今天',
                monthNames: ['一月','二月','三月','四月','五月','六月',
                '七月','八月','九月','十月','十一月','十二月'],
                monthNamesShort: ['一','二','三','四','五','六',
                '七','八','九','十','十一','十二'],
                dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
                dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
                dayNamesMin: ['日','一','二','三','四','五','六'],
                weekHeader: '周',
                dateFormat: 'yy-mm-dd',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: true,
                yearSuffix: '年'
        	};
            $.datepicker.setDefaults($.datepicker.regional['zh-CN']);	
        },
        
        /**
         * 绑定Date插件,显示格式：19900909
         * 
         * Example:
         * <code>
         *  HHJsLib(".create_time").bindDate("http://www.xjiujiu.com/editor");
         * </code>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @access public
         * @param  String baseUrl 相对路径
         * @return HHJsLib对象
         */
        bindDateTime: function(baseUrl, format) {
            if(typeof format == 'undefined') {
        		format 	= 'hh:mm:ss';
        	}
        	this.importJs(
                [baseUrl + "/timepicker/jquery-ui-timepicker-addon-0.5.min.js"],
                function() {
                    HHBindVendor._setDatePickerZhCnLang();
                    this.$target.datetimepicker({
                        showSecond: true, //显示秒
                        dateFormat: "yy-mm-dd",//格式化时间
                        timeFormat: format,//格式化时间
                        stepHour: 2,//设置步长
                        stepMinute: 10,
                        stepSecond: 10,
                        showSecond: false,
                        showMinute: true,
                        showHour: true
                    });
                }
        	);

            return this;
        },
        
        /**
         * 绑定Date插件,显示格式：199009
         * 
         * Example:
         * <code>
         *  HHJsLib(".create_time").bindDate("http://www.xjiujiu.com/editor");
         * </code>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @access public
         * @param  String baseUrl 相对路径
         * @return HHJsLib对象
         */
        bindDateBirthday: function(baseUrl) {
        	this.bindDate(this.$target, baseUrl, 'yymm');
            
            return this;
        },
        
        /**
         * 绑定Date插件,显示中文格式：1990年09月09日
         * 
         * Example:
         * <code>
         *  HHJsLib.bindDate(".create_time", "http://www.xjiujiu.com/editor");
         * </code>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @access public
         * @param  String baseUrl 相对路径
         * @return HHJsLib对象
         */
        bindDateZn: function(baseUrl) {
        	this.bindDate(this.$target, baseUrl, 'yy年mm月dd日');
            
            return this;
        }

	};
    //扩展到HHJsLib类功能中
	HHJsLib.extend(HHBindVendor);
})(jQuery);
