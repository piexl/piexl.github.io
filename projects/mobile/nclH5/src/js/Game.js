
var Game = function($div){
    var game = this;
    //var config = $.extend({static:''}, config);
    
    game.$div = $div;
    game.isInvite = true;

    //设计稿750*1206
    var hUnit = document.body.offsetWidth/750;
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
    //游戏页面中的元素
    var bg,
        cloudbg,
        cloudbrush_a,
        cloudbrush_b,
        logo,
        title,
        fenghuang,
        shipbg,
        seabg,
        shipcloud,
        ship;
    var cloudgoup = new Container();
    var shipgroup = new Container();

    //Create the renderer
    var stage = new Container(),
        renderer = autoDetectRenderer(
            document.body.offsetWidth,
            document.body.offsetHeight,
            {backgroundColor:0xf569ed1, antialias: false, transparent: false, resolution: 1}
        );
    game.$div.append(renderer.view);
    //加载资源
    (function (){
        loader
            .add([
                './imgs/loading.gif',
                './imgs/loading_car.png',
                './imgs/p7_logo.png',
                './imgs/p7_title.png',
                './imgs/p0_bg.jpg',
                './imgs/p0_cloud.png',
                './imgs/p0_sea.png',
                './imgs/p0_ship.png',
                './imgs/cloud_bg.jpg',
                './imgs/cloud1.png',
                './imgs/cloudbrush_b_.png',
                './imgs/drawbtn_.jpg',
                './imgs/fh1.json',
                './imgs/fh2.json',
                './imgs/fh3.json',
                './imgs/cloudbush_a1.json',
                './imgs/cloudbush_b1.json',
                './imgs/cloudbush_ab.json',
                './imgs/ship.png'
            ])
            .load(function(){
                render();
            });
    })();

    //渲染游戏
    var render = function (){
        //背景
        bg = new Sprite(
            resources['./imgs/cloud_bg.jpg'].texture
        );
        bg.width = renderer.width;
        bg.height = renderer.height;
        bg.position.set(0,0);
        cloudgoup.addChild(bg);

        //云背景
        cloudbg = new Sprite(
            resources['./imgs/cloud1.png'].texture
        );
        cloudbg.width = 1125*hUnit;
        cloudbg.height = renderer.height;
        cloudbg.position.set(0,0);
        cloudbg.ani_move = false;
        cloudgoup.addChild(cloudbg);

        //logo
        logo = new Sprite(
            resources['./imgs/p7_logo.png'].texture
        );
        logo.width = 216*hUnit;
        logo.height = 66*hUnit;
        logo.position.set(267*hUnit,170*hUnit);
        logo.alpha = 0;
        logo.ani_fadeInUp = false;
        cloudgoup.addChild(logo);

        //title
        title = new Sprite(
            resources['./imgs/p7_title.png'].texture
        );
        title.width = 360*hUnit;
        title.height = 157*hUnit;
        title.anchor.set(0.5,0.5);
        title.position.set(375*hUnit,290*hUnit);
        title.scale.set(0,0);
        title.ani_zoomIn = false;
        cloudgoup.addChild(title);

        //fenghuang
        var fenghuangFrames  = [];
        for (var i = 1; i < 36; i++) {
            fenghuangFrames.push(Texture.fromFrame('fh'+i+'.png'));
        }
        fenghuang = new MovieClip(fenghuangFrames);
        fenghuang.width = 600*hUnit;
        fenghuang.height = 420*hUnit;
        fenghuang.anchor.set(0.5);
        fenghuang.position.set(-300*hUnit,810*hUnit);
        fenghuang.rotation = 0;
        fenghuang.animationSpeed = 0.6;
        fenghuang.ani_fly = false;
        fenghuang.ani_flyUp = true;
        fenghuang.ani_rotateUp = true;
        fenghuang.fly_beat = false;
        cloudgoup.addChild(fenghuang);

        //船背景
        shipbg = new Sprite(
            resources['./imgs/p0_bg.jpg'].texture
        );
        shipbg.width = renderer.width;
        shipbg.height = renderer.height;
        shipbg.position.set(0,0);
        shipgroup.addChild(shipbg);

        //船云背景
        shipcloud = new Sprite(
            resources['./imgs/p0_cloud.png'].texture
        );
        shipcloud.width = 1002*hUnit;
        shipcloud.height = renderer.height-160*hUnit;
        shipcloud.anchor.set(1,0);
        shipcloud.position.set(renderer.width,0);
        shipcloud.ani_move = false;
        shipgroup.addChild(shipcloud);

        //海背景
        seabg = new Sprite(
            resources['./imgs/p0_sea.png'].texture
        );
        seabg.width = 1388*hUnit;
        seabg.height = 328*hUnit;
        seabg.anchor.set(0,1);
        seabg.position.set(0,renderer.height);
        seabg.ani_move = false;
        shipgroup.addChild(seabg);

        //船
        ship = new Sprite(
            resources['./imgs/ship.png'].texture
        );
        ship.width = 1190*hUnit;
        ship.height = 449*hUnit;
        ship.anchor.set(1,1);
        ship.position.set(0,renderer.height-300*hUnit);
        ship.ani_move = false;
        ship.ani_vx = 2*hUnit;//移动的速度
        ship.moveBeat = false;
        shipgroup.addChild(ship);


        //A云层刷
        var cloudbrush_aFrames  = [];
        for (var i = 1; i < 25; i++) {
            cloudbrush_aFrames.push(Texture.fromFrame('cloudbrush_a'+i+'.png'));
        }
        cloudbrush_a = new MovieClip(cloudbrush_aFrames);
        cloudbrush_a.width = renderer.width;
        cloudbrush_a.height = renderer.height;
        cloudbrush_a.position.set(0,0);
        cloudbrush_a.animationSpeed = 0.4;
        cloudbrush_a.loop = false;
        cloudbrush_a.ani_fadeOut = false;
        cloudbrush_a.visible = false;

        //B云层刷
        var cloudbrush_bFrames  = [];
        for (var i = 1; i < 25; i++) {
            cloudbrush_bFrames.push(Texture.fromFrame('cloudbrush_b'+i+'.png'));
        }
        cloudbrush_b = new MovieClip(cloudbrush_bFrames);
        cloudbrush_b.width = renderer.width;
        cloudbrush_b.height = renderer.height;
        cloudbrush_b.position.set(0,0);
        cloudbrush_b.animationSpeed = 0.4;
        cloudbrush_b.loop = false;
        cloudbrush_b.ani_fadeOut = false;
        cloudbrush_b.visible = false;

        //cloudgoup.visible = false;
        cloudgoup.ani_fadeOut = false;
        stage.addChild(shipgroup);
        stage.addChild(cloudbrush_a);
        stage.addChild(cloudbrush_b);
        stage.addChild(cloudgoup);

        game.animated();
        renderer.render(stage);
    };

    //游戏初始化
    game.init = function(){
        cloudbg.position.set(0,0);
        cloudbg.ani_move = false;

        logo.position.set(267*hUnit,170*hUnit);
        logo.alpha = 0;
        logo.ani_fadeInUp = false;

        title.position.set(375*hUnit,290*hUnit);
        title.scale.set(0,0);
        title.ani_zoomIn = false;

        fenghuang.position.set(-300*hUnit,810*hUnit);
        fenghuang.rotation = 0;
        fenghuang.play();
        fenghuang.ani_fly = false;

        shipcloud.position.set(renderer.width,0);
        shipcloud.ani_move = false;

        seabg.position.set(0,renderer.height);
        seabg.ani_move = false;

        ship.position.set(0,renderer.height-300*hUnit);
        ship.ani_move = false;
        ship.ani_vx = 2*hUnit;//移动的速度
        ship.moveBeat = false;

        cloudbrush_a.loop = false;
        cloudbrush_a.alpha = 1;
        cloudbrush_a.ani_fadeOut = false;

        cloudbrush_b.loop = false;
        cloudbrush_b.alpha = 1;
        cloudbrush_b.ani_fadeOut = false;

        cloudgoup.visible = true;
        cloudgoup.alpha = 1;
        cloudgoup.ani_fadeOut = false;
        game.onInit && game.onInit();
    }

    //飞行开始
    game.fly = function (){
        cloudbg.ani_move = true;
        logo.ani_fadeInUp = true;
        title.ani_zoomIn = true;
        fenghuang.ani_fly = true;
    }

    //船开始
    game.sail = function (){
        shipcloud.ani_move = true;//船云层开始移动
        seabg.ani_move = true;//海层开始移动
        ship.ani_move = true;//船开始移动
    }

    //游戏动画
    game.animated = function(){
        requestAnimationFrame(game.animated);
        game.cloudbgAni();
        game.logoAni();
        game.titleAni();
        game.fenghuangAni();
        game.seabgAni();
        game.shipcloudAni();
        game.shipAni();
        game.cloudgoupAni();
        game.cloudbrush_aAni();
        game.cloudbrush_bAni();
        renderer.render(stage);
    }
    //云的动画
    game.cloudbgAni = function(){
        if(cloudbg.ani_move){
            cloudbg.position.x -= 0.5*hUnit;
            if(cloudbg.position.x<-350*hUnit){
                cloudbg.alpha -= 0.1;
            }else{
                cloudbg.alpha = 1;
            }
            if(cloudbg.position.x<-375*hUnit){
                cloudbg.position.x = 0;
            }
        }
    }
    //logo的动画
    game.logoAni = function(){
        if(logo.ani_fadeInUp){
            if(logo.position.y > 108*hUnit){ logo.position.y -= 2*hUnit; title.ani_zoomIn = true;}
            if(logo.alpha < 1){ logo.alpha += 0.02;}
        }
    }
    //title的动画
    game.titleAni = function(){
        if(title.ani_zoomIn){
            if(title.scale.x < 0.36){
                title.scale.x += 0.008;
                title.scale.y += 0.008;
            }
        }
    }
    //fenghaung的动画
    game.fenghuangAni = function(){
        var pxS = -300*hUnit,//x轴开始位置
            pxE = 1125*hUnit,//x轴终点位置
            pyS = 860*hUnit,//y轴开始位置
            pyE = 560*hUnit,//y轴终点位置
            vx = 1,//x轴速度
            vy = (pyS-pyE)/(pxE-pxS)*3*vx,//y轴速度
            rS = 0,//开始旋转角度
            rE = -0.2,//结束旋转角度
            vr = (rS-rE)/(pxE-pxS)*vx*6;//旋转速度
        if(fenghuang.ani_fly){
            //向右飞行
            if(fenghuang.position.x <pxE){
                fenghuang.position.x += vx;
                if(fenghuang.position.x > 450*hUnit){
                    //碰到边界了
                    if(!fenghuang.fly_beat){
                        game.flyBeat && game.flyBeat();
                        fenghuang.fly_beat = true;
                    }
                }
            }else{
                //飞出去了
                fenghuang.ani_fly = false;
                //云层组消失
                cloudgoup.ani_fadeOut = true;
                //云刷出现
                if(game.isInvite){
                    cloudbrush_a.visible = true;
                    cloudbrush_a.play();
                }else{
                    cloudbrush_b.visible = true;
                    cloudbrush_b.play();
                }
                game.flyOver && game.flyOver();
            }
            //上下飞行
            if(fenghuang.position.y > pyE && fenghuang.ani_flyUp){
                fenghuang.position.y -= vy;
            }else{
                fenghuang.ani_flyUp = false;
                if(fenghuang.position.y < pyS && !fenghuang.ani_flyUp){
                    fenghuang.position.y += vy;
                }else{
                    fenghuang.ani_flyUp = true;
                }
            }
            //旋转
            if(fenghuang.rotation > rE && fenghuang.ani_rotateUp){
                fenghuang.rotation -= vr;
            }else{
                fenghuang.ani_rotateUp = false;
                if(fenghuang.rotation < -rE && !fenghuang.ani_rotateUp){
                    fenghuang.rotation += vr;
                }else{
                    fenghuang.ani_rotateUp = true;
                }
            }
        }
    }
    //船海的动画
    game.seabgAni = function(){
        if(seabg.ani_move && seabg.position.x > -638*hUnit){
            seabg.position.x -= ship.ani_vx*(638/1940);
        }else{
            seabg.ani_move = false;
        }
    }
    //船云的动画
    game.shipcloudAni = function(){
        if(shipcloud.ani_move && shipcloud.position.x < 1002*hUnit){
            shipcloud.position.x += ship.ani_vx*(252/1940);
        }else{
            shipcloud.ani_move = false;
        }
    }
    //船的动画
    game.shipAni = function(){
        if(ship.ani_move){
            ship.position.x += ship.ani_vx;
            ship.position.y += ship.ani_vx*0.08;
            if(ship.position.x>750*hUnit){
                if(!ship.moveBeat){
                    game.shipBeat && game.shipBeat();
                    ship.moveBeat = true;
                }
            }
            if(ship.position.x > 1940*hUnit){
                if(ship.ani_move){
                    game.shipOver && game.shipOver();
                    ship.ani_move = false;
                }
            }
        }
    }
    //云组的动画
    game.cloudgoupAni = function(){
        if(cloudgoup.ani_fadeOut){
            if(cloudgoup.alpha > 0){
                cloudgoup.alpha -= 0.02;
            }else{
                cloudgoup.ani_fadeOut = false;
                cloudgoup.alpha = 0;
                cloudgoup.visible = false;
                //云刷消失
                if(game.isInvite){
                    cloudbrush_a.ani_fadeOut = true;
                }else{
                    cloudbrush_b.ani_fadeOut = true;
                }
            }
        }
    }
    //云刷消失
    game.cloudbrush_aAni = function(){
        if(cloudbrush_a.ani_fadeOut){
            if(cloudbrush_a.alpha > 0){
                cloudbrush_a.alpha -= 0.02;
            }else{
                cloudbrush_a.ani_fadeOut = false;
                cloudbrush_a.alpha = 0;
                cloudbrush_a.visible = false;
            }
        }
    }
    //云刷消失
    game.cloudbrush_bAni = function(){
        if(cloudbrush_b.ani_fadeOut){
            if(cloudbrush_b.alpha > 0){
                cloudbrush_b.alpha -= 0.02;
            }else{
                cloudbrush_b.ani_fadeOut = false;
                cloudbrush_b.alpha = 0;
                cloudbrush_b.visible = false;
            }
        }
    }


};














