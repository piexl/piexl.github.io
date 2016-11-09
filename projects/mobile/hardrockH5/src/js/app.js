
$('body').bind("touchmove", function(e) {e.preventDefault();});
var bodyWidth = document.body.offsetWidth;
var bodyHeight = document.body.offsetHeight;
//设计稿750*1206
var hUnit = bodyWidth/750;
var vUnit = bodyHeight/1200;
//加载资源
var loader = new resLoader({
	resources : [
	  	"./imgs/loading.gif",
	  	"./imgs/go.gif",
	  	"./imgs/movie.mp4"
	],
	onStart : function(total){
		console.log('start:'+total);
	},
	onProgress : function(current, total){
		console.log(current+'/'+total);
		// var percent = Math.ceil(current/total*100);
		// if(percent>100){percent=100}
		// $('.progress').empty().html(percent+'%');
	},
	onComplete : function(total){
		//console.log('加载完毕:'+total+'个资源');
		loadIn();
	}
});
loader.start();
var bgmusic,
	switchMusic,
	video;
// 开关音效
video = document.getElementById("video") || null;
function loadIn(){
	$("#loading").hide();
	$("#main").show();
}
//播放视频按钮
$("#playbtn").click(function(){
	$("#playbtn").hide();
	$("#video-box").show();
	video.play();
});
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
//监听视频是否播放完毕
video.addEventListener('ended',function(){
  //$("#cover").show();
  window.location.href = "./share.html";
});
//分享按钮事件
$("body").on('click','.sharebtn',function(){
	$("#over-layer-share").show();
});
//遮盖背景的事件
$(".over-layer").on('click','.over-layer-bg',function(){
	$(this).parents('.over-layer').hide();
});