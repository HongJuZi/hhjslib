/**
 * $Id$
 * @class HHJsLib
 * @description 红橘子科技Js库基础类
 * @author xjiujiu (xjiujiu@foxmail.com)
 * @create 2012-08-13 9:30:00
 */

/**
 * HHJsLib 核心库
 * 
 * 核心库包括：初始化、事件容器、字典容器、语言配置等
 * 
 * @author xjiujiu <xjiujiu@foxmail.com>
 * @package hhjslib 
 * @since 1.0.0
 */
var HHJsLib = window.HHJsLib = {
    $target: null,      // 需要操作的对象
    dict: {},           //当前语种
    curLang: 'zh-cn',   //当前的语言配置
    _initMap: [],       //初始化事件容器
    
    /**
     * 执行初始化动作
     * 
     * @author xjiujiu <xjiujiu@foxmail.com>
     * @return {HHJsLib} 库对象
     */
    init: function() {
        $.each(this._initMap, function(loc, item) {
            item[1].call(item[0]);
        });
        
        return this;
    },

    /**
     * 选择需要操作的元素
     * 
     * @author xjiujiu <xjiujiu@foxmail.com>
     * @param  {String} target 需要查找的DOM对象
     * @return {HHJsLib} 库对象
     */
    $: function(target) {
        this.$target    = $(target);

        return this;
    },

    /**
     * 得到对应的语言翻译
     * 
     * @author xjiujiu <xjiujiu@foxmail.com>
     * @param  {String} mask 语言标识
     * @return {HHJsLib} 当前的库对象
     */
    lang: function(mask) {
        if('undefined' == typeof this.dict[this.curLang][mask]) {
            return mask;
        }

        return  this.dict[this.curLang][mask];
    },

    /**
     * 合并语言字典
     * 
     * @author xjiujiu <xjiujiu@foxmail.com>
     * @param  Array subDict 需要合并的字典
     * @return {HHJsLib} 当前对象
     */
    mergeDict: function(subDict) {
        for(var type in subDict) {
            for(var mask in subDict[type]) {
                if('undefined' == typeof(this.dict[type])) {
                    this.dict[type]     = {};
                }
                this.dict[type][mask]	= subDict[type][mask];
            }
        }

        return this;
    },

    /**
     * 注册初始化事件
     * 
     * @author xjiujiu <xjiujiu@foxmail.com>
     * @param {Object} obj 需要注册的事件对象
     * @param Function func 需要调用的对象方法
     * @return {HHJsLib}
     */
    register: function(obj, func) {
        if('undefined' == typeof obj) {
            return this;
        }
        if(typeof func != 'undefined') {
            this._initMap.push([obj, func]);
            return this;
        }
        if('undefined' != typeof obj.init) {
            this._initMap.push([obj, obj.init]);
        }
        
        return this;
    },

    /**
     * 动态扩展库方法
     * 
     * @author xjiujiu <xjiujiu@foxmail.com>
     * @param {Object} props 扩展功能对象
     * @return {HHJsLib} 当前的库对象
     */
    extend: function(props) {
        for(var ele in props) {
            this[ele] 	= props[ele];
        }

        return this;
    }
};

//文档加载完成，调用初始化方法
$(function() { HHJsLib.init(); });
