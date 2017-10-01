var w; 
var cols;
var rows;
var width;
var height;

var xvals = [];
var yvals = [];

function Graph(cols,rows){
 	this.drawGraph = function(){
		for(var i = 0; i < cols; i++){
 			for(var j = 0; j < rows; j++){
				stroke(0);
 				fill(255);
 				rect(i*w, j*w, w,w);
 				fill("black");
 				textSize(12);
 				text("(" + convertToCartesian(i*w,j*w) + ")");
			}
		}
		rect(width/2,0, 5,height);
		rect(0,height/2, width,5);
 	}
}

function Line(coefficents, graph){
	this.slope = coefficents[0];
	this.yIntercept = coefficents[1];
	//creates a 2D grid of Row x Col array elements
	this.graph = make2Darray(cols,rows);

	this.print = function(){
		var str = "Equation is: y = " + this.slope + "x + " + this.yIntercept;
		fill("blue");
		textSize(20);
		text(str, 10, 475);
	}

	this.plotPoints = function(){	
		for(var i = 0; i < cols; i++){
 			for(var j = 0; j < rows; j++){
 				var temp = convertToCartesian(i,j);
 				var tempx = temp[0];
 				var tempy = temp[1];
 				//console.log(tempx + "," + tempy);
 				if(tempy == this.slope*tempx + this.yIntercept){
 					xvals.push(i);
 					yvals.push(j);
 					fill("red");
 					noStroke();
 					rect(i*w,j*w,1,1);
 				}
 			}
 		}
		plotLine(xvals,yvals);
	}
}

function setup(){
	createCanvas(1000, 1000);
 	w = 50; 
 	//100 x 100 clumn and row
 	cols = floor(width/w);
 	rows = floor(height/w);

 	var input = prompt("What equation would you like graphed?");
 	var coefficents = parseEquation(input);

 	var graph = new Graph(cols, rows);
 	graph.drawGraph();


 	var line = new Line(coefficents, graph);
 	line.plotPoints();

 	line.print();
}


function findHighestPower(equation){
	if(equation.includes("x^2"))
		return 2;
	else if(equation.includes("x"))
		return 1;
	else 
		return 0;
}



function parseEquation(equ){
 	var split = equ.split("=");
 	var rhs = split[1];
 	rhs = rhs.trim();

 	var highestPower = findHighestPower(rhs);
 	console.log(highestPower);

 	var coefficents = [];
 	// var temp = rhs;
 	// console.log(temp);
 	// if(highestPower == 2){
 	// 	temp = temp.split("x^2");
 	// 	coefficents.push(temp[0]);
 	// 	temp[1] = temp[1].split("x");
 	// 	coefficents.push(temp[1][0]);
 	// 	coefficents.push(temp[1][1]);
 	// }
 	// else if(highestPower == 1){
 	// 	temp = temp.split("x");
 	// 	console.log(temp[0]);
 	// 	console.log(temp[1]);

 	// 	coefficents.push(temp[0]);
 	// 	coefficents.push(temp[1]);
 	// }	
 	// else{
 	// 	coefficents.push(temp);
 	// }


 	var linearCoeff;
 	var constantCoeff;
 	var equation;

 	console.log(coefficents);







 	if(highestPower == 1){
 		equation = rhs.split("x"); 
 		var temp = equation[0].trim();
 		if(temp.length == 0){
 			linearCoeff = 1;
 		} 
 		else if(temp[0] == "-"){
 			if(temp.length == 1){
 				linearCoeff = -1;
 			} 
 			else{
 				temp = temp.substring(1);
 				linearCoeff = parseInt(temp)*(-1);
 			}
 		} 
 		else {
 			linearCoeff = parseInt(temp);
 		}
 		temp = equation[1].trim();
 		if(temp.length == 0){
 			constantCoeff = 0;
 		} 
 		else { 
 			for(var i = 0; i < temp.length; i++){
 				if(temp[i] == "+"){
 					constantCoeff = temp.substring(i+1);
 					constantCoeff = parseInt(constantCoeff);
 				} 
 				if(temp[i] == "-"){
 					constantCoeff = temp.substring(i+1);
 					constantCoeff = parseInt(constantCoeff)*(-1);
 				} 
 			}
 		}
 	}
 	else {
 		linearCoeff = 0; 
 		constantCoeff = parseInt(rhs);
 	} 	
 	//console.log("linearCoeff= " + linearCoeff);	
 	//console.log("constantCoeff= " + constantCoeff);
 	coefficents.push(linearCoeff);
 	coefficents.push(constantCoeff);
 	return coefficents;
 } 



//takes row and column elements indecies
//and converts them to cartesian coordiantes
//returns array [x,y]
function convertToCartesian(i,j){
	var x;
	var y;
	if(i > cols/2){
		x = i - cols/2;
	} 
	if(i < cols/2){
		x = i-cols/2;
	}
	if(j > rows/2){
		y = rows/2 - j;
	} 
	if(j < rows/2){
		y = rows/2 - j;
	}
	if(j == rows/2){
		y = 0;
	}
	if(i == cols/2){
		x = 0;
	}
	return [x,y];
}

function make2Darray(x,y){
	var arr = new Array(x);
 	for (var i = 0; i < x; i++) {
 		arr[i] = new Array(y);
 	}  
 	return arr;
}



function plotLine(xvals,yvals){
	for(var i = 0; i < cols; i++){
 		for(var j = 0; j < rows; j++){
 			if(i == j) {
 					stroke("red");
 					strokeWeight(5);
 					line(xvals[i]*w,yvals[i]*w,xvals[i+1]*w,yvals[j+1]*w);
 			}
 		}
 	}
}
