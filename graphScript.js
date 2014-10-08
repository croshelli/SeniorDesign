//create variables for height, width, margin
var margin = {top:20, right:20, bottom:20, left:20};
var width = 300;
var height = 400;
var graphData;

//this canvas is where all the posts will appear.
var canvas = d3.select("#researchGraphs").append("div")
								.attr("class","submissionForum")
								.style("position", "relative")
								.style("margin-left", "0%");
// var canvas = d3.select("div #panels .story").append("div")
// 								.attr("height", height)
// 								.attr("width", width)
// 								.attr("class", "graphs")
								// .attr("overflow", "visible");


//barchart for results of Physical Interactions
	var yScale = d3.scale.linear()
				.domain([ 0, 140])
				.range([ 140,0 ]);
				
	var xScale = d3.scale.ordinal()
				.domain(["Talking/Singing","Fingers","Wrist","Hand/Elbow","Legs","Head","Body","Facial Expressions","Socializing","Interactions through external objects"])
				.range([0, width]);
	
	var xaxis = d3.svg.axis()
				.scale(xScale)
				//.ticks(d3.time.months)
				.orient("bottom")
				.tickSize(3);

	var yaxis = d3.svg.axis()
					.ticks(5)
					.scale(yScale)
					.orient("left");

//here, we load the csv with all forum submissions
d3.csv("graphData.csv", function(error, data){
	graphData=data;
	console.log(data);
	createSubmissionBlocks(submissions); //call createSubmissionBlocks function
});