# HHJsLib

红橘子信息科技工作室开源Javascript工具库——关注点分离以基本开发思路，Fast &amp; Simple &amp; Stable!

## 1 开始使用
在您想使用此类库之前，请先引用`jQuery1.7+`
<pre>
&lt;script src="path/to/jquery.1.7.2.js"&gt;&lt;/script&gt; &lt;!-- 添加jQuery依赖 --&gt;
&lt;script src="path/to/hhjslib/hhjslib.js"&gt;&lt;/script&gt; &lt;!-- 添加HHJsLib核心文件 --&gt;
</pre>
引入了以上两个文件后，即可开始使用`HHJsLib`的相关功能，我们会在下面的文字里慢慢为您展示`HHJsLib`的好用之处。

## 2 基础示例
### 2.1 页面初始化脚本
使用过jQuery的您，应该每天都在写这样的代码：
HTML代码：
<pre>
&lt;a href="###" id="target-dom-id-1"&gt;给我绑定第一个事件&lt;/a&gt;
&lt;a href="###" id="target-dom-id-2"&gt;给我绑定第二个事件&lt;/a&gt;
</pre>

使用`jQuery`的Javascript代码示例：
<pre>
$(function() {
    //绑定target-dom-id-1处理事件
    $("#target-dom-id-1").click(function() {
        //do some thing
    });
    //绑定target-dom-id-2处理事件
    $("#target-dom-id-2").click(function() {
        //do some thing
    });
    .....
});
</pre>

使用`HHJsLib`的Javascript代码示例：
<pre>
HHJsLib.register({
    init: function() {
        this.bindTargetDom1();
        this.bindTargetDom2();
    },
    bindTargetDom1: function() {
        $("#target-dom-id-1").click(function() {
            //do some job
        });
    },
    bindTargetDom2: function() {
        $("#target-dom-id-2").click(function() {
            //do some job
        });
    }
});
</pre>
可能你会说，`HHJsLib`的实现让原来的代码行数增加了不少，但请仔细看，`HHJsLib`的代码采用全面向对象的写法，及提倡语义化命名，所以相比使用`jQuery`的代码来讲，使用`HHJsLib`在代码的维护及管理上，更加的清晰明确。继续阅读下面的示例，相信您能更深的体会到这一写法的好处。
### 2.2 全面向对象的参数化写法
`HHJsLib`初始化的入口为`register()`，就像您上面看到的示例代码一样，它需要有一个类对象作为参数，这个类里必须包含`init()`方法。如果您有`Java`、`PHP`等有类的概念语言基础，肯定对类的构造函数很熟悉，这个类里的`init()`也即是构造函数的概念，当前类里所有的初始化动作都会在此方法里调用完成。如果您想初始化哪些操作，需要将您的方法在`init()`方法里进行调用即可。这一设计的理念也是基于“单一入口”的原则，可以让调用及调试更加的便捷。同时，也让我们的代码变得更加的清晰，方法间的耦合度可以达到最低。
### 2.3 类方法里的内部调用
通常我们会在需要执行的类里有内部方法间调用的需求，如在点击了一个按钮事件时，需要调用执行类里的`methodB()`处理一些数据，并返回处理的结果，示例代码如下：
<pre>
HHJsLib.register({
    init: function() {
        this.bindBtnClick();
    }.
    bindBtnClick: function() {
        var _root   = this;
        $("#btn-id").click(function() {
            //调用执行类里的方法methodB(params)
            alert(_root.methodB(1));
        });
    },
    methodB: function(params) {
        return params + 1;
    }
});
</pre>

可能您已经注意到`_root`这个变量，对在执行类里的方法间调用，我们需要先定义一个中间变量把当前的类对象保存起来，就像这样`var _root = this;`之后，我们说可以在方法里的内部可以使用执行类里的所有属性及方法。再加一个使用属性的示例：

