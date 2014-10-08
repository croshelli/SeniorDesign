
//create variables for height, width, margin
var margin = {top:20, right:20, bottom:20, left:20};
var width = $(window).width();
var height = $(window).height();
var submissions;



var homeSVG = d3.select(".home").append("svg")
								.attr("height", height)
								.attr("width", width);
var storySVG = d3.select(".story").append("svg")
								.attr("height", height)
								.attr("width", width);
var appSVG = d3.select(".app").append("svg")
								.attr("height", height)
								.attr("width", width);
var researchSVG = d3.select(".research").append("svg")
								.attr("height", height)
								.attr("width", width);
var forumSVG = d3.select(".forum").append("svg")
								.attr("height", height)
								.attr("width", width);
var contactSVG = d3.select(".contact").append("svg")
								.attr("height", height)
								.attr("width", width);
var downloadSVG = d3.select(".download").append("svg")
								.attr("height", height)
								.attr("width", width);



///////////////IDEA FORUM//////////////////////////////////////
//this canvas is where all the posts will appear.
var postsSVG = d3.select("#posts").append("div")
								.attr("class","submissionForum")
								.style("position", "relative")
								.style("margin-left", "0%");

//here, we load the csv with all forum submissions
d3.csv("testForumSubmissions.csv", function(error, data){
	submissions=data;
	console.log(data);
	createSubmissionBlocks(submissions); //call createSubmissionBlocks function
});

//creates divs with paragraphs for each submission.
function createSubmissionBlocks(data){
	var submissionBlocks = postsSVG.selectAll(".submissionBlocks")
								.data(submissions);

	submissionBlocks.enter()
					.append("div")
					.attr("class", "submissionBlocks")
					//.style("background-color","#aec7e8")
					.style("width", "30px")
					.style("border", "3px")
					.style("border-color", "#000000")
					.style("border-radius", "3px")
					.append("p")
					.attr("class", "submissionPar");

	submissionBlocks.select(".submissionPar")
					.html( function(d) {
						var finalText= "<h3>Title: " + d.title + "</h3></b>";
						finalText += "Author: "+ d.Author +"</br>";
						finalText += "Submission Date: " + d.date + "</br>";
						finalText += d.text;

						return finalText;});

	submissionBlocks.exit().remove();
}


////////////////////Script for Graphs-------------------///////////////////////////

var digitalMedium;
var width2 = 300;
var height2 = 300;
var chartX = 30;
var chartY = 200;
var chartWidth = (10*25);
var padding = 10;
var rectWidth = 15;
var paddingSide = 40;


var researchGraphs = researchSVG.append("svg")
								.attr("height", height2)
								.attr("width", width2)
								.attr("class", "graphs")
								.attr("overflow", "visible")
								.attr("transform", "translate(1000,30)");


//barchart for results of Physical Interactions
	var yScale2 = d3.scale.linear()
				.domain([ 0, 140])
				.range([chartY,0 ]);
				
	var xScale2 = d3.scale.ordinal()
				.domain(["Talking_Singing","Fingers","Wrist","Hand_Elbow","Legs","Head","Body","FacialExpressions","Socializing","Interactions_through_external_objects"])
				.rangeBands([0, chartWidth]);
	
	var xaxis2 = d3.svg.axis()
				.scale(xScale2)
				//.ticks(d3.time.months)
				.orient("bottom")
				.tickSize(3);

	var yaxis2 = d3.svg.axis()
					.ticks(5)
					.scale(yScale2)
					.orient("left");

start();
function start(){
	d3.csv("otherFiles/DigitalMedium.csv", function(error, data) {
        if (error) {
            console.log(error);
        }
        else{
              
            digitalMedium = data;
            generateGraph(digitalMedium);

        }

	});}

	function generateGraph(data){
	

	//moves the bar graph up or down
   var graphShift = 25;		

   				//bars in graph	
				var bars = researchGraphs.selectAll("rect")
									.data(data)
									.enter()
										.append("rect")
										.attr("width", rectWidth)
										.attr("height", function(d) {return chartY - yScale2(d["interactions"]) ;})
										.attr("x", function(d, i) { 
															console.log(d["Name"]);
															return xScale2(d["Name"])+paddingSide})
										.attr("y", function(d) {return yScale2(d["interactions"])+padding+graphShift;})
										.attr("fill", "blue")
										.on("mouseover", function(d){
															d3.select(this).transition()
																.attr("width", rectWidth+10)
																.attr("height",function(d) {return (chartY - yScale2(d["interactions"])+10) ;})
																.attr("x", function(d, i) { 
																	return (xScale2(d["Name"])-5+paddingSide);})
																.attr("y", function(d) {return (yScale2(d["interactions"])+padding-10+graphShift);});
																// ambulanceText(d);
																})
										.on("mouseout", function(d) {
														d3.select(this).transition()
																.attr("width", rectWidth)
																.attr("height", function(d) {return chartY - yScale2(d["interactions"]) ;})
																.attr("x", function(d, i) { 
																					console.log(d["Name"]);
																					return xScale2(d["Name"])+paddingSide})
																.attr("y", function(d) {return yScale2(d["interactions"])+padding+graphShift;})
																});
											// .on("click", function(d){ambulanceText(d)});
								
			 researchGraphs.append("g")
					.attr("class", "axis")
					.attr("transform", "translate("+paddingSide+"," +(3+padding +graphShift)+ ")")
					.call(yaxis2);	
			
				researchGraphs.append("g")
					.attr("class", "axis")
					.attr("transform", "translate("+paddingSide+","+ (chartY + padding+graphShift) + ")")
					.call(xaxis2)
					.selectAll(".tick text")
						// .style("text-anchor", "middle")
						.attr("x", rectWidth/2)
						.attr("y", 4)
						.style("text-anchor", "start")
			            // .attr("dx", ".8em")
			            // .attr("dy", "-.15em")
			            .attr("transform", function(d) {
			                return "rotate(65)" 
			                });

										}
