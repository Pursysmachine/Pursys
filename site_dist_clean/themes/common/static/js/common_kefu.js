if ($(window).width() > 767) {
    $('.m-kf1').append("<style>.m-kf1 .kf-item .list-box>ul::after{border-left-color:"+memberSetColor+"}.m-kf1 .kf-item .list-box>ul>li>.wechat-text span::after{border-left-color:"+memberSetColor+"}</style>");
    $('.m-kf2').append("<style>.m-kf2 .kf-item .list-box>ul::after{border-left-color:"+memberSetColor+"}.m-kf2 .kf-item .list-box>ul>li>.wechat-text span::after{border-left-color:"+memberSetColor+"}</style>");
    $('.m-kf3').append("<style>.m-kf3 .kf-item .list-box>ul::after{border-left-color:"+memberSetColor+"}.m-kf3 .kf-item .list-box>ul>li>.wechat-text span::after{border-left-color:"+memberSetColor+"}</style>");
    $('.m-kf4').append("<style>.m-kf4 .kf-item .list-box>ul::after{border-left-color:"+memberSetColor+"}.m-kf4 .kf-item .list-box>ul>li>.wechat-text span::after{border-left-color:"+memberSetColor+"}</style>");
    $('.m-kf8').append("<style>.m-kf8 .kf-item .list-box>ul::after{border-left-color:"+memberSetColor+"}.m-kf8 .kf-item .list-box>ul>li>.wechat-text span::after{border-left-color:"+memberSetColor+"}</style>");
    $('.m-kf9').append("<style>.m-kf9 .kf-item .list-box>ul::after{border-left-color:"+memberSetColor+"}.m-kf9 .kf-item .list-box>ul>li>.wechat-text span::after{border-left-color:"+memberSetColor+"}</style>");
} else {
    $('.m-kf1').append("<style>.m-kf1 .kf-item .list-box>ul::after{border-top-color:"+memberSetColor+"}.m-kf1 .kf-item .list-box>ul>li>.wechat-text span::after{border-top-color:"+memberSetColor+"}</style>");
    $('.m-kf2').append("<style>.m-kf2 .kf-item .list-box>ul::after{border-top-color:"+memberSetColor+"}.m-kf2 .kf-item .list-box>ul>li>.wechat-text span::after{border-top-color:"+memberSetColor+"}</style>");
    $('.m-kf3').append("<style>.m-kf3 .kf-item .list-box>ul::after{border-top-color:"+memberSetColor+"}.m-kf3 .kf-item .list-box>ul>li>.wechat-text span::after{border-top-color:"+memberSetColor+"}</style>")
    $('.m-kf4').append("<style>.m-kf4 .kf-item .list-box>ul::after{border-top-color:"+memberSetColor+"}.m-kf4 .kf-item .list-box>ul>li>.wechat-text span::after{border-top-color:"+memberSetColor+"}</style>");
    $('.m-kf8').append("<style>.m-kf8 .kf-item .list-box>ul::after{border-top-color:"+memberSetColor+"}.m-kf8 .kf-item .list-box>ul>li>.wechat-text span::after{border-top-color:"+memberSetColor+"}</style>");
    $('.m-kf9').append("<style>.m-kf9 .kf-item .list-box>ul::after{border-top-color:"+memberSetColor+"}.m-kf9 .kf-item .list-box>ul>li>.wechat-text span::after{border-top-color:"+memberSetColor+"}</style>");
}
$(".m-kf1 .kf-item .list-box>ul>li>.wechat-text span").css("background-color", memberSetColor);
$(".m-kf1 .kf-item .list-box>ul").css("background-color", memberSetColor);
$(".m-kf1 .kf-item").hover(function () {
    $(this).css("background-color", memberSetColor);
}, function () {
    $(this).css("background-color", "unset");
})
$(".m-kf1 .kf-item").hover(function () {
    $(this).find(".icon").css("color", "#fff");
}, function () {
    $(this).find(".icon").css("color", memberSetColor);
})
$(".m-kf2 .kf-item .list-box>ul>li>.wechat-text span").css("background-color", memberSetColor);
$(".m-kf2 .kf-item .list-box>ul").css("background-color", memberSetColor);
$(".m-kf2 .kf-item").each(function (index,item) {
    $(item).css("background-color",memberSetColor);
    $(item).find(".icon").css("color","#fff");
})
$(".m-kf2 .kf-item").hover(function () {
    $(this).css("background-color",memberSetColor+"bf");
},function () {
    $(this).css("background-color",memberSetColor);
})

