
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
		'imgs/loading.gif',
		'imgs/loading_car.png'
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
		//幻灯片初始化
		mainSwiper = new Swiper ('#slider', {
			direction: 'vertical',
			initialSlide:8,
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
		if(parseInt(start_Time)==14){
			//$("#face-page").addClass('ani_faceHide');
			$("#face-page").hide();
			$("#slider .slide0").addClass('animated');
		}
		if (timeFlag){
			var FHml = parseInt($(".fenghuang").css('margin-left').split("px")[0]);
			var shipMl = parseInt($(".ship").css('margin-left').split("px")[0]);
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
				setTimeout(function(){
					shipmoveState = true;
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
function shipmove(){
	if(shipmoveState && !fhFlyState){
		var ml = parseInt($(".ship").css('margin-left').split("px")[0]);
		var mt = parseFloat($(".ship").css('margin-top').split("px")[0]);
		$(".ship").show();
		$(".ship").css({
			'margin-left':ml+1,
			'margin-top':mt+0.3
		});
	}
}
//凤凰飞行
function fhFly(){
	if(fhFlyState){
		var ml = parseInt($(".fenghuang").css('margin-left').split("px")[0]);
		$(".fenghuang").show();
		$(".fenghuang").css('margin-left',ml+1);
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
});
//视频遮盖的关闭
$('.over-layer-video').on('click','.closebtn',function(){
	$(this).parents('.over-layer-video').hide();
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
	$("#over-layer ."+overLayerName).siblings().hide();
	$("#over-layer ."+overLayerName).show();
	$("#over-layer").addClass('over-layer-show');
}
// 关闭遮盖层
function closeOverLayer(){
	$("#over-layer .over-layer-inner").hide();
	$("#over-layer").removeClass('over-layer-show');
}