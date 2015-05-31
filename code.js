// Copyright (c) 2012 by River Yang. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//todo: 百度的视频搜索可以加上youtube搜索
//todo: 在百度搜索结果页的左侧加上类似Google的搜索工具
var strUrl = window.location.href;
var elem = "<input id='selfBaidu' class='baidu_btn lsb' value='百度一下' type='button' style='margin:0px 0px 0px 5px; border-radius: 2px; font-family:arial,sans-serif; font-size:11px;font-weight:bold;height:30px;line-height:27px;text-align:center;padding:0 8px; min-width:54px; background-color:whiteSmoke;border:1px solid rgba(0, 0, 0, 0.1);color:#666;'>";

if (strUrl.indexOf("www.google.com") != -1) {
    if (strUrl.indexOf("imghp?") != -1) {
        $("#sblsbb>.lsb").after(elem);
    }
	else if (strUrl.indexOf("videohp?") != -1) {
        $("input[name='btnI']").after(elem.replace("baidu_btn lsb","baidu_btn"));
		$("#lst-ib").bind("keyup",keyupFunc);
    }
	else if (strUrl.indexOf("tbm=isch&") != -1) {
        $(".lsb[name='btnG']").parent().parent().parent().after("<td>"+elem+"</td>");
    }
    else if (strUrl.indexOf("tbm=vid&") != -1) {
        $(".lsb[name='btnG']").parent().parent().parent().parent().after("<td>"+elem+"</td>");
    }
	else if (strUrl.indexOf("q=") != -1) {
		$(document).ready(function(){setTimeout("timerFunc()",200);});
    }
    else {
        $(".jsb>center").append("<input value='百度一下' class='baidu_btn' name='btnk' type='submit' >");
        $("#lst-ib").bind("keyup",keyupFunc);
		$("#lst-ib").bind("keydown",keydownFunc);
		$("input[name='btnK']").bind("click",timer);
    }
}
else if (strUrl.search(/(news)|(maps)\.google\.com/) != -1) {
    $("#gbqfb").after(elem);
}
else if (strUrl.indexOf("www.google.cn/music") != -1) {
    $(".music_search_button[name='websearch']").after("<input class='music_search_button baidu_btn' value='百度mp3' type='button'>");
    //alert("test");
}
else if (strUrl.indexOf("ditu.google.cn") != -1) {
    $(".q-outer").parent().after("<td><div>"+elem+"</div></td>");
    //alert("test");
}
else if (strUrl.indexOf("baidu.com") != -1) {
    $("#m").css("width", "750px");
    $("#search").css("width", "1000px");
    if (strUrl.indexOf("video.baidu.com") != -1) {
        $(".m").css("width", "650px");
    }
	else if(strUrl.indexOf("image.baidu.com") != -1) {
        $("#lg").parent().css("width", "780px");
    }
    $(".s_btn_wr,.input_span,.btn_wr").after("<span class='s_btn_wr input_span btn_wr'><input type='button' class='google_btn s_btn sb btn submit' value='google搜索'></span>");
}

$(".baidu_btn").click(search_baidu);
$(".google_btn").click(search_google);
$("input[name='btnk']").click(search_google);
$("#selfBaidu").hover(mouseOver, mouseOut);
function search_baidu() {
	var txt = $("input[name='q']").val();
    if (strUrl.indexOf("www.google.com") != -1 && (strUrl.indexOf("tbm=isch&") != -1 || strUrl.indexOf("imghp?") != -1)) {
        window.location.href = "http://image.baidu.com/i?word=" + txt;
    }
    else if (strUrl.indexOf("news.google.com") != -1||strUrl.indexOf("tbm=nws&") != -1 ) {
        window.location.href = "http://news.baidu.com/ns?word=" + txt;
    }
    else if (strUrl.indexOf("google.cn/music") != -1) {
        if (txt.indexOf("输入歌手") != -1) {
            txt = "";
        }
        window.location.href = "http://mp3.baidu.com/m?word=" + txt;
    }
    else if (strUrl.indexOf("ditu.google.cn") != -1||strUrl.indexOf("maps.google.com") != -1) {
        window.location.href = "http://map.baidu.com/m?word=" + txt;
    }
    else if (strUrl.indexOf("www.google.com") != -1 && (strUrl.indexOf("tbm=vid&") != -1 || strUrl.indexOf("videohp?") != -1)) {
        window.location.href = "http://video.baidu.com/v?word=" + txt;
    }
    else if (strUrl.indexOf("www.google.com") != -1) {
        window.location.href = "http://www.baidu.com/s?wd=" + txt;
    }
}

function search_google() {
    //document.getElementById("tsf").action="http://www.baidu.com/s";
    if (strUrl.indexOf("www.baidu.com") != -1) {
        var txt = document.getElementById("kw").value; //$("#lst-ib").val();
        window.location.href = "https://www.google.com.hk/search?q=" + txt;
    }
    else if (strUrl.indexOf("news.baidu.com") != -1) {
        var txt = document.getElementById("ww").value;
        if (txt.length == 0) {
            window.location.href = "http://news.google.com.hk/nwshp?";
        }
        else {
            window.location.href = "https://www.google.com.hk/search?tbm=nws&q=" + txt;
        }
    }
    else if (strUrl.indexOf("mp3.baidu.com") != -1) {
        var txt = document.getElementById("ww").value;
        window.location.href = "http://www.google.cn/music/search?q=" + txt;
    }
    else if (strUrl.indexOf("image.baidu.com") != -1) {
        var txt = document.getElementById("kw").value;
        window.location.href = "https://www.google.com.hk/search?tbm=isch&q=" + txt;
    }
    else if (strUrl.indexOf("video.baidu.com") != -1) {
        var txt = $("input[name='word']").val();
        if (txt.length == 0) window.location.href = "https://www.google.com.hk/videohp?";
        else window.location.href = "https://www.google.com.hk/search?tbm=vid&q=" + txt;
    }
    else if (strUrl.indexOf("map.baidu.com") != -1) {
        var txt = $("input[name='word']").val();
        window.location.href = "http://ditu.google.cn/maps?hl=zh-CN&q=" + txt;
    }
}

function keyupFunc() {
            var el = $("#baidu_btn2");
            if (el.length == 0) {
                $(".gssb_g").append("<span class='ds'><span class='lsbb'><input type='button' value='百度一下' class='lsb' id='baidu_btn2'></span></span>");
                $("#baidu_btn2").click(search_baidu);
				$("input.lsb").bind("click",timer);
            }
   }
function keydownFunc(event) {
	if(event.keyCode==13){  
		timer();
	}
}
function timerFunc(){
			var el=$(".baidu_btn");
			if(el.length == 0){
			$(".lsb[name='btnG']").parent().parent().parent().parent().after("<td>"+elem+"</td>");	
			$(".baidu_btn").click(search_baidu);
			$("#selfBaidu").hover(mouseOver, mouseOut);
			}
		}
function timer(){
	setTimeout("timerFunc()",1000);
}
		
function mouseOver() {
    $(this).css("color", "black");
    $(this).css("background-color", "buttonface");
    $(this).css("border-radius", "2px");
    //alert("test");
}
function mouseOut() {
    $(this).css("color", "#666");
    $(this).css("background-color", "whiteSmoke");
    $(this).css("border-radius", "0");
}