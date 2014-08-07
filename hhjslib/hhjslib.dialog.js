
/**
 * @version $Id$
 * @author xjiujiu <xjiujiu@foxmail.com>
 * @description HongJuZi Framework
 * @copyright Copyright (c) 2011-2012 http://www.xjiujiu.com.All right reserved
 */

(function($) {
    /**
     * 对话框工具类
     * 
     * HHJsLib 对话框基础类库 
     * 
     * @author xjiujiu <xjiujiu@foxmail.com>
     * @package HHJsLib
     * @since 	1.0.0
     */
    var Dialog    = {

        /**
         * 信息提醒弹框
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param {String} msg 提示信息
         * @return {HHJsLib} 库对象
         */
        info: function(msg) {
            return this.dialog(msg, 'info');
        },

        /**
         * 提示当前的信息
         * 
         * <pre>
         *    HHJsLib.alert("提示信息");
         * </pre>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param {String} msg 当前用户的提示信息
         * @return {HHJsLib} 库对象
         */
        alert: function(msg) {
            return this.dialog(msg, 'alert');
        },

        /**
         * 提示当前的信息,没有任何的按钮
         * 
         * <pre>
         *    HHJsLib.warn("提示信息");
         * </pre>
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param {String} msg 当前用户的警告信息
         * @return {HHJsLib} 库对象
         */
        warn: function(msg) {
            return this.dialog(msg, 'warning');
        },

        /**
         * 错误提示消息
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param {String} msg 错误信息
         * @return {HHJsLib} 库对象
         */
        error: function(msg) {
            return this.dialog(msg, 'error');
        },

        /**
         * 成功的提示信息 
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param {String} msg 需要提示的信息
         * @return {HHJsLib} 库对象
         */
        succeed: function(msg) {
            return this.dialog(msg, 'success');
        },

        /**
         * 询问弹框
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param {String} msg 提示信息 
         */
        confirm: function(msg, callback) {
            return this.dialog(msg, 'confirm', callback);
        },

        /**
         * 定位到错误对象 
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param  {Mixed} target 需要操作的对象
         */
        focusTarget: function(target) {
            if(typeof target !== 'undefined') {
                typeof target === 'object' ?  target.focus() : $(target).first().focus();
            }
        },
        
        /**
         * 得到提示消息
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param {String} msg 提示消息
         * @param {String} type 提示状态图标
         * @param {Object} callback 需要执行的函数
         */
        getMessage: function(msg) {
			return 'object' == typeof msg ? msg.message : msg;
        },

        /**
         * 内部使用的公用弹框方法 
         * 
         * @author xjiujiu <xjiujiu@foxmail.com>
         * @param {String} msg 提示消息
         * @param {String} type 提示状态图标
         * @param {Object} callback 需要执行的函数
         */
        dialog: function(msg, type, callback) {
			this.focusTarget(msg.dom);
            if('confirm' !== type) {
                alert(this.getMessage(msg));
                return false;
            }
            if(confirm(msg)) {
                return 'undefined' === typeof(callback) ? false : callback();
            }

            return false;
        }
    };
    //扩展到HHJsLib类功能中
    HHJsLib.extend(Dialog);
})(jQuery);

