// 定义场景
var game = new Container();
var scene1 = new Container();
var scene2 = new Container();
//题目数
var gameStep = 0;
var careatSnowState = false;
var gameJson,
	policeJson,
	game_bg1,
	game_bg2, 
	game_car1,
	game_car2,
	game_car3;
//定义公共元素
var bgMusic,
	game_otherJson,
	musicPlayButton,
	qw_bg,
	game_time,
	game_time_bg,
	game_score,
	game_points,
	game_score_bg,
	answer_right,
	answer_error,
	police,
	notice,
	notice_top,
	score_add,
	deer,
	qw1_title,qw1_answer1,qw1_answer2,
	qw2_title,qw2_answer1,qw2_answer2,
	qw3_title,qw3_answer1,qw3_answer2,
	qw4_title,qw4_answer1,qw4_answer2,
	qw5_title,qw5_answer1,qw5_answer2,
	qw6_title,qw6_answer1,qw6_answer2,
	qw7_title,qw7_answer1,qw7_answer2,
	qw8_title,qw8_answer1,qw8_answer2,
	qw9_title,qw9_answer1,qw9_answer2,
	qw10_title,qw10_answer1,qw10_answer2,
	qw11_title,qw11_answer1,qw11_answer2,
	qw_answer_select,
	commonBg;
var noticeCont = new Container();
var qw = new Container(),qw1 = new Container(),qw2 = new Container(),qw3 = new Container(),qw4 = new Container(),qw5 = new Container(),qw6 = new Container(),qw7 = new Container(),qw8 = new Container(),qw9 = new Container(),qw10 = new Container(),qw11 = new Container();

function gameSetup(){
	gameJson = resources["./img/game_1.json"].textures;
	//背景
	commonBg = new Sprite(
	    resources["./img/bg.jpg"].texture
	);
	commonBg.width = renderer.width;
	commonBg.height = renderer.height;
	commonBg.position.set(0,0);
	stage.addChild(commonBg);
	//游戏背景1
	game_bg2 = new Sprite(
	    resources["./img/gamebg2.png"].texture
	);
	game_bg2.width = 6315*hUnit;
	game_bg2.height = 1220*hUnit;
	game_bg2.step = 0;
	game_bg2.position.set(0,0);
	game_bg2.visible = false;
	game_bg2.ani_move = false;
	game_bg2.ani_fadeOut = false;
	stage.addChild(game_bg2);
	//游戏背景1
	game_bg1 = new Sprite(
	    resources["./img/BG2.png"].texture
	);
	game_bg1.width = 2600*hUnit;
	game_bg1.height = 1100*hUnit;
	game_bg1.step = 0;
	game_bg1.position.set(0,0);
	game_bg1.ani_move = false;
	game_bg1.ani_fadeOut = false;
	stage.addChild(game_bg1);
	//汽车1
	game_car1 = new Sprite(gameJson["car1.png"]);
	game_car1.width = 303*hUnit;
	game_car1.height = 162*hUnit;
	game_car1.position.set(88*hUnit,756*hUnit);
	game_car1.ani_flop = true;
	stage.addChild(game_car1);
	gameAimate();
	startGame();
}
//开始游戏
function startGame(){
	game_bg1.ani_move = true;
}

