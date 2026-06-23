


/**
 *
 * bar.js
 * simple, elegant bar chart library
 * {date} - version 1.0
 * {url}
 *
 * Copyright 2017 {your name}
 * Relased under the MIT License
 * {license url}
 *
 */

'use strict';

function BarChart(targetId, width, height, data){
    // Base
    var chart = this;

    // Specify Configurations
    chart.configureChart(targetId, width, height, data);

}


BarChart.prototype.configureChart = function (targetId, width, height, data) {
  // Base
  var chart = this;

  // Global Canvas Specifications
  chart.setCanvasParameters(targetId, width, height, data);

  // Global Chart Specifications
  chart.setChartParameters();

};

BarChart.prototype.setCanvasParameters = function (targetId, width, height, data) {
  // Base
  var chart = this;

  // Canvas Specifications come from outside
  chart.id = targetId;
  chart.width = width;
  chart.height = height;
  chart.data = data;
};

BarChart.prototype.setChartParameters = function () {
  // Base
  var chart = this;

  // Axe Configurations
  chart.axeRatio = 10; // in terms of percentage
  chart.verticalMargin = (chart.height * chart.axeRatio) / 100;
  chart.horizontalMargin = (chart.width * chart.axeRatio) / 100;
  chart.axeColor = '#b1b1b1';
  chart.axeWidth = 0.75;

  // Label Configurations
  chart.fontRatio = 3; // in terms of percentage
  chart.fontFamily = 'times';
  chart.fontStyle = 'normal';
  chart.fontWeight = '300';
  chart.fontColor = '#666';
  chart.verticalFontSize = (chart.height * chart.fontRatio) / 100;
  chart.horizontalFontSize = (chart.width * chart.fontRatio) / 100;

  // Guideline Configurations
  chart.guidelineColor = '#e5e5e5';
  chart.guidelineWidth = 0.5;
};
