(function (window) {
  "use strict";

  function calcUpdate() {
  }

  calcUpdate.prototype.setValue = function (fromCalcId, fromCalcVal, fromCalcSelected) {

    var
      calcId              = fromCalcId,
      calcVal             = fromCalcVal,
      $calcSelected       = fromCalcSelected,
      sumVal              = 0,
      bfFormula           = 0,
      // Conversions
      calcConversion      = 0,
      $calcConversion     = $('[data-calc-conversion]'),
      gender              = $('[data-calc="gender"]:checked').val(),
      age                 = parseFloat($('[data-calc="age"]').val()),
      weight              = parseFloat($('.system.selected [data-calc="weight"]').val()),
      heightFt            = parseFloat($('.system.selected [data-calc="height-ft"]').val()),
      heightIn            = parseFloat($('.system.selected [data-calc="height-in"]').val()),
      heightCm            = parseFloat($('.system.selected [data-calc="height-cm"]').val()),
      height              = 0,
      bf                  = parseFloat($('[data-calc="bf"]:checked').val()),
      
      // Activity
      activityWeek        = parseFloat($('select[data-calc="activity"] option:selected').val()),
      activityExtra       = [],
      activityExtraTotal  = 0,
      activity            = 0,
      activityDesc        = $('select[data-calc="activity"] option:selected').text(),
      
      // Goal
      goal                = 0,
      $goal               = $('[data-calc-goal]:checked'),
      goalSelected        = parseInt($('[data-calc-goal]:checked').val()),
      goalCalsSelected    = 0,
      goalVal             = 0,
      goalId,
      $goalCals           = $('[data-calc-goal-calories]'),
      goalCals            = 0,
      
      // Macro Ratio
      ratios              = $('[data-calc="ratios"]:checked'),
      
      // BMR
      // Men: BMR = 88.362 + (13.397 x weight in kg) + (4.799 x height in cm) - (5.677 x age in year)
      // Women: BMR = 447.593 + (9.247 x weight in kg) + (3.098 x height in cm) - (4.330 x age in years)
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
    activityExtra = $('[data-calc="activity-extra"]:checked').map(function () {
      return $(this).val();
    }).get();

    $.each(activityExtra, function (intIndex, objValue) {
      activityExtraTotal += parseFloat(objValue);
    });
    activity = (activityWeek + activityExtraTotal);
    
    // Convert height and weight for the formula
    if ($('#imperial-height').is(':checked')) {
      height = Math.floor(((heightFt * 12) + heightIn) * 2.54);
    } else {
      height = heightCm;
    }
    if ($('#imperial-weight').is(':checked')) {
      weight = Math.round(weight * 0.45359237);
    }
    
    if (gender === 'male') {
      // Male
      bfFormula = 25;
    } else {
      // Female
      bfFormula = 35;
    }
    
    console.log(bf, bfFormula);
    
    if (bf < bfFormula) {
      // Athletic

      bf                  = 20;
      sumLBM              = (weight * (1 - bf / 100));
      sumRecCals          = Math.floor((12 * sumLBM));
      sumRecProt          = (1.25 * sumLBM);
      sumRecProtPercent   = ((sumRecProt * 4) / sumRecCals);
      sumRecFat           = 25;

      // BMR Macros
      macroBF             = parseFloat(bf) / 100;
      macroCals           = (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age));
      macroProt           = (macroCals * sumRecProtPercent / 4);
      macroFat            = (macroCals * (macroBF / 9));
      macroCarb           = (macroCals * (1 - sumRecProtPercent - macroBF) / 9);
      
      // TDDE Macros
      macroCustomCals     = (activity * (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age)));
      macroCustomProt     = (macroCustomCals * sumRecProtPercent / 4);
      macroCustomFat      = (macroCustomCals * (macroBF / 9));
      macroCustomCarb     = (macroCustomCals * (1 - sumRecProtPercent - macroBF) / 9);
    } else {
      // Lean Mass

      sumLBM              = (weight * (1 - bf / 100));
      sumRecCals          = Math.floor((12 * sumLBM));
      sumRecProt          = (1.25 * sumLBM);
      sumRecProtPercent   = ((sumRecProt * 4) / sumRecCals);
      sumRecFat           = 25;

      // BMR Macros
      macroBF             = parseFloat(bf) / 100;
      macroCals           = (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age));
      macroProt           = (macroCals * sumRecProtPercent / 4);
      macroFat            = (macroCals * (macroBF / 9));
      macroCarb           = (macroCals * (1 - sumRecProtPercent - macroBF) / 9);
      
      // TDDE Macros
      macroCustomCals     = (activity * (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age)));
      macroCustomProt     = (macroCustomCals * sumRecProtPercent / 4);
      macroCustomFat      = (macroCustomCals * (macroBF / 9));
      macroCustomCarb     = (macroCustomCals * (1 - sumRecProtPercent - macroBF) / 9);
    }

    console.log('calc: ' + calcId, calcVal, bf);

    // Step 2: Goal  
    goal = $goal.data('calc-goal');
    goalVal = parseInt($goal.attr('value'));
    console.log(goal, goalVal);
    if (goal === 'fat-loss') {
      goalCals = (macroCustomCals - (macroCustomCals * goalVal / 100));
    } else if (goal === 'maintain') {
      goalCals = (macroCustomCals);
    } else {
      goalCals = (macroCustomCals + (macroCustomCals * goalVal / 100));
    }
    $('[data-calc-goal-calories="' + goal + '"]').html(Math.floor(goalCals));
    goalCalsSelected = goalCals;

    // Step 3:
    if (gender === 'male') {
      $('.bf-female').removeClass('active');
      $('.bf-male').addClass('active');
    } else {
      $('.bf-male').removeClass('active');
      $('.bf-female').addClass('active');
    }
    
    // Step 6:
    function updateMacros() {
      var ratioName     = ratios.data('name'),
          ratioProtein  = ratios.data('protein'),
          ratioCarbs    = ratios.data('carbs'),
          ratioFat      = ratios.data('fat');

      $('[data-ratio="protein"]').val(ratioProtein);
      $('[data-ratio="fat"]').val(ratioFat);
      $('[data-ratio="carbs"]').val(ratioCarbs);
      
      macroResultCals     = (goalCalsSelected);
      macroResultProt     = ((macroResultCals * ratioProtein / 100) / 4);
      macroResultFat      = ((macroResultCals * ratioFat / 100) / 9);
      macroResultCarb     = ((macroResultCals * ratioCarbs / 100) / 4);
    }
    
    updateMacros();
    
    // For HTML
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
    updateVal('[data-calc-level="tdde"] [data-calc-macro="level"]', activityDesc);
    updateVal('[data-calc-level="tdde"] [data-calc-macro="cals"]', Math.floor(macroCustomCals));
    updateVal('[data-calc-level="tdde"] [data-calc-macro="prot"]', Math.floor(macroCustomProt));
    updateVal('[data-calc-level="tdde"] [data-calc-macro="fat"]', Math.floor(macroCustomFat));
    updateVal('[data-calc-level="tdde"] [data-calc-macro="carb"]', Math.floor(macroCustomCarb));
    // Result
    updateVal('[data-calc-level="result"] [data-calc-macro="level"]', activityDesc);
    updateVal('[data-calc-level="result"] [data-calc-macro="cals"]', Math.floor(macroResultCals));
    updateVal('[data-calc-level="result"] [data-calc-macro="prot"]', Math.floor(macroResultProt));
    updateVal('[data-calc-level="result"] [data-calc-macro="fat"]', Math.floor(macroResultFat));
    updateVal('[data-calc-level="result"] [data-calc-macro="carb"]', Math.floor(macroResultCarb));
    
    // Meal builder link
    $('[data-meal-link]').attr('href', 'http://gsntransformationcentre.co.uk/meal-planner/?gender=' + gender +
                               '&age=' + age +
                               '&weight_kg=' + weight +
                               '&height_cm=' + height +
                               '&activityWeek=' + activityWeek +
                               '&goal_type=' + goal +
                               '&goal_num=' + goalVal +
                               '&bf=' + bf +
                               '&ratio=' + ratios.val() +
                               '&calories=' + Math.floor(macroResultCals) +
                               '&protein=' + Math.floor(macroResultProt) +
                               '&fat=' + Math.floor(macroResultFat) +
                               '&carbs=' + Math.floor(macroResultCarb));

  };

  window.calcUpdate = calcUpdate;

})(window);
