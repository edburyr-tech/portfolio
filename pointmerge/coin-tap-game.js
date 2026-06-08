

(function() {
	
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    //for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    //    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    //    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
    //                               || window[vendors[x]+'CancelRequestAnimationFrame'];
   // }
 
   // if (!window.requestAnimationFrame)
   //     window.requestAnimationFrame = function(callback, element) {
   //         var currTime = new Date().getTime();
   //         var timeToCall = Math.max(0, 16 - (currTime - lastTime));
   //         var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
   //           timeToCall);
   //         lastTime = currTime + timeToCall;
   //         return id;
   //     };
 
 //   if (!window.cancelAnimationFrame)
 //       window.cancelAnimationFrame = function(id) {
  //          clearTimeout(id);
   //     };
}());

(function () {
			
	var numplanes = 5,
		score = 0,
	    planes = [],
		canvas;			

	function gameLoop () {
	
	  var i;
	
	  window.requestAnimationFrame(gameLoop);
	  
	  // Clear the canvas
	  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

	  for (i = 0; i < planes.length; i += 1) {
		  planes[i].update();
		  planes[i].render();
	  }
	}
	
	function sprite (options) {
	
		var that = {},
			frameIndex = 0,
			tickCount = 0,
			ticksPerFrame = options.ticksPerFrame || 0,
			numberOfFrames = options.numberOfFrames || 1;
		
		that.context = options.context;
		that.width = options.width;
		that.height = options.height;
		that.x = 0;
		that.y = 0;
		that.image = options.image;
		that.scaleRatio = 1;
		
		that.update = function () {

            tickCount += 1;

            if (tickCount > ticksPerFrame) {

				tickCount = 0;
				
                // If the current frame index is in range
                if (frameIndex < numberOfFrames - 1) {	
                    // Go to the next frame
                    frameIndex += 1;
                } else {
                    frameIndex = 0;
                }
            }
        };
		
		that.render = function () {

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
		
		that.getFrameWidth = function () {
			return that.width / numberOfFrames;
		};
		
		return that;
	}
	
	function destroyplane (plane) {
	
		var i;
		
		for (i = 0; i < planes.length; i += 1) {
			if (planes[i] === plane) {
				planes[i] = null;
				planes.splice(i, 1);
				break;
			}
		}
	}
	
	function spawnplane () {
	
		var planeIndex,
			planeImg;
	
		// Create sprite sheet
		planeImg = new Image();	
	
		planeIndex = planes.length;
		
		// Create sprite
		planes[planeIndex] = sprite({
			context: canvas.getContext("2d"),
			width: 1000,
			height: 100,
			image: planeImg,
			numberOfFrames: 10,
			ticksPerFrame: i
		});
		
		//planes[planeIndex].x = Math.random() * (canvas.width - planes[planeIndex].getFrameWidth() * planes[planeIndex].scaleRatio);
		//planes[planeIndex].y = Math.random() * (canvas.height - planes[planeIndex].height * planes[planeIndex].scaleRatio);
		
		planes[planeIndex].scaleRatio = Math.random() * 0.5 + 0.5;
		
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
				planesToDestroy.push(planes[i]);
			}
		}
		
		// Destroy tapped planes
		for (i = 0; i < planesToDestroy.length; i += 1) {
		
			score += parseInt(planesToDestroy[i].scaleRatio * 10, 10);
			destroyplane(planesToDestroy[i]);	
			setTimeout(spawnplane, 1000);	
		}
		
		if (planesToDestroy.length) {
			document.getElementById("score").innerHTML = score;
		}
	}
	
	// Get canvas
	canvas = document.getElementById("planeTapGame");
	canvas.width = 460;
	canvas.height = 230;
	
	for (i = 0; i < numplanes; i += 1) {
	
		spawnplane();
	}
	
	gameLoop();
	
	canvas.addEventListener("touchstart", tap);
	canvas.addEventListener("mousedown", tap);

} ());

