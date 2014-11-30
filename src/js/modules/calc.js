$(function () {
  "use strict";

  var
    calcResult,
    calcInputVal;

  $('[type="text"]').keyup(function () {
    calcResult = new calcUpdate();
    calcInputVal = $(this).val();
    calcResult.setValue(calcInputVal);
  });

});
