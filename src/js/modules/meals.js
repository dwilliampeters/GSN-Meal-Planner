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
