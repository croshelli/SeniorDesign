
//create variables for height, width, margin
var margin = {top:20, right:20, bottom:20, left:20};
var width = 300;
var height = 400;
var submissions;

//this canvas is where all the posts will appear.
var canvas = d3.select("#posts").append("div")
								.attr("class","submissionForum")
								.style("position", "relative")
								.style("margin-left", "30%");
//here, we load the csv with all forum submissions
d3.csv("C:/Users/Katie/Documents/GitHub/SeniorDesign/javascript/testForumSubmissions.csv", function(error, data){
	submissions=data;
	console.log(data);
	createSubmissionBlocks(submissions); //call createSubmissionBlocks function
});

//creates divs with paragraphs for each submission.
function createSubmissionBlocks(data){
	var submissionBlocks = canvas.selectAll(".submissionBlocks")
								.data(submissions);

	submissionBlocks.enter()
					.append("div")
					.attr("class", "submissionBlocks")
					.style("background-color","#aec7e8")
					.style("width", "500px")
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