<pre>
HHJsLib.register({
    message: '友好提示：',
    init: function() {
        this.bindBtnClick();
    },
    bindBtnClick: function() {
        var _root   = this;
        $("#btn-id").click(function() {
            //调用执行类里的属性message
            alert(_root.title + "当前点击的是一个按钮！");
        });
    }
});
</pre>

### 2.4 核心方法介绍
> * HHJsLib.register()： 就像上面演示的，它是所有外部类运行的事件注册入口，您需要传一个具有`init()`就去的类对象，它会负责帮您做好事件的调用及`init()`构造方法的调用。
> * HHJsLib.extend()：它是扩展HHJsLib的统一调用方法，您只需要传入一个需要扩展的功能类对象，`HHJsLib`内部会把此扩展的方法都加到`HHJsLib`里，之后您便可以像`HHJsLib.extendMethod()`来正常使用，如：

扩展示例：
<pre>
HHJsLib.extend({
    extendMethod: function(params) {
        alert('我成功扩展了一个方法，啊哈哈～' + params); 
    }
});
HHJsLib.extendMethod("Oh yeah!");
</pre>
这里只做一个简的示例，在下面的对话框示例中，我们会有一个更加复杂的扩展示例。
## 3 提示框系列方法示例
现在的网站需要跟用户交互的部分已经越来越多，任何一个网站都可以看到各式各样的提示框。如果您想省事一点，可以直接使用浏览器默认的`alert()`或是`confirm()`来跟浏览者交互，所有提示框没有区分类型，都是使用的默认浏览器的效果，如：
<pre>
//友好提醒用户信息
alert("登陆成功，请点击继续～");    //提示信息
alert("请不要乱操作哦！");         //警告信息
alert("恭喜您，提交成功了！")；     //成功信息
alert("灰常抱歉，服务器正在处理一个错误问题，请您稍后再试！");  //错误信息
//等待用户确认
if(confirm("您真的想离开当前页面吗？")) {
    alert("Ok，期待您的下次到访～");
    return;
}
</pre>
当然，您可能是一个品味要求高的同学，您会说浏览器默认的效果太简单、太丑您打算使用一个赞一点的对话框插件如：`artDialog`（请Google之）。那么，您的提示框代码就可能会写成这样：
<pre>
var dialog = art.dialog({
    title: '欢迎',
    content: '欢迎使用artDialog对话框组件！',
    icon: 'succeed',    //可选的样式有：succeed（成功）、warning（警告）、info（提示）、error（错误）
    follow: document.getElementById('btn2'),
    ok: function(){
        this.title('警告').content('请注意artDialog两秒后将关闭！').lock().time(2);
        return false;
    }
});
</pre>
`artDialog`是个强大的对话框插件，这里只借用一个代码示例，想了解其它效果的同学请自行学习一下。Ok，继续回来～用了`artDialog`后，您可能会说现在的效果不错了，已经达到了您的要求。但是时代是进步的对吧，肯定有一天`artDialog`的效果也会达不到您的要求，这个时候，您就需要进行很麻烦的代码更换操作。特别是使用了浏览器默认方式的同学，相信一定有过满项目找`alert`、`confirm`的痛苦经历吧～

**说那么多，现在才开始讲重点。。。。。。**
> 使用`HHJsLib`的对话框工具系列方法，您可以不管是默认还是**N**种对话框插件中**任意切换**！需要的更换工作量，绝对是您**未曾想到**过的！！！

