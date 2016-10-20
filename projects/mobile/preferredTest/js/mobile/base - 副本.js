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


/**
 * 筛选器 
 */
	
function SelectForm(type){
	var self = this;
	

		
		
	
	//列表点击
	self.htmlArr = [];
	function listClickEvent(){
		self.htmlArr = [];
		$("body").on('click','#J_bt_list li',function(){
			if(!$(this).children('i').length > 0){
				$(this).append('<i></i>');
				var _html = $(this).children('span').html();
				self.htmlArr.push(_html);
				console.log(self.htmlArr);
			}

		});
		
		
	
	
	
	}
	
		
	
	//确定按钮
	function confirm(){	
		$("#J_btfix .confirm").on('click',function(){
			$("#J_btfix").hide();
			var content = self.htmlArr.join();
			$('.'+self.ele).children('input').val(content);
			self.htmlArr = [];
		});
	}
	
	//取消按钮
	function cancle(){
		$("#J_btfix .cancel").on('click',function(){
			$("#J_btfix").hide();
		});

	}
	
	



	self.cw = '<ul class="list">'
				+'<li><span>先生</span></li>'
				+'<li><span>女士</span></li>'
				+'</ul>';

	self.rss = '<ul class="list">'
				+'<li><span>电子报告</span></li>'
				+'<li><span>特别优惠</span></li>'
				+'<li><span>会员问卷</span></li>'
				+'<li><span>合作伙伴特别优惠</span></li>'
				+'</ul>';


	
	

	
	//初始化
	self.init =function(ele){
		self.ele = ele;
		$("#J_bt_list").empty();
		
		if(ele == 'cw'){
			$("#J_bt_list").append(self.cw);
		}else if(ele == 'rss'){
			$("#J_bt_list").append(self.rss);
			
		}
		$("#J_btfix").show();
	}
	
		
	confirm();
	cancle();
	listClickEvent();
	
	
	
	
	
}
	
	