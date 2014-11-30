(function (window) {
  "use strict";

  function calcUpdate() {
  }

  calcUpdate.prototype.setValue = function (questionVal) {
    
    console.log('calc init');
    /*var
      pie = new Pie(),
      // Load the data
      breakdownCostsArr = [['997', '24830', '104347', '87317'],
                           ['2427', '33237', '128613', '122677'],
                           ['2687', '33367', '105950', '107900'],
                           ['3207', '23053', '72020', '81943'],
                           ['4723', '10010', '52433', '49053']],
      // Question results
      questionsArr                      = questionVal,
      questionAge                       = questionsArr[0],
      questionChild                     = questionsArr[1],
      questionIncome                    = questionsArr[2],
      // Breakdown costs
      breakdownHealth                   = parseFloat(breakdownCostsArr[questionAge][0]) / 100,
      breakdownTransport                = parseFloat(breakdownCostsArr[questionAge][1]) / 100,
      breakdownHousehold                = parseFloat(breakdownCostsArr[questionAge][2]) / 100,
      breakdownOther                    = parseFloat(breakdownCostsArr[questionAge][3]) / 100,
      breakdownChildcareMonthly         = questionChild * 619,
      breakdownChildcareAnnually        = breakdownChildcareMonthly * 12,
      // Monthly/annually cost
      totalCostMonthly                  = (breakdownHousehold + breakdownTransport + breakdownHealth + breakdownOther + breakdownChildcareMonthly),
      totalCostAnnually                 = (totalCostMonthly * 12),
      // Breakdown costs sums
      breakdownCostHousehold            = breakdownHousehold,
      breakdownCostTransport            = breakdownTransport,
      breakdownCostHealth               = breakdownHealth,
      breakdownCostOther                = breakdownOther,
      breakdownCostChildcare            = breakdownChildcareMonthly,
      // Percentages
      totalCostMonthlyPercentage        = ((breakdownCostHousehold + breakdownTransport + breakdownHealth + breakdownOther + breakdownCostChildcare) / 100),
      breakdownCostHouseholdPercentage  = breakdownCostHousehold / totalCostMonthlyPercentage,
      breakdownCostTransportPercentage  = breakdownTransport / totalCostMonthlyPercentage,
      breakdownCostHealthPercentage     = breakdownHealth / totalCostMonthlyPercentage,
      breakdownCostOtherPercentage      = breakdownOther / totalCostMonthlyPercentage,
      breakdownCostChildcarePercentage  = breakdownCostChildcare / totalCostMonthlyPercentage,
      // For testing
      breakdownCostTotal                = breakdownHousehold + breakdownTransport + breakdownHealth + breakdownOther + breakdownCostChildcare,
      breakdownCostTotalPercentage      = breakdownCostHouseholdPercentage + breakdownCostTransportPercentage + breakdownCostHealthPercentage + breakdownCostOtherPercentage + breakdownCostChildcarePercentage;
    console.log(totalCostMonthly, totalCostMonthly, breakdownCostTotal, totalCostMonthlyPercentage, breakdownCostTotalPercentage);

    // Fill the pie
    pie.setValue('[data-pie="household"]', parseInt(breakdownCostHouseholdPercentage, 10));
    pie.setValue('[data-pie="transport"]', parseInt(breakdownCostTransportPercentage, 10));
    pie.setValue('[data-pie="healthcare"]', parseInt(breakdownCostHealthPercentage, 10));
    pie.setValue('[data-pie="extras"]', parseInt(breakdownCostOtherPercentage, 10));
    pie.setValue('[data-pie="childcare"]', parseInt(breakdownCostChildcarePercentage, 10));

    // Breakdown costs visibillity
    if (breakdownCostChildcarePercentage > 0) {
      $('[data-pie="childcare"]').closest('.block').removeClass('hide');
    } else {
      $('[data-pie="childcare"]').closest('.block').addClass('hide');
    }

    // Reset heights
    equalheight('.equal-height');

    // Presentation of cost
    function sumPresentation(id, sumVal) {
      $(id).html(sumVal).formatCurrency({region: 'en-GB'});
      var price = $(id).text();
      price = price.replace(" ", "</small>");
      price = price.replace(".", "<small>.");
      $(id).html(price);
    }

    // Monthly/annually cost result
    sumPresentation('[data-cost="result-monthly"]', totalCostMonthly);
    sumPresentation('[data-cost="result-annually"]', totalCostAnnually);

    // Breakdown costs result
    sumPresentation('[data-cost="healthcare"]', breakdownHealth);
    sumPresentation('[data-cost="transport"]', breakdownCostTransport);
    sumPresentation('[data-cost="household"]', breakdownCostHousehold);
    sumPresentation('[data-cost="extras"]', breakdownCostOther);
    sumPresentation('[data-cost="childcare"]', breakdownCostChildcare);*/

  };

  window.calcUpdate = calcUpdate;

})(window);

$(function () {
  "use strict";

  $('[data-toggle]').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $('.'+$(this).data('toggle')).toggleClass('active');
    equalheight('.equal-height');
  });

});

/* Thanks to CSS Tricks for pointing out this bit of jQuery
http://css-tricks.com/equal-height-blocks-in-rows/
It's been modified into a function called at page load and then each time the page is resized. One large modification was to remove the set height before each new calculation. */

equalheight = function(container){

var currentTallest = 0,
    currentRowStart = 0,
    rowDivs = new Array(),
    $el,
    topPosition = 0;
 $(container).each(function() {

   $el = $(this);
   $($el).height('auto')
   topPostion = $el.position().top;

   if (currentRowStart != topPostion) {
     for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
       rowDivs[currentDiv].height(currentTallest);
     }
     rowDivs.length = 0; // empty the array
     currentRowStart = topPostion;
     currentTallest = $el.height();
     rowDivs.push($el);
   } else {
     rowDivs.push($el);
     currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
  }
   for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
     rowDivs[currentDiv].height(currentTallest);
   }
 });
}

$(function () {
	"use strict";

    $(window).load(function () {
        equalheight('.equal-height');
    });
    
    $(window).on("throttledresize", function (e) {
        equalheight('.equal-height');
    });
    
});
/*
 * throttledresize: special jQuery event that happens at a reduced rate compared to "resize"
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function($) {

var $event = $.event,
	$special,
	dummy = {_:0},
	frame = 0,
	wasResized, animRunning;

$special = $event.special.throttledresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments;

		wasResized = true;

		if ( !animRunning ) {
			setInterval(function(){
				frame++;

				if ( frame > $special.threshold && wasResized || execAsap ) {
					// set correct event type
					event.type = "throttledresize";
					$event.dispatch.apply( context, args );
					wasResized = false;
					frame = 0;
				}
				if ( frame > 9 ) {
					$(dummy).stop();
					animRunning = false;
					frame = 0;
				}
			}, 30);
			animRunning = true;
		}
	},
	threshold: 0
};

})(jQuery);
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

  $(window).on("throttledresize", function (e) {
    equalheight('.equal-height');
  });

});
