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
