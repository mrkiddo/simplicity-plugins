//simplicity-img-magnifier.js

(function($){

	var magnifiers = function(){
		var obj = this;

		obj.defaultOptions = {
			magnifierRate: 2.5
		};

		obj.indicatorPosition = function(x, y){

			var position = {};
			//position.x = x + 10;
			//position.y = y + 10;
			position.x = x;
			position.y = y;

			console.log('indicatorX', position.x);
			console.log('indicatorY', position.y);

			if(position.x >= obj.defaultZoneWidth - 70) {
				position.x = obj.defaultZoneWidth - 70;
			}
			if(position.y >= obj.defaultZoneHeight - 70) {
				position.y = obj.defaultZoneHeight - 70;
			}

			obj.$indicator.css('top', position.y + 'px').css('left', position.x + 'px');

			return position;
		}

		obj.mouseOnDefault = function(event){

			var x = event.screenX;
			var y = event.screenY;

			x-=$(event.target).offset().left; 
			y=y-$(event.target).offset().top-63;

			var indicatorPos = obj.indicatorPosition(x, y);

			obj.$indicator.show();

			//x=(x/obj.defaultZoneWidth).toFixed(2); 
			//y=(y/obj.defaultZoneHeight).toFixed(2);

			//x=-(obj.magnifierZoneWrapperWidth * x - (obj.magnifierZoneWrapperWidth/2)); 
			//y=-(obj.magnifierZoneWrapperHeight * y - (obj.magnifierZoneWrapperHeight/2));

			x = -(indicatorPos.x * obj.options.magnifierRate - obj.magnifierZoneWrapperWidth/2);
			y = -(indicatorPos.y * obj.options.magnifierRate - obj.magnifierZoneWrapperHeight/2);

			obj.$magnifierZone.css('top', y + 'px'); 
			obj.$magnifierZone.css('left', x + 'px');

			obj.$defaultView.css("opacity", "0.3").css("border-color", "#bbb");

			obj.$magnifierZoneWrapper.show();
		}

		obj.mouseOutDefault = function(event){
			obj.$magnifierZoneWrapper.hide();
			obj.$indicator.hide();
			obj.$defaultView.css("opacity", "1").css("border-color", "#eee");
		}

		obj.init = function(element, options){
			obj.$magnifier = element;
			obj.options = $.extend(obj.defaultOptions, options);

			obj.$defaultView = obj.$magnifier.find('img.img-default-show');
			obj.$magnifierZoneWrapper = obj.$magnifier.find('.img-magnifier-wrapper');
			obj.$magnifierZone = obj.$magnifier.find('img.img-magnifier-zone');
			obj.$indicator = obj.$magnifier.find('.img-default-indicator');

			obj.magnifierZoneWrapperWidth = obj.$magnifierZoneWrapper.width();
			obj.magnifierZoneWrapperHeight = obj.$magnifierZoneWrapper.height();

			obj.defaultZoneWidth = obj.$defaultView.width();
			obj.defaultZoneHeight = obj.$defaultView.height();

			var magnifierImgSrc = obj.$defaultView.attr('data-large-src');

			obj.$magnifierZoneWrapper.find('div').css("position", "absolute")
			.css("width", obj.magnifierZoneWrapperWidth)
			.css("height", obj.magnifierZoneWrapperHeight);
			obj.$magnifierZone.attr("src", magnifierImgSrc);
			obj.$magnifierZone.css("width", obj.defaultZoneWidth * obj.options.magnifierRate + "px");
			obj.$magnifierZone.css("height", obj.defaultZoneHeight * obj.options.magnifierRate + "px");

			obj.$defaultView.mousemove(obj.mouseOnDefault);
			obj.$defaultView.mouseout(obj.mouseOutDefault);
		}
	}

	$.fn.magnifiers = function(options){

		var len = this.length;

		return this.each(function(index){
			var me = $(this);
		    var key = 'magnifiers' + (len > 1 ? '-' + ++index : '');
		    var instance = (new magnifiers).init(me, options);

		    me.data(key, instance).data('key', key);
		})
	}

})(jQuery);