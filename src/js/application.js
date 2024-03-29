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
  
  // Advanced toggle
  $('.advanced-toggle').on('click', function(e) {
    $('.calculator').toggleClass('calc-advanced');
  });

  // Step layout

  var docViewTop  = 0,
      stepsPos    = 0;

  $('.steps').height($('.steps').height());

  function stepsBar() {
    docViewTop  = $(window).scrollTop(),
    stepsPos    = $('.steps').offset().top;

    //console.log(docViewTop, stepsPos);

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
  
  
  // Steps changer

  var calculate_step = 0;
  var required_complete = false,
      all_required_complete = false;

  $('[data-calculate]').on('click', function(e) {
    e.preventDefault();
    
    required_complete = $('.step-' + $(this).attr('data-calculate') + ' :input')[0].checkValidity();
    console.log($('.step-' + $(this).attr('data-calculate') + ' :input')[0].checkValidity());
    
    $('.step-' + $(this).attr('data-calculate') + ' :input').each(function(i) {
      required_complete = $(this)[0].checkValidity();
      console.log(required_complete);
      if (required_complete === false) {
        $('.form-error').remove();
        $('.next').before('<div class="form-error">Please complete all required fields and try again</div>');
        return false;
      }
    });
    
    console.log(required_complete);
    
    if (required_complete) {
      $('.form-error').remove();
      
      calculate_step = parseFloat($(this).attr('data-calculate'));

      calculate_step = (calculate_step + 1);
      console.log(calculate_step);

      $('.steps-step').removeClass('active');
      $('.steps-step.step-' + calculate_step).addClass('active');
      $('.steps-step.step-1').addClass('complete');
      $('.steps-step.step-' + calculate_step).before().addClass('complete');

      $('.step').removeClass('active');
      $('.step.step-' + calculate_step).addClass('active');

      $('html, body').animate({
        scrollTop: $('.step.step-' + calculate_step).offset().top
      }, 1000);
      
    } else {
      return false;
    }

  });

});
