package com
{
	import flash.display.*;
	import flash.text.*;
	
	import flash.net.*;
	import flash.display.Loader;


	public class feedbacktext extends Sprite
	{
		public var feedbackText:TextField;
		public var feedbackFormat:TextFormat = new TextFormat();
		//private var canvas:Bitmap;
		public function feedbacktext(xx:Number,yy:Number, text1:String, BorW:Boolean,width1:Number,height1:Number,size1:Number)
		{

			feedbackFormat.align = TextFormatAlign.CENTER;
			feedbackFormat.font = 'Hermes-Regular';
			feedbackFormat.size = size1;
			if (BorW ==true)
			{
				feedbackFormat.color = 0x000000;;
			}
			else
			{
				feedbackFormat.color = 0xffffff;
			}
			feedbackFormat.bold = true;


			feedbackText = new TextField();
			feedbackText.defaultTextFormat = feedbackFormat;
			feedbackText.wordWrap = true;
			feedbackText.width = width1;
			feedbackText.height = height1;
			feedbackText.selectable = false;
			feedbackText.mouseEnabled = false;
			feedbackText.text = text1;
			feedbackText.x = xx;
			feedbackText.y = yy;
			this.addChild(feedbackText);

		}

	}
}