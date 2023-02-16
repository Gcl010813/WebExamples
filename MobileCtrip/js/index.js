window.addEventListener('load', function () {
    var ad = document.querySelector('.adimg');
    var ul = ad.querySelector('ul');
    var ol = ad.querySelector('ol');
    var ollis = ol.querySelectorAll('li');

    //图片宽度
    var imgWidth = ad.offsetWidth;
    //图片显示的索引
    var indexImg = 0;
    //定时器 自动运行
    var timer = setInterval(function () {
        indexImg++;
        //添加过渡
        ul.style.transition = 'all .5s';
        ul.style.transform = `translateX(${-indexImg * imgWidth}px)`;
    }, 2000);
    //无缝滚动 由于有过渡存在 需要等待过渡效果结束
    ul.addEventListener('transitionend', function () {
        //最后一张图片(实际为第一张)
        if (indexImg >= 3) {
            //快速回位第一张图片的位置
            indexImg = 0;
            //去掉过渡
            ul.style.transition = 'none';
            ul.style.transform = `translateX(${-indexImg * imgWidth}px)`;
            //第一张图片(实际为最后一张)
        } else if (indexImg < 0) {
            //快速回位第一张图片的位置
            indexImg = 2;
            //去掉过渡
            ul.style.transition = 'none';
            ul.style.transform = `translateX(${-indexImg * imgWidth}px)`;
        }
        //小圆圈同步滚动 (排他思想)
        // for (var i = 0; i < ollis.length; i++) {
        //     ollis[i].className = '';
        // }
        // ollis[indexImg % 3].className = 'sel';

        //H5新特性 类名的添加与去除
        ol.querySelector('.sel')/* li */.classList.remove('sel');
        ollis[indexImg].classList.add('sel');
    });

    /* 手指左右拖动效果 */
    //手指点击起始位置
    var figureX = 0;
    //手指移动的距离
    var moveX = 0;
    //是否移动标志
    var flag = false;
    ul.addEventListener('touchstart', function (e) {
        //清除定时器
        clearInterval(timer);
        //获取起始点击坐标
        figureX = e.targetTouches[0].pageX;
    });
    ul.addEventListener('touchmove', function (e) {
        //若发生移动 标志为true
        flag = true;
        //阻止屏幕默认滚动行为
        e.preventDefault();
        //移动的距离 有小数 取整
        moveX = Math.ceil(e.targetTouches[0].pageX - figureX);
        //拖拽移动取消过渡
        ul.style.transition = 'none';
        //当前显示的位置加上鼠标拖拽的距离 
        ul.style.transform = `translateX(${-indexImg * imgWidth + moveX}px)`;
    });
    ul.addEventListener('touchend', function () {
        //鼠标弹起后 若没有发生移动 不进行计算
        if (flag) {
            //标志首先复位
            flag = false;
            //判断移动的距离是否可以触发图片移动
            if (Math.abs(moveX) > 100) {
                //通过移动的正负值来判断移动的方向
                if (moveX > 0) {
                    indexImg--;
                }
                else {
                    indexImg++;
                }
                //移动上|下一张图片
                ul.style.transition = 'all .5s';
                ul.style.transform = `translateX(${-indexImg * imgWidth}px)`;
            }
            //未触发图片移动 图片回位
            else {
                ul.style.transition = 'all .5s';
                ul.style.transform = `translateX(${-indexImg * imgWidth}px)`;
            }
        }
        //重新开启定时器
        clearInterval(timer);
        timer = setInterval(function () {
            indexImg++;
            ul.style.transition = 'all .5s';
            ul.style.transform = `translateX(${-indexImg * imgWidth}px)`;
        }, 2000);
    });



    /* 返回顶部模块 */
    var d = document.querySelector('.goBack');
    var h = document.querySelector('.hot');
    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= h.offsetTop) {
            d.style.display = 'block';
        }
        else {
            d.style.display = 'none';
        }
    });
    //滚动回顶部模块
    var scrollTimer = null;
    var step = 0;
    d.addEventListener('click', function () {
        scrollTimer = setInterval(function () {
            step = Math.floor((0 - window.pageYOffset) / 10);
            if (window.pageYOffset == 0) {
                clearInterval(scrollTimer);
            }
            else {
                // scroll(X轴距离 Y轴距离)
                window.scroll(0, window.pageYOffset + step);
            }
        }, 15);
    });

})
/* 解决click300ms延迟问题 */
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}