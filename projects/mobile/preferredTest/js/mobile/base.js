Zepto(function($){

	//导航
	$(".smallTopNav").click(function(){

		if($(this).hasClass('open')){
			$(this).removeClass('open');
			$(".mainNav").hide();
		}else{
			$(this).addClass('open');
			$(".mainNav").show();
		}
	});





});
