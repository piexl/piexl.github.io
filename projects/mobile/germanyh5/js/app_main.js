function hideOther(){$("#loading").hide(),$("#face-page").hide(),$("#slider").hide(),$("#main").hide()}function loadingCommonSrc(){loader.add(["./img/loading_car.png","./img/loading.gif","./img/shou.png","./img/bg.jpg","./img/play.png","./img/pause.png",{name:"AlphaDance",url:["./img/bgmusic.mp3"]}]).on("progress",loadProgressHandler).load(faceInit)}function loadingGameSrc(){loader.add(["./img/gamebg1.png","./img/gamebg2.png","./img/game_1.json","./img/game_other.json","./img/police.json"]).load(function(){gameSrcState=!0,console.log(gameSrcState,$("#loading").attr("data-game")),"true"==$("#loading").attr("data-game")&&($("#loading").hide(),randerGame())})}function loadProgressHandler(e,n){$("#main").show()}function faceInit(){loadingGameSrc(),mySwiper=new Swiper("#slider",{direction:"vertical",onInit:function(e){swiperAnimateCache(e),swiperAnimate(e),$("#rank-btn").show(),$(".swiper-tip").show()},onSlideChangeStart:function(e){$("#rank-btn").hide(),$(".swiper-tip").hide()},onSlideChangeEnd:function(e){swiperAnimate(e),$("#rank-btn").show(),2==e.activeIndex?$(".swiper-tip").hide():$(".swiper-tip").show()}}),$("#loading").hide(),getResult()}function enterGame(){$("#face-page").hide(),$("#slider").hide(),gameSrcState?randerGame():(console.log("加载中"),$("#loading").show(),$("#loading").attr("data-game","true"))}function randerGame(){gameSetup(),renderer.render(stage)}function submitPhone(e){console.log("提交电话",PUBLIC__WECHAT_OPENID,e)}function submitResult(e,n,i){console.log("提交成绩",PUBLIC__WECHAT_OPENID,e,n,i)}function getResult(){console.log("获取成绩",PUBLIC__WECHAT_OPENID)}var bodyWidth=document.body.offsetWidth,bodyHeight=document.body.offsetHeight,hUnit=bodyWidth/750,vUnit=bodyHeight/1200,Container=PIXI.Container,autoDetectRenderer=PIXI.autoDetectRenderer,loader=PIXI.loader,resources=PIXI.loader.resources,TextureCache=PIXI.utils.TextureCache,Texture=PIXI.Texture,MovieClip=PIXI.extras.MovieClip,Sprite=PIXI.Sprite,Rectangle=PIXI.Rectangle,Text=PIXI.Text,audioManager=PIXI.audioManager,Graphics=PIXI.Graphics,stage=new Container,renderer=autoDetectRenderer(bodyWidth,bodyHeight,{backgroundColor:268435455,antialias:!1,transparent:!1,resolution:1});$("#main").append(renderer.view),IsPc?(hideOther(),$("#un-mobile").show()):loadingCommonSrc();var gameSrcState=!1,mySwiper;$("#enter-btn").click(function(e){console.log("进入游戏"),enterGame()}),$("#rank-btn").click(function(e){console.log("查看排行榜"),$("#overlayer-rank").show()}),$(".tryAgin,.pleased-content").click(function(){console.log("不满意"),$("#face-page").hide(),$("#slider").hide(),$("#main").hide(),$("#download").show(),$(this).parents(".overlayer").hide()}),$(".overlayer").on("click",".bg",function(){$(this).parent(".overlayer").hide()}),$("#phonebtn").click(function(){userphone=$.trim($("#userphone").val()),/^1[0-9]{10}$/.test(userphone)?console.log("提交电话"):alert("请填写正确的电话")});