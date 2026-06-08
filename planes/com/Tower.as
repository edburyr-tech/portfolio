package com {
	
	import flash.display.MovieClip;
	import flash.utils.Timer;
	import flash.events.*;
	
	public class Tower extends MovieClip {
		public var timerIncriment:int;
		public var rotate1:int;
		//private var timer2:Timer = new Timer(5000,10);	
		public function Tower() {
			// constructor code
			//this.scaleX =0.5;
			//this.scaleY = scaleX;
		}
		/*public function startTime():void
		{
			timer2.start()
			timer2.addEventListener(TimerEvent.TIMER, timerListener2);	
		}
		private function adjustTimer()
		{
			//unused as yet
		}
		public function stopTimer():void 
		{
			timer2.stop()
			timer2.removeEventListener(TimerEvent.TIMER, timerListener2);	
		}
		/*private function timerListener2(e:Event)
		{
			dispatchEvent(new Event(Event.COMPLETE));
		}*/
	}
	
}
