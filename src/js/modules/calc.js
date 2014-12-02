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
    if ($(this).data('calc') === 'goal') {
      $('[data-calc-goal="' + $(this).data('calc-goal') + '"]').removeClass('selected');
      $('[data-calc-goal="' + $(this).data('calc-goal') + '"]').prop('checked', false);
      $(this).addClass('selected');
      $(this).prop('checked', true);
    }
    calcResult.setValue(calcId, calcVal);
  });

});
