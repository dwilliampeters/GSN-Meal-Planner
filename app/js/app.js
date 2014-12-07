(function (window) {
  "use strict";

  function calcUpdate() {
  }

  calcUpdate.prototype.setValue = function (calcId, calcVal, calcSelected) {

    var
      calcId              = calcId,
      calcVal             = calcVal,
      $calcSelected       = calcSelected,
      sumVal              = 0,
      // Conversions
      calcConversion      = 0,
      $calcConversion     = $('[data-calc-conversion]'),
      // Step 1
      gender              = $('[data-calc="gender"]:checked').val(),
      age                 = parseFloat($('[data-calc="age"]').val()),
      weight              = parseFloat($('.system.selected [data-calc="weight"]').val()),
      height              = parseFloat($('.system.selected [data-calc="height"]').val()),
      BF                  = parseFloat($('[data-calc="bf"]').val()),
      formula             = parseFloat($('[data-calc="formula"]:checked').val()),
      activityWeek        = parseFloat($('select[data-calc="activity"] option:selected').val()),
      activityExtra       = [],
      activityExtraTotal  = 0,
      //activityExtra       = parseFloat($('[data-calc="activity-extra"]:checked').val()),
      //activity            = (activityWeek + activityExtra),
      activity            = 0,
      activityDesc        = $('select[data-calc="activity"] option:selected').text(),
      // Step 2
      goal,
      $goal               = $('[data-calc-goal]'),
      goalSelected        = parseInt($('[data-calc-goal]:checked').val()),
      goalCalsSelected    = 0,
      goalVal             = 0,
      $goalCals           = $('[data-calc-goal-calories]'),
      goalCals            = 0,
      // BMR
      BMR1                = parseFloat($('[data-calc-bmr="' + gender + '"] [data-calc-bmr="1"]').val()),
      BMR2                = parseFloat($('[data-calc-bmr="' + gender + '"] [data-calc-bmr="2"]').val()),
      BMR3                = parseFloat($('[data-calc-bmr="' + gender + '"] [data-calc-bmr="3"]').val()),
      BMR4                = parseFloat($('[data-calc-bmr="' + gender + '"] [data-calc-bmr="4"]').val()),
      // Sums
      sumLBM              = 0,
      sumRecCals          = 0,
      sumRecProt          = 0,
      sumRecProtPercent   = 0,
      //sumRecProtPercentP  = Math.round(((sumRecProt * 4) / sumRecCals) / Math.pow(10, -2) * 10) / 10,
      sumRecFat           = 0,
      // Macros
      macroBF             = 0,
      macroCals           = 0,
      macroProt           = 0,
      macroFat            = 0,
      macroCarb           = 0,
      macroCustomCals     = 0,
      macroCustomProt     = 0,
      macroCustomFat      = 0,
      macroCustomCarb     = 0,
      macroResultCals     = 0,
      macroResultProt     = 0,
      macroResultFat      = 0,
      macroResultCarb     = 0;
      //macroCarb           = (1 - (sumRecProtPercent - macroBF));

    /*if (calcId === 'conversion') {
      // Centimeters ÷ 2.54cm/in = inches
      if ($calcSelected.data('calc-conversion') === 'centimeters') {
        $('[data-calc-conversion="inches"]').val(Math.floor($(calcSelected).val() / 2.5));
      }

      // multiply kg by 2.2
      if ($calcSelected.data('calc-conversion') === 'kilograms') {
        $('[data-calc-conversion="pounds"]').val(Math.floor($(calcSelected).val() * 2.2));
      }
    }*/

    // Step 1:

    /*if ($('.system.metric').hasClass('selected')) {
      // Centimeters ÷ 2.54cm/in = inches
      console.log(height);
      height = Math.floor(height / 2.5);
      console.log(height);

      // multiply kg by 2.2
      console.log(weight);
      weight = Math.round(weight * 2.2);
      console.log(weight);
    }*/

    // Activity
    activityExtra = $('[data-calc="activity-extra"]:checked').map(function(){
      return $(this).val();
    }).get();

    $.each(activityExtra, function(intIndex, objValue){
        activityExtraTotal += parseFloat(objValue);
      }
    );

    activity = (activityWeek + activityExtraTotal)
    // Convert height and weight to our usable formula
    /*if ($('.system.imperial').hasClass('selected')) {
      height = Math.floor(height * 2.54);
      weight = Math.round(weight * 0.45359237);
    }*/
    if ($('#imperial-height').is(':checked')) {
      height = Math.floor(height * 2.54);
    }
    if ($('#imperial-weight').is(':checked')) {
      weight = Math.round(weight * 0.45359237);
    }

    if (formula === 0) {
      // Athletic
      $('.input-bodyfat').attr('readonly', 'readonly');
      $('.input-bodyfat').val('');

      BF                  = 20;
      sumLBM              = (weight * (1 - BF / 100));
      sumRecCals          = Math.floor((12 * sumLBM));
      sumRecProt          = (1.25 * sumLBM);
      sumRecProtPercent   = ((sumRecProt * 4) / sumRecCals);
      sumRecFat           = 25;
      
      // Macros
      macroBF             = parseFloat(BF) / 100;
      macroCals           = (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age));
      macroProt           = (macroCals * sumRecProtPercent / 4);
      macroFat            = (macroCals * (macroBF / 9));
      macroCarb           = (macroCals * (1 - sumRecProtPercent - macroBF) / 9);
      macroCustomCals     = (activity * (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age)));
      macroCustomProt     = (macroCustomCals * sumRecProtPercent / 4);
      macroCustomFat      = (macroCustomCals * (macroBF / 9));
      macroCustomCarb     = (macroCustomCals * (1 - sumRecProtPercent - macroBF) / 9);
    }

    if (formula === 1) {
      // Normal
      $('.input-bodyfat').removeAttr('readonly');
      
      sumLBM              = (weight * (1 - BF / 100));
      sumRecCals          = Math.floor((12 * sumLBM));
      sumRecProt          = (1.25 * sumLBM);
      sumRecProtPercent   = ((sumRecProt * 4) / sumRecCals);
      sumRecFat           = 25;
      
      // Macros
      macroBF             = parseFloat(BF) / 100;
      macroCals           = (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age));
      macroProt           = (macroCals * sumRecProtPercent / 4);
      macroFat            = (macroCals * (macroBF / 9));
      macroCarb           = (macroCals * (1 - sumRecProtPercent - macroBF) / 9);
      macroCustomCals     = (activity * (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age)));
      macroCustomProt     = (macroCustomCals * sumRecProtPercent / 4);
      macroCustomFat      = (macroCustomCals * (macroBF / 9));
      macroCustomCarb     = (macroCustomCals * (1 - sumRecProtPercent - macroBF) / 9);
      /*macroBF             = parseFloat(BF) / 100;
      macroCals           = (sumRecCals);
      macroProt           = (macroCals * sumRecProtPercent / 4);
      macroFat            = (macroCals * (macroBF / 9));
      macroCarb           = (macroCals * (1 - sumRecProtPercent - macroBF) / 9);
      macroCustomCals     = (activity * sumRecCals);
      macroCustomProt     = (macroCustomCals * sumRecProtPercent / 4);
      macroCustomFat      = (macroCustomCals * (macroBF / 9));
      macroCustomCarb     = (macroCustomCals * (1 - sumRecProtPercent - macroBF) / 9);*/
    }

    console.log('calc: ' + calcId, calcVal, BF, sumLBM, sumRecCals, sumRecProt, sumRecProtPercent, sumRecFat);

    // Step 2: Goal
    //updateGoal();
    function updateGoal($thisGoal, goal, goalCals, macroCustomCals) {
      if (goal === 'fat-loss') {
        goalCals = (macroCustomCals - (macroCustomCals * goalVal / 100));
      } else if (goal === 'maintain') {
        goalCals = (macroCustomCals);
      } else {
        goalCals = (macroCustomCals + (macroCustomCals * goalVal / 100));
      }
      $('[data-calc-goal-calories="' + goal + '"]').html(Math.floor(goalCals));
      if ($thisGoal.is(':checked')) {
        console.log(goal + ' is checked');
        goalCalsSelected = goalCals;
      }
    }

    $($goal).each(function(index) {
      if ($(this).hasClass('selected')) {
        goal = $(this).data('calc-goal');
        goalVal = parseInt($(this).attr('value'));
        var $thisGoal = $(this);
        updateGoal($thisGoal, goal, goalVal, macroCustomCals);
      }
    });

    // Step 3:
    if (calcId === 'ratios') {
      var ratioName     =  $calcSelected.find(':selected').data('name');
      var ratioProtein  =  $calcSelected.find(':selected').data('protein');
      var ratioCarbs    =  $calcSelected.find(':selected').data('carbs');
      var ratioFat      =  $calcSelected.find(':selected').data('fat');
      console.log(ratioName, ratioProtein, ratioCarbs, ratioFat);
      $('[data-ratio="fat"]').val(ratioFat);
      $('[data-ratio="carbs"]').val(ratioCarbs);
      $('[data-ratio="protein"]').val(ratioProtein);
    }

    // Step 4:
    macroResultCals     = (goalCalsSelected);
    macroResultProt     = ((macroResultCals * ratioProtein / 100) / 4);
    macroResultFat      = ((macroResultCals * ratioFat / 100) / 9);
    macroResultCarb     = ((macroResultCals * ratioCarbs / 100) / 4);

    //

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
    inputVal('[data-calc="recFat"]', sumRecFat);

    // BMR
    updateVal('[data-calc-level="bmr"] [data-calc-macro="cals"]', Math.floor(macroCals));
    updateVal('[data-calc-level="bmr"] [data-calc-macro="prot"]', Math.floor(macroProt));
    updateVal('[data-calc-level="bmr"] [data-calc-macro="fat"]', Math.floor(macroFat));
    updateVal('[data-calc-level="bmr"] [data-calc-macro="carb"]', Math.floor(macroCarb));
    // TDDE
    updateVal('[data-calc-level="custom"] [data-calc-macro="level"]', activityDesc);
    updateVal('[data-calc-level="custom"] [data-calc-macro="cals"]', Math.floor(macroCustomCals));
    updateVal('[data-calc-level="custom"] [data-calc-macro="prot"]', Math.floor(macroCustomProt));
    updateVal('[data-calc-level="custom"] [data-calc-macro="fat"]', Math.floor(macroCustomFat));
    updateVal('[data-calc-level="custom"] [data-calc-macro="carb"]', Math.floor(macroCustomCarb));
    // Result
    updateVal('[data-calc-level="result"] [data-calc-macro="level"]', activityDesc);
    updateVal('[data-calc-level="result"] [data-calc-macro="cals"]', Math.floor(macroResultCals));
    updateVal('[data-calc-level="result"] [data-calc-macro="prot"]', Math.floor(macroResultProt));
    updateVal('[data-calc-level="result"] [data-calc-macro="fat"]', Math.floor(macroResultFat));
    updateVal('[data-calc-level="result"] [data-calc-macro="carb"]', Math.floor(macroResultCarb));

    // Goal
    //updateVal($goalCals, Math.floor(goalCals));

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
    var calcSelected = $(this);
    if ($(this).data('calc') === 'goal') {
      $('[data-calc-goal="' + $(this).data('calc-goal') + '"]').removeClass('selected');
      $('[data-calc-goal="' + $(this).data('calc-goal') + '"]').prop('checked', false);
      $(this).addClass('selected');
      $(this).prop('checked', true);
    }
    if ($(this).data('calc') === 'system-height') {
      var heightVal = $('.system-height input').val();
      if ($('#imperial-height').is(':checked')) {
        $('.system-height .postfix .imperial').removeClass('hide');
        $('.system-height .postfix .metric').addClass('hide');
        $('.system-height input').val(heightVal = Math.floor(heightVal / 2.5));
      }
      if ($('#metric-height').is(':checked')) {
        $('.system-height .postfix .imperial').addClass('hide');
        $('.system-height .postfix .metric').removeClass('hide');
        $('.system-height input').val(heightVal = Math.floor(heightVal * 2.54));
      }
    }
    if ($(this).data('calc') === 'system-weight') {
      var weightVal = $('.system-weight input').val();
      if ($('#imperial-weight').is(':checked')) {
        $('.system-weight .postfix .imperial').removeClass('hide');
        $('.system-weight .postfix .metric').addClass('hide');
        $('.system-weight input').val(weightVal = Math.round(weightVal * 2.2));
      }
      if ($('#metric-weight').is(':checked')) {
        $('.system-weight .postfix .imperial').addClass('hide');
        $('.system-weight .postfix .metric').removeClass('hide');
        $('.system-weight input').val(weightVal = Math.round(weightVal * 0.45359237));
      }
    }
    /*if ($(this).data('calc') === 'system') {
      $('.system').removeClass('selected');
      $('.system.' + $(this).val()).addClass('selected');
      $('.system').addClass('hide');
      $('.system.' + $(this).val()).removeClass('hide');
    }*/
    calcResult.setValue(calcId, calcVal, calcSelected);
  });

});

