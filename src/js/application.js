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

  function stepChange() {
    
  }
  
  var calculate_step = 0;
  
  $('[data-calculate]').on('click', function(e) {
    e.preventDefault();
    
    calculate_step = parseFloat($(this).attr('data-calculate'));
    
    console.log(calculate_step);
    calculate_step = (calculate_step + 1);
    console.log(calculate_step);
    
    $('.step').removeClass('active');
    $('.step.step-' + calculate_step).addClass('active');
    
    $('.steps-step').removeClass('active');
    $('.steps-step.step-' + calculate_step).addClass('active');
    
  });

});