$(".m-kf4 .kf-item .list-box>ul>li>.wechat-text span").css("background-color", memberSetColor);
$(".m-kf4 .kf-item .list-box>ul").css("background-color", memberSetColor);
$(".m-kf4 .kf-item .list-box>ul>li>.wechat-text span").css("background-color",memberSetColor)
$(".m-kf4 .kf-item .list-box>ul").css("background-color",memberSetColor);
$(".m-kf4 .kf-item").hover(function () {
    $(this).css("background-color",memberSetColor);
    $(this).find("i").css("background-color",memberSetColor);
},function () {
    $(this).css("background-color","unset");
    $(this).find("i").css("background-color","#dcdcdc");
})
$(".m-kf4 .kf-item").hover(function () {
    $(this).find(".icon").css("color","#fff");
},function () {
    $(this).find(".icon").css("color",memberSetColor);
})

$(".m-kf5-top").css("background-color",memberSetColor);
$(".m-kf5-top").click(function(){
    $(this).closest(".m-kf5").toggleClass("active")
})
$(".m-kf6 .kf-item .list-box>ul>li>.wechat-text span").css("background-color", memberSetColor);
$(".m-kf6 .kf-item .list-box>ul").css("background-color", memberSetColor);
$(".m-kf6 .kf-item").each(function (index,item) {
    $(item).css("background-color",memberSetColor);
})
$(".m-kf6 .kf-item").hover(function () {
    $(this).css("background-color",memberSetColor+"bf");
},function () {
    $(this).css("background-color",memberSetColor);
})
$(".m-kf7 .kf-item::before").css("background-color", memberSetColor);
$(".m-kf7 .kf-item .list-box>ul>li>.wechat-text span").css("background-color", memberSetColor);
$(".m-kf7 .kf-item .list-box>ul").css("background-color", memberSetColor);
$(".m-kf7 .kf-item").hover(function () {
    $(this).css("background-color", memberSetColor);
}, function () {
    $(this).css("background-color", "#fff");
})
$(".m-kf7 .kf-item").hover(function () {
    $(this).find(".icon").css("color", "#fff");
}, function () {
    $(this).find(".icon").css("color", memberSetColor);
})

$(".m-kf8 .kf-item .list-box>ul>li>.wechat-text span").css("background-color", memberSetColor);
$(".m-kf8 .kf-item .list-box>ul").css("background-color", memberSetColor);
$(".m-kf8 .kf-item").each(function (index,item) {
    $(item).css("background-color",memberSetColor);
    $(item).find(".icon").css("color","#fff");
})
$(".m-kf8 .kf-item").hover(function () {
    $(this).css("background-color",memberSetColor+"bf");
},function () {
    $(this).css("background-color",memberSetColor);
})

$(".m-kf9").css("background-color",memberSetColor);
$(".m-kf9 .kf-item .list-box>ul>li>.wechat-text span").css("background-color", memberSetColor);
$(".m-kf9 .kf-item .list-box>ul").css("background-color", memberSetColor);
$(".m-kf9 .kf-item .item").each(function (index,item) {
    $(item).css("background-color",memberSetColor);
    $(item).find(".icon").css("color","#fff");
})
$(".m-kf9 .kf-item .item").hover(function () {
    $(this).css("background-color",memberSetColor+"bf");
},function () {
    $(this).css("background-color",memberSetColor);
})
$(".m-kf10 .kf-item").hover(function () {
    $(this).css("border-left-color",memberSetColor);
},function () {
    $(this).css("border-left-color", "#fff");
})
$(function () {
    $(".kf-item").each(function (index, item) {
        if ($(item).find(".list-box ul li").length == 0) {
            $(item).find(".list-box").remove()
        }
    })
    if ($(window).width() < 767) {
        let weChatInd = $(".wechat-box").index();
        let kfItemLen = $(".kf-item").length - 1;
        if (weChatInd >= (kfItemLen / 2)) {
            // 右侧
            $(".wechat-box .list-box").css("cssText", "left: 0;right:auto")
            let $li = $(".wechat-box")
            let $liW;
            if($li.length ==0){
                $liW=0
            }else{
                $liW = $li.offset().left
            }

            let width = $("body").outerWidth(true) - ($("body").outerWidth(true) - $liW) - 50
            $(".kf-item .list-box>ul>li>.wechat-text").css({
                left: "auto",
                right: "100%",
                "text-align": "right",
                "width": width
            })
        } else {
            // 左侧
            $(".wechat-box .list-box").css("cssText", "left: 0;right:auto")
            let $li = $(".wechat-box")
            let $liW;
            if($li.length ==0){
                $liW=0
            }else{
                $liW = $li.offset().left + $li.outerWidth(true)
            }
            let width = $("body").outerWidth(true) - $liW - 50
            $(".kf-item .list-box>ul>li>.wechat-text").css({
                left: "100%",
                right: "auto",
                "text-align": "left",
                "width": width
            })
        }
    }
})
