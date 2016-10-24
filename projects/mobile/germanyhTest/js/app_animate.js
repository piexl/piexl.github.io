
//音乐控制按钮
function musicPlayButton_ani(){
    requestAnimationFrame(musicPlayButton_ani);
    if(!musicPlayButton.palying)
        musicPlayButton.rotation += 0.05;
    renderer.render(stage);
}

//////////////////////游戏动画///////////////////////
function gameAimate(){
    requestAnimationFrame(gameAimate);
    game_Ani_play();
    renderer.render(stage);
}
var game_count = 0;//动画变量
function game_Ani_play(){
	game_bg1_ani();
	game_bg2_ani();
    game_count += 0.2;
}
//背景1移动
function game_bg1_ani(){
    //移动
    if(game_bg1.ani_move){
    	game_bg1.position.x -= 5*hUnit;
    	//问题1
        if(game_bg1.position.x < -800*hUnit && gameStep==0){
        	//console.log("qw1",game_bg1.position.x,gameStep);
            game_bg1.ani_move = false;
            // qw_Init();
            // qw1.visible = true;
            // qw.ani_zoomIn = true;
            // qw.visible = true;
        }
        //问题2
        if(game_bg1.position.x < -1794*hUnit && gameStep==1){
        	//console.log("qw2",game_bg1.position.x,gameStep);
            game_bg1.ani_move = false;
            qw_Init();
            qw1.visible = false;
            qw2.visible = true;
            qw.ani_zoomIn = true;
            qw.visible = true;
        }
        //问题3
        if(game_bg1.position.x < -2398*hUnit && gameStep==2){
        	game_car2.visible = true;
        	game_car2.ani_moveInLeft = true;
        }
		//开始下雪
        if(game_bg1.position.x < -3500*hUnit && gameStep==3){
        	//console.log("开始下雪",game_bg1.position.x,gameStep);
        	careatSnowState = true;
        }
		//问题4
        if(game_bg1.position.x < -4100*hUnit && gameStep==3){
        	//console.log("qw4",game_bg1.position.x,gameStep);
            if(game_bg1.position.x < -4400*hUnit){
            	game_bg1.ani_move = false;
	            qw_Init();
	            qw3.visible = false;
	            qw4.visible = true;
	            qw.ani_zoomIn = true;
	            qw.visible = true;
            }
        }
		//停止下雪
        if(game_bg1.position.x < -4460*hUnit && gameStep==4){
        	//console.log("停止下雪",game_bg1.position.x,gameStep);
        	careatSnowState = false;
        }
		//问题5
        if(game_bg1.position.x < -5318*hUnit && gameStep==4){
        	game_bg1.ani_move = false;
            qw_Init();
            qw4.visible = false;
            qw5.visible = true;
            qw.ani_zoomIn = true;
            qw.visible = true;
        }
		//改道
        if(game_bg1.position.x < -5403*hUnit && gameStep==5){
        	//console.log("改道",game_bg1.position.x,gameStep);
        	game_bg1.ani_move = false;
        	game_car1.visible = false;
        	game_car3.visible = true;
        	game_car3.ani_moveDown = true;
        }
    }
    if(game_bg1.ani_fadeOut){
        if(game_bg1.alpha > 0){
            game_bg1.alpha -= 0.02;
        }else{
            game_bg1.alpha  = 0;
            game_bg1.ani_fadeOut = false;
        }
    }
}
//背景2移动
function game_bg2_ani(){
    if(game_bg2.ani_move){
    	game_bg2.position.x -= 5*hUnit;
    	//问题6
        if(game_bg2.position.x < -700*hUnit && gameStep==5){
        	console.log("qw6",game_bg2.position.x,gameStep);
            game_bg2.ani_move = false;
            qw_Init();
            qw5.visible = false;
            qw6.visible = true;
            qw.ani_zoomIn = true;
            qw.visible = true;
        }
    	//问题7
        if(game_bg2.position.x < -1741*hUnit && gameStep==6){
        	console.log("qw7",game_bg2.position.x,gameStep);
            game_bg2.ani_move = false;
            qw_Init();
            qw6.visible = false;
            qw7.visible = true;
            qw.ani_zoomIn = true;
            qw.visible = true;
        }
    	//问题8
        if(game_bg2.position.x < -2500*hUnit && gameStep==7){
        	console.log("qw8",game_bg2.position.x,gameStep);
            game_bg2.ani_move = false;
            qw_Init();
            qw7.visible = false;
            qw8.visible = true;
            qw.ani_zoomIn = true;
            qw.visible = true;
        }
    	//鹿
        if(game_bg2.position.x < -2550*hUnit && deer.visible){
        	console.log("dree",game_bg2.position.x,gameStep);
            deer.visible = true;
            deer.ani_moveInLeft = true;
        }
    	//问题9
        if(game_bg2.position.x < -3590*hUnit && gameStep==8){
        	console.log("qw9",game_bg2.position.x,gameStep);
            game_bg2.ani_move = false;
            qw_Init();
            qw8.visible = false;
            qw9.visible = true;
            qw.ani_zoomIn = true;
            qw.visible = true;
        }
    	//问题10
        if(game_bg2.position.x < -4624*hUnit && gameStep==9){
        	console.log("qw10",game_bg2.position.x,gameStep);
            game_bg2.ani_move = false;
            qw_Init();
            qw9.visible = false;
            qw10.visible = true;
            qw.ani_zoomIn = true;
            qw.visible = true;
        }
    	//问题11
        if(game_bg2.position.x < -5473*hUnit && gameStep==10){
        	console.log("qw11",game_bg2.position.x,gameStep);
            game_bg2.ani_move = false;
            qw_Init();
            qw10.visible = false;
            qw11.visible = true;
            qw.ani_zoomIn = true;
            qw.visible = true;
        }

    }
}

