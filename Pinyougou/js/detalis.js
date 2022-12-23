window.addEventListener('load', function () {
    /* 放大镜效果 */
    var detail = document.querySelector('.detail');
    var productImg = detail.querySelector('.productImg');
    var mask = productImg.querySelector('.mask');
    var bigProductImg = detail.querySelector('.bigProductImg');
    var bigImg = bigProductImg.querySelector('img');
    productImg.addEventListener('mouseover', function () {
        //修改鼠标样式
        this.style.cursor = 'move';
        mask.style.display = 'block';
        bigProductImg.style.display = 'block';
        //鼠标移动事件
        document.addEventListener('mousemove', move)
        function move(e) {
            //鼠标在页面中的位置 - 产品框距离页面的盒子(产品框距父级框的距离 + 产品框的父级框距离页面的距离) - 遮罩层宽度的一半(鼠标居中显示)
            var mouseX = e.pageX - productImg.offsetLeft - detail.offsetLeft - mask.clientWidth / 2;
            var mouseY = e.pageY - productImg.offsetTop - detail.offsetTop - mask.clientHeight / 2;
            //限制遮罩层的位置   最大边距为盒子的宽度减去遮罩层的宽度
            var mouseMaxX = productImg.clientWidth - mask.clientWidth;
            var mouseMaxY = productImg.clientHeight - mask.clientHeight;

            if (mouseX < 0) {
                mouseX = 0;
            }
            if (mouseX > mouseMaxX) {
                mouseX = mouseMaxX;
            }
            if (mouseY < 0) {
                mouseY = 0;
            }
            if (mouseY > mouseMaxY) {
                mouseY = mouseMaxY;
            }
            //遮罩层的位置
            mask.style.left = mouseX + 'px';
            mask.style.top = mouseY + 'px';
            //放大镜图的位置
            /**
             *    遮罩层移动的距离            放大镜图显示部分距边框距离
             * ————————————————————   =   ——————————————————————————————
             * 遮罩层可移动的最大距离       放大镜图显示部分距边框的最大距离
             * */

            var bigMouseMaxX = bigProductImg.clientWidth - bigImg.clientWidth;
            var bigMouseMaxY = bigProductImg.clientHeight - bigImg.clientHeight;
            bigImg.style.left = mouseX / mouseMaxX * bigMouseMaxX + 'px';
            bigImg.style.top = mouseY / mouseMaxY * bigMouseMaxY + 'px';
        }

        //鼠标移出产品框 遮罩层 放大镜隐藏
        this.addEventListener('mouseout', function () {
            mask.style.display = 'none';
            bigProductImg.style.display = 'none';
            //删除鼠标移动事件 防止后台检测鼠标移动而浪费内存
            document.removeEventListener('mousemove', move);
        })
    })


    /* 商品详情页 */
    var tits = document.querySelector('.goodsHead').querySelectorAll('li');
    var cons = document.querySelector('.goodsBody').querySelectorAll('div');
    var flag = 0;
    for (var i = 0; i < tits.length; i++) {
        tits[i].setAttribute('ind', i);//提前设定索引号 便于内容模块获取索引值发生变化
        tits[i].onclick = function () {
            tits[flag].removeAttribute('class');//tit删除上一个flag标签的属性
            this.className = 'headEye';//对当前标签添加属性
            cons[flag].removeAttribute('class');//con删除上一个flag标签的属性
            flag = this.getAttribute('ind');//获取发生变化的tit中li的ind值
            cons[flag].className = 'bodyEye';//cons中对应位置也发生变化
        }
    }

    /* 购买数量 */
    var count = document.querySelector('.buyCount');
    var add = count.querySelector('.add');
    var del = count.querySelector('.del');
    var input = count.querySelector('input');
    var total = count.querySelector('.total');
    var price = parseInt(document.querySelector('.nowprice').innerHTML.slice(0, -1));
    var tnum = 0;
    add.addEventListener('click', function () {
        tnum += 1;
        input.value = tnum;
        total.innerHTML = tnum * price;
    })
    del.addEventListener('click', function () {
        tnum -= 1;
        if (tnum > 0) {
            input.value = tnum;
            total.innerHTML = tnum * price;
        }
        else {
            tnum = 1;
        }
    })
})
