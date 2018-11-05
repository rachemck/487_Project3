$(document).ready(function(){
  console.log('scripts loaded');

  var url = 'js/national-birthrate.json';
  var urlFactors = 'js/factors.json';
  var births;
  var factorsChart;
  var rates =[];
  var active =[];
  var contraception = [];
  var year = [];


  $('#ajax-table').DataTable({ //you have to wrap the whole JSON in {} and add "data:" then save as txt file
    "ajax": "js/states.txt",
    "columns": [ //what categories do you want to use to set the columns
      {"data": "State"},
      {"data": "1991"},
      {"data": "2015"}
    ],
    "columnDefs":[{
      "targets":[0, 2],

    }]
  });

    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: url,
      data: births,
      async: true,
      success:function(births){
        console.log(births);
        for(i = 0; i < births.length; i++){
          rates.push(births[i].Rate);
          console.log(rates);
        }


                  buildChart();
    },
    error:function(msg){
      console.log('error');
    }


});//close Ajax

function buildChart(){
var myChart = Highcharts.chart('national-rate', {

title: {
    text: 'Birth Rates for U.S. Teens Aged 15-19 from 1991-2015'
},

subtitle: {
    text: 'Source: NCHS Birth Rates for Females by Age Group'
},

yAxis: {
    title: {
        text: 'Births per 1,000'
    },
    min: 0
},


legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
},

plotOptions: {
    series: {
        label: {
            connectorAllowed: false
        },
        pointStart: 1991
    }

},

series: [{
    name: 'Births per 1,000',
    data: rates

}],

responsive: {
    rules: [{
        condition: {
            maxWidth: 500
        },
        chartOptions: {
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
            }
        }
    }]
}

}); //var myChart
} //function buildChart

$.ajax({
  type: 'GET',
  dataType: 'json',
  url: urlFactors,
  data: factorsChart,
  success:function(factorsChart){
    console.log(factorsChart);
    for(i = 0; i < factorsChart.length; i++){
      active.push(factorsChart[i].Active);
      contraception.push(factorsChart[i].Contraception);
      year.push(factorsChart[i].Year);
      console.log(active);
    }



              buildChart2();
},
error:function(msg){
  console.log('error');
}


});//close Ajax

function buildChart2(){
var myChart2 = Highcharts.chart('factors', {

title: {
text: 'Risky Sexual Behaviors among U.S. Teens Aged 15-19 from 1991-2015'
},

subtitle: {
text: 'Source: U.S Youth Risk Behavior Surveillance System (YRBSS)'
},

yAxis: {
title: {
    text: 'Percent'
},



labels: {
        formatter: function() {
            return this.value + ' %';
        }
    }
},
legend: {
layout: 'vertical',
align: 'right',
verticalAlign: 'middle'
},

plotOptions: {
  series: {
    label: {
        connectorAllowed: false
    },

  }
},

xAxis: {
        categories: ['1991', '1993', '1995', '1997', '1999', '2001', '2003', '2005', '2007', '2009', '2011', '2013','2015', '2017',],
        labels:{
          step: 2
        }
    },

series: [{
name: 'Percent of sexually active teens',
data: active
},
{
  name: 'Did not use any form of contraception'+'<br>'+'during last sexual intercourse',
  data: contraception
}],

responsive: {
rules: [{
    condition: {
        maxWidth: 500
    },
    chartOptions: {
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
        }
    }
}]
}

}); //var myChart
} //function buildChart

});//document
