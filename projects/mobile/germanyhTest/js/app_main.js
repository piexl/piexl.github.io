
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
//加载公共资源
function loadingCommonSrc(){
	loader
	  .add([
	  	"./img/loading_car.png",
	  	"./img/loading.gif",
	  	"./img/bg.jpg",
	  	"./img/BG2.png",
	  	"./img/gamebg1_2.png",
	  	"./img/pc_qr.png",
		"./img/gamebg1.png",
		"./img/gamebg2.png",
		"./img/game_1.json",
		"./img/game_other.json",
		"./img/police.json",
	  ])
	  .on("progress", loadProgressHandler)
	  .load(faceInit);
}
function loadProgressHandler(loader, resource){
  // console.log("loading: " + resource.url);
  // console.log("progress: " + loader.progress + "%");
  $("#main").show();
}
function faceInit(){
	$("#loading").hide();
	randerGame();
}
//渲染游戏
function randerGame(){
	gameSetup();
	renderer.render(stage);
}
