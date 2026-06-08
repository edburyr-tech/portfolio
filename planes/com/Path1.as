package com
{
	import flash.display.Sprite;

	public class Path1 extends Sprite
	{
		private var xx:Number;
		private var yy:Number;
		public var holder:Sprite = new Sprite();
		public var recordArray:Vector.<Number> = new Vector.<Number>();
		var colour:uint;
		public function Path1(c:int)
		{
			//sets path colour doesn't exactly match plane colour but is close
			
			switch (c)
			{
				case 1 :
				//purple
					colour = 0x934aa9;
					break;
				case 2:
					colour = 0xffffff;
					break;
				case 3 :
					colour = 0xCD9D00;
					break;
				case 4 :
					colour = 0xCC1300;
					break;
				case 5 :
					colour = 0x4fACA3;
					break;
			}
			drawPath();
		}
		public function drawPath():void
		{
			holder = new Sprite();
			recordArray.splice(0,2);
			if (recordArray.length > 0)
			{
				holder.graphics.lineStyle(4,colour,1);
				holder.graphics.moveTo(xx,yy);
				for (var i = 0; i<recordArray.length; i+=2)
				{
					holder.graphics.lineTo(recordArray[i],recordArray[i+1]);
					
				}
			}
			this.addChild(holder);
		}
		public function updatePath(planeX:Number,planeY:Number):void
		{
			//removes the old path when it is updated
			xx = planeX;
			yy = planeY;
			try
			{
				this.removeChild(holder);
			}
			catch (error:ArgumentError)
			{
			}
			drawPath();
		}
	}
}