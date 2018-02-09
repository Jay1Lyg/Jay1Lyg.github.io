/**
 * Created by Admin on 2017/7/5.
 */
$(function () {

    $(".look-over").click(function () {
        var user_id;
        var src = document.scripts[document.scripts.length - 1].src;
        var args = src.substr(src.indexOf("?") + 1).split("&");
        for ( var i = 0; i < args.length; i++) {
            var j = args[i].indexOf("=");
            if (j > -1 && args[i].substr(0, j) == 'user_id') {
                user_id = args[i].substr(j + 1);
            }
        }
        alert(user_id);
        var code=$("#start").attr("data-code");
        var production_name=$(".production_name").val();
        var category_id=$(".category_id").val();
        var areaCode=$(".areaCode").val();
        var production_companies=$(".production_companies").val();
        var issuser_companies=$(".issuser_companies").val();
        var account=$(".account").val();
        var date=$(".date").val();
        if($(".actorData").val()===""){
            console.log("没有填完");
            alert("没有完善信息")

        }else {

            // $.ajax({
            //     type : "post",
            //     url : "http://www.kaishiapp.com/WX/wx_publishpositionInfo",
            //     data : {
            //         production_name:production_name,
            //         category_id:category_id,
            //         areaCode:areaCode,
            //         code:code,
            //         production_companies:production_companies,
            //         issuser_companies:issuser_companies,
            //         account:account,
            //         date:date
            //     },
            //     dataType : "jsonp",
            //     success : function(data){
            //         console.log('我就是大神'+data);
            //        // location.href="http://www.kaishiapp.com";
            //     }
            // });
            var params =  {
                    production_name:production_name,
                    category_id:category_id,
                    areaCode:areaCode,
                    code:code,
                    production_companies:production_companies,
                    issuser_companies:issuser_companies,
                    account:account,
                    date:date
                };
                console.log(params);
            $.ajax({
                url: 'http://www.901vehicle.cn/WX/wx_publishpositionInfo',
                data: params,
                type: "Post",
                dataType: "text",
                success: function (data) {
                    $(window).attr('location',data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("请求服务器失败");
                }
            });
             
        }



        //
    })
});