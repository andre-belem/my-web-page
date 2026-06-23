


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

    // Pre Operations
    chart.performPreOperations();

    console.log(chart);

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

BarChart.prototype.performPreOperations = function () {
  // Base
  var chart = this;

  // Create Canvas
  chart.createCanvas();

  // Get data
  chart.handleData();

  // Prepare data
  chart.preapareData();

};

BarChart.prototype.createCanvas = function () {
  // Base
  var chart = this;

  // Create Canvas
  var canvas = document.createElement('canvas');
  canvas.id = chart.id + '-' + Math.random();
  canvas.width = chart.width;
  canvas.height = chart.height;

  // Append canvas to target container
  document.getElementById(chart.id).innerHTML = ''; // clean container
  document.getElementById(chart.id).appendChild(canvas); // add canvas to clean container

  // Add canvas to chart object
  chart.canvas = canvas;
  chart.context = canvas.getContext('2d');
};

BarChart.prototype.handleData = function (){
  // Base
  var chart = this;

  // Data sets
  chart.labels = [];
  chart.values = [];

  // Handle Data
  chart.data.forEach(function(item){
    chart.labels.push(item.label);
    chart.values.push(item.value);
  });
};

BarChart.prototype.preapareData = function () {
  // Base
  var chart = this;

  // Global Variables
  chart.itemsNum = chart.data.length;
  chart.maxValue = Math.max.apply(null, chart.values);
  chart.minValue = Math.min.apply(null, chart.values);

  // Axe Specifications
  chart.verticalAxeWidth = chart.height - 2 * chart.verticalMargin; // bottom and top margins
  chart.horizontalAxeWidth = chart.width - 2 * chart.horizontalMargin // left and right margins

  // Label Specifications
  chart.verticalUpperBound = Math.ceil(chart.maxValue / 10) * 10;
  chart.verticalLabelFreq = chart.verticalUpperBound / chart.itemsNum;
  chart.horizontalLabelFreq = chart.horizontalAxeWidth / chart.itemsNum;
};
