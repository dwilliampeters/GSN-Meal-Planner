$(function () {
  "use strict";

  var
    heightImperial      = false,
    weightImperial      = false,
    bfFormula           = 0,
    gender              = 'male',
    age                 = 29,
    weight              = 80,
    heightFt            = 6,
    heightIn            = 0,
    heightCm            = 182,
    height              = 0,
    bf                  = 20,

    // Activity
    activityWeek        = 1.42,
    activityExtra       = [0.09, 0.2],
    activityExtraTotal  = 0,
    activity            = 0,
    
    // Goal
    goal                = 'bulking',
    goalVal             = 15,
    goalCals            = 0,

    // Macro Ratio
    ratioName           = 'bodybuilder',
    ratioProtein        = 40,
    ratioFat            = 20,
    ratioCarbs          = 40,

    // BMR
    BMR1                = 0,
    BMR2                = 0,
    BMR3                = 0,
    BMR4                = 0,

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

  console.log(bf);
  
  // Male
  if (gender === 'male') {
    BMR1 = 88.362;
    BMR2 = 13.397;
    BMR3 = 4.799;
    BMR4 = 5.677;
    
    bfFormula = 25;
  }
  
  // Female
  if (gender === 'female') {
    BMR1 = 447.593;
    BMR2 = 9.247;
    BMR3 = 3.098;
    BMR4 = 4.330;
    
    bfFormula = 35;
  }
  
  // Activity
  $.each(activityExtra, function (intIndex, objValue) {
    activityExtraTotal += parseFloat(objValue);
  });
  activity = (activityWeek + activityExtraTotal);

  // Convert height and weight for the formula
  if (heightImperial) {
    height = Math.floor(((heightFt * 12) + heightIn) * 2.54);
  } else {
    height = heightCm;
  }
  if (weightImperial) {
    weight = Math.round(weight * 0.45359237);
  }

  if (bf < bfFormula) {
    // Athletic
    bf = 20;
    console.log('bodyfat 20');
  }

  sumLBM              = (weight * (1 - bf / 100));
  sumRecCals          = Math.floor((12 * sumLBM));
  sumRecProt          = (1.25 * sumLBM);
  sumRecProtPercent   = ((sumRecProt * 4) / sumRecCals);
  sumRecFat           = 25;

  // BMR Macros
  macroBF             = bf / 100;
  macroCals           = (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age));
  macroProt           = (macroCals * sumRecProtPercent / 4);
  macroFat            = (macroCals * (macroBF / 9));
  macroCarb           = (macroCals * (1 - sumRecProtPercent - macroBF) / 9);

  // TDDE Macros
  macroCustomCals     = (activity * (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age)));
  macroCustomProt     = (macroCustomCals * sumRecProtPercent / 4);
  macroCustomFat      = (macroCustomCals * (macroBF / 9));
  macroCustomCarb     = (macroCustomCals * (1 - sumRecProtPercent - macroBF) / 9);
  
  // Goal  
  if (goal === 'fat-loss') {
    // Fat loss
    goalCals = (macroCustomCals - (macroCustomCals * goalVal / 100));
  } else if (goal === 'maintain') {
    // Maintain
    goalCals = (macroCustomCals);
  } else {
    // Bulking
    goalCals = (macroCustomCals + (macroCustomCals * goalVal / 100));
  }
  
  // Your Macros
  macroResultCals     = (goalCals);
  macroResultProt     = ((macroResultCals * ratioProtein / 100) / 4);
  macroResultFat      = ((macroResultCals * ratioFat / 100) / 9);
  macroResultCarb     = ((macroResultCals * ratioCarbs / 100) / 4);

  // Result
  console.log(Math.floor(macroResultCals), Math.floor(macroResultProt), Math.floor(macroResultFat), Math.floor(macroResultCarb));

});