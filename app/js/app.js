(function (window) {
  "use strict";

  function calcUpdate() {
  }

  calcUpdate.prototype.setValue = function (calcId, calcVal, calcSelected) {

    var
      calcId              = calcId,
      calcVal             = calcVal,
      $calcSelected       = calcSelected,
      sumVal              = 0,
      // Conversions
      calcConversion      = 0,
      $calcConversion     = $('[data-calc-conversion]'),
      // Step 1
      gender              = $('[data-calc="gender"]:checked').val(),
      age                 = parseFloat($('[data-calc="age"]').val()),
      weight              = parseFloat($('.system.selected [data-calc="weight"]').val()),
      heightFt            = parseFloat($('.system.selected [data-calc="height-ft"]').val()),
      heightIn            = parseFloat($('.system.selected [data-calc="height-in"]').val()),
      heightCm            = parseFloat($('.system.selected [data-calc="height-cm"]').val()),
      height              = 0,
      bf                  = parseFloat($('[data-calc="bf"]:checked').val()),
      bfFormula           = 0,
      formula             = parseFloat($('[data-calc="formula"]:checked').val()),
      activityWeek        = parseFloat($('select[data-calc="activity"] option:selected').val()),
      activityExtra       = [],
      activityExtraTotal  = 0,
      activity            = 0,
      activityDesc        = $('select[data-calc="activity"] option:selected').text(),
      // Step 2
      goal,
      $goal               = $('[data-calc-goal]'),
      goalSelected        = parseInt($('[data-calc-goal]:checked').val()),
      goalCalsSelected    = 0,
      goalVal             = 0,
      goalId,
      $goalCals           = $('[data-calc-goal-calories]'),
      goalCals            = 0,
      //ratios              = $('select[data-calc="ratios"] option:selected'),
      ratios              = $('[data-calc="ratios"]:checked'),
      // BMR
      BMR1                = parseFloat($('[data-calc-bmr="' + gender + '"] [data-calc-bmr="1"]').val()),
      BMR2                = parseFloat($('[data-calc-bmr="' + gender + '"] [data-calc-bmr="2"]').val()),
      BMR3                = parseFloat($('[data-calc-bmr="' + gender + '"] [data-calc-bmr="3"]').val()),
      BMR4                = parseFloat($('[data-calc-bmr="' + gender + '"] [data-calc-bmr="4"]').val()),
      // Sums
      sumLBM              = 0,
      sumRecCals          = 0,
      sumRecProt          = 0,
      sumRecProtPercent   = 0,
      sumRecFat           = 0,
      // Macros
      macroBF             = 0,
      macroCals           = 0,
      macroProt           = 0,
      macroFat            = 0,
      macroCarb           = 0,
      macroCustomCals     = 0,
      macroCustomProt     = 0,
      macroCustomFat      = 0,
      macroCustomCarb     = 0,
      macroResultCals     = 0,
      macroResultProt     = 0,
      macroResultFat      = 0,
      macroResultCarb     = 0;

    // Step 1:

    // Activity
    activityExtra = $('[data-calc="activity-extra"]:checked').map(function(){
      return $(this).val();
    }).get();

    $.each(activityExtra, function(intIndex, objValue){
        activityExtraTotal += parseFloat(objValue);
      }
    );

    activity = (activityWeek + activityExtraTotal)
    // Convert height and weight to our usable formula
    if ($('#imperial-height').is(':checked')) {
      height = Math.floor(((heightFt * 12) + heightIn) * 2.54);
    } else {
      height = heightCm;
    }
    if ($('#imperial-weight').is(':checked')) {
      weight = Math.round(weight * 0.45359237);
    }
    
    if (gender === 'male') {
      bfFormula = 25;
    } else {
      // Female
      bfFormula = 35;
    }
    
    console.log(bf, bfFormula);
    
    if (bf < bfFormula) {
      // Athletic

      bf                  = 20;
      sumLBM              = (weight * (1 - bf / 100));
      sumRecCals          = Math.floor((12 * sumLBM));
      sumRecProt          = (1.25 * sumLBM);
      sumRecProtPercent   = ((sumRecProt * 4) / sumRecCals);
      sumRecFat           = 25;

      // Macros
      macroBF             = parseFloat(bf) / 100;
      macroCals           = (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age));
      macroProt           = (macroCals * sumRecProtPercent / 4);
      macroFat            = (macroCals * (macroBF / 9));
      macroCarb           = (macroCals * (1 - sumRecProtPercent - macroBF) / 9);
      macroCustomCals     = (activity * (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age)));
      macroCustomProt     = (macroCustomCals * sumRecProtPercent / 4);
      macroCustomFat      = (macroCustomCals * (macroBF / 9));
      macroCustomCarb     = (macroCustomCals * (1 - sumRecProtPercent - macroBF) / 9);
    } else {
      // Lean Mass

      sumLBM              = (weight * (1 - bf / 100));
      sumRecCals          = Math.floor((12 * sumLBM));
      sumRecProt          = (1.25 * sumLBM);
      sumRecProtPercent   = ((sumRecProt * 4) / sumRecCals);
      sumRecFat           = 25;

      // Macros
      macroBF             = parseFloat(bf) / 100;
      macroCals           = (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age));
      macroProt           = (macroCals * sumRecProtPercent / 4);
      macroFat            = (macroCals * (macroBF / 9));
      macroCarb           = (macroCals * (1 - sumRecProtPercent - macroBF) / 9);
      macroCustomCals     = (activity * (BMR1 + (BMR2 * weight) + (BMR3 * height) - (BMR4 * age)));
      macroCustomProt     = (macroCustomCals * sumRecProtPercent / 4);
      macroCustomFat      = (macroCustomCals * (macroBF / 9));
      macroCustomCarb     = (macroCustomCals * (1 - sumRecProtPercent - macroBF) / 9);
    }

    console.log('calc: ' + calcId, calcVal, bf);

    // Step 2: Goal
    function updateGoal($thisGoal, goal, goalCals, macroCustomCals) {
      if (goal === 'fat-loss') {
        goalCals = (macroCustomCals - (macroCustomCals * goalVal / 100));
      } else if (goal === 'maintain') {
        goalCals = (macroCustomCals);
      } else {
        goalCals = (macroCustomCals + (macroCustomCals * goalVal / 100));
      }
      $('[data-calc-goal-calories="' + goal + '"]').html(Math.floor(goalCals));
      if ($thisGoal.is(':checked')) {
        goalCalsSelected = goalCals;
      }
    }

    $($goal).each(function(index) {
      if ($(this).hasClass('selected')) {
        goal    = $(this).data('calc-goal');
        goalVal = parseInt($(this).attr('value'));
        goalId  = $(this).attr('id');
        var $thisGoal = $(this);
        updateGoal($thisGoal, goal, goalVal, macroCustomCals);
      }
    });

    // Step 3:
    if (gender === 'male') {
      $('.bf-female').removeClass('active');
      $('.bf-male').addClass('active');
    } else {
      $('.bf-male').removeClass('active');
      $('.bf-female').addClass('active');
    }
    
    // Step 6:
    updateMacros();
    
    function updateMacros() {
      var ratioName     = ratios.data('name');
      var ratioProtein  = ratios.data('protein');
      var ratioCarbs    = ratios.data('carbs');
      var ratioFat      = ratios.data('fat');
      //console.log(ratioName, ratioProtein, ratioFat, ratioCarbs);
      $('[data-ratio="protein"]').val(ratioProtein);
      $('[data-ratio="fat"]').val(ratioFat);
      $('[data-ratio="carbs"]').val(ratioCarbs);
      
      macroResultCals     = (goalCalsSelected);
      macroResultProt     = ((macroResultCals * ratioProtein / 100) / 4);
      macroResultFat      = ((macroResultCals * ratioFat / 100) / 9);
      macroResultCarb     = ((macroResultCals * ratioCarbs / 100) / 4);
    }

    //

    function inputVal(id, sumVal) {
      $(id).val(sumVal);
    }

    function updateVal(id, sumVal) {
      $(id).html(sumVal);
    }

    // Stats
    inputVal('[data-calc="lbm"]', sumLBM);
    inputVal('[data-calc="recCals"]', sumRecCals);
    inputVal('[data-calc="recProt"]', sumRecProt);
    inputVal('[data-calc="recProtPercent"]', Math.round(sumRecProtPercent / Math.pow(10, -2) * 10) / 10);
    inputVal('[data-calc="recFat"]', sumRecFat);

    // BMR
    updateVal('[data-calc-level="bmr"] [data-calc-macro="cals"]', Math.floor(macroCals));
    updateVal('[data-calc-level="bmr"] [data-calc-macro="prot"]', Math.floor(macroProt));
    updateVal('[data-calc-level="bmr"] [data-calc-macro="fat"]', Math.floor(macroFat));
    updateVal('[data-calc-level="bmr"] [data-calc-macro="carb"]', Math.floor(macroCarb));
    // TDDE
    updateVal('[data-calc-level="custom"] [data-calc-macro="level"]', activityDesc);
    updateVal('[data-calc-level="custom"] [data-calc-macro="cals"]', Math.floor(macroCustomCals));
    updateVal('[data-calc-level="custom"] [data-calc-macro="prot"]', Math.floor(macroCustomProt));
    updateVal('[data-calc-level="custom"] [data-calc-macro="fat"]', Math.floor(macroCustomFat));
    updateVal('[data-calc-level="custom"] [data-calc-macro="carb"]', Math.floor(macroCustomCarb));
    // Result
    updateVal('[data-calc-level="result"] [data-calc-macro="level"]', activityDesc);
    updateVal('[data-calc-level="result"] [data-calc-macro="cals"]', Math.floor(macroResultCals));
    updateVal('[data-calc-level="result"] [data-calc-macro="prot"]', Math.floor(macroResultProt));
    updateVal('[data-calc-level="result"] [data-calc-macro="fat"]', Math.floor(macroResultFat));
    updateVal('[data-calc-level="result"] [data-calc-macro="carb"]', Math.floor(macroResultCarb));

    // Goal
    //updateVal($goalCals, Math.floor(goalCals));

    // Meals
    $('[data-meal-link]').attr('href', 'http://madeby88.com/~dev/gsncalc/meals.php?gender=' + gender + '&bf=' + bf + '&goal=' + goalId + '&calories=' + Math.floor(macroResultCals) + '&protein=' + Math.floor(macroResultProt) + '&fat=' + Math.floor(macroResultFat) + '&carbs=' + Math.floor(macroResultCarb) + '');

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
/*!
 * jQuery Validation Plugin v1.13.1
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2014 Jörn Zaefferer
 * Released under the MIT license
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery"], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

$.extend($.fn, {
	// http://jqueryvalidation.org/validate/
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			if ( options && options.debug && window.console ) {
				console.warn( "Nothing selected, can't validate, returning nothing." );
			}
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data( this[ 0 ], "validator" );
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr( "novalidate", "novalidate" );

		validator = new $.validator( options, this[ 0 ] );
		$.data( this[ 0 ], "validator", validator );

		if ( validator.settings.onsubmit ) {

			this.validateDelegate( ":submit", "click", function( event ) {
				if ( validator.settings.submitHandler ) {
					validator.submitButton = event.target;
				}
				// allow suppressing validation by adding a cancel class to the submit button
				if ( $( event.target ).hasClass( "cancel" ) ) {
					validator.cancelSubmit = true;
				}

				// allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
				if ( $( event.target ).attr( "formnovalidate" ) !== undefined ) {
					validator.cancelSubmit = true;
				}
			});

			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug ) {
					// prevent form submit to be able to see console output
					event.preventDefault();
				}
				function handle() {
					var hidden, result;
					if ( validator.settings.submitHandler ) {
						if ( validator.submitButton ) {
							// insert a hidden input as a replacement for the missing submit button
							hidden = $( "<input type='hidden'/>" )
								.attr( "name", validator.submitButton.name )
								.val( $( validator.submitButton ).val() )
								.appendTo( validator.currentForm );
						}
						result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if ( validator.submitButton ) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						if ( result !== undefined ) {
							return result;
						}
						return false;
					}
					return true;
				}

				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}

		return validator;
	},
	// http://jqueryvalidation.org/valid/
	valid: function() {
		var valid, validator;

		if ( $( this[ 0 ] ).is( "form" ) ) {
			valid = this.validate().form();
		} else {
			valid = true;
			validator = $( this[ 0 ].form ).validate();
			this.each( function() {
				valid = validator.element( this ) && valid;
			});
		}
		return valid;
	},
	// attributes: space separated list of attributes to retrieve and remove
	removeAttrs: function( attributes ) {
		var result = {},
			$element = this;
		$.each( attributes.split( /\s/ ), function( index, value ) {
			result[ value ] = $element.attr( value );
			$element.removeAttr( value );
		});
		return result;
	},
	// http://jqueryvalidation.org/rules/
	rules: function( command, argument ) {
		var element = this[ 0 ],
			settings, staticRules, existingRules, data, param, filtered;

		if ( command ) {
			settings = $.data( element.form, "validator" ).settings;
			staticRules = settings.rules;
			existingRules = $.validator.staticRules( element );
			switch ( command ) {
			case "add":
				$.extend( existingRules, $.validator.normalizeRule( argument ) );
				// remove messages from rules, but allow them to be set separately
				delete existingRules.messages;
				staticRules[ element.name ] = existingRules;
				if ( argument.messages ) {
					settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
				}
				break;
			case "remove":
				if ( !argument ) {
					delete staticRules[ element.name ];
					return existingRules;
				}
				filtered = {};
				$.each( argument.split( /\s/ ), function( index, method ) {
					filtered[ method ] = existingRules[ method ];
					delete existingRules[ method ];
					if ( method === "required" ) {
						$( element ).removeAttr( "aria-required" );
					}
				});
				return filtered;
			}
		}

		data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules( element ),
			$.validator.attributeRules( element ),
			$.validator.dataRules( element ),
			$.validator.staticRules( element )
		), element );

		// make sure required is at front
		if ( data.required ) {
			param = data.required;
			delete data.required;
			data = $.extend( { required: param }, data );
			$( element ).attr( "aria-required", "true" );
		}

		// make sure remote is at back
		if ( data.remote ) {
			param = data.remote;
			delete data.remote;
			data = $.extend( data, { remote: param });
		}

		return data;
	}
});

// Custom selectors
$.extend( $.expr[ ":" ], {
	// http://jqueryvalidation.org/blank-selector/
	blank: function( a ) {
		return !$.trim( "" + $( a ).val() );
	},
	// http://jqueryvalidation.org/filled-selector/
	filled: function( a ) {
		return !!$.trim( "" + $( a ).val() );
	},
	// http://jqueryvalidation.org/unchecked-selector/
	unchecked: function( a ) {
		return !$( a ).prop( "checked" );
	}
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

// http://jqueryvalidation.org/jQuery.validator.format/
$.validator.format = function( source, params ) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray( arguments );
			args.unshift( source );
			return $.validator.format.apply( this, args );
		};
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray( arguments ).slice( 1 );
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each( params, function( i, n ) {
		source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
			return n;
		});
	});
	return source;
};

$.extend( $.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusCleanup: false,
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function( element ) {
			this.lastActive = element;

			// Hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.hideThese( this.errorsFor( element ) );
			}
		},
		onfocusout: function( element ) {
			if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
				this.element( element );
			}
		},
		onkeyup: function( element, event ) {
			if ( event.which === 9 && this.elementValue( element ) === "" ) {
				return;
			} else if ( element.name in this.submitted || element === this.lastElement ) {
				this.element( element );
			}
		},
		onclick: function( element ) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element( element );

			// or option elements, check parent select in that case
			} else if ( element.parentNode.name in this.submitted ) {
				this.element( element.parentNode );
			}
		},
		highlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
			} else {
				$( element ).addClass( errorClass ).removeClass( validClass );
			}
		},
		unhighlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
			} else {
				$( element ).removeClass( errorClass ).addClass( validClass );
			}
		}
	},

	// http://jqueryvalidation.org/jQuery.validator.setDefaults/
	setDefaults: function( settings ) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date ( ISO ).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format( "Please enter no more than {0} characters." ),
		minlength: $.validator.format( "Please enter at least {0} characters." ),
		rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
		range: $.validator.format( "Please enter a value between {0} and {1}." ),
		max: $.validator.format( "Please enter a value less than or equal to {0}." ),
		min: $.validator.format( "Please enter a value greater than or equal to {0}." )
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $( this.settings.errorLabelContainer );
			this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
			this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = ( this.groups = {} ),
				rules;
			$.each( this.settings.groups, function( key, value ) {
				if ( typeof value === "string" ) {
					value = value.split( /\s/ );
				}
				$.each( value, function( index, name ) {
					groups[ name ] = key;
				});
			});
			rules = this.settings.rules;
			$.each( rules, function( key, value ) {
				rules[ key ] = $.validator.normalizeRule( value );
			});

			function delegate( event ) {
				var validator = $.data( this[ 0 ].form, "validator" ),
					eventType = "on" + event.type.replace( /^validate/, "" ),
					settings = validator.settings;
				if ( settings[ eventType ] && !this.is( settings.ignore ) ) {
					settings[ eventType ].call( validator, this[ 0 ], event );
				}
			}
			$( this.currentForm )
				.validateDelegate( ":text, [type='password'], [type='file'], select, textarea, " +
					"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
					"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], " +
					"[type='range'], [type='color'], [type='radio'], [type='checkbox']",
					"focusin focusout keyup", delegate)
				// Support: Chrome, oldIE
				// "select" is provided as event.target when clicking a option
				.validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", delegate);

			if ( this.settings.invalidHandler ) {
				$( this.currentForm ).bind( "invalid-form.validate", this.settings.invalidHandler );
			}

			// Add aria-required to any Static/Data/Class required fields before first validation
			// Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
			$( this.currentForm ).find( "[required], [data-rule-required], .required" ).attr( "aria-required", "true" );
		},

		// http://jqueryvalidation.org/Validator.form/
		form: function() {
			this.checkForm();
			$.extend( this.submitted, this.errorMap );
			this.invalid = $.extend({}, this.errorMap );
			if ( !this.valid() ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
				this.check( elements[ i ] );
			}
			return this.valid();
		},

		// http://jqueryvalidation.org/Validator.element/
		element: function( element ) {
			var cleanElement = this.clean( element ),
				checkElement = this.validationTargetFor( cleanElement ),
				result = true;

			this.lastElement = checkElement;

			if ( checkElement === undefined ) {
				delete this.invalid[ cleanElement.name ];
			} else {
				this.prepareElement( checkElement );
				this.currentElements = $( checkElement );

				result = this.check( checkElement ) !== false;
				if ( result ) {
					delete this.invalid[ checkElement.name ];
				} else {
					this.invalid[ checkElement.name ] = true;
				}
			}
			// Add aria-invalid status for screen readers
			$( element ).attr( "aria-invalid", !result );

			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://jqueryvalidation.org/Validator.showErrors/
		showErrors: function( errors ) {
			if ( errors ) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[ name ],
						element: this.findByName( name )[ 0 ]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function( element ) {
					return !( element.name in errors );
				});
			}
			if ( this.settings.showErrors ) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// http://jqueryvalidation.org/Validator.resetForm/
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$( this.currentForm ).resetForm();
			}
			this.submitted = {};
			this.lastElement = null;
			this.prepareForm();
			this.hideErrors();
			this.elements()
					.removeClass( this.settings.errorClass )
					.removeData( "previousValue" )
					.removeAttr( "aria-invalid" );
		},

		numberOfInvalids: function() {
			return this.objectLength( this.invalid );
		},

		objectLength: function( obj ) {
			/* jshint unused: false */
			var count = 0,
				i;
			for ( i in obj ) {
				count++;
			}
			return count;
		},

		hideErrors: function() {
			this.hideThese( this.toHide );
		},

		hideThese: function( errors ) {
			errors.not( this.containers ).text( "" );
			this.addWrapper( errors ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if ( this.settings.focusInvalid ) {
				try {
					$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [])
					.filter( ":visible" )
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger( "focusin" );
				} catch ( e ) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep( this.errorList, function( n ) {
				return n.element.name === lastActive.name;
			}).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// select all valid inputs inside the form (no submit or reset buttons)
			return $( this.currentForm )
			.find( "input, select, textarea" )
			.not( ":submit, :reset, :image, [disabled], [readonly]" )
			.not( this.settings.ignore )
			.filter( function() {
				if ( !this.name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this );
				}

				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
					return false;
				}

				rulesCache[ this.name ] = true;
				return true;
			});
		},

		clean: function( selector ) {
			return $( selector )[ 0 ];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.split( " " ).join( "." );
			return $( this.settings.errorElement + "." + errorClass, this.errorContext );
		},

		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $( [] );
			this.toHide = $( [] );
			this.currentElements = $( [] );
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor( element );
		},

		elementValue: function( element ) {
			var val,
				$element = $( element ),
				type = element.type;

			if ( type === "radio" || type === "checkbox" ) {
				return $( "input[name='" + element.name + "']:checked" ).val();
			} else if ( type === "number" && typeof element.validity !== "undefined" ) {
				return element.validity.badInput ? false : $element.val();
			}

			val = $element.val();
			if ( typeof val === "string" ) {
				return val.replace(/\r/g, "" );
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $( element ).rules(),
				rulesCount = $.map( rules, function( n, i ) {
					return i;
				}).length,
				dependencyMismatch = false,
				val = this.elementValue( element ),
				result, method, rule;

			for ( method in rules ) {
				rule = { method: method, parameters: rules[ method ] };
				try {

					result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" && rulesCount === 1 ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor( element ) );
						return;
					}

					if ( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch ( e ) {
					if ( this.settings.debug && window.console ) {
						console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
					}
					throw e;
				}
			}
			if ( dependencyMismatch ) {
				return;
			}
			if ( this.objectLength( rules ) ) {
				this.successList.push( element );
			}
			return true;
		},

		// return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		// return the generic message if present and no method specific message is present
		customDataMessage: function( element, method ) {
			return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
				method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
		},

		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[ name ];
			return m && ( m.constructor === String ? m : m[ method ]);
		},

		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for ( var i = 0; i < arguments.length; i++) {
				if ( arguments[ i ] !== undefined ) {
					return arguments[ i ];
				}
			}
			return undefined;
		},

		defaultMessage: function( element, method ) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customDataMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[ method ],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call( this, rule.parameters, element );
			} else if ( theregex.test( message ) ) {
				message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
			}
			this.errorList.push({
				message: message,
				element: element,
				method: rule.method
			});

			this.errorMap[ element.name ] = message;
			this.submitted[ element.name ] = message;
		},

		addWrapper: function( toToggle ) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements, error;
			for ( i = 0; this.errorList[ i ]; i++ ) {
				error = this.errorList[ i ];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if ( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if ( this.settings.success ) {
				for ( i = 0; this.successList[ i ]; i++ ) {
					this.showLabel( this.successList[ i ] );
				}
			}
			if ( this.settings.unhighlight ) {
				for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not( this.invalidElements() );
		},

		invalidElements: function() {
			return $( this.errorList ).map(function() {
				return this.element;
			});
		},

		showLabel: function( element, message ) {
			var place, group, errorID,
				error = this.errorsFor( element ),
				elementID = this.idOrName( element ),
				describedBy = $( element ).attr( "aria-describedby" );
			if ( error.length ) {
				// refresh error/success class
				error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
				// replace message on existing label
				error.html( message );
			} else {
				// create error element
				error = $( "<" + this.settings.errorElement + ">" )
					.attr( "id", elementID + "-error" )
					.addClass( this.settings.errorClass )
					.html( message || "" );

				// Maintain reference to the element to be placed into the DOM
				place = error;
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
				}
				if ( this.labelContainer.length ) {
					this.labelContainer.append( place );
				} else if ( this.settings.errorPlacement ) {
					this.settings.errorPlacement( place, $( element ) );
				} else {
					place.insertAfter( element );
				}

				// Link error back to the element
				if ( error.is( "label" ) ) {
					// If the error is a label, then associate using 'for'
					error.attr( "for", elementID );
				} else if ( error.parents( "label[for='" + elementID + "']" ).length === 0 ) {
					// If the element is not a child of an associated label, then it's necessary
					// to explicitly apply aria-describedby

					errorID = error.attr( "id" ).replace( /(:|\.|\[|\])/g, "\\$1");
					// Respect existing non-error aria-describedby
					if ( !describedBy ) {
						describedBy = errorID;
					} else if ( !describedBy.match( new RegExp( "\\b" + errorID + "\\b" ) ) ) {
						// Add to end of list if not already present
						describedBy += " " + errorID;
					}
					$( element ).attr( "aria-describedby", describedBy );

					// If this element is grouped, then assign to all elements in the same group
					group = this.groups[ element.name ];
					if ( group ) {
						$.each( this.groups, function( name, testgroup ) {
							if ( testgroup === group ) {
								$( "[name='" + name + "']", this.currentForm )
									.attr( "aria-describedby", error.attr( "id" ) );
							}
						});
					}
				}
			}
			if ( !message && this.settings.success ) {
				error.text( "" );
				if ( typeof this.settings.success === "string" ) {
					error.addClass( this.settings.success );
				} else {
					this.settings.success( error, element );
				}
			}
			this.toShow = this.toShow.add( error );
		},

		errorsFor: function( element ) {
			var name = this.idOrName( element ),
				describer = $( element ).attr( "aria-describedby" ),
				selector = "label[for='" + name + "'], label[for='" + name + "'] *";

			// aria-describedby should directly reference the error element
			if ( describer ) {
				selector = selector + ", #" + describer.replace( /\s+/g, ", #" );
			}
			return this
				.errors()
				.filter( selector );
		},

		idOrName: function( element ) {
			return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
		},

		validationTargetFor: function( element ) {

			// If radio/checkbox, validate first element in group instead
			if ( this.checkable( element ) ) {
				element = this.findByName( element.name );
			}

			// Always apply ignore filter
			return $( element ).not( this.settings.ignore )[ 0 ];
		},

		checkable: function( element ) {
			return ( /radio|checkbox/i ).test( element.type );
		},

		findByName: function( name ) {
			return $( this.currentForm ).find( "[name='" + name + "']" );
		},

		getLength: function( value, element ) {
			switch ( element.nodeName.toLowerCase() ) {
			case "select":
				return $( "option:selected", element ).length;
			case "input":
				if ( this.checkable( element ) ) {
					return this.findByName( element.name ).filter( ":checked" ).length;
				}
			}
			return value.length;
		},

		depend: function( param, element ) {
			return this.dependTypes[typeof param] ? this.dependTypes[typeof param]( param, element ) : true;
		},

		dependTypes: {
			"boolean": function( param ) {
				return param;
			},
			"string": function( param, element ) {
				return !!$( param, element.form ).length;
			},
			"function": function( param, element ) {
				return param( element );
			}
		},

		optional: function( element ) {
			var val = this.elementValue( element );
			return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
		},

		startRequest: function( element ) {
			if ( !this.pending[ element.name ] ) {
				this.pendingRequest++;
				this.pending[ element.name ] = true;
			}
		},

		stopRequest: function( element, valid ) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if ( this.pendingRequest < 0 ) {
				this.pendingRequest = 0;
			}
			delete this.pending[ element.name ];
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
				$( this.currentForm ).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest === 0 && this.formSubmitted ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ]);
				this.formSubmitted = false;
			}
		},

		previousValue: function( element ) {
			return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}

	},

	classRuleSettings: {
		required: { required: true },
		email: { email: true },
		url: { url: true },
		date: { date: true },
		dateISO: { dateISO: true },
		number: { number: true },
		digits: { digits: true },
		creditcard: { creditcard: true }
	},

	addClassRules: function( className, rules ) {
		if ( className.constructor === String ) {
			this.classRuleSettings[ className ] = rules;
		} else {
			$.extend( this.classRuleSettings, className );
		}
	},

	classRules: function( element ) {
		var rules = {},
			classes = $( element ).attr( "class" );

		if ( classes ) {
			$.each( classes.split( " " ), function() {
				if ( this in $.validator.classRuleSettings ) {
					$.extend( rules, $.validator.classRuleSettings[ this ]);
				}
			});
		}
		return rules;
	},

	attributeRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {

			// support for <input required> in both html5 and older browsers
			if ( method === "required" ) {
				value = element.getAttribute( method );
				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if ( value === "" ) {
					value = true;
				}
				// force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr( method );
			}

			// convert the value to a number for number inputs, and for text for backwards compability
			// allows type="date" and others to be compared as strings
			if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
				value = Number( value );
			}

			if ( value || value === 0 ) {
				rules[ method ] = value;
			} else if ( type === method && type !== "range" ) {
				// exception: the jquery validate 'range' method
				// does not test for the html5 'range' type
				rules[ method ] = true;
			}
		}

		// maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
		if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function( element ) {
		var method, value,
			rules = {}, $element = $( element );
		for ( method in $.validator.methods ) {
			value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );
			if ( value !== undefined ) {
				rules[ method ] = value;
			}
		}
		return rules;
	},

	staticRules: function( element ) {
		var rules = {},
			validator = $.data( element.form, "validator" );

		if ( validator.settings.rules ) {
			rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
		}
		return rules;
	},

	normalizeRules: function( rules, element ) {
		// handle dependency check
		$.each( rules, function( prop, val ) {
			// ignore rule when param is explicitly false, eg. required:false
			if ( val === false ) {
				delete rules[ prop ];
				return;
			}
			if ( val.param || val.depends ) {
				var keepRule = true;
				switch ( typeof val.depends ) {
				case "string":
					keepRule = !!$( val.depends, element.form ).length;
					break;
				case "function":
					keepRule = val.depends.call( element, element );
					break;
				}
				if ( keepRule ) {
					rules[ prop ] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[ prop ];
				}
			}
		});

		// evaluate parameters
		$.each( rules, function( rule, parameter ) {
			rules[ rule ] = $.isFunction( parameter ) ? parameter( element ) : parameter;
		});

		// clean number parameters
		$.each([ "minlength", "maxlength" ], function() {
			if ( rules[ this ] ) {
				rules[ this ] = Number( rules[ this ] );
			}
		});
		$.each([ "rangelength", "range" ], function() {
			var parts;
			if ( rules[ this ] ) {
				if ( $.isArray( rules[ this ] ) ) {
					rules[ this ] = [ Number( rules[ this ][ 0 ]), Number( rules[ this ][ 1 ] ) ];
				} else if ( typeof rules[ this ] === "string" ) {
					parts = rules[ this ].replace(/[\[\]]/g, "" ).split( /[\s,]+/ );
					rules[ this ] = [ Number( parts[ 0 ]), Number( parts[ 1 ] ) ];
				}
			}
		});

		if ( $.validator.autoCreateRanges ) {
			// auto-create ranges
			if ( rules.min != null && rules.max != null ) {
				rules.range = [ rules.min, rules.max ];
				delete rules.min;
				delete rules.max;
			}
			if ( rules.minlength != null && rules.maxlength != null ) {
				rules.rangelength = [ rules.minlength, rules.maxlength ];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function( data ) {
		if ( typeof data === "string" ) {
			var transformed = {};
			$.each( data.split( /\s/ ), function() {
				transformed[ this ] = true;
			});
			data = transformed;
		}
		return data;
	},

	// http://jqueryvalidation.org/jQuery.validator.addMethod/
	addMethod: function( name, method, message ) {
		$.validator.methods[ name ] = method;
		$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
		if ( method.length < 3 ) {
			$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
		}
	},

	methods: {

		// http://jqueryvalidation.org/required-method/
		required: function( value, element, param ) {
			// check if dependency is met
			if ( !this.depend( param, element ) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {
				// could be an array for select-multiple or a string, both are fine this way
				var val = $( element ).val();
				return val && val.length > 0;
			}
			if ( this.checkable( element ) ) {
				return this.getLength( value, element ) > 0;
			}
			return $.trim( value ).length > 0;
		},

		// http://jqueryvalidation.org/email-method/
		email: function( value, element ) {
			// From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
			// Retrieved 2014-01-14
			// If you have a problem with this implementation, report a bug against the above spec
			// Or use custom methods to implement your own email validation
			return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
		},

		// http://jqueryvalidation.org/url-method/
		url: function( value, element ) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional( element ) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test( value );
		},

		// http://jqueryvalidation.org/date-method/
		date: function( value, element ) {
			return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
		},

		// http://jqueryvalidation.org/dateISO-method/
		dateISO: function( value, element ) {
			return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
		},

		// http://jqueryvalidation.org/number-method/
		number: function( value, element ) {
			return this.optional( element ) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
		},

		// http://jqueryvalidation.org/digits-method/
		digits: function( value, element ) {
			return this.optional( element ) || /^\d+$/.test( value );
		},

		// http://jqueryvalidation.org/creditcard-method/
		// based on http://en.wikipedia.org/wiki/Luhn/
		creditcard: function( value, element ) {
			if ( this.optional( element ) ) {
				return "dependency-mismatch";
			}
			// accept only spaces, digits and dashes
			if ( /[^0-9 \-]+/.test( value ) ) {
				return false;
			}
			var nCheck = 0,
				nDigit = 0,
				bEven = false,
				n, cDigit;

			value = value.replace( /\D/g, "" );

			// Basing min and max length on
			// http://developer.ean.com/general_info/Valid_Credit_Card_Types
			if ( value.length < 13 || value.length > 19 ) {
				return false;
			}

			for ( n = value.length - 1; n >= 0; n--) {
				cDigit = value.charAt( n );
				nDigit = parseInt( cDigit, 10 );
				if ( bEven ) {
					if ( ( nDigit *= 2 ) > 9 ) {
						nDigit -= 9;
					}
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return ( nCheck % 10 ) === 0;
		},

		// http://jqueryvalidation.org/minlength-method/
		minlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length >= param;
		},

		// http://jqueryvalidation.org/maxlength-method/
		maxlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length <= param;
		},

		// http://jqueryvalidation.org/rangelength-method/
		rangelength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
		},

		// http://jqueryvalidation.org/min-method/
		min: function( value, element, param ) {
			return this.optional( element ) || value >= param;
		},

		// http://jqueryvalidation.org/max-method/
		max: function( value, element, param ) {
			return this.optional( element ) || value <= param;
		},

		// http://jqueryvalidation.org/range-method/
		range: function( value, element, param ) {
			return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
		},

		// http://jqueryvalidation.org/equalTo-method/
		equalTo: function( value, element, param ) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $( param );
			if ( this.settings.onfocusout ) {
				target.unbind( ".validate-equalTo" ).bind( "blur.validate-equalTo", function() {
					$( element ).valid();
				});
			}
			return value === target.val();
		},

		// http://jqueryvalidation.org/remote-method/
		remote: function( value, element, param ) {
			if ( this.optional( element ) ) {
				return "dependency-mismatch";
			}

			var previous = this.previousValue( element ),
				validator, data;

			if (!this.settings.messages[ element.name ] ) {
				this.settings.messages[ element.name ] = {};
			}
			previous.originalMessage = this.settings.messages[ element.name ].remote;
			this.settings.messages[ element.name ].remote = previous.message;

			param = typeof param === "string" && { url: param } || param;

			if ( previous.old === value ) {
				return previous.valid;
			}

			previous.old = value;
			validator = this;
			this.startRequest( element );
			data = {};
			data[ element.name ] = value;
			$.ajax( $.extend( true, {
				url: param,
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				context: validator.currentForm,
				success: function( response ) {
					var valid = response === true || response === "true",
						errors, message, submitted;

					validator.settings.messages[ element.name ].remote = previous.originalMessage;
					if ( valid ) {
						submitted = validator.formSubmitted;
						validator.prepareElement( element );
						validator.formSubmitted = submitted;
						validator.successList.push( element );
						delete validator.invalid[ element.name ];
						validator.showErrors();
					} else {
						errors = {};
						message = response || validator.defaultMessage( element, "remote" );
						errors[ element.name ] = previous.message = $.isFunction( message ) ? message( value ) : message;
						validator.invalid[ element.name ] = true;
						validator.showErrors( errors );
					}
					previous.valid = valid;
					validator.stopRequest( element, valid );
				}
			}, param ) );
			return "pending";
		}

	}

});

