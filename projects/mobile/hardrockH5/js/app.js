function loadingCommonSrc(){loader.add(["./imgs/loading.gif","./imgs/over.jpg","./imgs/movie.mp4","./imgs/share.jpg","./imgs/switch_down.png","./imgs/switch_up.png","./imgs/tipline.gif","./imgs/title.png",{name:"BgMousic",url:["./imgs/heart.mp3"]},{name:"switchMousic",url:["./imgs/switch.mp3"]}]).on("progress",loadProgressHandler).load(loadIn)}function loadProgressHandler(e,i){}function loadIn(){$("#loading").hide(),$("#face").show(),bgmusic.play()}function timeIit(){timeFlag=!0,time_int=window.setInterval(function(){timeFlag&&video.paused&&console.log("视频停止")},1e3)}var bodyWidth=document.body.offsetWidth,bodyHeight=document.body.offsetHeight,hUnit=bodyWidth/750,vUnit=bodyHeight/1200,Container=PIXI.Container,autoDetectRenderer=PIXI.autoDetectRenderer,loader=PIXI.loader,resources=PIXI.loader.resources,TextureCache=PIXI.utils.TextureCache,Texture=PIXI.Texture,MovieClip=PIXI.extras.MovieClip,Sprite=PIXI.Sprite,Rectangle=PIXI.Rectangle,Text=PIXI.Text,audioManager=PIXI.audioManager,Graphics=PIXI.Graphics,stage=new Container,renderer=autoDetectRenderer(bodyWidth,bodyHeight,{backgroundColor:268435455,antialias:!1,transparent:!1,resolution:1});$("#main").append(renderer.view),loadingCommonSrc();var bgmusic,switchMusic,video;bgmusic=document.getElementById("bgMusic"),switchMusic=document.getElementById("switchMusic"),video=document.getElementById("video");var timeFlag=!1,time_int=!1,time=82;$("#playbtn").click(function(){$(this).addClass("played"),switchMusic.play(),setTimeout(function(){$("#face").hide(),$("#main").show(),bgmusic.pause(),video.play(),timeIit()},800)}),$("body").on("click",".sharebtn",function(){$("#over-layer-share").show()}),$(".over-layer").on("click",".over-layer-bg",function(){$(this).parents(".over-layer").hide()});