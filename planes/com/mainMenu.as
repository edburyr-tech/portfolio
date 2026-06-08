package com  {
	import flash.display.MovieClip;
	import com.feedbacktext;
	public class mainMenu extends MovieClip {
	public var button1:tutorialbutton = new tutorialbutton();
	public var button2:mapbutton = new mapbutton();
	
		public function mainMenu(screenWidth:Number, screenHeight:Number) {
			var menuBackGround:menubkg= new menubkg();
			this.addChild(menuBackGround)
			menuBackGround.width = screenWidth;
			menuBackGround.height = screenHeight;
			this.addChild(button1)
			button1.buttonMode =true;
			button1.x = 790/1600*screenWidth;
			button1.y = 260/900*screenHeight;
			button1.height = 730/1600*screenHeight;
			button1.width = 350/900*screenWidth;
			button1.alpha= 0
			this.addChild(button2);
			button2.buttonMode =true;
			button2.x = 157/1600*screenWidth;
			button2.y = 260/900*screenHeight;
			button2.height = 730/1600*screenHeight;
			button2.width = 350/900*screenWidth;
			button2.alpha= 0
			button2.buttonMode = true;
			button2.alpha=0
			
		}

	}
	
}
