(function (window) {
  "use strict";

  function calcUpdate() {
  }

  calcUpdate.prototype.setValue = function (calcId, calcVal) {
    
    var
      calcId              = calcId,
      calcVal             = calcVal,
      sumVal,
      gender              = $('[data-calc="gender"]:checked').val(),
      age                 = parseInt($('[data-calc="age"]').val()),
      weight              = parseInt($('[data-calc="weight"]').val()),
      height              = parseInt($('[data-calc="height"]').val()),
      BF                  = parseInt($('[data-calc="bf"]').val()),
      activity            = parseFloat($('select[data-calc="activity"] option:selected').val()),
      activityDesc        = $('select[data-calc="activity"] option:selected').text(),
      workCarbs           = $('[data-calc-work="carbs"]').val(),
      workProt            = $('[data-calc-work="prot"]').val(),
      workFat             = $('[data-calc-work="fat"]').val(),
      workWeek1           = $('[data-calc-work="week1"]').val(),
      workWeek2           = $('[data-calc-work="week2"]').val(),
      workWeek3           = $('[data-calc-work="week3"]').val(),
      workWeek4           = $('[data-calc-work="week4"]').val(),
      // BMR
      BMR1                = parseInt($('[data-calc-bmr="' + gender + '"] [data-calc-bmr="1"]').val()),
      BMR2                = parseInt($('[data-calc-bmr="' + gender + '"] [data-calc-bmr="2"]').val()),
      BMR3                = parseInt($('[data-calc-bmr="' + gender + '"] [data-calc-bmr="3"]').val()),
      BMR4                = parseInt($('[data-calc-bmr="' + gender + '"] [data-calc-bmr="4"]').val()),
      // Sums
      sumLBM              = (weight * (1 - BF / 100)),
      sumRecCals          = Math.floor((12 * sumLBM)),
      sumRecProt          = (1.25 * sumLBM),
      sumRecProtPercent   = ((sumRecProt * 4) / sumRecCals),
      //sumRecProtPercentP  = Math.round(((sumRecProt * 4) / sumRecCals) / Math.pow(10, -2) * 10) / 10,
      sumRecFat           = 25,
      sumNeedCarbs        = (weight * workCarbs),
      sumNeedProt         = (weight * workProt),
      sumNeedFat          = (weight * workFat),
      sumNeedWeek1        = (weight * workWeek1),
      sumNeedWeek2        = (weight * workWeek2),
      sumNeedWeek3        = (weight * workWeek3),
      sumNeedWeek4        = (weight * workWeek4),
      // Macros
      macroBF             = parseFloat(BF) / 100,
      macroCals           = (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age)),
      macroProt           = (macroCals * sumRecProtPercent / 4),
      macroFat            = (macroCals * (macroBF / 9)),
      macroCarb           = (macroCals * (1 - sumRecProtPercent - macroBF) / 9),
      macroCustomCals     = (activity * (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age))),
      macroCustomProt     = (macroCals * sumRecProtPercent / 4),
      macroCustomFat      = (macroCals * (macroBF / 9)),
      macroCustomCarb     = (macroCals * (1 - sumRecProtPercent - macroBF) / 9);
      //macroCarb           = (1 - (sumRecProtPercent - macroBF));
    
    console.log('calc: ' + calcId, calcVal, macroCals, macroCals, BMR2 * weight, BMR3 * height, BMR4 * age, activity, activityDesc, gender);
    
    function inputVal(id, sumVal) {
      //sumVal = Math.round(sumVal/100);
      $(id).val(sumVal);
    }
    
    function updateVal(id, sumVal) {
      //sumVal = Math.round(sumVal/100);
      $(id).html(sumVal);
    }
    
    // Stats
    inputVal('[data-calc="lbm"]', sumLBM);
    inputVal('[data-calc="recCals"]', sumRecCals);
    inputVal('[data-calc="recProt"]', sumRecProt);
    inputVal('[data-calc="recProtPercent"]', Math.round(sumRecProtPercent / Math.pow(10, -2) * 10) / 10);
    //inputVal('[data-calc="recProtPercent"]', sumRecProtPercent);
    inputVal('[data-calc="recFat"]', sumRecFat);
    
    // Needs
    inputVal('[data-calc-need="carbs"]', sumNeedCarbs);
    inputVal('[data-calc-need="prot"]', sumNeedProt);
    inputVal('[data-calc-need="fat"]', sumNeedFat);
    inputVal('[data-calc-need="week1"]', sumNeedWeek1);
    inputVal('[data-calc-need="week2"]', sumNeedWeek2);
    inputVal('[data-calc-need="week3"]', sumNeedWeek3);
    inputVal('[data-calc-need="week4"]', sumNeedWeek4);
    
    // Macros
    updateVal('[data-calc-level="bmr"] [data-calc-macro="cals"]', Math.floor(macroCals));
    updateVal('[data-calc-level="bmr"] [data-calc-macro="prot"]', Math.floor(macroProt));
    updateVal('[data-calc-level="bmr"] [data-calc-macro="fat"]', Math.floor(macroFat));
    updateVal('[data-calc-level="bmr"] [data-calc-macro="carb"]', Math.floor(macroCarb));
    updateVal('[data-calc-level="custom"] [data-calc-macro="level"]', activityDesc);
    updateVal('[data-calc-level="custom"] [data-calc-macro="cals"]', Math.floor(macroCustomCals));
    updateVal('[data-calc-level="custom"] [data-calc-macro="prot"]', Math.floor(macroCustomProt));
    updateVal('[data-calc-level="custom"] [data-calc-macro="fat"]', Math.floor(macroCustomFat));
    updateVal('[data-calc-level="custom"] [data-calc-macro="carb"]', Math.floor(macroCustomCarb));

  };

  window.calcUpdate = calcUpdate;

})(window);