$.format = function deprecated() {
	throw "$.format has been deprecated. Please use $.validator.format instead.";
};

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

var pendingRequests = {},
	ajax;
// Use a prefilter if available (1.5+)
if ( $.ajaxPrefilter ) {
	$.ajaxPrefilter(function( settings, _, xhr ) {
		var port = settings.port;
		if ( settings.mode === "abort" ) {
			if ( pendingRequests[port] ) {
				pendingRequests[port].abort();
			}
			pendingRequests[port] = xhr;
		}
	});
} else {
	// Proxy ajax
	ajax = $.ajax;
	$.ajax = function( settings ) {
		var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
			port = ( "port" in settings ? settings : $.ajaxSettings ).port;
		if ( mode === "abort" ) {
			if ( pendingRequests[port] ) {
				pendingRequests[port].abort();
			}
			pendingRequests[port] = ajax.apply(this, arguments);
			return pendingRequests[port];
		}
		return ajax.apply(this, arguments);
	};
}

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target

$.extend($.fn, {
	validateDelegate: function( delegate, type, handler ) {
		return this.bind(type, function( event ) {
			var target = $(event.target);
			if ( target.is(delegate) ) {
				return handler.apply(target, arguments);
			}
		});
	}
});

}));
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
        $('.system-height .imperial').removeClass('hide');
        $('.system-height .metric').addClass('hide');
        $('.system-height input').val(heightVal = Math.floor(heightVal / 2.5));
      }
      if ($('#metric-height').is(':checked')) {
        $('.system-height .imperial').addClass('hide');
        $('.system-height .metric').removeClass('hide');
        $('.system-height input').val(heightVal = Math.floor(heightVal * 2.54));
      }
    }
    
    if ($(this).data('calc') === 'system-weight') {
      var weightVal = $('.system-weight input').val();
      if ($('#imperial-weight').is(':checked')) {
        $('.system-weight .imperial').removeClass('hide');
        $('.system-weight .metric').addClass('hide');
        $('.system-weight input').val(weightVal = Math.round(weightVal * 2.2));
      }
      if ($('#metric-weight').is(':checked')) {
        $('.system-weight .imperial').addClass('hide');
        $('.system-weight .metric').removeClass('hide');
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

$(function () {
  "use strict";



});

$(function () {
  "use strict";

  /*$.validator.setDefaults({
    submitHandler: function() {
      alert('submitted!');
    }
  });
  
  $('.steps.step-1').validate();*/

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
  "use strict";

  $(window).on("throttledresize", function (e) {
    equalheight('.equal-height');
  });

});

// Steps
$(function () {
  "use strict";

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
