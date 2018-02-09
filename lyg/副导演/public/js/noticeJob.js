/**
 * Created by Admin on 2017/7/5.
 */
var position=$(".position").val();
var department=$(".department").val();
var select_age=$(".select_age").val();
var select_sex=$(".select_sex").val();
var recruit_number=$(".recruit_number").val();
var recruit_adress=$(".recruit_adress").val();
var time_end=$(".time_end").val();
var describe=$(".describe").val();
$("#subMit").on("click",function () {
    if($(".actorData").val()===""){
        console.log("没有填完");
        alert("没有完善信息")
    }else {
        var params =  {
            position:position,
            department:department,
            select_age:select_age,
            select_sex:select_sex,
            recruit_number:recruit_number,
            recruit_adress:recruit_adress,
            time_end:time_end,
            describe:describe
        };
        console.log(params);
        $.ajax({
            url: 'http://www.901vehicle.cn/WX/wx_pubulishpositiondetail/'+ !{JSON.stringify(user_id)}+'/'+ !{JSON.stringify(production_crews_id)},
            data: params,
            type: "Post",
            dataType: "text",
            success: function (data) {
               alert("请求成功"+data)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("请求服务器失败");
            }
        });
        // flag=true;
        // if(flag){
        //     $.modal({
        //         title:"成功",
        //         text:"发布通告成功",
        //         buttons:[{
        //             text:"确定",onClick:function () {
        //                 console.log("确定")
        //                 $(window).attr('location','https://www.baidu.com');
        //             }
        //         }]
        //     });
        // }



    }
});
