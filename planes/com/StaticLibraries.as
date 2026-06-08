package com
{
	import flash.display.DisplayObjectContainer;
	import flash.display.DisplayObject;
	import flash.utils.ByteArray; 
	public class StaticLibraries
	{
		
		public static function rand(min:Number, max:Number):Number
		{
			var randomNum:Number = Math.floor(Math.random() * (max - min + 1)) + min;
			return randomNum;
		}
		
		public static function removeAllChildren(parentChild:*):void
		{
			for (var i:uint; i < parentChild.numChildren; ++i)
			{
				//check if child is a DisplayObjectContainer, which could hold more children
				if (parentChild.getChildAt(i) is DisplayObjectContainer)
				{
					removeAllChildren(DisplayObjectContainer(parentChild.getChildAt(i)));
				}
				else
				{
					//remove and null child of parent
					var child:DisplayObject = parentChild.getChildAt(i);
					if (child != null)
					{
					parentChild.removeChild(child);
					child = null;
					}
				}
			}
			//remove and null parent if needed
			//parentChild.parent.removeChild(parentChild);
			//parentChild = null;
		}
		
		public static function clone(source:Object):*
		{
			var myBA:ByteArray = new ByteArray();
			myBA.writeObject(source);
			myBA.position = 0;
			return (myBA.readObject());
		}
	}

}