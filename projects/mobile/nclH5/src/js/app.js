
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
// 设计稿750*1200
var hUnit = bodyWidth/750;
var mainSwiper;
var qrText = window.location.href;
// 二维码设置参数方式
var qrcode = new QRCode('qrcode', {
  text: '',
  width: 256,
  height: 256,
  colorDark : '#000000',
  colorLight : '#ffffff',
  correctLevel : QRCode.CorrectLevel.H
});
//加载资源
var loader = new resLoader({
	resources : [
		'imgs/closebtn.png',
		'imgs/cloud_bg.jpg',
		'imgs/cloud1.png',
		'imgs/cloud2.png',
		'imgs/cloud3.png',
		'imgs/cloud4.png',
		'imgs/cloudbrush_a_.png',
		'imgs/drawbtn.jpg',
		'imgs/drawing_img1.png',
		'imgs/drawing_text.png',
		'imgs/face_text0.png',
		'imgs/face_text1.png',
		'imgs/face_text2.png',
		'imgs/FHg.gif',
		'imgs/line_white.png',
		'imgs/loading.gif',
		'imgs/loading_car.png',
		'imgs/next_btn.png',
		'imgs/next_btn_tip.png',
		'imgs/noPrize_tipimg.png',
		'imgs/p0_bg.jpg',
		'imgs/p0_sea.png',
		'imgs/p0_ship.png',
		'imgs/p1_0bg.jpg',
		'imgs/p1_bg.jpg',
		'imgs/p2_bg.jpg',
		'imgs/p3_bg.jpg',
		'imgs/p1_bg.jpg',
		'imgs/p2_bg.jpg',
		'imgs/p3_bg.jpg',
		'imgs/p4_bg.jpg',
		'imgs/p5_bg.jpg',
		'imgs/p5_title.png',
		'imgs/p5_videoface.jpg',
		'imgs/p7_footer.gif',
		'imgs/p7_logo.png',
		'imgs/p7_title.png',
		'imgs/prize_0.jpg',
		'imgs/prize_1.jpg',
		'imgs/prize_2.jpg',
		'imgs/prize_3.jpg',
		'imgs/prize_4.jpg',
		'imgs/qrcode_ncl.jpg',
		'imgs/seabg.jpg',
		'imgs/ship.png',
		'imgs/submit_success.png',
		'imgs/successbg.jpg',
		'imgs/tryaginbtn.jpg',
		'imgs/win_img1.png',
		'imgs/win_img2.png',
		'imgs/win_img3.jpg'
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
		$("#face-page").addClass('startAnimate');
		timeIit();
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
		//幻灯片初始化
		mainSwiper = new Swiper ('#slider', {
			direction: 'vertical',
			initialSlide:0,
			nextButton: '.swiper-next',
			onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
			    swiperAnimateCache(swiper); //隐藏动画元素 
			    swiperAnimate(swiper); //初始化完成开始动画
			},
			onSlideChangeEnd: function(swiper){
				swiperAnimate(swiper); 
		     	if(swiper.activeIndex == 8){
		     		$("#slider .swiper-next").hide();
		     		console.log('出现二维码');
		     		qrcode.makeCode(qrText);
		     	}else{
		     		$("#slider .swiper-next").show();
		     	}
		    }
		});
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
		if(parseInt(start_Time)==12){
			$("#face-page .cloudbrush").addClass('startAnimate');
			$("#slider .slide0").addClass('animated');
		}
		if(parseInt(start_Time)==13){
			$("#face-page .cloudbrush").addClass('cloudbrush_fadeOut');
		}
		if(parseInt(start_Time)==14){
			$("#face-page").hide();
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
//测试增加
$("#qrcode").click(function(){
	ScanComplete();
});
//扫描完成
function ScanComplete(){
	$("#interact-page").show();
	timeFlag = true;
	fhFlyState  = true;
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
//抽奖按钮
$('#drawbtn').click(function(){
	console.log("抽奖");
	//抽奖中
	drawIng();
	setTimeout(function(){
		drawSuccess('“喜悦号双人免费客房体验券”','./imgs/prize_0.jpg');//中奖
		//drawFail();//未中奖
	},2000);
});
//提交中奖信息
$("#submitbtn").click(function(){
	var username = $.trim($("#userName").val());
	var userEamil = $("#userEamil").val();
	var userPhone = $.trim($("#userPhone").val());
	if(username && /^1[0-9]{10}$/.test(userPhone) && /(\S)+[@]{1}(\S)+[.]{1}(\w)+/.test(userEamil)){
		//提交中奖信息	
		console.log('提交中奖信息');
		submitSuccess();
	}else{
		if(!username){
			alert("请填写姓名");
		}else{
			if(!/(\S)+[@]{1}(\S)+[.]{1}(\w)+/.test(userEamil)){
				alert("你的邮件格式不正确");
			}else{
				if(!/^1[0-9]{10}$/.test(userPhone)){alert("手机号不正确");}
			}
		}
	}
});
//再玩一次
$("#tryaginbtn").click(function(){
	console.log('再玩一次！');
	closeOverLayer();
	$("#interact-page").hide();
	$(".interact-page-footer").hide();
	$("#interact-page .cloudbg").removeClass('animated fadeOut');
	$("#interact-page .fenghuang").attr('style','');
	$("#interact-page .ship").attr('style','');
});
//点击播放视频
$('.slider-video').click(function(event) {
	var videourl = $(this).data('videourl');
	console.log('videourl',videourl);
	$('.over-layer-video video').attr('src',videourl);
	$('.over-layer-video').show();
    if(!music.paused){
        music.pause();
        $("#audioBtn").removeClass("play").addClass("pause");
    }
});
//视频遮盖的关闭
$('.over-layer-video').on('click','.closebtn',function(){
	$(this).parents('.over-layer-video').hide();
	var video = $('.over-layer-video video')[0];
    if(music.paused){
        music.play();
        $("#audioBtn").removeClass("pause").addClass("play");
    }
    if(!video.play){
        video.paused();
    }
});
//抽奖中
function drawIng(){
	openOverLayer('over-layer-drawing');
}
//抽中奖
function drawSuccess(prizeName,prizePic){
	openOverLayer('over-layer-win',prizeName,prizePic);
}
//未抽中奖
function drawFail(){
	openOverLayer('over-layer-noPrize');
}
//信息提交成功
function submitSuccess(){
	openOverLayer('over-layer-success');
}
// 打开遮盖层
function openOverLayer(overLayerName,prizeName,prizePic){
	if(overLayerName == 'over-layer-win'){
		$("#over-layer .prizeName").html(prizeName);
		$("#over-layer .prizePic img").attr('src',prizePic);
	}
	$("#over-layer .over-layer-content").addClass('over-layer-hide').removeClass('over-layer-show');
	$("#over-layer ."+overLayerName).addClass('over-layer-show');
	$("#over-layer").show();
}
// 关闭遮盖层
function closeOverLayer(){
	$("#over-layer .over-layer-content").addClass('over-layer-hide');
	$("#over-layer").hide();
}
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

