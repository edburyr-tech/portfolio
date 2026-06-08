var circleCount =0
var circlesTimer;
var offset = 10;
var northRoute =[757,50 ,757,127,843,275,836,517,755,641,494,393,318,393,201,393];
var southRoute =[732,726,732,620,809,504,809,289,731,160,494,393,318,393,201,393];
var finalRoute =[494-offset,393-offset,318-offset,393-offset,201-offset,393-offset];
var landingTimes=[];
var level1 = [10,10,10,10,10,10,10,10,10,10];
var level2 = [5,5,5,5,5,5,5,5,5,5];
var level1 = [5,5,5,5,5,5,5,5,5,5];
var level2 = [5,10,5,10,5,10,5,10,5,10];
var speed =20;
var level = 1;
var scorm = pipwerks.SCORM;  //Shortcut
var lmsConnected = false;
var screen1 = 0;
var timer;
var time
var topScore=-10;
var score =0;
function speedCheck(ax,ay,bx,by)
{
	//Calculate the distance between too points (the hypotenuse) usding pythagorus theorem
	//a^2+b^2 = c^2 therefore c= square root of a^2 + b^2	
	var temp = ((ax-bx)*(ax-bx))+((ay-by)*(ay-by));
	
	//speed = distance/time therefore time = distance/speed (Galileo)
	return (Math.sqrt(temp)/speed);
}
for (var i=0;i<northRoute.length-1; i+=2)
{
	northRoute[i]   -= offset;
	northRoute[i+1] -= offset;
	southRoute[i]   -= offset;
	southRoute[i+1] -= offset;
}
(function() {
	
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame  = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
       };
}());

