function loadIn(){$("#loading").hide(),$("#face").show(),bgmusic.play()}function isWeiXin(){var e=window.navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)}var bodyWidth=document.body.offsetWidth,bodyHeight=document.body.offsetHeight,hUnit=bodyWidth/750,vUnit=bodyHeight/1200,loader=new resLoader({resources:["./imgs/loading.gif","./imgs/over.jpg","./imgs/heart.mp3","./imgs/switch.mp3","./imgs/movie.mp4","./imgs/share.jpg","./imgs/switch_down.png","./imgs/switch_up.png","./imgs/tipline.gif","./imgs/title.png"],onStart:function(e){console.log("start:"+e)},onProgress:function(e,i){console.log(e+"/"+i)},onComplete:function(e){loadIn()}});loader.start();var bgmusic,switchMusic,video;bgmusic=document.getElementById("bgMusic")||null,switchMusic=document.getElementById("switchMusic")||null,video=document.getElementById("video")||null,$("#playbtn").click(function(){$(this).addClass("played"),switchMusic.play(),setTimeout(function(){$("#face").hide(),$("#main").show(),bgmusic.pause(),video.play(),isWeiXin()&&$("#cover").show()},800)}),video.addEventListener("ended",function(){$("#cover").show()}),$("body").on("click",".sharebtn",function(){$("#over-layer-share").show()}),$(".over-layer").on("click",".over-layer-bg",function(){$(this).parents(".over-layer").hide()});