$(function () {
  "use strict";

  $('[data-toggle]').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.'+$(this).data('toggle')).toggleClass('active');
    equalheight('.equal-height');
  });

});

/* Thanks to CSS Tricks for pointing out this bit of jQuery
http://css-tricks.com/equal-height-blocks-in-rows/
It's been modified into a function called at page load and then each time the page is resized. One large modification was to remove the set height before each new calculation. */

equalheight = function(container){

var currentTallest = 0,
    currentRowStart = 0,
    rowDivs = new Array(),
    $el,
    topPosition = 0;
 $(container).each(function() {

   $el = $(this);
   $($el).height('auto')
   topPostion = $el.position().top;

   if (currentRowStart != topPostion) {
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
     rowDivs.length = 0; // empty the array
     currentRowStart = topPostion;
     currentTallest = $el.height();
     rowDivs.push($el);
   } else {
     rowDivs.push($el);
     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
  }
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }
 });
}

$(function () {
	"use strict";

    $(window).load(function () {
        equalheight('.equal-height');
    });
    
    $(window).on("throttledresize", function (e) {
        equalheight('.equal-height');
    });
    
});
/*
 * throttledresize: special jQuery event that happens at a reduced rate compared to "resize"
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function($) {

var $event = $.event,
	$special,
	dummy = {_:0},
	frame = 0,
	wasResized, animRunning;

$special = $event.special.throttledresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments;

		wasResized = true;

		if ( !animRunning ) {
			setInterval(function(){
				frame++;

				if ( frame > $special.threshold && wasResized || execAsap ) {
					// set correct event type
					event.type = "throttledresize";
					$event.dispatch.apply( context, args );
					wasResized = false;
					frame = 0;
				}
				if ( frame > 9 ) {
					$(dummy).stop();
					animRunning = false;
					frame = 0;
				}
			}, 30);
			animRunning = true;
		}
	},
	threshold: 0
};

})(jQuery);
$(function () {
  "use strict";

  var
    calcResult,
    calcId,
    calcVal;

  calcResult = new calcUpdate();
  calcResult.setValue('default', '0');
  
  $('[data-calc]').bind('change keyup', function(event){
    calcResult = new calcUpdate();
    calcId = $(this).data('calc');
    calcVal = $(this).val();
    calcResult.setValue(calcId, calcVal);
  });

});

// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Throttled resize
$(function () {

  $(window).on("throttledresize", function (e) {
    equalheight('.equal-height');
  });

});
