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

## 3 验证系列方法示例
> 正在加班为您赶制中...

## 4 小工具系列方法示例
> 正在加班为您赶制中...

## 5 文件工具类示例
> 正在加班为您赶制中...

## 6 对话框类示例
> 正在加班为您赶制中...

## 7 扩展自定义工具示例
> 正在加班为您赶制中...
