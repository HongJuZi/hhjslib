/**
 * $Id$
 * @title HHJsLib
 * @description 基地Js库基础类
 * @author xjiujiu (xjiujiu@foxmail.com)
 * @create 2012-08-13 9:30:00
 */
//事件注册及自动初始化工具脚本
var $HH = HHJsLib = window.HHJsLib = {
    $target: null,      // 需要操作的对象
    dict: {},           //当前语种
    curLang: 'zh-cn',   //当前的语言配置
    _initMap: [],       //初始化事件容器
    
    /**
     * 执行初始化动作
     * 
     * @desc
     * 
     * @author xjiujiu <xjiujiu@foxmail.com>
     * @access public
     * @return HHJsLib 库对象
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
     * @desc
     * 
     * @author xjiujiu <xjiujiu@foxmail.com>
     * @access public
     * @param  String target 需要查找的DOM对象
     * @return HHJsLib 库对象
     */
    $H: function(target) {
        this.$target    = $(target);

        return this;
    },

    /**
     * 得到对应的语言翻译
     * 
     * @desc
     * 
     * @author xjiujiu <xjiujiu@foxmail.com>
     * @access public
     * @param  String mask 语言标识
     * @return HHJsLib 当前的库对象
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
     * @desc
     * 
     * @author xjiujiu <xjiujiu@foxmail.com>
     * @access public
     * @param  Array subDict 需要合并的字典
     * @return HHJsLib 当前对象
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
     * @desc
     * 
     * @author xjiujiu <xjiujiu@foxmail.com>
     * @access public
     * @param  Object obj 需要注册的事件对象
     * @param  Function func 需要调用的对象方法
     * @throws HHJsLib 
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
     * @desc
     * 
     * @author xjiujiu <xjiujiu@foxmail.com>
     * @access public
     * @param  Object props 扩展功能对象
     * @return HHJsLib 当前的库对象
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
