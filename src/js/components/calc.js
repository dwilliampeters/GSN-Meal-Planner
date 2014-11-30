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
