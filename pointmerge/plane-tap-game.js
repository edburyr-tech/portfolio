var circleCount =0
var holdCount =0
var circlesTimer;
var offset = 10;
var timerCount =0
var timerArray=[];
var timer1;
var started = true;
var counter =0;
var first =true;
var version 
var version1
var versionNo =3;

switch (versionNo)
{
	case 1:
	version = "url(images/tutorial1.jpg)";
	version1 = "url(images/level1a.jpg)";
	break;
	case 2:
	version = "url(images/tutorial2.jpg)";
	version1 = "url(images/level2.jpg)";
	break;
	case 3:
	version = "url(images/tutorial3.jpg)";
	version1 = "url(images/level3.jpg)";
	break;
	case 4:
	version = "url(images/tutorial4.jpg)";
	version1 = "url(images/level4.jpg)";
	break;
}
var level4a=[1];

//The routes the plane starts on on levels 1 and 2 there are no planes from the south in level 1
var northRoutelevel1 =[990,0 ,756,158,750,182,790,283,806,380,792,471,754,565,742,579,714,578,423,382,355,382,286,430,50,430,36,421, 30,403,35,393,49,382,280,382];
var northRoutelevel2 =[990,0 ,756,158,750,182,790,283,806,380,792,471,754,565,742,579,714,578,423,382,125,382];
var circleStartNorth=[990,0,846,96];
var circleStartSouth =[991,765,844,667];
var southRouteNoHold =[991,765,731,590,719,567,720,555,758,462,769,378,754,293,721,213,711,204,703,203,691,203,423,382,125,382];
//used on levels 3 and 4 after the plane is clicked on in its holding pattern.
var northRouteHold =[864,86, 848,96 ,758,158,751,169,749,177,755,200,790,283,806,380,792,471,754,565,742,579,714,578,423,382,125,382];
var southRouteHold =[865,679,846,667,731,590,719,567,720,555,758,462,769,378,754,293,721,213,711,204,703,203,691,203,423,382,125,382];
var circlePointsNorth =[846,96,824,122,820,156,831,184,848,203,869,211,879,211,898,213,905,210,914,207,926,200,941,186,953,162,955,146,945,117,935,103,912,86,884,84,872,87,855,91,840,100];
var circlePointsSouth =[842,665,828,648,820,629,820,611,833,578,860,555,863,556,888,551,922,562,934,572,934,572,950,598,953,618,950,639,946,648,926,670,906,679,885,681,861,676,840,665];
//used after the plane is sent to land early.
var finalRoute =[423,382,125,382];
var finalRouteLevel1 =[423,382,355,382,286,430,50,430,36,421, 30,403,35,393,49,382,280,382];
addOffset(northRoutelevel1);
addOffset(northRoutelevel2);
addOffset(northRouteHold);
addOffset(southRouteNoHold);
addOffset(southRouteHold);
addOffset(finalRoute);
addOffset(finalRouteLevel1);
addOffset(circlePointsNorth);
addOffset(circlePointsSouth);
addOffset(circleStartNorth);
addOffset(circleStartSouth);
 
