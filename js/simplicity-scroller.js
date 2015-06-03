//simplicity-scroller.js

(function($){

  var scroller = function(){

    var obj = this;

    obj.defaultOptions = {
      delay: 5000,
      speed: 1000
    };

    obj.init = function(element, options){

      obj.$elem = element;
      obj.options = $.extend(obj.defaultOptions, options);

      obj.$imgs = obj.$elem.find('div.img-wrapper div.img-item');
      obj.$indicator = obj.$elem.find('div.ctrl-wrapper ul li');
      obj.$direLeft = obj.$elem.find('.dir-left');
      obj.$direRight = obj.$elem.find('.dir-right');
      obj.animatorTimer = "";
      obj.index = 0;
      obj.len = obj.$imgs.length;

      obj.$indicator.bind("click", function(){
        console.log($(this).index());
        obj.index = $(this).index();
        clearInterval(obj.animatorTimer);
        obj.animator(1);
        obj.animatorTimer = setInterval(obj.animator, obj.options.delay);
      });

      obj.$direLeft.bind("click", function(){
        obj.index = obj.index - 1;
        if(obj.index < 0){
          obj.index = obj.len - 1;
        }
        clearInterval(obj.animatorTimer);
        obj.animator(1);
        obj.animatorTimer = setInterval(obj.animator, obj.options.delay);
      });

      obj.$direRight.bind("click", function(){
        obj.index = obj.index + 1;
        if(obj.index >= obj.len){
          obj.index = 0;
        }
        clearInterval(obj.animatorTimer);
        obj.animator(1);
        obj.animatorTimer = setInterval(obj.animator, obj.options.delay);
      });

      obj.$imgs.css({left:0});

      obj.indicated(obj.index);

      obj.animatorTimer = setInterval(obj.animator, obj.options.delay);

      return obj;

    }

    obj.indicated = function(index){
      obj.$indicator.removeClass("active");
      obj.$indicator.eq(index).addClass("active");
    }

    obj.animator = function(ctrl){

      console.log("run - animator");

      if(typeof(ctrl) != "undefined"){
        obj.indicated(obj.index);
        var range = (obj.index) * (-242);
        console.log("click control: " + range);
        obj.$imgs.animate({left:range}, obj.options.speed);
      }

      else{
        obj.index++;
        if(obj.index > obj.len - 1){
          obj.index = 0;
        }
        obj.indicated(obj.index);

        var range = (obj.index) * (-242);
        console.log(range);
        obj.$imgs.animate({left:range}, obj.options.speed);
      }
    }

  }

  $.fn.scroller = function(options){

    var len = this.length;

    return this.each(function(index){
      var me = $(this);
      var key = 'scroller' + (len > 1 ? '-' + ++index : '');
      var instance = (new scroller).init(me, options);

      me.data(key, instance).data('key', key);
    })

  }

})(jQuery);