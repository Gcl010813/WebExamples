//入口函数
$(function () {
    /* 全选框模块 */
    //首部（尾部）的全选框状态
    $('.selAll').change(function () {
        //单个物品的选择状态跟随首部（尾部）
        $('.good .sel').prop('checked', $(this).prop('checked'));
        //尾部（首部）的全选框选择状态跟随首部（尾部）
        $('.selAll').prop('checked', $(this).prop('checked'));
        //物品背景颜色 改变函数
        isCheckedColor();
        //物品总数、总价 填充函数
        getSum();
    });

    //单个物品的选择状态
    $('.good .sel').change(function () {
        //如果处于选中状态的单个物品数量等于物品总数量
        if ($('.good .sel:checked').length === $('.good .sel').length) {
            // 全选框也处于选中状态
            $('.selAll').prop('checked', true);
        }
        else {
            // 全选框也处于未选中状态
            $('.selAll').prop('checked', false);
        };
        //物品背景颜色 改变函数
        isCheckedColor();
        //物品总数、总价 填充函数
        getSum();
    });



    /* 物品购买数量模块 */
    var num = 0;
    var price = 0;
    //减少点击
    $('.num .del').click(function () {
        //先获取物品数量输入框数值
        num = $(this).siblings('input').val();
        //获取当前物品的单价
        price = parseFloat($(this).parents('.good').find('.price').html().substr(1));
        //如果物品数量减少为 1 则不再减少
        if (num <= 1) {
            num = 1;
            $(this).siblings('input').val(num);
        }
        //否则正常递减
        else {
            $(this).siblings('input').val(--num);
        }
        //小计 填充
        $(this).parents('.good').find('strong').text((num * price).toFixed(2));
        //物品总数、总价 填充函数
        getSum();
    });

    //增加点击
    $('.num .add').click(function () {
        //先获取物品数量输入框数值
        num = $(this).siblings('input').val();
        //获取当前物品的单价
        price = parseFloat($(this).parents('.good').find('.price').html().substr(1));
        //如果物品数量增加为 5 则不再增加
        if (num >= 5) {
            num = 5;
            $(this).siblings('input').val(num);
        }
        //否则正常递增
        else {
            $(this).siblings('input').val(++num);
        }
        //小计 填充
        $(this).parents('.good').find('strong').text((num * price).toFixed(2));
        //物品总数、总价 填充函数
        getSum();
    });

    //物品数量输入框数值手动输入
    $('.num input').change(function () {
        //当输入的数量超出阈值后 数值替换为 1
        if ($(this).val() < 1 || $(this).val() > 5) {
            $(this).val(1);
        }
        //获取当前物品的单价
        price = parseFloat($(this).parents('.good').find('.price').html().substr(1));
        //小计 填充
        $(this).parents('.good').find('strong').text(($(this).val() * price).toFixed(2));
        //物品总数、总价 填充函数
        getSum();
    });



    /* 物品删除模块 */
    //单个物品删除
    $('.remove').click(function () {
        $(this).parents('.good').remove();
        //全选框状态 改变函数
        isGoodsCarLength0();
        //物品总数、总价 填充函数
        getSum();
    });

    //选中物品删除
    $('.removeSelected').click(function () {
        //遍历所有物品的选择状态
        $('.sel').each(function (ind, domEle) {
            //若选中
            if ($(domEle).prop('checked')) {
                //删除此物品
                $(domEle).parents('.good').remove();
            };
        });
        //全选框状态 改变函数
        isGoodsCarLength0();
        //物品总数、总价 填充函数
        getSum();
    });

    //清空购物车
    $('.clearCar').click(function () {
        $('.good').remove();
        //全选框状态 改变函数
        isGoodsCarLength0();
        //物品总数、总价 填充函数
        getSum();
    });


    /* 物品总数、总价 填充函数 */
    function getSum() {
        //物品数量
        var count = 0;
        //物品总价
        var money = 0;
        //对所有物品的选择状态进行遍历
        $('.num input').each(function (ind, domEle) {
            //如果当前物品处于选中状态
            if ($(domEle).parents('.good').find('.sel').prop('checked')) {
                //物品总数加上当前物品数量
                count += parseInt($(domEle).val());
                //物品总价加上当前物品花费
                money += parseFloat($(domEle).parents('.good').find('strong').text());
            }
        });
        //物品总数 填充
        $('.selected strong').text(count);
        //物品总价 填充
        $('.paymoney strong').text('￥' + money.toFixed(2));
    };

    /* 全选框状态 改变函数 */
    function isGoodsCarLength0() {
        if ($('.good').length == 0) {
            //若为空 禁用全选框
            $('.selAll').prop('disabled', true);
        }
        else {
            $('.selAll').prop('disabled', false);
        }
    };

    /* 物品背景颜色 改变函数 */
    function isCheckedColor() {
        //遍历所有物品的选择状态
        $('.sel').each(function (ind, domEle) {
            if ($(domEle).prop('checked')) {
                //若选中 变色
                $(domEle).parents('.good').css('backgroundColor', '#fff4e8');
            } else {
                //否则 白色
                $(domEle).parents('.good').css('backgroundColor', 'white');
            }
        });
    };
})