var landingTimes=[];
// The ideal gaps between planes for each level
var level1 = [10.9,10.9,10.9,10.9,10.9,10.9,10.9,10.9,10.9,10.9];
var level2 = [5.6,5.6,5.6,5.6,5.6,5.6,5.6,5.6,5.6,5.6];
var level3 = [5.6,5.6,5.6,5.6,5.6,5.6,5.6,5.6,5.6,5.6];
var level4 = [10.9,5.6,10.9,5.6,10.9,5.6,10.9,5.6,10.9,5.6,10.9];
var speed = 20;
var level = 3;
var scorm = pipwerks.SCORM;  
var lmsConnected = false;
lmsConnected = scorm.init();
var topScore=0;
var score =0;
if(lmsConnected)
{
			var oldScore =scorm.get("cmi.core.score.raw")
			if (oldScore!=0)
			{
				topScore = parseInt(oldScore);
			}				
}
var screen1 = 0;
var timer;
var time;
var tweenHolder =[];
function speedCheck(ax,ay,bx,by)
{
	//Calculate the distance between too points (the hypotenuse) usding pythagorus theorem
	//a^2+b^2 = c^2 therefore c= square root of a^2 + b^2	
	var temp = ((ax-bx)*(ax-bx))+((ay-by)*(ay-by));
	
	//speed = distance/time therefore time = distance/speed (Galileo)
	return (Math.sqrt(temp)/speed);
}
// there is a 10 px offset from where the centre of the plane is and where the screen coordinates are
function addOffset(a1)
{
	for (var i=0;i<=a1.length-1; i++)
	{
		a1[i]-= offset;
	}
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
			collide();	
		}
		else
		{	  
			updateText2();
			updateText();
		}	
	}
	function sprite (options) {
	
		var that = {},
		frameIndex = 0,
		tickCount = 0,
		numberOfFrames = options.numberOfFrames || 1;
		that.holdClick =0;
		that.clicked = 0;
		that.route = options.route || 3;
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
			var tl = new TimelineMax();
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

that.setUpPath1 = function(route2,route)
{
var tl = new TimelineMax();
tl.to(that, speedCheck(that.x,that.y,route2[2],route2[3]),{x:route2[2],y:route2[3],ease:Linear.easeNone});
for (var j=0; j<50;j++)
{
	for (var i=0; i<route.length-2;i+=2)
	{
		tl.to(that, speedCheck(route[i],route[i+1],route[i+2],route[i+3]), {x:route[i+2],y:route[i+3],ease:Linear.easeNone});
		tl.call(leaveLoop);
	}
}
function leaveLoop()
{
	if (that.holdClick== 1)
	{
		if (that.route == 2)
		{	
			frameIndex=4;
			if (that.y>670)
			{ 
				frameIndex=2;
				TweenMax.killTweensOf(that);
				that.setUpPath(southRouteHold);
				that.holdClick++;
			}
		}
		else
		{	
			frameIndex=5;
			if (that.y<75)
			{
				frameIndex=3;
				TweenMax.killTweensOf(that);
				that.setUpPath(northRouteHold);
				that.holdClick++;
			}
		}	
	}
}	
}
		that.setUpPath4 = function(route)
		{
			var a = that.x;
			var b = that.y;
			TweenMax.killTweensOf(that);
			var tl = new TimelineMax();
		if (that.route ==3)
		{
			tl.to(that, 3, {bezier:{type:'quadratic', values:[{x:a, y:b},{x:a, y:b+40},{x:a-40, y:b+40}]}, ease:Linear.easeNone});
		}
		else
		{
			tl.to(that, 3, {bezier:{type:'quadratic', values:[{x:a, y:b},{x:a, y:b-40},{x:a-40, y:b-40}]}, ease:Linear.easeNone});
		}
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
				
				if (planes[i].route ==3)
				{
					level4a.push("5.6")
					
				}else
				{
					level4a.push("10.9")
					
				}
				
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

function compare(gap, ideal)
{
	var differenceFromIdeal;
	//gets a value based on how far away from perfect the gap was
	if (ideal>gap)
	{
		differenceFromIdeal = ideal-gap;
	}else
	{
		differenceFromIdeal = gap-ideal;
	}
	// if the gap is gigantic caps score penalty
	if (differenceFromIdeal>ideal+1)
	{
		differenceFromIdeal= ideal+1;
	}
	//normalises score penalties somewhat
	if (ideal = 5.6)
	{
		differenceFromIdeal*=1.5;
	}

	return differenceFromIdeal
}

function backButton()
{
	gameOverCheck = true;
	landingTimes.length =0;
	for (j=planes.length-1; j>=0; j--)
	{
		planes[j] = null;
		planes.splice(j, 1);
	}
	clearInterval(circlesTimer);
	clearInterval(timer);
	circleCount = 0;
	holdCount =0;
	started = true;
}


function gameOver()
{
	gameOverCheck = true;
	
	for (l=landingTimes.length-1; l>=1; l--)
	{
		score +=11.512;
		var gap = Math.sqrt(landingTimes[l-1]*landingTimes[l-1]) -(Math.sqrt(landingTimes[l]*landingTimes[l]));
		if (gap<3)
		{
			score -=31;
		}
		started = true;
		switch(level)
		{
			case 1:
			score-=compare(gap, level1[l])/32*60;
			break;			
			case 2:
			score-=compare(gap, level2[l])/32*60;
			break;
			case 3:
			score-=	compare(gap, level3[l])
			break;
			case 4:
			score-=	compare(gap, parseInt(level4a[l]))
			break;
		}
	}
	if (score>100)
	{ 
		score = 100;
	}
	if (score <0)
	{
		score = 0;
	}
	landingTimes.length =0;
	for (j=planes.length-1; j>=0; j--)
	{
		planes[j] = null;
		planes.splice(j, 1);
	}
	clearInterval(circlesTimer);
	clearInterval(timer);
	circleCount = 0;
	holdCount =0;
	
	if (topScore<score)
	{
	 	topScore = score
	
		if(lmsConnected)
		{
			
			var success = scorm.set("cmi.core.lesson_status", "completed");
			var success = scorm.set("cmi.core.score.raw", topScore.toString());
			scorm.save();
		}
	}
	level4a=[1];
//	if (level ==4)
	//{
		
	//}else
	//{
		canvasbk.style.backgroundImage = "url(images/level4go.jpg)";
		screen1 =3;
		//canvasbk.style.backgroundImage = "url(images/gameover2.jpg)";
		//screen1 =2;
	//}
	
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
			width: 240,
			height: 40,
			image: planeImg,
			numberOfFrames: 6
		})
		planes[planeIndex].scaleRatio =  0.5 ;
		// Load sprite sheet
		planeImg.src = "images/planes.png";
	}
	
	function getElementPosition (element) {
	
       var parentOffset,
       	   pos = 
		   {
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
	
	function distance (p1, p2) 
	{
		var dx = p1.x - p2.x, dy = p1.y - p2.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
	function collide ()
	{
		for (i=planes.length-1; i>=0; i--)
		{
			if ((planes[i].x< 650))
			{
				for (j=planes.length-1; j>=0; j--)
				{
					
					if ((i!=j)&&(planes[i].x< 650)&&(planes[j].x< 650))
					{
						if (((level == 1)&&(planes[i].x> 400)&&(planes[j].x>400))||(level !=1))
						{
							if (distance (planes[i],planes[j])<64)
							{
								planes[i].nextFrame(1);
								if (planes[i].los==0)
								{
									planes[i].los=1;
								}
							}
						}
					}
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
			p.nextFrame(3);
			p.x = circleStartNorth[0];
			p.y = circleStartNorth[1];
			p.setUpPath1(circleStartNorth,circlePointsNorth);
		}
		else
		{
			p.nextFrame(2);
			p.x = circleStartSouth[0];
			p.y = circleStartSouth[1];
			p.setUpPath1(circleStartSouth,circlePointsSouth);
			p.route =2;	
		}		
	}
}
function hold(n)
{
	if (holdCount <= 9)
	{  
		holdCount++;
		spawnplane();
		var p= planes[planes.length-1];
		if (n)
		{
			p.nextFrame(3);
			p.x = northRoutelevel1[0]
			p.y = northRoutelevel1[1]
			if (level ==1)
			{
				p.setUpPath(northRoutelevel1);
			}else
			{
				p.setUpPath(northRoutelevel2);	
			}	
		}
		else
		{
			p.nextFrame(2);
			p.x = southRouteNoHold[0];
			p.y = southRouteNoHold[1];
			p.route =2;
			p.setUpPath(southRouteNoHold);
		}
		p.clicks();
	}
}
var flip =false;
function recursiveTimer()
{
	window.clearTimeout(timer1)
	counter++;
	if (gameOverCheck == false)
	{
		if (level == 1)
		{
			hold(true)
		}else 
		{
			if (flip == true)
			{
				if (level ==2)
				{
					hold(true);
				}else
				{
					circles(true)
				}
				
				flip = false;
			}else
			{
				if (level ==2)
				{
					hold(false);
				}else
				{
					circles(false)
				}
				flip = true;
			}	
		}
		if (counter<10)
		{
			timer1=setTimeout(function(){recursiveTimer()},timerArray[counter]);
		}
	}
}
function randmod(n)
{
	return ((Math.random()*n*2)-n);
}
function start()
{
	
	if (started==true)
	{
	started=false;
	gameOverCheck = false;
	timerCount =0;
	counter=0;
	switch(level)
	{
		case 1:
		hold(true);
timerArray =[5500+randmod(500),5500+randmod(500),5500+randmod(500),12000+randmod(1000),11000,11000+randmod(500),12000+randmod(500),13000+randmod(500),11000,12000+randmod(500)];		
timer1 = setTimeout(function(){recursiveTimer(true)},5500);
		break;
		case 2:
		hold(true)
		timerArray =[5500+randmod(500),6500+randmod(500),5500+randmod(500),6500+randmod(500),5500+randmod(500),7500+randmod(500),5500+randmod(500),5500+randmod(500),5500+randmod(500),5500+randmod(500)];
		timer1=setTimeout(function(){recursiveTimer(false)},5500);
		break;
		case 3:
		case 4:
		circles(true)
		timerArray =[2000,2000,2000,2000,2000,2000,2000,2000,2000,2000];
		timer1=setTimeout(function(){recursiveTimer(false)},2000);
		break;
	}
	time =1120;
	canvasbk.style.backgroundImage = "url(images/game.jpg)";
	timer = setInterval(function(){time-=0.1; if (time <=0){gameOver()}}, 100);
	gameLoop();
	score =0;
	}
}
function updateText() 
{
	if (screen1 ==0)
	{
		can2.font = '26px hermes-thin';
		can2.fillText(topScore.toFixed(1), 545, 539);
	}
}
function updateText2() {
	if (screen1 ==2||screen1==3)
	{
		if (score > topScore)
		{
			topScore= score;
		}
		can1.font = '16px hermes-thin';
		can1.fillText(score.toFixed(1), 516, 252);
		can3.font = '16px hermes-thin';
		can3.fillText(topScore.toFixed(1), 516, 274);	
	}
}

function updateScore()
{
	showFillText();
}
	function tap (e) {
		var i,
			loc = {},
			dist,
			planesToDestroy = [];
			pos = getElementPosition(canvas),
			tapX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX,
			tapY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY,
			canvasScaleRatio = canvas.width / canvas.offsetWidth;	
		loc.x = (tapX - pos.x) * canvasScaleRatio;
		loc.y = (tapY - pos.y) * canvasScaleRatio;
		//alert(loc.x)	
		//alert(loc.y)
		
		switch (screen1)
		{
		case 8:
		if ((loc.y >585) && (loc.y <635))
			{
				if ((loc.x >133) && (loc.x <319))
				{
					screen1 =0
					canvasbk.style.backgroundImage = version;
					updateText()
				}
				else if ((loc.x >780) && (loc.x <871))
				{
					screen1 = 1;
					start();
				}
		}
		case 7:
			if ((loc.x >133) && (loc.x <319))
				{
					screen1 =0
					canvasbk.style.backgroundImage = version;
					updateText()
				}
				else if ((loc.x >780) && (loc.x <871))
				{
					screen1 = 1;
					start();
				}
		case 6:
			if ((loc.x >133) && (loc.x <319))
				{
					screen1 =0;
					canvasbk.style.backgroundImage = version;
					updateText()
				}
				else if ((loc.x >780) && (loc.x <871))
				{
					screen1 = 1;
					start();
				}
		case 5:
			if ((loc.x >133) && (loc.x <319))
				{
					screen1 =0
					canvasbk.style.backgroundImage = version;
					updateText()
				}
				else if ((loc.x >780) && (loc.x <871))
				{
						screen1 = 1;
						start();
				}
		break;
		case 0:
			if ((loc.y >421) && (loc.y <470))
			{
				if ((loc.x >457) && (loc.x <543))
				{
					can2.clearRect ( 0 , 0 ,canvas.height , canvas.width );
					
					
						canvasbk.style.backgroundImage = version1
					
					
					//canvasbk.style.backgroundImage = "url(images/level1a.jpg)";
					screen1=versionNo+4;
					level = versionNo;	
				
				}
			}else if ((loc.y >567) && (loc.y <612))
			{
				if ((loc.x >471) && (loc.x <532))
				{
					can2.clearRect ( 0 , 0 ,canvas.height , canvas.width );
						canvasbk.style.backgroundImage = "url(images/LAMPcloseinstructions.jpg)";
					screen1 = 20;
				}
			}
		break;
		case 20:
			if ((loc.y >374) && (loc.y <431))
			{
				if ((loc.x >379) && (loc.x <469))
				{
					if (lmsConnected)
					{
						
						scorm.quit();
					}else
					{
						
					}
				}
				else if ((loc.x >562) && (loc.x <654))
				{
					screen1 =0;
					canvasbk.style.backgroundImage = version;
					updateText();
				}
			}
		break;
		case 2:	
			if ((loc.y >590) && (loc.y <645))
			{
				if ((loc.x >124) && (loc.x <310))
				{
					screen1 =0;
					canvasbk.style.backgroundImage = version;
				}
				else if ((loc.x >690) && (loc.x <885))
				{
					
				}
				else if ((loc.x >399) && (loc.x <589))
				{
					canvasbk.style.backgroundImage = "url(images/game.jpg)";
					screen1=1;
					start();
				}				
			}
		break;
		case 3:	
			if ((loc.y >590) && (loc.y <645))
			{
				if ((loc.x >124) && (loc.x <310))
				{
					screen1 =0
					canvasbk.style.backgroundImage = version;
					updateText()
				}
				else if ((loc.x >399) && (loc.x <589))
				{
					canvasbk.style.backgroundImage = "url(images/game.jpg)";
					screen1=1;
					start();
				}	
			}	
		break;
		case 1:		
		for (i = 0; i < planes.length; i += 1) 
		{
			// Distance between tap and plane
			dist = distance({x: (planes[i].x + planes[i].getFrameWidth() / 2 * planes[i].scaleRatio),
			y: (planes[i].y + planes[i].getFrameWidth() / 2 * planes[i].scaleRatio)}, {x: loc.x, y: loc.y});
			
			// Check for tap collision with plane		
			if (dist < planes[i].getFrameWidth() / 2 * planes[i].scaleRatio) 
			{
				switch(planes[i].clicks())
				{
					case 0:
					
					break;
					case 1:
						planes[i].holdClick++;
						if (planes[i].y>400)
						{
							planes[i].nextFrame(4);
						}else
						{
							planes[i].nextFrame(5);
						}
						break;
					case 2:	
						if ((planes[i].x>450)&& (planes[i].x< 800))
						{
							if ((planes[i].y> northRoutelevel1[3])&&(planes[i].y< southRouteNoHold[3]))
							{
								if (((planes[i].route == 3)&&(planes[i].y <500))||((planes[i].route != 3)&&(planes[i].y >233)))
									{
								TweenMax.killTweensOf(planes[i]);
								if (level==1)
								{
									
								if (((planes[i].route == 3)&&(planes[i].y <500))||((planes[i].route != 3)&&(planes[i].y >233)))
									{
											planes[i].setUpPath4(finalRouteLevel1);
									}
									//change this to be a back entrance 									
								}
								else
								{
									planes[i].setUpPath4(finalRoute);
								}
								}
							}
							else
							{
							planes[i].clicks2();
							}
						}
						else
						{
							planes[i].clicks2();
						}
						break;
						
					break;
				}
			}
		}
		break;
		}
		if 	((loc.x >20) && (loc.x <80))
		{
			if 	((loc.y >20) && (loc.y <80))
			{
			backButton();
			screen1 =0;
			canvasbk.style.backgroundImage = version;
			updateText();
			}
		}
	}
	canvas = document.getElementById("planeTapGame");
	canvasbk = document.getElementById("planeTapGameContainer");
	canvas.width = 1024;
	canvas.height = 768;
	canvasbk.style.backgroundImage = version;
	
	canvas.addEventListener("touchstart", tap);
	canvas.addEventListener("mousedown", tap);
	if (first)
	{
		first = false;
		var can1 = canvas.getContext("2d");
		can1.fillStyle = '#fff';
		can1.font = '16px hermes-thin';
		can1.textBaseline = 'bottom';
		var can2 = canvas.getContext("2d");
		can2.fillStyle = '#fff';
		can2.font = '72px hermes-thin';
		can2.textBaseline = 'bottom';
		var can3 = canvas.getContext("2d");
		can3.fillStyle = '#fff';
		can3.font = '16px hermes-thin';
		can3.textBaseline = 'bottom';
		updateText();
	}
	score =0;
	time = 3050;
} ());

