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