在使用此系列方法之前请先引入`hhjslib.hhdialog.js`文件，如：
<pre>&lt;script type="javascritp" src="path/to/hhjslib/hhjslib.hhdialog.js"&gt;&lt;/script&gt;</pre>
### 3.1 基本提示信息方法 **HHJsLib.alert()**
<pre>HHJsLib.alert("欢迎使用HHJsLib :D");</pre>
### 3.2 成功提示方法**HHJsLib.succeed()**
<pre>HHJsLib.succeed("欢迎使用HHJsLib，您已经成功调用了succeed方法！");</pre>
### 3.3 提示信息方法**HHJsLib.info()**
<pre>HHJsLib.info("欢迎使用HHJsLib，您已经成功调用了info方法！");</pre>
### 3.4 警告信息方法**HHJsLib.warn()**
<pre>HHJsLib.warn("欢迎使用HHJsLib，您已经成功调用了warn方法！");</pre>
### 3.5 错误信息方法**HHJsLib.error()**
<pre>HHJsLib.error("欢迎使用HHJsLib，您已经成功调用了error方法！");</pre>
### 3.6 询问信息方法**HHJsLib.confirm()**
<pre>
HHJsLib.confirm(
    "真的需要这样做吗？", 
    function() {    //处理“确认”操作的方法
        HHJsLib.info("您点击了确认操作 :D");
    }
);
</pre>

当您运行完这个方法，您可能会疑问：“咦？这不就是浏览器默认的效果吗？吹的吧。。。。”对，您说的没有错，`hhjslib.hhdialog.js`里默认只提供了浏览器的默认效果，所以在没有任何加工的情况下，您所看到的效果是跟自己使用`alert()`、`confirm()`是没有任何区别的。但是，请看我们怎么把默认的效果变成`artDialog`里的效果。Ok, here we go!
### 3.7 整合第三方对话框插件如**`artDialog`**
1) 在您想测试的HTML的文件里引入`artDialog`的必要文件，如：
<pre>
&lt;script type="javascritp" src="path/to/artDialog/jquery.artDialog.js?skin=default"&gt;&lt;/script&gt;
</pre>
2) 如果还没有引入`HHJsLib`的以下两个文件，请现在引入，请确保`artDialog`的文件在`hhjslib.hhdialog.js`之前引入。如：
<pre>
&lt;script type="javascritp" src="path/to/hhjslib/hhjslib.js"&gt;&lt;/script&gt;
&lt;script type="javascritp" src="path/to/hhjslib/hhjslib.hhdialog.js"&gt;&lt;/script&gt;
</pre>
3) 请您手动新建一个js文件，如：`hhdialog-extend.js`。新建完后，请把此js文件也引入到您的页面中，如：
<pre>
&lt;script type="javascritp" src="path/to/hhdialog-extend.js"&gt;&lt;/script&gt;
</pre>
4) 在刚新建的`hhdialog-extend.js`文件里加入如下代码：

