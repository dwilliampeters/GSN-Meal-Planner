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
    
    console.log(docViewTop, stepsPos);
    
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
    
    console.log(calculate_step);
    calculate_step = (calculate_step + 1);
    console.log(calculate_step);
    
    $('.steps-step').removeClass('active');
    $('.steps-step.step-' + calculate_step).addClass('active');
    
    /*$('.step').removeClass('active');*/
    $('.step.step-' + calculate_step).addClass('active');
    
    $('html, body').animate({
      scrollTop: $('.step.step-' + calculate_step).offset().top
    }, 1000);
    
  });

});
