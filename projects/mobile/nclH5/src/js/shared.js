
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
// 设计稿750*1200
var hUnit = bodyWidth/750;
var qrText = window.location.href;
//加载资源
var loader = new resLoader({
	resources : [
		'imgs/loading.gif',
		'imgs/loading_car.png',
		'imgs/p7_logo.png',
		'imgs/p7_title.png',
		'imgs/p0_bg.jpg',
		'imgs/p0_cloud.png',
		'imgs/p0_sea.png',
		'imgs/p0_ship.png',
		'imgs/cloud_bg.jpg',
		'imgs/cloud1.png',
		'imgs/cloud2.png',
		'imgs/cloud3.png',
		'imgs/cloud4.png',
		'imgs/cloudbrush_b_.png',
		'imgs/drawbtn_.jpg',
		'imgs/FHg.gif'
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
		$("#loading").hide();
		$("#main").show();
		// var firstTouch = true;
		// $('body').bind("touchstart", function(e) {
		//     if (firstTouch) {
		//     	$("#audioBtn").show();
		//         firstTouch = false;
		//         document.getElementById('bgMusic').play();
		//     } else {
		//         return;
		//     }
		// });
	}
});
loader.start();

var timeFlag = false;
var fhFlyState = false;
var shipmoveState = false;
var time_int;
var start_Time = 0;
function timeIit(){
	time_int = window.setInterval(function(){
		start_Time += 1/24;
		if(parseInt(start_Time)==14){
			$("#face-page").hide();
			$("#slider .slide0").addClass('animated');
		}
		if (timeFlag){
			var FHml = parseInt($(".fenghuang").css('margin-left').split("px")[0]);
			var shipMl = parseInt($(".ship").css('left'));
			//console.log('ml',ml);
			//console.log('shipMl',shipMl);
			if(FHml+$(".fenghuang").width()>bodyWidth && fhFlyState){
				console.log('凤凰到边界');
			}
			if(FHml>bodyWidth && fhFlyState){
				console.log('凤凰出屏幕');
				fhFlyState  = false;
				$(".fenghuang").hide();
				$("#interact-page .cloudbg").addClass('animated fadeOut');
				$("#interact-page .cloudbrush").addClass('startAnimate');
				shipmoveState = true;
				$("#interact-page").addClass('startAnimate');
				setTimeout(function(){
					$("#interact-page .cloudbrush").addClass('cloudbrush_fadeOut');
				},1000);
			}
			if($(".ship").width()+shipMl>bodyWidth>0 && shipmoveState){
				console.log('船到边界');
			}
			if(shipMl>bodyWidth && shipmoveState){
				console.log('船出屏幕');
				shipmoveState  = false;
				timeFlag = false;
				$(".interact-page-footer").show();
			}
			fhFly();
			shipmove();
		}
	}, 1000/24)
}
//扫描完成
function ScanComplete(){
	$("#interact-page").show();
	timeFlag = true;
	fhFlyState  = true;
	timeIit();
}
// 船移动
var ship_vx = 4;//x轴速度
var ship_vy = -0.2;//y轴速度
function shipmove(){
	if(shipmoveState && !fhFlyState){
		var ml = parseInt($(".ship").css('left'));
		var mb = parseFloat($(".ship").css('bottom'));
		// console.log(mb+ship_vy);
		$(".ship").show();
		$(".ship").css({
			'left':ml+ship_vx,
			'bottom':mb+ship_vy
		});
	}
}
//凤凰飞行
var fly_vx = 4;//x轴速度
var fly_vy = 0;//y轴速度
var fly_ay = -0.05;//y轴加速度
function fhFly(){
	if(fhFlyState){
		var ml = parseInt($(".fenghuang").css('margin-left').split("px")[0]);
		var mt = parseFloat($(".fenghuang").css('margin-top').split("px")[0]);
		var transformRotate = $(".fenghuang").css('transform');
		//console.log('mt',mt,'fly_vy',fly_vy,'tr',transformRotate);
		$(".fenghuang").show();
		fly_vy = fly_vy+fly_ay;
		if(fly_vy<-2.4 || fly_vy>2){
			fly_ay = -fly_ay;
		}
		$(".fenghuang").css('margin-top',mt+fly_vy);
		$(".fenghuang").css('margin-left',ml+fly_vx);
	}
}
ScanComplete();
//我也想抽奖
$("#wantDrawbtn").click(function(){
	console.log('我也想抽奖')
	window.location.href =  'index.html';
});

//音乐控制
var music = document.getElementById("bgMusic");
$("#audioBtn").click(function(){
    if(music.paused){
        music.play();
        $("#audioBtn").removeClass("pause").addClass("play");
    }else{
        music.pause();
        $("#audioBtn").removeClass("play").addClass("pause");
    }
});

