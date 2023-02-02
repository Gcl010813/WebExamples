var Car = document.querySelector('.Carousel');
var left = Car.querySelector('.left');
var right = Car.querySelector('.right');
var ul = Car.querySelector('ul');
var ol = Car.querySelector('ol');
var flag = 0;
var imgWidth = ul.children[0].offsetWidth;

//鼠标经过 箭头显示
Car.addEventListener('mouseenter', function () {
    left.style.display = 'block';
    right.style.display = 'block';
    clearInterval(autoAnimate);
    autoAnimate = null;
})

//鼠标离开 箭头隐藏
Car.addEventListener('mouseleave', function () {
    left.style.display = 'none';
    right.style.display = 'none';
    autoAnimate = setInterval(function () {
        right.click();
    }, 2000);
})

//根据ul中图片的数量创建ol中的li
for (var i = 0; i < ul.children.length; i++) {
    var li = document.createElement('li');
    li.setAttribute('data-index', i);
    ol.appendChild(li);
    li.addEventListener('click', function () {
        flag = this.getAttribute('data-index');
        animate(ul, -flag * imgWidth, circle())
    })
}
//默认第一个图片选中 对应的小圆圈也选中
ol.children[0].className = 'selected';
//克隆第一张图片 实现无缝滚动
var liClone = ul.children[0].cloneNode(true);
ul.appendChild(liClone);

//左箭头被点击
left.addEventListener('click', function () {
    if (flag == 0) {
        ul.style.left = -(ul.children.length - 1) * imgWidth + 'px';
        flag = ul.children.length - 1;
    }
    flag--;
    animate(ul, -flag * imgWidth, circle());
})

right.addEventListener('click', function () {
    if (flag == ul.children.length - 1) {
        ul.style.left = 0 + 'px';
        flag = 0;
    }
    flag++;
    animate(ul, -flag * imgWidth, circle());
})

//小圆圈同时变化
function circle() {
    for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = '';
    }
    ol.children[flag % ol.children.length].className = 'selected';
}

var autoAnimate = setInterval(function () {
    right.click();
}, 2000)

//缓动动画
function animate(obj, target, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
        }
        else {
            obj.step = (target - obj.offsetLeft) / 10;
            obj.step = obj.step > 0 ? Math.ceil(obj.step) : Math.floor(obj.step);
            obj.style.left = obj.offsetLeft + obj.step + 'px';
        }
    }, 15)
}