$(document).ready(function() {

var screen_width = $(window).width(),
	screen_height = $(window).height();

var pcMinWidth = 768;//pc端最小屏幕的限制

// 页面初始化
function init(){
	if(screen_width > pcMinWidth){
		pcInit();
	}else{
		mobileInit();
	}
	flexsliderInit();
}
init();
//PC端初始页面
function pcInit(){
	console.log('pc init',screen_width);
	$('.pcNav').onePageNav();
	//进入区域1文字区域状态
	var containerTextOpen = false;
	var TweenIng = false;
	$('#section1').on('mousewheel', function(event){
		//console.log('#section1',event.deltaX, event.deltaY, event.deltaFactor);
		if(screen_width > pcMinWidth && !TweenIng){
			TweenIng = true;
			if(!containerTextOpen){
				event.preventDefault();
				TweenMax.to("body,html", 0.01, {scrollTop: 0,onComplete:function(){TweenIng = false;}});
			}
		    if(event.deltaY<0){
		    	if(!containerTextOpen){
			    	containerTextOpen = true;
			    	TweenMax.to(".containerText", 0.8, {bottom: 0,opacity:1,ease: Quad.easeInOut,onComplete:function(){TweenIng = false;}});
		    	}else{
		    		TweenMax.to("body,html", 1, { scrollTop: $("#section2").offset().top,ease: Quad.easeInOut,onComplete:function(){TweenIng = false;}});
		    	}
		    }else{
		    	TweenIng = true;
		    	containerTextOpen = false;
		    	TweenMax.to(".containerText", 0.8, { bottom: -200,opacity:0,ease: Quad.easeInOut,onComplete:function(){TweenIng = false;}});
		    }
			//console.log('section2offset',$("#section2").offset().top);
		}
	});
	$('#section2').on('mousewheel', function(event){
		//console.log('#section2',event.deltaX, event.deltaY, event.deltaFactor);
		if(screen_width > pcMinWidth && !TweenIng){
			TweenIng = true;
		    if(event.deltaY<0){
		    	TweenMax.to("body,html", 1, { scrollTop: $("#section3").offset().top,ease: Quad.easeInOut,onComplete:function(){TweenIng = false;}});
		    }else{
		    	TweenMax.to("body,html", 1, { scrollTop: $("#section1").offset().top,ease: Quad.easeInOut,onComplete:function(){TweenIng = false;}});
		    }
		}
	});
	$('#section3').on('mousewheel', function(event){
		//.log('#section3',event.deltaX, event.deltaY, event.deltaFactor);
		if(screen_width > pcMinWidth){
			TweenIng = true;
		    if(event.deltaY<0){
		    	TweenMax.to("body,html", 1, { scrollTop: $("#section4").offset().top,ease: Quad.easeInOut,onComplete:function(){TweenIng = false;}});
		    }else{
		    	TweenMax.to("body,html", 1, { scrollTop: $("#section2").offset().top,ease: Quad.easeInOut,onComplete:function(){TweenIng = false;}});
		    }
		}
	});
	$('#section4').on('mousewheel', function(event){
		//console.log('#section4',event.deltaX, event.deltaY, event.deltaFactor);
		if(screen_width > pcMinWidth){
			TweenIng = true;
		    if(event.deltaY<0){
		    	TweenMax.to("body,html", 1, { scrollTop: $("#section5").offset().top,ease: Quad.easeInOut,onComplete:function(){TweenIng = false;}});
		    }else{
		    	TweenMax.to("body,html", 1, { scrollTop: $("#section3").offset().top,ease: Quad.easeInOut,onComplete:function(){TweenIng = false;}});
		    }
		}
	});
	$('#section5').on('mousewheel', function(event){
		//console.log('#section5',event.deltaX, event.deltaY, event.deltaFactor);
		if(screen_width > pcMinWidth){
	    	var thisOffsetTop = $('#section5').offset().top;
	    	var thisOuterHeight = $('#section5').outerHeight();
	    	var bodyScrollTop = $('body').scrollTop();
	    	var _thisOffsetTop = thisOffsetTop+(thisOuterHeight-screen_height)-$("#header").outerHeight();
		    if(event.deltaY<0){
		    	// if(bodyScrollTop > _thisOffsetTop){
		    	// 	TweenMax.to("body,html", 1, { scrollTop: $("#section6").offset().top,ease: Quad.easeInOut});
		    	// }
		    }else{
		    	if(bodyScrollTop < thisOffsetTop+$("#header").outerHeight()){
		    		TweenIng = true;
		    		TweenMax.to("body,html", 1, { scrollTop: $("#section4").offset().top,ease: Quad.easeInOut,onComplete:function(){TweenIng = false;}});
		    	}
		    }
		}
	});
	// $('#section6').on('mousewheel', function(event){
	// 	//console.log('#section6',event.deltaX, event.deltaY, event.deltaFactor);
	// 	if(screen_width > pcMinWidth){
	// 	    if(event.deltaY>0){
	// 	    	TweenMax.to("body,html", 1, { scrollTop: $("#section5").offset().top,ease: Quad.easeInOut});
	// 	    }
	// 	}	
	// });
}
//手机端初始页面
function mobileInit(){
	console.log('mobile init',screen_width);
	$('.navList').onePageNav();
	$(".containerText").attr('style','');
}

$(window).resize(function(){
	var _screen_width = $(window).width(),
		_screen_height = $(window).height();
		screen_width = _screen_width;
		screen_height = _screen_height;
	if(_screen_width > pcMinWidth){
		pcInit();
	}else{
		mobileInit();
	}
});
function flexsliderInit(){
	//幻灯片初始化
	$('.flexslider').flexslider({
		animation: 'slide',
		slideshow:false,
		pauseOnHover: true,
		itemWidth:210,
		itemMargin:0,
		controlNav:false,
		minItems:1,
		maxItems:5,
		move:1
	});
}
//小导航
$('#J_smallTopNav').click(function(){
	$('#phoneNav').show();
});
$('#J_phoneNavClose').click(function(){
	$('#phoneNav').hide();
});
$("#phoneNav").on('click','.navList li',function(){
	$('#phoneNav').hide();
})

//视频的打开
$('body').on('click','.video-btn[data-role="video-btn"]',function(ev){
	ev.preventDefault();
	var videoUrl = $(this).attr('data-videoUrl');
	var overlayer = $('#overlayer-video');
	overlayer.find('.dataLoading').show();
	overlayer.find('.content').hide();
	overlayer.fadeIn();
	var overlayerTop = ($(window).height()-overlayer.find('.overlayer-inner').outerHeight())/2;
	overlayer.find('.overlayer-inner').css('margin-top',overlayerTop);
	setTimeout(function(){
		overlayer.find('video').attr('src',videoUrl);
		overlayer.find('.dataLoading').hide();
		overlayer.find('.content').show();
		overlayer.find('video')[0].play();
		var overlayerTop = ($(window).height()-overlayer.find('.overlayer-inner').outerHeight())/2;
		overlayer.find('.overlayer-inner').css('margin-top',overlayerTop);
	},1000);
})
$('#overlayer-video').on('click','.close-btn',function(){
	if($(this).parents('#overlayer-video').find('video')[0].play){
		$(this).parents('#overlayer-video').find('video')[0].pause();
	}
	$(this).parents('#overlayer-video').fadeOut();
})


});