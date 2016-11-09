
var bodyWidth = document.body.offsetWidth;
var bodyHeight = document.body.offsetHeight;
//设计稿750*1206
var hUnit = bodyWidth/750;
var vUnit = bodyHeight/1200;
//加载资源
var loader = new resLoader({
	resources : [
	  	"./imgs/loading.gif",
	  	"./imgs/go.gif"
	],
	onStart : function(total){
	},
	onProgress : function(current, total){
	},
	onComplete : function(total){
		//console.log('加载完毕:'+total+'个资源');
		loadIn();
	}
});
loader.start();

var Media = document.getElementById("video") || null;
function loadIn(){
	$("#loading").hide();
	$("#main").show();
}
//播放视频按钮
$("#playbtn").click(function(){
	$("#playbtn").hide();
	$("#video-box").show();
	Media.play();
});
//监听视频是否播放完毕
Media.addEventListener('ended',function(){
	alert('test');
	window.location.href = "./share.html";
});
$('body').bind("touchmove", function(e) {e.preventDefault();});
