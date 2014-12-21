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
      heightFt            = parseFloat($('.system.selected [data-calc="height-ft"]').val()),
      heightIn            = parseFloat($('.system.selected [data-calc="height-in"]').val()),
      heightCm            = parseFloat($('.system.selected [data-calc="height-cm"]').val()),
      height              = 0,
      bf                  = parseFloat($('.bf-gender.active [data-calc="bf"]:checked').val()),
      bfFormula           = 0,
      formula             = parseFloat($('[data-calc="formula"]:checked').val()),
      activityWeek        = parseFloat($('select[data-calc="activity"] option:selected').val()),
      activityExtra       = [],
      activityExtraTotal  = 0,
      activity            = 0,
      activityDesc        = $('select[data-calc="activity"] option:selected').text(),
      // Step 2
      goal,
      $goal               = $('[data-calc-goal]'),
      goalSelected        = parseInt($('[data-calc-goal]:checked').val()),
      goalCalsSelected    = 0,
      goalVal             = 0,
      goalId,
      $goalCals           = $('[data-calc-goal-calories]'),
      goalCals            = 0,
      ratios              = $('select[data-calc="ratios"] option:selected'),
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

    // Step 1:

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
    if ($('#imperial-height').is(':checked')) {
      height = Math.floor(((heightFt * 12) + heightIn) * 2.54);
    } else {
      height = heightCm;
    }
    if ($('#imperial-weight').is(':checked')) {
      weight = Math.round(weight * 0.45359237);
    }
    
    if (gender === 'male') {
      bfFormula = 25;
    } else {
      // Female
      bfFormula = 35;
    }
    
    console.log(bf);
    
    if (bf < bfFormula) {
      // Athletic
      $('.bf-pick').removeClass('active');

      bf                  = 20;
      sumLBM              = (weight * (1 - bf / 100));
      sumRecCals          = Math.floor((12 * sumLBM));
      sumRecProt          = (1.25 * sumLBM);
      sumRecProtPercent   = ((sumRecProt * 4) / sumRecCals);
      sumRecFat           = 25;

      // Macros
      macroBF             = parseFloat(bf) / 100;
      macroCals           = (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age));
      macroProt           = (macroCals * sumRecProtPercent / 4);
      macroFat            = (macroCals * (macroBF / 9));
      macroCarb           = (macroCals * (1 - sumRecProtPercent - macroBF) / 9);
      macroCustomCals     = (activity * (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age)));
      macroCustomProt     = (macroCustomCals * sumRecProtPercent / 4);
      macroCustomFat      = (macroCustomCals * (macroBF / 9));
      macroCustomCarb     = (macroCustomCals * (1 - sumRecProtPercent - macroBF) / 9);
    } else {
      // Lean Mass
      $('.bf-pick').addClass('active');

      sumLBM              = (weight * (1 - bf / 100));
      sumRecCals          = Math.floor((12 * sumLBM));
      sumRecProt          = (1.25 * sumLBM);
      sumRecProtPercent   = ((sumRecProt * 4) / sumRecCals);
      sumRecFat           = 25;

      // Macros
      macroBF             = parseFloat(bf) / 100;
      macroCals           = (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age));
      macroProt           = (macroCals * sumRecProtPercent / 4);
      macroFat            = (macroCals * (macroBF / 9));
      macroCarb           = (macroCals * (1 - sumRecProtPercent - macroBF) / 9);
      macroCustomCals     = (activity * (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age)));
      macroCustomProt     = (macroCustomCals * sumRecProtPercent / 4);
      macroCustomFat      = (macroCustomCals * (macroBF / 9));
      macroCustomCarb     = (macroCustomCals * (1 - sumRecProtPercent - macroBF) / 9);
    }

    console.log('calc: ' + calcId, calcVal, bf);

    // Step 2: Goal
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
        goalCalsSelected = goalCals;
      }
    }

    $($goal).each(function(index) {
      if ($(this).hasClass('selected')) {
        goal    = $(this).data('calc-goal');
        goalVal = parseInt($(this).attr('value'));
        goalId  = $(this).attr('id');
        var $thisGoal = $(this);
        updateGoal($thisGoal, goal, goalVal, macroCustomCals);
      }
    });

    // Step 3:
    if (gender === 'male') {
      $('.bf-female').removeClass('active');
      $('.bf-male').addClass('active');
    } else {
      $('.bf-male').removeClass('active');
      $('.bf-female').addClass('active');
    }
    
    // Step 6:
    updateMacros();
    
    function updateMacros() {
      var ratioName     = ratios.data('name');
      var ratioProtein  = ratios.data('protein');
      var ratioCarbs    = ratios.data('carbs');
      var ratioFat      = ratios.data('fat');
      //console.log(ratioName, ratioProtein, ratioFat, ratioCarbs);
      $('[data-ratio="protein"]').val(ratioProtein);
      $('[data-ratio="fat"]').val(ratioFat);
      $('[data-ratio="carbs"]').val(ratioCarbs);
      
      macroResultCals     = (goalCalsSelected);
      macroResultProt     = ((macroResultCals * ratioProtein / 100) / 4);
      macroResultFat      = ((macroResultCals * ratioFat / 100) / 9);
      macroResultCarb     = ((macroResultCals * ratioCarbs / 100) / 4);
    }

    //

    function inputVal(id, sumVal) {
      $(id).val(sumVal);
    }

    function updateVal(id, sumVal) {
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

    // Meals
    $('[data-meal-link]').attr('href', 'http://madeby88.com/~dev/gsncalc/meals.php?gender=' + gender + '&bf=' + bf + '&goal=' + goalId + '&calories=' + Math.floor(macroResultCals) + '&protein=' + Math.floor(macroResultProt) + '&fat=' + Math.floor(macroResultFat) + '&carbs=' + Math.floor(macroResultCarb) + '');

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
(function (window) {
  "use strict";

  function mealUpdate() {
  }

  mealUpdate.prototype.setValue = function (calcCals, calcCarbs, calcFat, calcProtein) {

    var foods         = [[0, "Breakfast", "Banana 1 serving", 112, 29, 0, 1, 1, 15],
                         [1, "Breakfast", "Protein 42g", 103, 3, 1, 20, 192, 2.5],
                         [2, "Breakfast", "Oats 30g", 74, 16.5, 0, 0, 0, 0],
                         [3, "Pre-Workout", "Banana 1 serving", 112, 29, 0, 1, 1, 15],
                         [4, "Pre-Workout", "Protein 42g", 103, 3, 1, 20, 192, 2.5],
                         [5, "Pre-Workout", "Oats 30g", 74, 16.5, 0, 0, 0, 0],
                         [6, "Meal", "Gold Standard Nutrition - Pot Of Gold - Naked 1 Pot", 345, 46, 2, 37, 0, 1],
                         [7, "Meal", "Pot O Mash 200g", 181, 35, 2, 5, 229, 8],
                         [8, "Meal", "Gold Standard Nutrition - Steam Cooked Chicken Fillets 120g", 148, 1, 1, 34, 200, 0],
                         [9, "Bedtime", "Tesco - Everyday Value Cottage Cheese Low Fat 300g", 190, 15, 2, 29, 1000, 11],
                         [10, "Bedtime", "Alpro - Unsweetend Almond Milk 100ml", 13, 2, 1, 0, 0, 0]],
    macroCals         = calcCals,
    macroCarbs        = calcCarbs,
    macroFat          = calcFat,
    macroProtein      = calcProtein,
    numMeals          = 7,
    mealCalsLimit     = (macroCals / numMeals),
    mealCarbsLimit    = (macroCarbs / numMeals),
    mealFatLimit      = (macroFat / numMeals),
    mealProteinLimit  = (macroProtein / numMeals),
    mealCalsLeft      = (macroCals - (mealCalsLimit * 7));

  var mealType,
    makerCals;
  var mealArr;
  function mealMaker(mealType, makerCals, makerCarbs, makerFat, makerProtein, mealArr) {
  var meal              = mealType,
      mealTotalCals     = makerCals,
      mealTotalCarbs    = makerCarbs,
      mealTotalFat      = makerFat,
      mealTotalProtein  = makerProtein,
      foodCals          = 0,
      foodCarbs         = 0,
      foodFat           = 0,
      foodProtein       = 0,
      foodSodium        = 0,
      foodSugar         = 0,
      mealCals          = 0,
      mealCarbs         = 0,
      mealFat           = 0,
      mealProtein       = 0,
      mealSodium        = 0,
      mealSugar         = 0,
      meali             = -1,
      mealArr           = [[],[],[],[]];
  while (++meali < 4 && mealCals < mealTotalCals) {
    $.each(foods,function(i) {
      console.log('mealCals ' + mealCals, meali, i);
      if (meal === foods[i][1]) {

        if ((mealCals < mealTotalCals) && (mealCarbs < (mealTotalCarbs + 50))) {

          if ((mealCals + foods[i][3]) > mealTotalCals) {

            // Food /2
            if ((foods[i][0] === 2) || (foods[i][0] === 5)) {
              foodCals = foods[i][3] / 2;
              addFood(foods[i][2], foodCals, foods[i][4], foods[i][5], foods[i][6], foods[i][7], foods[i][8]);
            }

            // Elevenses
            if (meal === 'Meal') {

            }

          } else {
            addFood(foods[i][2], foods[i][3], foods[i][4], foods[i][5], foods[i][6], foods[i][7], foods[i][8]);
          }
        } else {
          return false;
        }
      }
      function addFood(foodName, foodCals, foodCarbs, foodFat, foodProtein, foodSodium, foodSugar) {
        console.log('addFood foodCals ' + foodCals);

        //foodName = foods[i][2];
        mealCals += foodCals;
        mealCarbs += foodCarbs;
        mealFat += foodFat;
        mealProtein += foodProtein;
        mealSodium += foodSodium;
        mealSugar += foodSugar;

        //mealArr[meali].push(mealCals);
        mealArr[meali].push(foodName);
        mealArr[meali].push(foodCals);
        mealArr[meali].push(foodCarbs);
        mealArr[meali].push(foodFat);
        mealArr[meali].push(foodProtein);

        //mealArr = [];
        /*mealArr.push(mealFood);
        mealArr.push(mealCals);
        mealArr.push(mealCarbs);
        mealArr.push(mealFat);
        mealArr.push(mealProtein);*/
      }
    });
  }
  //console.log(meal + ' Cals = ' + mealCals);
  return mealCals, mealArr;
  }

  var meal1 = mealMaker('Breakfast', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  console.log(meal1);
  $('#meal1').html('');
  $('#meal1').append('<p>' + meal1[0] + '</p>');
  $('#meal1').append('<p>' + meal1[1] + '</p>');
  $('#meal1').append('<p>' + meal1[2] + '</p>');
  $('#meal1').append('<p>' + meal1[3] + '</p>');

  var meal2 = mealMaker('Pre-Workout', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  $('#meal2').html('');
  $('#meal2').append('<p>' + meal2[0] + '</p>');
  $('#meal2').append('<p>' + meal2[1] + '</p>');
  $('#meal2').append('<p>' + meal2[2] + '</p>');
  $('#meal2').append('<p>' + meal2[3] + '</p>');

  var meal3 = mealMaker('Pre-Workout', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  $('#meal3').html('');
  $('#meal3').append('<p>' + meal3[0] + '</p>');
  $('#meal3').append('<p>' + meal3[1] + '</p>');
  $('#meal3').append('<p>' + meal3[2] + '</p>');
  $('#meal3').append('<p>' + meal3[3] + '</p>');

  var meal4 = mealMaker('Meal', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  $('#meal4').html('');
  $('#meal4').append('<p>' + meal4[0] + '</p>');
  $('#meal4').append('<p>' + meal4[1] + '</p>');
  $('#meal4').append('<p>' + meal4[2] + '</p>');
  $('#meal4').append('<p>' + meal4[3] + '</p>');

  var meal5 = mealMaker('Meal', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  $('#meal5').html('');
  $('#meal5').append('<p>' + meal5[0] + '</p>');
  $('#meal5').append('<p>' + meal5[1] + '</p>');
  $('#meal5').append('<p>' + meal5[2] + '</p>');
  $('#meal5').append('<p>' + meal5[3] + '</p>');

  var meal6 = mealMaker('Meal', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  $('#meal6').html('');
  $('#meal6').append('<p>' + meal6[0] + '</p>');
  $('#meal6').append('<p>' + meal6[1] + '</p>');
  $('#meal6').append('<p>' + meal6[2] + '</p>');
  $('#meal6').append('<p>' + meal6[3] + '</p>');

  var meal7 = mealMaker('Bedtime', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  $('#meal7').html('');
  $('#meal7').append('<p>' + meal7[0] + '</p>');
  $('#meal7').append('<p>' + meal7[1] + '</p>');
  $('#meal7').append('<p>' + meal7[2] + '</p>');
  $('#meal7').append('<p>' + meal7[3] + '</p>');
  /*var meal2 = mealMaker('Pre-Workout', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  var meal3 = mealMaker('Pre-Workout', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  var meal4 = mealMaker('Meal', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  console.log(meal1, meal2, meal3, meal4);
  var meal5 = mealMaker('Meal', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  var meal6 = mealMaker('Meal', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  var meal7 = mealMaker('Bedtime', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);

  console.log(meal1);
  console.log(meal2);
  console.log(meal3);
  console.log(meal4);

  var meal1Cals = meal1[0];
  var meal2Cals = meal1[0];
  var meal3Cals = meal1[0];
  var meal4Cals = meal1[0];
  var meal5Cals = meal1[0];
  var meal6Cals = meal1[0];
  var meal7Cals = meal1[0];

  console.log('Meal 1 Cals ' + mealCalsLimit, meal1Cals);

  var meal1Carbs = meal1[1];
  var meal2Carbs = meal2[1];
  var meal3Carbs = meal3[1];
  var meal4Carbs = meal4[1];
  var meal5Carbs = meal5[1];
  var meal6Carbs = meal6[1];
  var meal7Carbs = meal7[1];

  console.log('Meal 1 Carbs ' + mealCarbsLimit, meal1Carbs);

  var meal1Fat = meal1[3];
  var meal2Fat = meal2[3];
  var meal3Fat = meal3[3];
  var meal4Fat = meal4[3];
  var meal5Fat = meal5[3];
  var meal6Fat = meal6[3];
  var meal7Fat = meal7[3];

  var meal1Protein = meal1[2];
  var meal2Protein = meal2[2];
  var meal3Protein = meal3[2];
  var meal4Protein = meal4[2];
  var meal5Protein = meal5[2];
  var meal6Protein = meal6[2];
  var meal7Protein = meal7[2];

  console.log('Total Meal Calories: ' + (meal1Cals + meal2Cals + meal3Cals + meal4Cals + meal5Cals + meal6Cals + meal7Cals) + ', Target Calories: ' + macroCals);
  console.log('Total Meal Carbs: ' + (meal1Carbs + meal2Carbs + meal3Carbs + meal4Carbs + meal5Carbs + meal6Carbs + meal7Carbs) + ', Target Carbs: ' + macroCarbs);
  //console.log('Total Meal Fat: ' + (meal1Fat + meal2Fat + meal3Fat + meal4Fat + meal5Fat + meal6Fat + meal7Fat) + ', Target Fat: ' + macroFat);
  //console.log('Total Meal Protein: ' + (meal1Protein + meal2Protein + meal3Protein + meal4Protein + meal5Protein + meal6Protein + meal7Protein) + ', Target Protein: ' + macroProtein);*/

  };

  window.mealUpdate = mealUpdate;

})(window);

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
        $('.system-height .imperial').removeClass('hide');
        $('.system-height .metric').addClass('hide');
        $('.system-height input').val(heightVal = Math.floor(heightVal / 2.5));
      }
      if ($('#metric-height').is(':checked')) {
        $('.system-height .imperial').addClass('hide');
        $('.system-height .metric').removeClass('hide');
        $('.system-height input').val(heightVal = Math.floor(heightVal * 2.54));
      }
    }
    
    if ($(this).data('calc') === 'system-weight') {
      var weightVal = $('.system-weight input').val();
      if ($('#imperial-weight').is(':checked')) {
        $('.system-weight .imperial').removeClass('hide');
        $('.system-weight .metric').addClass('hide');
        $('.system-weight input').val(weightVal = Math.round(weightVal * 2.2));
      }
      if ($('#metric-weight').is(':checked')) {
        $('.system-weight .imperial').addClass('hide');
        $('.system-weight .metric').removeClass('hide');
        $('.system-weight input').val(weightVal = Math.round(weightVal * 0.45359237));
      }
    }
    
    if ($(this).data('calc') === 'goal-primary') {
      var primaryGoalVal = $(this).val();
      console.log(primaryGoalVal);
      $('[data-goal]').removeClass('active');
      $('[data-goal="' + primaryGoalVal + '"]').addClass('active');
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
  "use strict";

  $(window).on("throttledresize", function (e) {
    equalheight('.equal-height');
  });

});

// Steps
$(function () {
  "use strict";

  /*// Step layout
  var stepW     = 0,
      stepFullW = 0;

  function stepSize() {
    stepW = ($('.calc-form').width());
    stepFullW = (stepW * 4);

    $('.step').width(stepW);
    $('.step-wrap').width(stepFullW);
  }

  stepSize();

  $('.step-wrap').css('margin-left', -970);*/

  var docViewTop  = 0,
      stepsPos    = 0;

  $('.steps').height($('.steps').height());

  function stepsBar() {
    docViewTop  = $(window).scrollTop(),
    stepsPos    = $('.steps').offset().top;

    //console.log(docViewTop, stepsPos);

    if (docViewTop > stepsPos) {
      $('.steps-bar').addClass('fixed');
    } else {
      $('.steps-bar').removeClass('fixed');
    }
  }

  $(window).scroll(function(){
    stepsBar();
    $('.steps').height($('.steps').height());
  })

  function stepChange() {

  }

  var calculate_step = 0;

  $('[data-calculate]').on('click', function(e) {
    e.preventDefault();

    calculate_step = parseFloat($(this).attr('data-calculate'));

    //console.log(calculate_step);
    calculate_step = (calculate_step + 1);
    //console.log(calculate_step);

    $('.steps-step').removeClass('active');
    $('.steps-step.step-' + calculate_step).addClass('active');

    $('.step').removeClass('active');
    $('.step.step-' + calculate_step).addClass('active');

    $('html, body').animate({
      scrollTop: $('.step.step-' + calculate_step).offset().top
    }, 1000);

  });

});
