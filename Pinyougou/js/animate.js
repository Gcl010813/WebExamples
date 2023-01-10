function animate(obj, target, callback) { //callback=function(){dh3.style.backgroundColor = 'pink';}
    clearInterval(obj.timer);
    //使用对象属性 减少内存空间的占用
    obj.timer = setInterval(function () {
        //存在bug pc像素值无法判别小于0.5的情况 特殊情况下无法令offsetLeft==target 定时器无法被清除 仍在一直运行
        //解决办法
        //当向left增大的方向运动时 采用向上取整的方式 Math.ceil()（已经移动过的小数部分像素值若是向下取整元素会回退）
        //当向left减小的方向移动时 采用向下取整的方式 Math.floor()（值为负数 越小越往左边移动）
        obj.step = (target - obj.offsetLeft) / 10;
        obj.step = obj.step > 0 ? Math.ceil(obj.step) : Math.floor(obj.step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            //检测是否有回调函数
            if (callback) {
                callback();
            }
        }
        else {
            obj.style.left = obj.offsetLeft + obj.step + 'px';
        }
    }, 15);
}