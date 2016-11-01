
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
// 设计稿750*1200
var hUnit = bodyWidth/750;
var mainSwiper;
var qrText = window.location.href;
// 二维码设置参数方式
var qrcode = new QRCode('qrcode', {
  text: 'your content',
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
		mainSwiper = new Swiper ('#slider', {
			direction: 'vertical',
			initialSlide:0,
			nextButton: '.swiper-next',
			onSlideChangeEnd: function(swiper){
		     	if(swiper.activeIndex == 7){
		     		$("#slider .swiper-next").hide();
		     	}else{
		     		$("#slider .swiper-next").show();
		     	}
		    }
		});
		qrcode.makeCode(qrText);
	}
});
loader.start();


//提交中奖信息
$("#submitbtn").click(function(){
	var username = $.trim($("#userName").val());
	var userEamil = $("#userEamil").val();
	var userPhone = $.trim($("#userPhone").val());
	if(username && /^1[0-9]{10}$/.test(userPhone) && /(\S)+[@]{1}(\S)+[.]{1}(\w)+/.test(userEamil)){
		//提交中奖信息	
		console.log('提交中奖信息');
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




