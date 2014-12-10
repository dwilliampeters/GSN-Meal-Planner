$(function () {
  "use strict";

  // SUDO

  // Foods
  // ID / Meal      / Foods            / Cals  / Carbs / Fat / Protein / Sodium / Sugar
  // 0  / Breakfast / Banana 1 serving / 112   / 29    / 0   / 1       / 1      / 15
      var foods         = [[0, "Breakfast", "Banana 1 serving", 112, 29, 0, 1, 1, 15],
                           [1, "Breakfast", "Protein 42g", 103, 3, 1, 20, 192, 2.5],
                           [2, "Breakfast", "Oats 30g", 74, 16.5, 0, 0, 0, 0],
                           [3, "Pre-Workout", "Banana 1 serving", 112, 29, 0, 1, 1, 15],
                           [4, "Pre-Workout", "Protein 42g", 103, 3, 1, 20, 192, 2.5],
                           [5, "Pre-Workout", "Oats 30g", 74, 16.5, 0, 0, 0, 0],
                           [6, "Meal", "Gold Standard Nutrition - Pot Of Gold - Naked 1 Pot", 345, 46, 2, 37, 0, 1],
                           [6, "Meal", "Pot O Mash 200g", 181, 35, 2, 5, 229, 8],
                           [6, "Meal", "Gold Standard Nutrition - Steam Cooked Chicken Fillets 120g", 148, 1, 1, 34, 200, 0],
                           [6, "Bedtime", "Tesco - Everyday Value Cottage Cheese Low Fat 300g", 190, 15, 2, 29, 1000, 11],
                           [6, "Bedtime", "Alpro - Unsweetend Almond Milk 100ml", 13, 2, 1, 0, 0, 0]],
      macroCals         = 2306,
      macroCarbs        = 230,
      macroFat          = 51,
      macroProtein      = 230,
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
    var meal = mealType,
        mealTotalCals = makerCals,
        mealTotalCarbs = makerCarbs,
        mealTotalFat = makerFat,
        mealTotalProtein = makerProtein,
        mealCals  = 0,
        mealCarbs  = 0,
        mealFat  = 0,
        mealProtein  = 0,
        mealSodium  = 0,
        mealSugar  = 0,
        meali = -1;
    while( ++meali < 5 && mealCals < mealTotalCals ){
      $.each(foods,function(i) {
        if (meal === foods[i][1]) {
          if (mealCals < mealTotalCals) {
            if ((mealCals + foods[i][3]) > mealTotalCals) {
              //console.log(mealCals + ' + ' + foods[i][3] + ' over');
            } else {
              //console.log(i + mealCals + ' + ' + foods[i][3]);
              mealCals += foods[i][3];
              mealCarbs += foods[i][4];
              mealFat += foods[i][5];
              mealProtein += foods[i][6];
              mealSodium += foods[i][7];
              mealSugar += foods[i][8];
              mealArr = [];
              mealArr.push(mealCals);
              mealArr.push(mealCarbs);
              mealArr.push(mealFat);
              mealArr.push(mealProtein);
              //console.log(i + '+= ' + mealCals);
            }
          } else {
            return false;
          }
        }
      });
    }
    //console.log(meal + ' Cals = ' + mealCals);
    return mealCals, mealArr;
  }
  
  var meal1 = mealMaker('Breakfast', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  var meal2 = mealMaker('Pre-Workout', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  var meal3 = mealMaker('Pre-Workout', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  var meal4 = mealMaker('Meal', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  var meal5 = mealMaker('Meal', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  var meal6 = mealMaker('Meal', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  var meal7 = mealMaker('Bedtime', mealCalsLimit, mealCarbsLimit, mealFatLimit, mealProteinLimit, mealArr);
  
  var meal1Cals = meal1[0];
  var meal2Cals = meal1[0];
  var meal3Cals = meal1[0];
  var meal4Cals = meal1[0];
  var meal5Cals = meal1[0];
  var meal6Cals = meal1[0];
  var meal7Cals = meal1[0];
  
  var meal1Carbs = meal1[1];
  var meal2Carbs = meal2[1];
  var meal3Carbs = meal3[1];
  var meal4Carbs = meal4[1];
  var meal5Carbs = meal5[1];
  var meal6Carbs = meal6[1];
  var meal7Carbs = meal7[1];
  
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
  console.log('Total Meal Fat: ' + (meal1Fat + meal2Fat + meal3Fat + meal4Fat + meal5Fat + meal6Fat + meal7Fat) + ', Target Fat: ' + macroFat);
  console.log('Total Meal Protein: ' + (meal1Protein + meal2Protein + meal3Protein + meal4Protein + meal5Protein + meal6Protein + meal7Protein) + ', Target Protein: ' + macroProtein);

});
