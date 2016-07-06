
"use strict";
/* jshint undef: true, unused: true */
/* global angular */

angular.module("app")
.directive("d3chart",["$compile","_", "d3", function ($compile,_, d3) {
 return {
  restrict: "A",
      require: '?ngModel', // get a hold of NgModelController
      //transclude: false,
      //template: "<div style='background-color:red' ng-transclude></div>",
      scope: {
        data: "=myData",
        width: "=?tdWidth",
        colorAttribute: "=?tdColorAttribute",
        xAttribute: "=?tdXAttribute",

      },
      
      link: function (scope, element, attrs, ngModel) {
        var heightWidthRatio = 0.5;
        var width = scope.width ? scope.width : 600;
        var height = scope.width ? scope.width*heightWidthRatio : 400;
        var margin = {};
        margin.left = scope.options && scope.options.margin && scope.options.margin.left ? scope.options.margin.left : 150;
        margin.right = 20;
        margin.top = 20;
        margin.bottom = 200;

        // Data attributes
        var colorAttribute = scope.colorAttribute ? scope.colorAttribute : 'Country Code';
        var yAttribute = scope.yAttribute ? scope.yAttribute : 'Country';
        var xAttribute = scope.xAttribute ? scope.xAttribute : '2013 [YR2013]';
        var idAttribute = scope.idAttribute ? scope.idAttribute : 'Country Code';


        var svgMainContainer = d3.select(element[0])
          .append("svg")
          .attr("width", width+margin.left+margin.right)
          .attr("height", height+margin.top+margin.bottom)

        var svgContainer = svgMainContainer
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top+ ")");

        // Define dataPoints tooltip generator
        var toolTip = d3.tip()
        .attr('class', 'd3-tip')
        .html(function(d) { 
          var msg = xAttribute + " : " + d[xAttribute];
          msg += "<br>" + yAttribute +  " : " + d[yAttribute];

          return msg; 
        });

        svgContainer
        .call(toolTip)

        var colorScale = d3.scale.category20();
        var xScale = d3.scale.linear();
        var yScale = d3.scale.ordinal();

        var xAxis = d3.svg.axis()
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .orient("left");

        svgContainer.append("g")
          .attr("class", "x axis");


        svgContainer.append("g")
            .attr("class", "y axis");

        var decimal = d3.format("0.2n")

        var resizeSvg = function() {
          width = element.width()-margin.left-margin.right;
          height = width*heightWidthRatio//-margin.top-margin.bottom;
          svgMainContainer.attr("width",element.width())
          svgMainContainer.attr("height",height+margin.top+margin.bottom)
        }


        /*
        * render
        */
        var render = function(data) {
          if (data && data.length) {

            alert(data[0]);

            xAttribute = scope.xAttribute ? scope.xAttribute : '2013 [YR2013]';

            var barHeight = 10;
            var verticalPadding = 1;

            // Adjust height accoring to number of data elements
            height = (barHeight+verticalPadding)*data.length;
            svgMainContainer.attr("height",height+margin.top+margin.bottom)


            // Adjust xScale according to width and values
            xScale
            .range([0, width])
            .domain([0, d3.max(data, function(d) { return d[xAttribute]; })]);
  
            // Adjust yScale according to height and values
            var yDomain = _.map(data, function(d) {
              return d[yAttribute];
            })

            yScale
            .rangeRoundBands([0,height])
            .domain(yDomain)

            xAxis 
            .scale(xScale)
            
            yAxis
            .scale(yScale)

            svgContainer.selectAll(".y.axis")
            .call(yAxis);

            svgContainer.selectAll(".x.axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);


            // Render Bars
            var bars = svgContainer.selectAll("g.bar")
            .data(data, function(d) {return d[idAttribute]});

            var newBars = bars.enter()
            .append("g")
              .attr("class", "bar")
              .attr("transform", function(d,i) {
                return "translate("+0+","+yScale(d[yAttribute])+")";
              })

            newBars.append("rect")
              .on('mouseover', toolTip.show)
              .on('mouseout', toolTip.hide)     

            bars.select("rect")
              .transition()
              .attr("width",  function(d,i) {
                return xScale(d[xAttribute]);
              })
              .attr("height", barHeight)
              .attr("fill",function(d) {
                return colorScale(d[colorAttribute])
              })
 

          }
        }




        // Check for changes in data and re-render
        scope.$watch("data", function () {
          render(scope.data);
        });      
  
        // Check for changes in data and re-render
        scope.$watch("xAttribute", function () {
          render(scope.data);
        });      
  
        // Aux function for checking changes in screen dimension
        scope.getElementDimensions = function () {
          return { 'h': element.height(), 'w': element.width() };
        };

        // Check for chaneges in screen dimension, resize SVG and re-render
        scope.$watch(scope.getElementDimensions, function (newValue, oldValue) {
          resizeSvg();
          render(scope.data);
        }, true);

      }
      
      
    };
  }]);
