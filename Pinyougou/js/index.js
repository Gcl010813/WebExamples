window.addEventListener('load', function () {
    var focus = document.querySelector('.main').querySelector('.focus');
    var left = focus.querySelector('.left');
    var right = focus.querySelector('.right');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    var ulflag = 0, imgWidth = ul.children[0].offsetWidth;
    //左右箭头鼠标经过显示
    focus.addEventListener('mouseenter', function () {
        left.style.display = 'block';
        right.style.display = 'block';
        //清除定时器
        clearInterval(timer);
        //清除定时器变量
        timer = null;
    });
    //左右箭头鼠标离开隐藏
    focus.addEventListener('mouseleave', function () {
        left.style.display = 'none';
        right.style.display = 'none';
        //重新开启定时器
        timer = setInterval(function () {
            right.click();
        }, 2000);
    });
    //根据图片的数量动态生成小圆圈的数量 并为其添加点击事件（改变颜色 图片更换）
    for (var i = 0; i < ul.children.length; i++) {
        //创建元素
        var li = document.createElement('li');
        //设置自定义属性 方便后续计算
        li.setAttribute('data-index', i);
        //添加元素
        ol.appendChild(li);
        //利用排它思想 清除所有样式为自己添加样式
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'selected';
            //缓动动画 根据小圆圈的索引位置 控制轮播图ul.left的数值
            animate(ul, -this.getAttribute('data-index') * imgWidth);
            //同步 ulflag 和 data-index 数据 图片和小圆圈同时变化
            ulflag = this.getAttribute('data-index');
        })
    };
    //默认第一个小圆圈选中
    ol.children[0].className = 'selected';
    //克隆第一张图片 实现无缝滚动
    var liClone = ul.children[0].cloneNode(true);
    ul.appendChild(liClone);
    //左箭头点击切换
    left.addEventListener('click', function () {
        //当显示第一张图片时 迅速切换到最后一张图片（克隆第一张的图片）位置
        if (ulflag == 0) {
            //轮播图 left 更改为最后一张图片（克隆的图片）的 left 位置 实现下一次点击时无缝滚动
            ul.style.left = -(ul.children.length - 1) * imgWidth + 'px';
            //标志置为最后一张图的索引
            ulflag = ul.children.length - 1;
        }
        //点击更新索引值
        ulflag--;
        //调用动画 移动距离为当前图片索引 * 图片距离  调用回调函数 同步更新小圆圈样式
        animate(ul, -ulflag * imgWidth, circle(ulflag));
    });
    //右箭头点击切换
    right.addEventListener('click', function () {
        //当显示最后一张图片（克隆第一张的图片）时
        if (ulflag == ul.children.length - 1) {
            //更改轮播图 left 值为0 无缝转移到第一张图片的位置
            ul.style.left = 0 + 'px';
            //标志置为第一张图片的索引
            ulflag = 0;
        }
        //点击更新索引值
        ulflag++;
        //调用动画 移动距离为当前图片索引 * 图片距离  调用回调函数 同步更新小圆圈样式
        animate(ul, -ulflag * imgWidth, circle());

    });
    //小圆圈动态变化
    function circle() {
        //排它思想
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //同步图片索引的值 当前小圆圈添加样式 （由于存在克隆的节点 ul内轮播图li 比 ol内小圆圈li 多一个 需要通过对ol内li的数量进行取余来实现第一个和最后一个小圆圈同步）
        ol.children[ulflag % ol.children.length].className = 'selected';
    }
    //自动播放
    var timer = setInterval(function () {
        //模拟手动点击
        right.click();
    }, 2000);
});

/* 电梯导航 jQ */
$(function () {
    //节流阀（互斥锁）避免点击电梯导航页面滚动时 背景颜色逐次的变化现象
    var flag = true;
    //页面重新加载时 判断电梯导航是否需要隐藏
    backsTool();

    function backsTool() {
        if ($(window).scrollTop() > 700) {
            $('.backs').fadeIn();
        }
        else {
            $('.backs').fadeOut();
        }
    };

    var MaxIndex = 0;
    //页面发生滚动时 也要进行判断
    $(window).scroll(function () {
        backsTool();
        //因为点击事件触发的页面滚动 互斥锁开启 不做反应
        if (flag) {
            $('.floor').each(function (index, domEle) {
                /* method.1 bug -> 页面回滚时 电梯导航背景切换不及时 */
                // if ($(window).scrollTop() >= $(domEle).offset().top) {
                //     MaxIndex = MaxIndex > index ? MaxIndex : index;
                // }
                // else {
                //     MaxIndex = MaxIndex > index ? index : MaxIndex;
                // }
                // console.log(MaxIndex);
                // $('.backs li').eq(MaxIndex + 1).addClass('selectedLi').siblings().removeClass();

                /* method.2 bug -> index值循环打印 */
                if ($(window).scrollTop() >= $(domEle).offset().top) {
                    $('.backs li').eq(index + 1).addClass('selectedLi').siblings().removeClass();
                    // console.log(index);
                }
            })
        }
    });

    //对 a 标签获取索引值时 由于每个 li 元素内只含有一个 a 元素 index恒等于0
    $('.backs li').click(function () {
        //点击之后 互斥锁开启
        flag = false;
        $(this).addClass('selectedLi').siblings().removeClass();
        //获取当前 a 元素位于父级模块 .backs 中的索引
        var ind = $(this).index();
        if (ind == 0) {
            //返回顶部
            $('html').animate({ scrollTop: 0 });
        }
        else {
            $('html').animate({
                //返回每个模块对应的位置 模板字符串获取类名
                scrollTop: $(`.f${ind}`).offset().top
            }, function () {//animate自带的回调函数 动画执行完毕后 互斥锁打开 便于页面滚动
                flag = true;
            });
        }
    });
})