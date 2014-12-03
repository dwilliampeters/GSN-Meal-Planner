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
      age                 = parseInt($('[data-calc="age"]').val()),
      weight              = parseInt($('[data-calc="weight"]').val()),
      height              = parseInt($('[data-calc="height"]').val()),
      BF                  = parseInt($('[data-calc="bf"]').val()),
      formula             = parseInt($('[data-calc="formula"]:checked').val()),
      activity            = parseFloat($('select[data-calc="activity"] option:selected').val()),
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
      BMR1                = parseInt($('[data-calc-bmr="' + gender + '"] [data-calc-bmr="1"]').val()),
      BMR2                = parseInt($('[data-calc-bmr="' + gender + '"] [data-calc-bmr="2"]').val()),
      BMR3                = parseInt($('[data-calc-bmr="' + gender + '"] [data-calc-bmr="3"]').val()),
      BMR4                = parseInt($('[data-calc-bmr="' + gender + '"] [data-calc-bmr="4"]').val()),
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

    if (calcId === 'conversion') {
      //cm to in
      // Centimeters ÷ 2.54cm/in = inches
      if ($calcSelected.data('calc-conversion') === 'centimeters') {
        $('[data-calc-conversion="inches"]').val(Math.floor($(calcSelected).val() / 2.5));
      }

      // kg to lbs
      // multiply kg by 2.2
      if ($calcSelected.data('calc-conversion') === 'kilograms') {
        $('[data-calc-conversion="pounds"]').val(Math.floor($(calcSelected).val() * 2.2));
      }
    }

    if (formula === 0) {
      $('.input-bodyfat').attr('readonly', 'readonly');
      $('.input-bodyfat').val('');
      // Athletic people
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
      console.log('TDDE: ' + sumRecCals);
    }

    if (formula === 1) {
      $('.input-bodyfat').removeAttr('readonly');
      // Lean/fat people
      sumLBM              = (weight * (1 - BF / 100));
      sumRecCals          = Math.floor((12 * sumLBM));
      sumRecProt          = (1.25 * sumLBM);
      sumRecProtPercent   = ((sumRecProt * 4) / sumRecCals);
      sumRecFat           = 25;
      // Macros
      macroBF             = parseFloat(BF) / 100;
      macroCals           = (sumRecCals);
      macroProt           = (macroCals * sumRecProtPercent / 4);
      macroFat            = (macroCals * (macroBF / 9));
      macroCarb           = (macroCals * (1 - sumRecProtPercent - macroBF) / 9);
      macroCustomCals     = (activity * sumRecCals);
      macroCustomProt     = (macroCustomCals * sumRecProtPercent / 4);
      macroCustomFat      = (macroCustomCals * (macroBF / 9));
      macroCustomCarb     = (macroCustomCals * (1 - sumRecProtPercent - macroBF) / 9);
    }

    console.log('calc: ' + calcId, calcVal, goalVal, macroCustomCals);

    // Goal
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

    // Set Macros (Prob move to step 3 later)
    macroResultCals     = (goalCalsSelected);
    macroResultProt     = (macroResultCals * sumRecProtPercent / 4);
    macroResultFat      = (macroResultCals * (macroBF / 9));
    macroResultCarb     = (macroResultCals * (1 - sumRecProtPercent - macroBF) / 9);

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
