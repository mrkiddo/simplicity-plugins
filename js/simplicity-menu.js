//simplicity-menu.js
(function($){

	var menu = function(){

		var _o = this;

		_o.registCategory = function(catelog){
			if(_o.$menuListItem.size() == catelog.length){
				for(var i = 0; i < catelog.length; i++){
					_o.$menuListItem.eq(i).attr("data-category", catelog[i]);
				}
			}
		}

		_o.hoverOn = function(event){
			var $currentList = $(event.target).attr("data-category");
			console.log($currentList);
			_o.$menuItem.css("height", "0");
			_o.$menuItem.show();
			_o.$menuItem.animate({height: "250px"}, 300);
			event.preventDefault();
		}

		_o.hoverOut = function(){
			_o.$menuItem.delay(150).animate({height: "0"}, 300).hide(200);
			
		}

		_o.init = function(elem, catelog){
			//menuItem.css("display", "none");
			/*
			$menuListItem.each(function(index){
				$(this).attr("data-index", index);
			});
			*/

			_o.$menu = elem;
			_o.$menuItem = _o.$menu.find('.menu-item');
			_o.$menuListItem = _o.$menu.find('.menu-bar ul li').not('.no-menu');
			_o.$noMenuListItem =_o.$menu.find('li.no-menu');
			_o.registCategory(catelog);

			console.log(_o.$menuListItem.mouseDelay);

			_o.$menuListItem.mouseDelay(false, "menu").hover(_o.hoverOn, null).click(_o.hoverOn);
			_o.$noMenuListItem.unbind('mouseenter').unbind('mouseleave');
			_o.$menuItem.mouseDelay(false, "menu").hover(null, _o.hoverOut);
		}
	}

	$.fn.menu = function(catelog){
		var self = $(this);
		var instance = (new menu).init(self, catelog);
		return instance;
	}

})(jQuery);