(function () 
{
			
	var numplanes = 5,
		planes = [],
		canvas;			

	function gameLoop () {
	
	  var i;
	
	  window.requestAnimationFrame(gameLoop);
	  
	  // Clear the canvas
	  
	  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
		
	  for (i = 0; i < planes.length; i += 1) 
	  {
		  planes[i].render();	   
	  }
	 	if (gameOverCheck == false)
		{
			updateText();
	  		collide();
		}else
		{
			
			updateText2();
		}
	}
	
	

	function sprite (options) {
	
		var that = {},
		frameIndex = 0,
		tickCount = 0,
		//ticksPerFrame = options.ticksPerFrame || 0,
		numberOfFrames = options.numberOfFrames || 1;
		that.clicked = 0;
		that.route = options.route || 2;
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.x = 0;
		that.y = 0;
		that.image = options.image;
		that.scaleRatio = 1;
		that.alpha = 1;
		that.los=0;	
		
		that.nextFrame = function (a)
		{
			frameIndex=a;
		}
		that.setUpPath = function(route)
		{
			//if (that.y<300)
			//{var route = northRoute;}
	var tl = new TimelineMax();
	//if (that.clicked>1)
	//{

		tl.to(that, speedCheck(that.x,that.y,route[0],route[1]), {x:route[0],y:route[1],ease:Linear.easeNone});
	
	
	for (var i=0; i<route.length-4;i+=2)
	{
	tl.to(that, speedCheck(route[i],route[i+1],route[i+2],route[i+3]), {x:route[i+2],y:route[i+3],ease:Linear.easeNone});
	}
	tl.to(that,speedCheck(route[route.length-4],route[route.length-3],route[route.length-2],route[route.length-1]), {x:route[route.length-2],y:route[route.length-1],autoAlpha:0,ease:Linear.easeNone});
	
	tl.call(landed2);
	
	function landed2()
	{
		
		if (that)
		{
			
			//landingTimes.push(time)
			destroyplane(that);
	
		}
	}
}
		
		
		that.clicks = function()
		{
			that.clicked++;
			
			return (that.clicked);
		}
		that.clicks2 = function()
		{
			that.clicked--;
			
			return (that.clicked);
		}
		
		
		that.render = function () 
		{
		  // Draw the animation
		 
		  that.context.drawImage(
		    that.image,
		    frameIndex * that.width / numberOfFrames,
		    0,
		    that.width / numberOfFrames,
		    that.height,
		    that.x,
		    that.y,
		    that.width / numberOfFrames * that.scaleRatio,
		    that.height * that.scaleRatio);
		};
		
		that.getFrameWidth = function () 
		{
			return that.width / numberOfFrames;
		};
		
		return that;
	}
	
	function destroyplane (plane) 
	{
		var i;	
		for (i = 0; i < planes.length; i++) {
			if (planes[i] === plane) {
				planes[i] = null;
				planes.splice(i, 1);
				
				landingTimes.push(time)
				if (planes.length ==0)
				{
					gameOver()
				}
				break;
			}
		}
	}
	/*function destroyplane2 (plane) 
	{
		var i;	
		for (i = 0; i < planes.length; i++) {
			if (planes[i] === plane) {
				planes[i] = null;
				planes.splice(i, 1);
				
				if (planes.length ==0)
				{
					gameOver()
				}
				break;
			}
		}
	}*/
function gameOver()
{
	
	
	gameOverCheck = true;
	
	for (l=landingTimes.length-1; l>=1; l--)
	{
		score +=11.112;
		var gap =  landingTimes[l-1] - landingTimes[l];
		
		switch(level)
		{
			case 1:
				
				score -= level1[l]-gap;
				if (gap<3)
				{
					score -= 6;
				}
			break;
			case 2:
			score -= level2[l]-gap;
				if (gap<3)
				{
					score -= 6;
				}
			
			break;
			case 3:
				score -= level3[l]-gap;
				if (gap<3)
				{
					score -= 6;
				}
			break;
			case 4:
				score -= level4[l]-gap;
				if (gap<3)
				{
					score -= 6;
				}
			break;
		}
	
	}
	if (score>100)
	{ 
	score = 100;
	}
	landingTimes.length =0;
	for (j=planes.length-1; j>=0; j--)
	{
		
		planes[j] = null;
		planes.splice(j, 1);
	}
	clearInterval(circlesTimer);
	clearInterval(timer);
	if(lmsConnected)
	{
		var success = scorm.set("cmi.core.lesson_status", "completed");
	}
	circleCount = 0;
	canvasbk.style.backgroundImage = "url(images/highscore2.jpg)";
	can1.fillText("", 140, 50);
	screen1 =2;
}
	function spawnplane () 
	{
	
		var planeIndex,
			planeImg;
	
		// Create sprite sheet
		planeImg = new Image();	
	
		planeIndex = planes.length;
		
		// Create sprite
		planes[planeIndex] = sprite({
			context: canvas.getContext("2d"),
			width: 160,
			height: 40,
			image: planeImg,
			numberOfFrames: 4
		})
	
		planes[planeIndex].scaleRatio =  0.5 ;
		
		// Load sprite sheet
		planeImg.src = "images/planes.png";
	}
	
	function getElementPosition (element) {
	
       var parentOffset,
       	   pos = {
               x: element.offsetLeft,
               y: element.offsetTop 
           };
           
       if (element.offsetParent) {
           parentOffset = getElementPosition(element.offsetParent);
           pos.x += parentOffset.x;
           pos.y += parentOffset.y;
       }
       return pos;
    }
	
	function distance (p1, p2) {
	
		var dx = p1.x - p2.x,
			dy = p1.y - p2.y;
			
		return Math.sqrt(dx * dx + dy * dy);
	}
	function collide ()
	{
		for (i=planes.length-1; i>=0; i--)
		{
			if ((planes[i].x> northRoute[3])&&(planes[i].x< southRoute[3]))
			{
				var bool = true;
				for (j=planes.length-1; j>=0; j--)
				{
					if (i!=j)
					{
						if (distance (planes[i],planes[j])<25)
						{
							bool = false;
							planes[i].nextFrame(1);
							if (planes[i].los==0)
							{
								planes[i].los=1;
							}
						}
						
					}
				}
				if (bool == true)
				{
					planes[i].nextFrame(planes[i].route);
				}
			}
		}	
	}

function circles(n)
{
	if (circleCount <= 9)
	{  
	circleCount++;
	spawnplane();
	var p= planes[planes.length-1];
	if (n)
	{
	p.nextFrame(2);
	p.x = 747;
	p.y = -5;
	}
	else
	{
	p.nextFrame(3);
	p.x = 723;
	p.y = 712;
	p.route =3;
	}
	TweenMax.to(p, 20, {bezier:{type:'quadratic', values:[/*p1*/{x:p.x+0, y:p.y+0},{x:p.x+20, y:p.y+0},{x:p.x+20, y:p.y+20},  /*p2*/{x:p.x+20, y:p.y+40},{x:p.x+0, y:p.y+40},  /*p3*/{x:p.x-20, y:p.y+40},{x:p.x-20, y:p.y+20},  /*p4*/{x:p.x-20, y:p.y+0},{x:p.x, y:p.y}]}/*bezier end*/, ease:Linear.easeNone,repeat:-1});
	}
}
function start()
{
	gameOverCheck = false;
	time =100;
	circles(true);
	circles(false);
	circlesTimer = setInterval(function(){circles(true); circles(false)}, 4000);
	canvasbk.style.backgroundImage = "url(images/game2.jpg)";
	timer = setInterval(function(){time-=0.1; if (time <=0){gameOver()}}, 100);
	gameLoop();
	score =0;
	back
}
function updateText() {
	can1.fillText(score, 140, 50);
	can2.fillText(time.toFixed(1), 290, 755);		
}
function updateText2() {

	if (score > topScore)
	{
		topScore = score;
	}
	can1.fillText(score.toFixed(1), 630, 380);
	can2.fillText(50-time.toFixed(1), 630, 550);
	can3.fillText(topScore.toFixed(1), 630, 465);		
}
function landed()
{
	
}
function updateScore()
{
	showFillText();
}
	function tap (e) {	
		switch (screen1)
		{
		case 0:
			screen1++;
			start()
			
		break;
		case 2:
		screen1--;
		start();
		break;
		case 1:
		
		var i,
			loc = {},
			dist,
			planesToDestroy = [];
			pos = getElementPosition(canvas),
			tapX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX,
			tapY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY,
			canvasScaleRatio = canvas.width / canvas.offsetWidth;
			lmsConnected = scorm.init();
		
		loc.x = (tapX - pos.x) * canvasScaleRatio;
		loc.y = (tapY - pos.y) * canvasScaleRatio;
			
		for (i = 0; i < planes.length; i += 1) {
		
			// Distance between tap and plane
			dist = distance({
				x: (planes[i].x + planes[i].getFrameWidth() / 2 * planes[i].scaleRatio),
				y: (planes[i].y + planes[i].getFrameWidth() / 2 * planes[i].scaleRatio)
			}, {
				x: loc.x,
				y: loc.y
			});
			
			// Check for tap collision with plane		
			if (dist < planes[i].getFrameWidth() / 2 * planes[i].scaleRatio) {
				
				//planesToDestroy.push(planes[i]);
				//setUpPath(finalRoute,planes[i])
				switch(planes[i].clicks())
				{
					case 0:
						
					break;
					case 1:
						//if ()
						//planes[i].remove
						TweenMax.killTweensOf(planes[i]);
						if (planes[i].y> 200)
						{
						planes[i].setUpPath(southRoute);
						}else
						{
							planes[i].setUpPath(northRoute);
						}
						
						break;
					case 2:
						
						if (planes[i].x>450)
						{
							if ((planes[i].y> northRoute[3])&&(planes[i].y< southRoute[3]))
							{
							TweenMax.killTweensOf(planes[i]);
							planes[i].setUpPath(finalRoute);
							}else
						{
							planes[i].clicks2();
						}
						}
						break;
					break;
				}
			}
		}
		break;
		}
	}
	
	// Get canvas
	canvas = document.getElementById("planeTapGame");
	canvasbk = document.getElementById("planeTapGameContainer");
	canvas.width = 1024;
	canvas.height = 768;
	var can1 = canvas.getContext("2d");
	var can2 = canvas.getContext("2d");
	can1.fillStyle = '#0f0';
	can1.font = 'bold 36px arial';
	can1.textBaseline = 'bottom';
	can2.fillStyle = '#0f0';
	can2.font = 'bold 36px arial';
	can2.textBaseline = 'bottom';
	canvas.addEventListener("touchstart", tap);
	canvas.addEventListener("mousedown", tap);
	var can3 = canvas.getContext("2d");
	can3.fillStyle = '#0f0';
	can3.font = 'bold 36px arial';
	can3.textBaseline = 'bottom';
	score =0;
	time = 50;
} ());

