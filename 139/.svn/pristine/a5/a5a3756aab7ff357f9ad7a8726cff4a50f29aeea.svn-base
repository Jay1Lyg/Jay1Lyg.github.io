/**
 * Created by Admin on 2017/7/3.
 */
$(function() {
    function a() {
        if($(".data").val()){
            $(".span-none").addClass('active');
        }
    }
    a();
    $(".font-color").blur(function(){
        var $thisOne=$(this).parent().prev();
//      console.log($inputVal)
//      console.log($(this))
        if($(this).val()===""){
        console.log("不能为空")
            $thisOne.addClass('active');
            $thisOne.prev().removeClass('active');
        }else{
            $thisOne.removeClass('active');
            $thisOne.prev().addClass('active');
            $(".span-none").addClass('active');
            $(".font-color").css("color","black");
        }
    });
    $(".submit-save").click(function () {
        if($(".font1").val()===""||$(".font2").val()===""||$(".font3").val()===""||$(".font4").val()===""){
            alert("没有完善信息");
        }else {
            alert("保存成功")
            $("form").submit();

        }

    });


})