<pre>
 HHJsLib.extend({
     /**
      * 重新定义当前弹框的显示方法
      * 
      * 使用Bootstrap的内置方法
      *
      * @author xjiujiu <xjiujiu@foxmail.com>
      * @access public
      * @param  Object msg 需要显示的对象
      * @param  Function callback 回调函数
      * @return false
      */
     dialog: function(msg, type, callback) {
        this.focusTarget(msg.dom);
        var title   = '系统助手提示您';
        var message = this.getMessage(msg);
        var dialog  = art.dialog({
            title: title,
            content: this.getMessage(msg),
            icon: type,
            follow: null,
            ok: function(){
                return 'undefined' === typeof(callback) ? false : callback();
            }
        })
        return false;
     }
 );
</pre>
此时，请您再运行一次之前的`HHJsLib.alert()`、`HHJsLib.succeed()`等五个测试看下，您会看到什么样的效果呢？啊哈哈，如果您能看到现在的效果变成了`artDialog`的弹框效果了的话，那么恭喜您，您已经完成了对`HHJsLib`对话框工具类的自定义扩展（*原理是重写了`HHJsLib`本来的`HHJsLib.dialog()`方法*）！如果哪天您想换回浏览器的默认效果，**您只需要把`artDialog`的相关文件及`hhdialog-extend.js`这个扩展文件去掉即可！**同样，**如果您想换成其它的弹框效果，您也只需要去掉`artDialog`的相关文件，引入新插件的相关文件，再重写一次对`HHJsLib`对话框的扩展，就可以完成全站的弹框效果改版本！**

## 4 验证系列方法示例
对于验证系列的方法，本人觉得是`HHJsLib`里最为闪亮的方法系列！！！为什么这么说呢？
> * 验证方法采用全异常的错误机制，所以使用验证方法的同学，可以不用再一个个的写很是麻烦的`if () {} else {} `了～
> * 验证系列方法分为两种：一是检测值方法，如：`isEmail(vaule)`；一种是基于文档模型的检测方法，如：`isEmailByDom(target)`。这两方法可以让开发人员，只需要使用一行代码，即可完成对用户输入或是业务所需要的检测工作。

我们来示例一个业务场景
> 完成用户登陆的验证提示，包括检测用户名、密码不能为空，密码长度不能少于6位数，用户名需要用邮箱格式。

HTML代码：
<pre>
&lt;form action="###" method="post" id="user-login"&gt;
    &lt;p&gt;邮  箱：&lt;input id="email" name="email" value="" /&gt;&lt;/p&gt;
    &lt;p&gt;密  码：&lt;input id="password" name="password" value="" /&gt;&lt;/p&gt;
    &lt;p&gt;&lt;input type="submit" id="submit-btn" value="提交"/&gt;&lt;/p&gt;
&lt;/form&gt;
</pre>
先让我们用原生`jQuery`的方式来做一次。所有代码如下：
<pre>
$(function() {
    $("#user-login").submit(function() {
        var email        = $("#email").val();
        if(!email) {
            alert('邮箱不能为空！');
            return false;
        }
        var emailRegExp     = /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/i; //网上找个邮件格式匹配的正则，请不要深究，继续按我们的思路走哈～
        if(!emailRegExp.test(email)) {
            alert('邮箱格式不正确！');
            return false;
        }
        var password    = $("#password").val();
        if(!password) {
            alert('密码不能为空！');
            return false;
        }
        if(6 > password.length) {
            alert('密码长度不能少于6位数哦！');
            return false;
        }
        
        return true;
    });
});
</pre>
可能您上面的代码实现的要比我的赞，请留言吐槽我吧～哈哈哈，ok，请让我们继续用`HHJsLib`的验证系列方法来实现这些功能。
在使用验证方法之前，请先引用验证的工具类文件`hhjslib.hhvalidate.js`如：
<pre>
&lt;script type="javascritp" src="path/to/hhjslib/hhjslib.hhvalidate.js"&gt;&lt;/script&gt;
</pre>
继续实现：
<pre>
HHJsLib.register({
    init: function() {
        this.bindUserLoginSubmit();
    },
    bindUserLoginSubmit: function() {
        $("#user-login").submit(function() {
            try {
                HHJsLib.isEmailByDom("#email");
                HHJsLib.isStrLenByDom("#password", "密码", 6);
                return true;
            } catch(e) {
                return HHJsLib.warn(e);
            }
        });
    }
});
</pre>
这里我们使用了**3**里提到的`HHJsLib`对话框工具类方法`HHJsLib.warn()`来处理我们的错误提示。相信，您现在会对`HHJsLib`有点感觉了吧。特别是对于那些需要验证列多的表单，`HHJsLib`的优势会更加的明显，它可以把**N**多的`if() {} else {}`都省掉，代码数据会大大减少，并让我们的代码显得更加的清晰，易维护！

> 验证系列的方法有很多，偶的时间太少，请您耐心等待...明天继续～（已经是明天T_T...）

## 5 小工具系列方法示例
> 正在加班为您赶制中...

## 6 文件工具类示例
> 正在加班为您赶制中...

## 7 对话框类示例
> 正在加班为您赶制中...

## 8 扩展自定义工具示例
> 正在加班为您赶制中...

## 9 国际化支持示例
> 正在加班为您赶制中...
