/**
 * Created by Admin on 2017/6/30.
 */
$(function () {

        $(".font").on("blur",function () {
            if($(".actorData").val()=="") {
                console.log("不能为空");
            }else if($(".actorData").val()==""){
                $(".actorData").addClass("font-color")
            }
        });
        $(".submit-save").on("click",function () {
            if($(".actorData").val()==""||$(".actorData1").val()==""||$(".font1").val()==""||$(".font2").val()==""||$(".font3").val()==""||$(".font4").val()==""||$(".font5").val()==""){
                console.log("没有填完");
                alert("没有完善信息");

            }else if(!$(".imgDis").attr("src")) {
               alert("请上传封面照");
            }else{
                 alert("保存成功");
                 $(".submit-save").addClass("save");
                $("#form").submit();
                index=true;
            }
        });
         $('#switchCP').click(function () {
              if($('#switchCP').is(':checked')) {
                  $(".agent_tel").removeClass("displayNone");
              }else{
                  $(".agent_tel").addClass("displayNone");
              }
            })
    function isTel(){
        var isTel=$(".isTel").val();
        if( isTel==""){
             // $("#switchCP").attr("checked", false);
            $(".agent_tel").addClass("displayNone");
        }else{
             $("#switchCP").attr("checked", true);
            $(".agent_tel").removeClass("displayNone");
        }
    }
    isTel()
});

