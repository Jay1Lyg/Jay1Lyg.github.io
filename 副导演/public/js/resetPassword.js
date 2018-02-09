/**
 * Created by Admin on 2017/7/21.
 */
var isPhone = 1;
function getCode(e){
    checkPhone(); //验证手机号码
    pasw();    //验证密码
    if(isPhone){
       
        var phone=$("#phone").val();
        var password=$("#pasd").val();
        $.ajax({
            type : "post",
            url : "http://www.901vehicle.cn/WX/SMSverificationForChangePsw",
            dataType : "jsonp",
            data : {
                telephone:phone,
                password:password
            },
            success : function(data){
                if(data.status==false){
                        alert("该用户不存在")
                  }
                  if(data.status==true){
                    resetCode();
                    console.log("获取验证码")
                  }

            }
        });
    }else{
        $('#phone').focus();
    }

};
function checkPhone(){
    var phone = $('#phone').val();
    var pattern = /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/;
    isPhone = 1;
    if(phone == '') {
        alert('请输入手机号码');
        isPhone = 0;
        return;
    }
    if(!pattern.test(phone)){
        alert('请输入正确的手机号码');
        isPhone = 0;
        return;
    }
}
//倒计时
function resetCode(){
    $('#J_getCode').hide();
    $('#J_second').html('60');
    $('#J_resetCode').show();
    var second = 60;
    var timer = null;
    timer = setInterval(function(){
        second -= 1;
        if(second >0 ){
            $('#J_second').html(second);
        }else{
            clearInterval(timer);
            $('#J_getCode').show();
            $('#J_resetCode').hide();
        }
    },1000);
};
function pasw () {
    var pasd = $('#pasd').val();
    var pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,16})$/;
    isPhone = 1;
    if(pasd == '') {
        alert('请输入密码');
        isPhone = 0;
        return;
    }
    if(!pattern.test(pasd)){
        alert('密码6-16位，字母数字混合');
        isPhone = 0;
        return;
    }

};
