var colorscale = d3.scaleOrdinal(d3.schemeCategory10);


  const data = [
{
 "indicator": "Perceived Health",
 "province": "Newfoundland",
 "percentage": 0.6208,
 "scaled": 0.8180974477958232
},
{
 "indicator": "Perceived Mental Health",
 "province": "Newfoundland",
 "percentage": 0.6978,
 "scaled": 0.6385026737967915
},
{
 "indicator": "Perceived Life Stress",
 "province": "Newfoundland",
 "percentage": 0.14,
 "scaled": 0.2
},
{
 "indicator": "BMI",
 "province": "Newfoundland",
 "percentage": 0.7438,
 "scaled": 1
},
{
 "indicator": "Sense of Belonging",
 "province": "Newfoundland",
 "percentage": 0.7878,
 "scaled": 1
},
{
 "indicator": "Life Satisfaction",
 "province": "Newfoundland",
 "percentage": 0.9226,
 "scaled": 0.43768115942029157
},
{
 "indicator": "Smoking",
 "province": "Newfoundland",
 "percentage": 0.2088,
 "scaled": 1.0
},
{
 "indicator": "Perceived Health",
 "province": "P.E.I.",
 "percentage": 0.6092,
 "scaled": 0.7104408352668212
},
{
 "indicator": "Perceived Mental Health",
 "province": "P.E.I.",
 "percentage": 0.6916,
 "scaled": 0.5721925133689834
},
{
 "indicator": "Perceived Life Stress",
 "province": "P.E.I.",
 "percentage": 0.1562,
 "scaled": 0.33416149068322976
},
{
 "indicator": "BMI",
 "province": "P.E.I.",
 "percentage": 0.7096,
 "scaled": 0.8403547671840355
},
{
 "indicator": "Sense of Belonging",
 "province": "P.E.I.",
 "percentage": 0.7488,
 "scaled": 0.8287596048298571
},
{
 "indicator": "Life Satisfaction",
 "province": "P.E.I.",
 "percentage": 0.936,
 "scaled": 0.826086956521737
},
{
 "indicator": "Smoking",
 "province": "P.E.I.",
 "percentage": 0.1612,
 "scaled": 0.5216080402010053
},
{
 "indicator": "Perceived Health",
 "province": "Nova Scotia",
 "percentage": 0.5852,
 "scaled": 0.4877030162412993
},
{
 "indicator": "Perceived Mental Health",
 "province": "Nova Scotia",
 "percentage": 0.6598,
 "scaled": 0.23208556149732595
},
{
 "indicator": "Perceived Life Stress",
 "province": "Nova Scotia",
 "percentage": 0.1848,
 "scaled": 0.5710144927536233
},
{
 "indicator": "BMI",
 "province": "Nova Scotia",
 "percentage": 0.6958,
 "scaled": 0.7759365153460149
},
{
 "indicator": "Sense of Belonging",
 "province": "Nova Scotia",
 "percentage": 0.7414,
 "scaled": 0.7962678375411636
},
{
 "indicator": "Life Satisfaction",
 "province": "Nova Scotia",
 "percentage": 0.9144,
 "scaled": 0.2
},
{
 "indicator": "Smoking",
 "province": "Nova Scotia",
 "percentage": 0.1854,
 "scaled": 0.7648241206030151
},
{
 "indicator": "Perceived Health",
 "province": "New Brunswick",
 "percentage": 0.5542,
 "scaled": 0.2
},
{
 "indicator": "Perceived Mental Health",
 "province": "New Brunswick",
 "percentage": 0.6568,
 "scaled": 0.2
},
{
 "indicator": "Perceived Life Stress",
 "province": "New Brunswick",
 "percentage": 0.1888,
 "scaled": 0.6041407867494824
},
{
 "indicator": "BMI",
 "province": "New Brunswick",
 "percentage": 0.7268,
 "scaled": 0.9206441825183806
},
{
 "indicator": "Sense of Belonging",
 "province": "New Brunswick",
 "percentage": 0.7378,
 "scaled": 0.7804610318331504
},
{
 "indicator": "Life Satisfaction",
 "province": "New Brunswick",
 "percentage": 0.9198,
 "scaled": 0.35652173913043633
},
{
 "indicator": "Smoking",
 "province": "New Brunswick",
 "percentage": 0.163,
 "scaled": 0.5396984924623116
},
{
 "indicator": "Perceived Health",
 "province": "Quebec",
 "percentage": 0.6206,
 "scaled": 0.8162412993039441
},
{
 "indicator": "Perceived Mental Health",
 "province": "Quebec",
 "percentage": 0.7316,
 "scaled": 1.0
},
{
 "indicator": "Perceived Life Stress",
 "province": "Quebec",
 "percentage": 0.2366,
 "scaled": 1.0
},
{
 "indicator": "BMI",
 "province": "Quebec",
 "percentage": 0.6168,
 "scaled": 0.40716536351966404
},
{
 "indicator": "Sense of Belonging",
 "province": "Quebec",
 "percentage": 0.6056,
 "scaled": 0.2
},
{
 "indicator": "Life Satisfaction",
 "province": "Quebec",
 "percentage": 0.942,
 "scaled": 1.0
},
{
 "indicator": "Smoking",
 "province": "Quebec",
 "percentage": 0.179,
 "scaled": 0.7005025125628139
},
{
 "indicator": "Perceived Health",
 "province": "Ontario",
 "percentage": 0.6094,
 "scaled":0.7122969837587001
},
{
 "indicator": "Perceived Mental Health",
 "province": "Ontario",
 "percentage": 0.6928,
 "scaled": 0.5850267379679144
},
{
 "indicator": "Perceived Life Stress",
 "province": "Ontario",
 "percentage": 0.218,
 "scaled": 0.8459627329192547
},
{
 "indicator": "BMI",
 "province": "Ontario",
 "percentage": 0.6242,
 "scaled": 0.4417084840704869
},
{
 "indicator": "Sense of Belonging",
 "province": "Ontario",
 "percentage": 0.7094,
 "scaled": 0.6557628979143797
},
{
 "indicator": "Life Satisfaction",
 "province": "Ontario",
 "percentage": 0.928,
 "scaled": 0.5942028985507237
},
{
 "indicator": "Smoking",
 "province": "Ontario",
 "percentage": 0.1558,
 "scaled": 0.4673366834170855
},
{
 "indicator": "Perceived Health",
 "province": "Manitoba",
 "percentage": 0.6026,
 "scaled": 0.6491879350348022
},
{
 "indicator": "Perceived Mental Health",
 "province": "Manitoba",
 "percentage": 0.6782,
 "scaled": 0.42887700534759243
},
{
 "indicator": "Perceived Life Stress",
 "province": "Manitoba",
 "percentage": 0.193,
 "scaled": 0.6389233954451348
},
{
 "indicator": "BMI",
 "province": "Manitoba",
 "percentage": 0.6562,
 "scaled": 0.5910841405064773
},
{
 "indicator": "Sense of Belonging",
 "province": "Manitoba",
 "percentage": 0.727,
 "scaled": 0.7330406147091111
},
{
 "indicator": "Life Satisfaction",
 "province": "Manitoba",
 "percentage": 0.9286,
 "scaled": 0.6115942028985505
},
{
 "indicator": "Smoking",
 "province": "Manitoba",
 "percentage": 0.1714,
 "scaled": 0.6241206030150755
},
{
 "indicator": "Perceived Health",
 "province": "Saskatchewan",
 "percentage": 0.587,
 "scaled": 0.5044083526682135
},
{
 "indicator": "Perceived Mental Health",
 "province": "Saskatchewan",
 "percentage": 0.6792,
 "scaled": 0.43957219251336876
},
{
 "indicator": "Perceived Life Stress",
 "province": "Saskatchewan",
 "percentage": 0.1842,
 "scaled": 0.5660455486542444
},
{
 "indicator": "BMI",
 "province": "Saskatchewan",
 "percentage": 0.6994,
 "scaled": 0.7927412766950637
},
{
 "indicator": "Sense of Belonging",
 "province": "Saskatchewan",
 "percentage": 0.7428,
 "scaled": 0.8024149286498354
},
{
 "indicator": "Life Satisfaction",
 "province": "Saskatchewan",
 "percentage": 0.9346,
 "scaled": 0.7855072463768094
},
{
 "indicator": "Smoking",
 "province": "Saskatchewan",
 "percentage": 0.1936,
 "scaled": 0.8472361809045228
},
{
 "indicator": "Perceived Health",
 "province": "Alberta",
 "percentage": 0.6404,
 "scaled": 1.0
},
{
 "indicator": "Perceived Mental Health",
 "province": "Alberta",
 "percentage": 0.7064,
 "scaled": 0.7304812834224599
},
{
 "indicator": "Perceived Life Stress",
 "province": "Alberta",
 "percentage": 0.2034,
 "scaled": 0.7250517598343686
},
{
 "indicator": "BMI",
 "province": "Alberta",
 "percentage": 0.644,
 "scaled": 0.534134671490256
},
{
 "indicator": "Sense of Belonging",
 "province": "Alberta",
 "percentage": 0.6936,
 "scaled": 0.5863885839736553
},
{
 "indicator": "Life Satisfaction",
 "province": "Alberta",
 "percentage": 0.9312,
 "scaled": 0.6869565217391316
},
{
 "indicator": "Smoking",
 "province": "Alberta",
 "percentage": 0.17,
 "scaled": 0.6100502512562815
},
{
 "indicator": "Perceived Health",
 "province": "B.C.",
 "percentage": 0.6006,
 "scaled": 0.6306264501160092
},
{
 "indicator": "Perceived Mental Health",
 "province": "B.C.",
 "percentage": 0.6748,
 "scaled": 0.39251336898395717
},
{
 "indicator": "Perceived Life Stress",
 "province": "B.C.",
 "percentage": 0.2028,
 "scaled": 0.7200828157349897
},
{
 "indicator": "BMI",
 "province": "B.C.",
 "percentage": 0.57242,
 "scaled": 0.2
},
{
 "indicator": "Sense of Belonging",
 "province": "B.C.",
 "percentage": 0.7136,
 "scaled": 0.6742041712403952
},
{
 "indicator": "Life Satisfaction",
 "province": "B.C.",
 "percentage": 0.9238,
 "scaled": 0.4724637681159409
},{
 "indicator": "Smoking",
 "province": "B.C.",
 "percentage": 0.1292,
 "scaled": 0.2
}

];

  const width = 400;
  const height = width;
  const margin = {"top": 100, "left": 200, "right": 150, "bottom": 50};

  var tooltip;

  var nestByprovince = d3.nest()
    .key(function(d){ return d.province; })
    .entries(data);

  var columnWidth = width/nestByprovince.length;

  var maxScaled = d3.max(data, function(d){ return d.scaled; });

  var svg = d3.select("#chart2").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom);

  var chart = svg.append("g")
    .attr("transform", "translate(" + (margin.left) + "," + margin.top + ")");

  var columnHeader = chart.append("g")
    .attr("transform", "translate(0,0)");

  var columnLabels = columnHeader.selectAll("g")
    .data(nestByprovince)
    .enter()
    .append("g")
    .attr("transform", function(d, i) {return "translate(" + (columnWidth * i) +",0)"; });

  columnLabels.append("text")
  .text(function(d) { return d.key })
  .attr("transform", "translate(20)rotate(-45)")

  var nestByindicator = d3.nest()
    .key(function(d){ return d.indicator; })
    .sortValues(function(a,b) { return a.province < b.province; })
    .entries(data);

  var rowHeight = height/nestByindicator.length
  var scale = d3.scaleLinear()
  .domain([0,maxScaled])
  .range([0,columnWidth]);

  var n = 0;

  var row = chart.selectAll("g")
  var box = row.selectAll("g")
  var singl = box.selectAll("rect");

  nestByindicator.forEach(function(d, i) {

    var rowG = chart.append("g")
    .attr("transform", "translate(0," + (i * rowHeight) + ")")
    .style("fill", colorscale(n));

    rowG.append("text")
    .text(d.key)
    .attr("x", 0)
    .attr("y", rowHeight - 7)
    .style("text-anchor", "end");


    var boxes =  rowG.selectAll("g")
    .data(d.values)
    .enter()
    .append("g")
    .attr("transform", function(d, i) {return "translate(" + (columnWidth * i) +",0)"; });

    var barWidth = columnWidth * 0.9;

    boxes.append("rect")
    .attr("x", (columnWidth - barWidth)/2)
    .attr("y", function(d) { return rowHeight - scale(d.scaled); })
    .attr("width", barWidth)
    .attr("height", function(d) { return scale(d.scaled); });


    boxes.append("text")
    .attr("x", (columnWidth - barWidth)/2)
    .attr("y", function(d) { return rowHeight - 2 - scale(d.scaled); })
    .text(function(d) { return (d.percentage*100).toFixed(1) + "%"; })
    .style("font-family", "Helvetica Neue")
    .style("font-size", "12px")
    .style("opacity", 0);

    boxes
      .on("mouseover", function (){
        //d3.select(this).style("opacity", 0);
        d3.select(this).selectAll("text").style("opacity", 1);
      })
      .on("mouseout", function (){
        //d3.select(this).style("opacity", 0);
        d3.select(this).selectAll("text").style("opacity", 0);
      })

    n++;

  });
  var row = chart.selectAll("g")
  var box = row.selectAll("g")
  var singl = box.selectAll("rect");
