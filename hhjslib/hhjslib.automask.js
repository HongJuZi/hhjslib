/**
 * @version			$Id$
 * @create 			2012-8-30 15:42:10 By xjiujiu
 * @package 		HHJsLib
 * @Copyright 		Copyright (c) 2011-2012 http://www.xjiujiu.com.All right reserved
 * HongJuZi Framework
 */
(function($) {

    /**
     * 自动标记工具 
     * 
     * 实现对select, radio, checkbox 等需要自动选中的HTML控件工具
     * 
     * @author xjiujiu <xjiujiu@foxmail.com>
     * @since 	1.0.0
     */
	var AutoMask 	= {

        /**
         * 自动选中下拉菜单
         * 
         * <pre>
         *    //HTML代码
         *    <select id="auto_select_id" class="" data-cur="当前的值">
         *        <option value="-1">-请选择项目-</option>
         *        <option value="1">选项一</option>
         *        <option value="2">选项二</option>
         *    </select>
         *    //JS代码
         *    HHJsLib.autoSelect("auto_select_id");
         * </pre>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param {String} target 当前需要操作的DOM对象
         */
		autoSelect: function(target) {
			$(target).each(function() {
				var curValue 	= $(this).attr("data-cur");
		        if("" == curValue) {
		        	return true;
	            }
		        $(this).find("option").each(function() {
		            var optionValue     = $(this).val();
		            if(optionValue == curValue) {
		                $(this).attr('selected', true);
		            }
		        })
	        });

            return this;
		},

        /**
         * 自动选中下拉菜单
         * 
         * <pre>
         *    //HTML代码
         *    <select id="auto-select" class="" data-cur="当前的值">
         *        <option value="-1">-请选择项目-</option>
         *        <option value="1">选项一</option>
         *        <option value="2">选项二</option>
         *    </select>
         *    //JS代码
         *    HHJsLib.autoMultiSelect("auto-select");
         * </pre>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param {String} target 当前需要操作的DOM对象
         */
		autoMultiSelect: function(target) {
			var curValue 	= $(target).attr("data-cur");
	        if("" == curValue) {
	        	return;
            }
			$(target + " > option").each(function() {
	            var optionValue     = $(this).val();
	            if(-1 != curValue.indexOf("," + optionValue + ",")) {
	                $(this).attr('selected', 'selected');
	            }
	        });

            return this;
		},

        /**
         * 自动选择radio 
         * 
         * <pre>
         * 1. 必须给上一层的dom里加上 data-cur="当前值" 的属性
         * //HTML代码:
         * <div id="auto_radio_id" data-cur="当前值">
         *    <input type="radio" name="item" value="1" />选项一
         *    <input type="radio" name="item" value="2" />选项二
         * </div>
         * //JS代码
         * HHJsLib.autoRadio("auto_radio_id");
         * </pre>
         * 
         * @author 	xjiujiu <xjiujiu@foxmail.com>
         * @param {String} target 当前radio的上一层DOM ID
         */
		autoRadio: function(target) {
			$(target).each(function() {
				var curValue 	= $(this).attr("data-cur");
				if(curValue == "") {
					return true;
				}
				$(this).find("input:radio").each(function() {
					var optionValue     = $(this).val();
					if(optionValue == curValue) {
						$(this).attr('checked', 'checked');
						return false;
					}
					$(this).attr('checked', null);
				});
			
			});

            return this;
		},
		
        /**
         * 自动选择checkbox 
         * 
         * 1. 必须给上一层的dom里加上 data-cur="当前值" 的属性
         * <pre>
         * //HTML代码:
         * <div id="auto-checkbox" data-cur="当前值">
         *    <input type="checkbox" name="item[]" value="1" />选项一
         *    <input type="checkbox" name="item[]" value="2" />选项二
         * </div>
         * //JS代码
         * HHJsLib.autoCheckbox("div#auto-checkbox");
         * </pre>
         * 
         * @author 	xjiujiu <xjiujiu@foxmail.com>
         * @param {String} target 当前checkbox的上一层DOM ID
         */
		autoCheckbox: function(target) {
			$(target).each(function() {
				var curValue 	= $(this).attr("data-cur");
				if(curValue == "") {
					return true;
				}
				$(this).find("input:checkbox").each(function() {
					var optionValue     = $(this).val();
					if(-1 < curValue.indexOf("," + optionValue + ",")) {
						$(this).attr('checked', 'checked');
						return true;
					}
					$(this).attr('checked', null);
				});
			
			});

            return this;
		}
	};
    //扩展到HHJsLib类功能中
	HHJsLib.extend(AutoMask);
})(jQuery);
