
var bodyWidth = document.body.offsetWidth;
var bodyHeight = document.body.offsetHeight;
//设计稿750*1206
var hUnit = bodyWidth/750;
var vUnit = bodyHeight/1200;

//Aliases
var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    MovieClip = PIXI.extras.MovieClip,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle,
    Text = PIXI.Text,
    audioManager = PIXI.audioManager,
    Graphics = PIXI.Graphics;
//Create the renderer
var stage = new Container(),
	renderer = autoDetectRenderer(
		bodyWidth,
		bodyHeight,
		{backgroundColor:0xfffffff, antialias: false, transparent: false, resolution: 1}
	);
$("#main").append(renderer.view);
if(IsPc){
	hideOther();
	$("#un-mobile").show();
}else{
	loadingCommonSrc();
	// if(!isWeiXin()){
	// 	loadingCommonSrc();
	// }else{
	// 	hideOther();
	// 	$("#un-weixin").show();
	// }
}
//影藏页面其他页面
function hideOther(){
	$("#loading").hide();
	$("#face-page").hide();
	$("#slider").hide();
	$("#main").hide();
}
//加载公共资源
function loadingCommonSrc(){
	loader
	  .add([
	  	"./img/loading_car.png",
	  	"./img/loading.gif",
	  	"./img/shou.png",
	  	"./img/bg.jpg",
	  	"./img/play.png",
	  	"./img/pause.png",
	  	{name:"AlphaDance", url: ["./img/bgmusic.mp3"]},
	  ])
	  .on("progress", loadProgressHandler)
	  .load(faceInit);
}
//加载公共资源
var gameSrcState = false;
function loadingGameSrc(){
	loader
		.add([
			"./img/gamebg1.png",
			"./img/gamebg2.png",
			"./img/game_1.json",
			"./img/game_other.json",
			"./img/police.json",
		])
		.load(function(){
			gameSrcState = true;
			console.log(gameSrcState,$("#loading").attr("data-game"));
			if($("#loading").attr("data-game")=="true"){
				//隐藏加载
				$("#loading").hide();
				//渲染游戏
				randerGame();
			}
			enterGame();
		});
}

function loadProgressHandler(loader, resource){
  // console.log("loading: " + resource.url);
  // console.log("progress: " + loader.progress + "%");
  $("#main").show();
}
var mySwiper;
function faceInit(){
	//加载游戏资源
	loadingGameSrc();
	$("#loading").hide();
	//test 进入游戏
	//enterGame();
	//$("#overlayer-result").show();
	//$("#overlayer-rank").show();
	//$("#overlayer-pleased").show();
}

//进入游戏
function enterGame(){
	//隐藏封面
	$("#face-page").hide();
	$("#slider").hide();
	if(gameSrcState){
		//游戏资源加载完成
		randerGame();
	}else{
		//游戏资源加载未完成
		console.log('加载中');
		$("#loading").show();
		$("#loading").attr("data-game",'true');
	}
}
//渲染游戏
function randerGame(){
	gameSetup();
	renderer.render(stage);
}
