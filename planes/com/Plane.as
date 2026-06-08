package com {
	import Move;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	public class Plane extends MovieClip{

		public function Plane(c:String,xx:int,yy:int)
		{
			colour = c;
			
			switch (colour)
			{
				case "purple" :
					this.gotoAndStop(1);
					break;
				case "white" :
					this.gotoAndStop(25);
					break;
				case "yellow" :
					this.gotoAndStop(49);
					break;
				case "red" :
					this.gotoAndStop(73);
					break;
				case "blue" :
					this.gotoAndStop(97);
					break;
			}

			this.x = xx;
			this.y = yy;
			this.rotation = 0;
			this.addEventListener(Event.COMPLETE, adjustRoute);
		}
		public function newRoute(a:Vector.<Number>):void
		{
			nextDirection = a.slice(0);
		}
		public function chec

	}
	
}