$(function () {
  "use strict";

  // SUDO

  // Foods
  // ID / Meal      / Foods            / Cals  / Carbs / Fat / Protein / Sodium / Sugar
  // 0  / Breakfast / Banana 1 serving / 112   / 29    / 0   / 1       / 1      / 15
  var foods     = [[0, "Breakfast", "Banana 1 serving", 112, 29, 0, 1, 1, 15],
                   [1, "Breakfast", "Protein 42g", 103, 3, 1, 20, 192, 2.5],
                   [2, "Breakfast", "Oats 30g", 74, 16.5, 0, 0, 0, 0],
                   [0, "Pre-Workout", "Banana 1 serving", 112, 29, 0, 1, 1, 15],
                   [1, "Pre-Workout", "Protein 42g", 103, 3, 1, 20, 192, 2.5],
                   [2, "Pre-Workout", "Oats 30g", 74, 16.5, 0, 0, 0, 0]],
      macroCals = 2360;

  // Macros
  // Calories / Protein / Fat / Carbs
  // 2360     / 236     / 52  / 236

  // 7 Meals = (macroCals / 7) = 337
  // Breakfast    = 337
  // Meal         = 337
  // Pre-Workout  = 337
  // Post-Workout = 337
  // Meal         = 337
  // Meal         = 337
  // Bedtime      = 337

  // Make a meal
  // EACH Foods.Meal = Breakfast GET Cals
  // ADD Cals to near 337
  // PRINT Foods FOR Breakfast
  var makerMeal,
      makerCals;
  function mealMaker(makerMeal, makerCals) {
    var meal = makerMeal;
    var mealCals  = 0;
    var mealTotalCals = makerCals;
    var meali = -1;
    while( ++meali < 5 && mealCals < mealTotalCals ){
      $.each(foods,function(i) {
        if (meal === foods[i][1]) {
          if (mealCals < mealTotalCals) {
            if ((mealCals + foods[i][3]) > mealTotalCals) {
              //console.log(mealCals + ' + ' + foods[i][3] + ' over');
            } else {
              //console.log(i + mealCals + ' + ' + foods[i][3]);
              mealCals += foods[i][3];
              //console.log(i + '+= ' + mealCals);
            }
          } else {
            return false;
          }
        }
      });
    }
    //console.log(meal + ' Cals = ' + mealCals);
    return mealCals;
  }
  
  var meal1 = mealMaker('Breakfast', 337);
  var meal2 = mealMaker('Pre-Workout', 337);
  var meal3 = mealMaker('Pre-Workout', 337);
  var meal4 = mealMaker('Pre-Workout', 337);
  var meal5 = mealMaker('Pre-Workout', 337);
  var meal6 = mealMaker('Pre-Workout', 337);
  var meal7 = mealMaker('Pre-Workout', 337);
  
  console.log('Total Meal Calories: ' + (meal1 + meal2 + meal3 + meal4 + meal5 + meal6 + meal7) + ', Target Calories: ' + macroCals);

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
