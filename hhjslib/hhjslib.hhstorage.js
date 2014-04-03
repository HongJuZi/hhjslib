
/**
 * @version $Id$
 * @create 2013/5/12 星期日 1:34:19 By xjiujiu
 * @description HongJuZi Framework
 * @copyRight Copyright (c) 2011-2012 http://www.xjiujiu.com.All right reserved
 */
 (function($) {

     /**
      * 存储工具包 
      * 
      * @desc
      * 
      * @author xjiujiu <xjiujiu@foxmail.com>
      * @package hhjslib
      * @since 1.0.0
      */
     var HHStorage  = {

         /**
          * Cookie的存储工具类 
          * 
          * @desc
          * 
          * @author xjiujiu <xjiujiu@foxmail.com>
          * @package None
          * @since 1.0.0
          */
         cookie: {

             /**
              * 得到Cookie属性 
              * 
              * @desc
              * 
              * @author xjiujiu <xjiujiu@foxmail.com>
              * @access public
              * @param  String attr 当前的属性名
              * @return String 当前的属性值
              */
            get: function(attr) {
                var start     = this._getCookie().indexOf(";" + attr + "=");
                if(-1 < start) {
                    start     += attr.length + 2;
                    var end = document.cookie.indexOf(";", start);
                    end     = -1 == end ? document.cookie.length : (end + 1);
                    return unescape(this._getCookie().substring(start, end));
                }

                return '';
            },

            /**
             * 设置当前的Cookie属性 
             * 
             * @desc
             * 
             * @author xjiujiu <xjiujiu@foxmail.com>
             * @access public
             * @param  String attr 当前的属性名
             * @param  String value 属性值
             */
            set: function(attr, value, time) {
                var options = ';';
                if(typeof time != 'undefined') {
                    var date    = new Date();
                    date.setTime(date.getTime() + time);
                    options     += "expires=" + date.toGMTString() + ";path=/"
                }
                document.cookie     =  attr + "=" + escape(value) + options;
            },

            /**
             * 删除Cookie属性 
             * 
             * @desc
             * 
             * @author xjiujiu <xjiujiu@foxmail.com>
             * @access public
             * @param  String attr 需要删除的属性名
             * @return void 
             */
            delete: function(attr) {
                var loc   = document.cookie.indexOf(";" + attr + "=");
                if(-1 < loc) {
                    document.cookie = attr + '=;';
                }
            },

            /**
             * 销毁当前所有的Cookie内容 
             * 
             * @desc
             * 
             * @author xjiujiu <xjiujiu@foxmail.com>
             * @access public
             * @return void
             */
            destroy: function() {
                document.cookie     = '';
            },
            
            /**
             * 得到当前的Cookie值 
             * 
             * @desc
             * 
             * @author xjiujiu <xjiujiu@foxmail.com>
             * @access public
             * @return String 当前的Cookie值 
             */
            _getCookie: function() {
               return ";" + document.cookie + ";"; 
            }
         }
     };
     //扩展HHJsLib类库的存储工具包
     HHJsLib.extend(HHStorage);
 })(jQuery);
