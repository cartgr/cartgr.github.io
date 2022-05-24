var w = 500,
	h = 500;

var colorscale = d3.scaleOrdinal(d3.schemeCategory10);

//Legend titles
var LegendOptions = ['12-17','18-34','35-49','50-64','65+'];

//Data
var d = [
		  [
			{axis:"Life Satisfaction",value:0.9774},
			{axis:"Percieved Health",value:0.746},
			{axis:"Percieved Mental Health",value:0.7568},
			{axis:"Percieved Life Stress",value:0.1278},
			{axis:"Body Mass Index",value:0.2548},
			{axis:"Sense of Belonging",value:0.8522}
		  ],[
			{axis:"Life Satisfaction",value:0.9522},
			{axis:"Percieved Health",value:0.6936},
			{axis:"Percieved Mental Health",value:0.6718},
			{axis:"Percieved Life Stress",value:0.223},
			{axis:"Body Mass Index",value:0.4932},
			{axis:"Sense of Belonging",value:0.6198}
		  ],[
		  {axis:"Life Satisfaction",value:0.9328},
		  {axis:"Percieved Health",value:0.6472},
		  {axis:"Percieved Mental Health",value:0.697},
		  {axis:"Percieved Life Stress",value:0.2866},
		  {axis:"Body Mass Index",value:0.6612},
		  {axis:"Sense of Belonging",value:0.6718}
		  ],[
		  {axis:"Life Satisfaction",value:0.9108},
		  {axis:"Percieved Health",value:0.562},
		  {axis:"Percieved Mental Health",value:0.7028},
		  {axis:"Percieved Life Stress",value:0.239},
		  {axis:"Body Mass Index",value:0.7024},
		  {axis:"Sense of Belonging",value:0.684}
		  ],[
		  {axis:"Life Satisfaction",value:0.9044},
		  {axis:"Percieved Health",value:0.4706},
		  {axis:"Percieved Mental Health",value:0.7104},
		  {axis:"Percieved Life Stress",value:0.1134},
		  {axis:"Body Mass Index",value:0.6758},
		  {axis:"Sense of Belonging",value:0.7528}
		  ]
		];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 1.0,
  levels: 10,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
r = RadarChart.draw("#chart", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)')
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("Age Group");
/*
var rad = d3.select("body")
		.select('svg')
		.select('g')
		.selectAll('.radar-chart-serie0')
		.style("fill-opacity", 0)
		.style("stroke-width",0)
*/
var p0 = d3.select("body")
		.select('svg')
		.select('g')
		.selectAll('.radar-chart-serie0')

var p1 = d3.select("body")
		.select('svg')
		.select('g')
		.selectAll('.radar-chart-serie1')

var p2 = d3.select("body")
		.select('svg')
		.select('g')
		.selectAll('.radar-chart-serie2')

var p3 = d3.select("body")
		.select('svg')
		.select('g')
		.selectAll('.radar-chart-serie3')

var p4 = d3.select("body")
		.select('svg')
		.select('g')
		.selectAll('.radar-chart-serie4')

//Initiate Legend
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)')
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
		.on("click", function(d){
			currentOpacity = d3.select(this).style("opacity")
			currentColor = d3.select(this).style("fill")
			console.log(currentColor)
			d3.select(this).transition().style("opacity", currentOpacity == 1 ? 0:1)
			if (currentColor == "rgb(31, 119, 180)" && currentOpacity == 1){
				p0.style("fill-opacity", 0)
				.style("stroke-width",0)
			} else if (currentColor == "rgb(31, 119, 180)" && currentOpacity == 0){
				p0.style("fill-opacity", 0.3)
				.style("stroke-width",2)
			} else if (currentColor == "rgb(255, 127, 14)" && currentOpacity == 1){
				p1.style("fill-opacity", 0)
				.style("stroke-width",0)
			} else if (currentColor == "rgb(255, 127, 14)" && currentOpacity == 0){
				p1.style("fill-opacity", 0.3)
				.style("stroke-width",2)
			} else if (currentColor == "rgb(44, 160, 44)" && currentOpacity == 1){
				p2.style("fill-opacity", 0)
				.style("stroke-width",0)
			} else if (currentColor == "rgb(44, 160, 44)" && currentOpacity == 0){
				p2.style("fill-opacity", 0.3)
				.style("stroke-width",2)
			} else if (currentColor == "rgb(214, 39, 40)" && currentOpacity == 1){
				p3.style("fill-opacity", 0)
				.style("stroke-width",0)
			} else if (currentColor == "rgb(214, 39, 40)" && currentOpacity == 0){
				p3.style("fill-opacity", 0.3)
				.style("stroke-width",2)
			} else if (currentColor == "rgb(148, 103, 189)" && currentOpacity == 1){
				p4.style("fill-opacity", 0)
				.style("stroke-width",0)
			} else if (currentColor == "rgb(148, 103, 189)" && currentOpacity == 0){
				p4.style("fill-opacity", 0.3)
				.style("stroke-width",2)
			}

		})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;
