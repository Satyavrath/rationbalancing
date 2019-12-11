// Declaring variables Globally 
var ourData;
var customId = [];
var tableOfContents = [];
var ingredients = [];
var cp = [];
var nem = [];
var neg = [];
var ca = [];
var p = [];
var listofIngs = [];
var unique = [];
var tableOfContentsfromPrevious = [];
var previousIngredients = [];
var previousCost = [];
var previousQuantity = [];
previousIngredients =  JSON.parse(sessionStorage.getItem('ingredients'));
previousCost =  JSON.parse(sessionStorage.getItem('cost'));
previousQuantity =  JSON.parse(sessionStorage.getItem('quantity'));

// To search any ingredient based by name.
$(document).ready(function () {
	
	if(previousIngredients != null){
		myScript1();
		var ourRequest = new XMLHttpRequest();
		ourRequest.open('GET', 'https://raw.githubusercontent.com/Satyavrath/rationbalancing/master/data/ingredients.json');
		ourRequest.onload = function () {
		ourData = JSON.parse(ourRequest.responseText);
		}
		ourRequest.send();

	}
	//$("#calculateBtn");
	$("button").click(function () {
		var buttonValue = $(this).val();
		// alert(buttonValue);
		var alphabeticalList = document.getElementById("searchResults");
		alphabeticalList.innerHTML = "";
		var ourRequest = new XMLHttpRequest();
		ourRequest.open('GET', 'https://raw.githubusercontent.com/Satyavrath/rationbalancing/master/data/ingredients.json');
		ourRequest.onload = function () {
			ourData = JSON.parse(ourRequest.responseText);
			for (i = 0; i < ourData.length; i++) {
				if (ourData[i].name.charAt(0) == buttonValue) {
					alphabeticalList.innerHTML += "<li id=" + i + ">" + ourData[i].name + "</li>";
				}
			}
			var li = document.getElementsByTagName("li");
			for (var i = 0; i < li.length; i++) {
				li[i].addEventListener("click", myScript);
			}
		};
		ourRequest.send();
	});
});

// function to display the previously selected ingredients, quantity and cost in the table format
function myScript1() {
	if(previousIngredients != null){
		for(let i=0; i<previousIngredients.length; i++){
			let ing =  previousIngredients[i];
			let keyIng = ing.replace(/[ ,.%()]/g, "");
			$('#table-style').append(
			   '<tr>' +
			  '<td id=' + keyIng + '>' + previousIngredients[i] + '</td>' +
			  '<td> <input type="number" step= "any" class="form-control text-field-button" id=' + keyIng + "Quantity" + ' value="'+ previousQuantity[i] +'"> </td>' +
			 '<td><input type="number" step= "any" class="form-control text-field-button" id=' + keyIng + "Cost" + ' value="'+ previousCost[i] +'"></td>' +
			 '<td><img src="../images/delete.jpeg" alt="Delete" style="width:30px;height:30px;"></td>' +
			   '</tr>'
			);
		 }

		 // code to delete the ingredient when the user clicks on the delete button
		 var index, tab = document.getElementById("table-style");
		for (var i = 1; i < tab.rows.length; i++) {
		tab.rows[i].cells[3].onclick = function () {
			//alert("The selected row is "+ i);
			index = this.parentElement.rowIndex;
			//alert("The deleted index is "+ index);
			tab.deleteRow(index);
			// deltedRow  = previousIngredients.remove(index);
			previousIngredients.splice(index - 1, 1);
			//alert("Removed The previous Ingredients "+ index);
			previousCost.slice(index - 1, 1);
			//alert("Removed The previous Cost "+ index);
			previousQuantity.slice(index - 1, 1);
			//alert("Removed The previous Quantity "+ index);
			if (tab.rows.length == 1) {
				$("#calculateBtn").hide();
			}
		}
	}
	if (tab.rows.length == 1) {
		$("#calculateBtn").hide();
	} else {
		$("#calculateBtn").show();
	}
	}
		
}

// To avoids duplicate entry and to display in selected ingredients in table-format
function myScript(e) {
	let ings = e.target.attributes.id.ownerElement.innerHTML
	ingredients.push(ings);
	customId = ings.replace(/[ ,.%()]/g, "");
	var tableData = document.getElementsByTagName("td");
	for (var i = 0; i < tableData.length; i += 4) {
		if (tableData[i].innerHTML == ings) {
			alert("You cant add ingredients twice");
			return;
		}
	}

	// to display in selected ingredients
	$('#table-style').append(
		'<tr>' +
		'<td id=' + customId + '>' + e.target.attributes.id.ownerElement.innerHTML + '</td>' +
		'<td> <input type="number" step= "any" class="form-control text-field-button" id=' + customId + "Quantity" + ' value=""> </td>' +
		'<td><input type="number" step= "any" class="form-control text-field-button" id=' + customId + "Cost" + ' value="" required></td>' +
		'<td><img src="../images/delete.jpeg" alt="Delete" style="width:30px;height:30px;"></td>' +
		'</tr>'
	);
	//  To delete selected rows
	var index, tab = document.getElementById("table-style");
	for (var i = 1; i < tab.rows.length; i++) {
		tab.rows[i].cells[3].onclick = function () {
			index = this.parentElement.rowIndex;
			tab.deleteRow(index);
			ingredients.splice(index - 1, 1);
			if (tab.rows.length == 1) {
				$("#calculateBtn").hide();
			}
		}
	}
	if (tab.rows.length == 1) {
		$("#calculateBtn").hide();
	} else {
		$("#calculateBtn").show();
	}
}

// To hide content when clicked on body.
function onBodyClick(event) {
	if (event.target.id != "search") {
		$("#result").hide();
	}
}

// To find feedstuff based on Advance search.
function getFeedSearch(event) {
	$('#result').html('');
	var searchField = $('#search').val();
	var expression = new RegExp(searchField, "i");
	// $.getJSON('../data/ingredients.json',function(data){
	$.getJSON('https://raw.githubusercontent.com/Satyavrath/rationbalancing/master/data/ingredients.json', function (data) {
		$.each(data, function (key, value) {
			if (value.name.search(expression) != -1) {
				$('#result').append('<li>' + value.name + '</li>');
			};
		});
		$("#result").show();
	});
}

// On click function to store the nutrients in the session stoage
function clickedNEXTBTN() {
	let cpMin = document.getElementById("CP-Min").value;
	let cpMax = document.getElementById("CP-Max").value;
	cp.push(cpMin);
	cp.push(cpMax);
	let nemMin = document.getElementById("NEM-Min").value;
	let nemMax = document.getElementById("NEM-Max").value;
	nem.push(nemMin);
	nem.push(nemMax);
	negMin = document.getElementById("NEG-Min").value;
	negMax = document.getElementById("NEG-Max").value;
	neg = [negMin, negMax];
	caMin = document.getElementById("CA-Min").value;
	caMax = document.getElementById("CA-Max").value;
	ca = [caMin, caMax];
	pMin = document.getElementById("P-Min").value;
	pMax = document.getElementById("P-Max").value;
	p = [pMin, pMax];
	listofIngs = [cp, nem, neg, ca, p];
	sessionStorage.setItem('objectToPass', listofIngs);
}

// Function which calculate the final ration
function calculateBTN() {
	tableOfContents = [];
	// checks the if the previously selected ingredients null or not, if it is not null stores the ingredients, cost and quantity into the tableofcontents array
	if(previousIngredients != null ) {
		//alert("ON the previous ingredients not equal to null Function");
		for (var i = 0; i < previousIngredients.length; i++) {
			//alert("On the CalculateBTN function");
			let ing =  previousIngredients[i];
			let keyIng = ing.replace(/[ ,.%()]/g, "");
			CostPrevious = document.getElementById(keyIng + "Cost").value;
			//debugger;
			QuantityPrevious =  document.getElementById(keyIng + "Quantity").value;
			//alert("Got the previous edited data ");
			tableOfContents.push({
				key: ing,
				value: CostPrevious,
				quantity: QuantityPrevious
			});
		}
	}

	// Gets the user selected ingredients 
	var unique = ingredients.filter(function (elem, index, self) {
		return index === self.indexOf(elem);
	})
	//alert("After unique filter");
	var minMaxRange = sessionStorage.getItem('objectToPass');
	let valCost;
	let valQuantity;
	for (var i = 0; i < unique.length; i++) {
		//alert("uploading the unique ingredients");
		let ing = unique[i];
		let keyIng = ing.replace(/[ ,.%()]/g, "");
		valCost = document.getElementById(keyIng + "Cost").value;
		valQuantity = document.getElementById(keyIng + "Quantity").value;
		tableOfContents.push({
			key: ing,
			value: valCost,
			quantity: valQuantity
		});
	}
	//debugger;
	var inputQuantity = [];
	for (var i in tableOfContents) {
		inputQuantity.push(tableOfContents[i].quantity)
	}
	//debugger;
	function localStorageToSendIngredients(unique) {
		console.log(unique);
		return false;
	}
	//debugger;
	let precost=[];
	let prequantity=[];
	let preingredients = [];
	localStorageToSendIngredients(unique);
	// To store selected ingredients key and value in an array.
	var objectiveEquation = [];
	for (var i in tableOfContents) {
		objectiveEquation.push(tableOfContents[i].value + tableOfContents[i].key.replace(/[ ,.%()]/g, ""));
		preingredients.push(tableOfContents[i].key);
		precost.push(tableOfContents[i].value);
		prequantity.push(tableOfContents[i].quantity);
	}
	
	sessionStorage.setItem('ingredients', JSON.stringify(preingredients));
	sessionStorage.setItem('cost', JSON.stringify(precost));
	sessionStorage.setItem('quantity', JSON.stringify(prequantity));

	// To fetch index number of selected ingredient in json data
	var dataId = [];
	var selectednutrientvalue = [];
	for (i = 0; i <= preingredients.length; i++) {
		for (j = 0; j < 277; j++) {
			if (ourData[j].name == preingredients[i]) {
				dataId.push(j);
			}
		}
	}

	//debugger;
	cpFeedstuffValues = []
	nEmFeedstuffValues = []
	nEgFeedstuffValues = []
	caFeedstuffValues = []
	pFeedstuffValues = []
	dryMatterValues = []

	value1 = []
	// To store CP,NEm,NEg,Ca,P,DM value of selected nutrients in a new array
	for (var index in dataId) {
		selectednutrientvalue.push(ourData[dataId[index]].CP + ourData[dataId[index]].name.replace(/[ ,.%()]/g, ""));
		selectednutrientvalue.push((parseFloat(ourData[dataId[index]].NEm) / 100).toString() + ourData[dataId[index]].name.replace(/[ ,.%()]/g, ""));
		selectednutrientvalue.push((parseFloat(ourData[dataId[index]].NEg) / 100).toString() + ourData[dataId[index]].name.replace(/[ ,.%()]/g, ""));
		selectednutrientvalue.push(ourData[dataId[index]].Ca + ourData[dataId[index]].name.replace(/[ ,.%()]/g, ""));
		selectednutrientvalue.push(ourData[dataId[index]].P + ourData[dataId[index]].name.replace(/[ ,.%()]/g, ""));
		value1.push(ourData[dataId[index]].name.replace(/[ ,.%()]/g, ""))
		cpFeedstuffValues.push(ourData[dataId[index]].CP)
		nEmFeedstuffValues.push(ourData[dataId[index]].NEm)
		nEgFeedstuffValues.push(ourData[dataId[index]].NEg)
		caFeedstuffValues.push(ourData[dataId[index]].Ca)
		pFeedstuffValues.push(ourData[dataId[index]].P)
		dryMatterValues.push(ourData[dataId[index]].DM)
	}
	//debugger;

	//  To store crude protein value of selected ingredients
	var cpArray = [];
	for (i = 0; i < selectednutrientvalue.length; i += 5) {
		cpArray.push(selectednutrientvalue[i]);
	}
	//  To store NEm value of selected ingredients
	var nEMArray = [];
	for (i = 1; i < selectednutrientvalue.length; i += 5) {
		nEMArray.push(selectednutrientvalue[i]);
	}
	//  To store NEg value of selected ingredients
	var nEGArray = [];
	for (i = 2; i < selectednutrientvalue.length; i += 5) {
		nEGArray.push(selectednutrientvalue[i]);
	}
	//  To store calcium value of selected ingredients
	var caArray = [];
	for (i = 3; i < selectednutrientvalue.length; i += 5) {
		caArray.push(selectednutrientvalue[i]);
	}
	//  To store phosphorous value of selected ingredients
	var pArray = [];
	for (i = 4; i < selectednutrientvalue.length; i += 5) {
		pArray.push(selectednutrientvalue[i]);
	}
	var aggregateArray = [];
	for (i in unique) {
		aggregateArray.push(unique[i].replace(/[ ,.%()]/g, ""));
	}

	
	var data = minMaxRange.split(',');
// generating the simplex equation
	var s = "Minimize P = " + objectiveEquation.join('+') + " subject to\n" + cpArray.join('+') + ">=" + data[0] + "\n"
    + cpArray.join('+') + "<=" + data[1] + "\n" + caArray.join('+') + ">=" + data[6] + "\n"
    + caArray.join('+') + "<=" + data[7] +"\n" + pArray.join('+') + ">=" + data[8] + "\n" + pArray.join('+') + "<=" +  data[9]+
    "\n" + nEGArray.join('+') + ">=" + data[4] + "\n" + nEGArray.join('+') + "<=" + data[5] +  "\n"+nEMArray.join('+') + ">=" + data[2] + "\n" + 
	nEMArray.join('+') + "<=" + data[3] ;
	console.log(s);
	//alert("Equation"+ s);
	var epsilon = .00000000000001 // 10^-14

	var maxSigDig = 13; // max number of sig digits


	var okToRoll = true; // preliminary testing results

	var stepName = ""; // for error trap

	var tab = unescape("%09"); // these are now the appropriate strings;

	var cr = unescape("%0D");

	var lf = unescape("%0A");

	var symb = unescape("%C5");

	var backSlash = unescape("%5C");

	var gteSymbol = unescape("%B3"); // symbols in old netscape

	var lteSymbol = unescape("%B2");

	var lte = unescape("%u2264"); // actual symbol in IE

	var gte = unescape("%u2265");

	var comma = ",";

	var singular = false;

	var msFormat = false;

	var maxRows = 15;

	var maxCols = 30;

	var numRows = 0;

	var numCols = 0;

	var numConstraints = 0;

	var maximization = true; // this is a max problem

	var phase1 = false; // are we in phase 1?

	var objectiveName = "p";

	var numVariables = 1;

	var variables = [];

	var theTableau = new makeArray2(1, 1);

	var theStringTableau = new makeArray2(1, 1); // to display steps in the computation

	var starred = new makeArray(1); // starred rows

	var TableauNumber = 1; // the number of tableaus

	var maxSteps = 50; // maximum number of tableaux

	var numSigDigs = 6; // default accuracy

	var activeVars = new Array(); // active variables

	// old globals below...

	var maxDenom = 1000; // for fraction approximation

	var tol = .000000001; // for 10 digit accuracy guaranteed cutoff for fraction approx not yet implemented


	// end instructions

	var fractionMode = false;

	var integerMode = false;

	var okToRoll = true;

	var browserName = navigator.appName;

	var browserVersion = navigator.appVersion;

	if ((browserName == "Netscape") && (parseInt(browserVersion) >= 3)) browserName = "N";

	else if ((browserName == "Microsoft Internet Explorer") && (parseInt(browserVersion) >= 3)) browserName = "M";

	var spreedsheetOutputValue;

	// ******************** MATH UTILITIES ******************

	function hcf(a, b) {

		var bigger = Math.abs(a);

		var smaller = Math.abs(b);

		var x = 0;

		var theResult = 1;

		if ((a == 0) || (b == 0)) return (1);

		if (smaller > bigger) {
			x = bigger;
			bigger = smaller;
			smaller = x
		}

		var testRatio = roundSigDig(bigger / smaller, 11);

		var testRatio2 = 0;

		if (testRatio == Math.floor(testRatio)) return (smaller)

		else {
			// look for a factor of the smaller, deplete it by that factor and multiply bigger by it

			var found = false;

			var upperlimit = smaller;

			for (var i = upperlimit; i >= 2; i--) {

				testRatio = roundSigDig(smaller / i, 10);

				testRatio2 = roundSigDig(bigger / i, 10);

				if ((testRatio == Math.floor(testRatio)) && (testRatio2 == Math.floor(testRatio2))) {

					smaller = Math.round(smaller / i);

					smaller = Math.round(bigger / i);

					return (theResult * hcf(bigger, smaller));
				}
			}
			return (theResult);

		}

		alert("error!");

		return (-1); // should never get here

	} // hcf

	function lcm(a, b) {

		// lowest common multiple

		var bigger = Math.abs(a);

		var smaller = Math.abs(b);

		var x = 0;

		if ((a == 0) || (b == 0)) return (1);

		if (smaller > bigger) {
			x = bigger;
			bigger = smaller;
			smaller = x
		}

		var testRatio = roundSigDig(bigger / smaller, 11)

		if (testRatio == Math.floor(testRatio)) return (bigger)

		else {
			// look for a factor of the smaller, deplete it by that factor and multiply bigger by it

			var found = false;

			for (var i = 2; i <= smaller; i++) {

				if (i * i >= smaller) break;

				testRatio = roundSigDig(smaller / i, 11);

				if (testRatio == Math.floor(testRatio)) {

					smaller = testRatio;

					bigger = bigger * i;

					return (lcm(bigger, smaller));

				}

			}

			return (bigger * smaller);

		}

		alert("error!");

		return (-1); // should never get here

	} // lcm

	// *** reducing a fraction ***

	function reduce(fraction) {

		with (Math) {

			var HCF = hcf(fraction[1], fraction[2]);

			fraction[1] = Math.round(fraction[1] / HCF);

			fraction[2] = Math.round(fraction[2] / HCF);

		} // with math

		return (fraction);
	} // reduce fraction
	function toFracArr(x, maxDenom, tol) {

		// identical to toFrac, except this returns an array [1] = numerator;  [2] = denom

		// rather than a string

		// tolerance is the largest error you will tolerate before resorting to

		// expressing the result as the input decimal in fraction form

		// suggest no less than 10^-10, since we round all to 15 decimal places.

		var theFrac = new Array();

		theFrac[1] = 0;

		theFrac[2] = 0;

		var p1 = 1;
		var p2 = 0;
		var q1 = 0;
		var q2 = 1;
		var u = 0;
		var t = 0;

		var flag = true;

		var negflag = false;

		var a = 0;

		var xIn = x; // variable for later

		if (x > 10000000000) return (theFrac);

		while (flag) {

			if (x < 0) {
				x = -x;
				negflag = true;
				p1 = -p1
			}

			var intPart = Math.floor(x);

			var decimalPart = roundSigDig((x - intPart), 15);

			x = decimalPart;

			a = intPart;

			t = a * p1 + p2;

			u = a * q1 + q2;

			if ((Math.abs(t) > 10000000000) || (u > maxDenom)) {

				n = p1;

				d = q1;

				break;

			}
			p = t;

			q = u;

			if (x == 0) {

				n = p;

				d = q;

				break;

			}
			p2 = p1;

			p1 = p;

			q2 = q1;

			q1 = q;

			x = 1 / x;

		} // while ( true );

		theFrac[1] = n;

		theFrac[2] = d;

		return (theFrac);

	} // toFracArr

	function toFrac(x, maxDenom, tol) {

		// tolerance is the largest errror you will tolerate before resorting to

		// expressing the result as the input decimal in fraction form

		// suggest no less than 10^-10, since we round all to 15 decimal places.

		var theFrac = new Array();

		theFrac[1] = 0;

		theFrac[2] = 0;

		var p1 = 1;

		var p2 = 0;

		var q1 = 0;

		var q2 = 1;

		var u = 0;

		var t = 0;

		var flag = true;

		var negflag = false;

		var a = 0;

		var xIn = x; // variable for later

		if (x > 10000000000) return (theFrac);

		while (flag) {

			if (x < 0) {
				x = -x;
				negflag = true;
				p1 = -p1
			}

			var intPart = Math.floor(x);

			var decimalPart = roundSigDig((x - intPart), 15);

			x = decimalPart;

			a = intPart;

			t = a * p1 + p2;

			u = a * q1 + q2;

			if ((Math.abs(t) > 10000000000) || (u > maxDenom)) {

				n = p1;

				d = q1;

				break;

			}

			p = t;

			q = u;

			if (x == 0) {

				n = p;
				d = q;
				break;

			}

			p2 = p1;

			p1 = p;

			q2 = q1;

			q1 = q;

			x = 1 / x;

		} // while ( true );

		theFrac[1] = n;

		theFrac[2] = d;

		if (theFrac[2] == 1) return (theFrac[1].toString());

		else return (theFrac[1] + "/" + theFrac[2]);

	} // toFrac

	//  returns last character of a string
	function lastChar(theString) {

		if (theString == "") return (theString);

		var len = theString.length;

		return theString.charAt(len - 1);

	}


	// returns bool value to find character
	function isCharHere(InString, RefString) {

		if (InString.length != 1)

			return (false);

		if (RefString.indexOf(InString, 0) == -1)

			return (false);

		return (true);

	}
	// returns true if theString looks like it can be evaluated

	function looksLikeANumber(theString) {

		var result = true;
		var length = theString.length;

		if (length == 0) return (false);

		var x = ""

		var y = "1234567890-+*. /"

		var yLength = y.length;

		for (var i = 0; i <= length; i++) {

			x = theString.charAt(i);

			result = false;

			for (var j = 0; j <= yLength; j++) {

				if (x == y.charAt(j)) {
					result = true;
					break
				}

			} // j

			if (result == false) return (false);

		} // i

		return (result);

	}
	//  rounds value
	function roundSix(theNumber) {
		var x = (Math.round(1000000 * theNumber)) / 1000000;
		return (x);
	}

	function shiftRight(theNumber, k) {

		if (k == 0) return (theNumber)

		else {

			var k2 = 1;

			var num = k;

			if (num < 0) num = -num;

			for (var i = 1; i <= num; i++) {

				k2 = k2 * 10

			}

		}

		if (k > 0) {
			return (k2 * theNumber)
		} else {
			return (theNumber / k2)
		}

	}

	function roundSigDig(theNumber, numDigits) {

		numDigits = numDigits - 1

		with (Math) {

			if (theNumber == 0) return (0);

			else if (abs(theNumber) < 0.000000000001) return (0);

			// ignores numbers less than 10^(-12)

			else {

				var k = floor(log(abs(theNumber)) / log(10)) - numDigits

				var k2 = shiftRight(round(shiftRight(abs(theNumber), -k)), k)

				if (theNumber > 0) return (k2);

				else return (-k2)

			} // end else
		}
	}


	// Makes a matrix integer by least common multiples of rows 

	function makeInteger(theMatrix, RowNum, ColNum, Strings) {

		var rowArray = new makeArray2(ColNum, 2);

		var outArray = new makeArray2(RowNum, ColNum);

		for (var i = 1; i <= RowNum; i++) {

			// set up fraction row array

			for (var j = 1; j <= ColNum; j++) {

				for (var k = 1; k <= 2; k++) rowArray[j][k] = toFracArr(theMatrix[i][j], maxDenom, tol)[k];

			} // j


			// get the lcm of all the row denominators

			var rowLcm = 1;

			for (j = 1; j <= ColNum; j++) rowLcm = lcm(rowLcm, rowArray[j][2]);

			// now multiply the row by the lcm

			var x = 0;

			for (j = 1; j <= ColNum; j++) {

				x = rowLcm * rowArray[j][1] / rowArray[j][2];

				if (!Strings) outArray[i][j] = Math.round(x);

				else outArray[i][j] = Math.round(x).toString();

			} // j

			outArray[0][j] = rowLcm;

		} // i

		return (outArray);


	} // makeInteger

	// check for subString
	function checkString(InString, subString, backtrack) {

		var found = -1;
		var theString = InString;
		var Length = theString.length;
		var symbLength = subString.length;

		for (var i = Length - symbLength; i > -1; i--) {

			TempChar = theString.substring(i, i + symbLength);

			if (TempChar == subString) {

				found = i;

				if (backtrack) i = -1

			}

		} // i

		return (found);

	} // check

	// finds pivot element 

	function pivot(InMatrix, rows, cols, theRow, theCol) {

		var thePivot = InMatrix[theRow][theCol];

		activeVars[theRow] = theCol; // reset the active variable
		starred[theRow] = 0; // unstar the row

		for (var i = 1; i <= cols; i++) {

			InMatrix[theRow][i] = InMatrix[theRow][i] / thePivot;

		}

		for (var i = 1; i <= rows; i++) {

			if ((i != theRow) && (InMatrix[i][theCol] != 0)) {

				var factr = InMatrix[i][theCol];

				for (var j = 1; j <= cols; j++) {

					InMatrix[i][j] = roundSigDig(InMatrix[i][j], maxSigDig + 2) - roundSigDig(factr * InMatrix[theRow][j], maxSigDig + 2); // Fix 01 avoiding subtractive error

				}
			}
		}
		return (InMatrix);
	}

	function rightString(InString, num) {

		OutString = InString.substring(InString.length - num, InString.length);

		return (OutString);

	}

	function rightTrim(InString) {

		var length = InString.length;

		OutString = InString.substring(0, length - 1);

		return (OutString);

	}

	function replaceChar(InString, oldSymbol, newSymbol) {

		var OutString = "";

		var TempChar = "";

		for (Count = 0; Count < InString.length; Count++) {

			TempChar = InString.substring(Count, Count + 1);

			if (TempChar != oldSymbol)

				OutString = OutString + TempChar

			else OutString = OutString + newSymbol;

		}

		return (OutString);

	}


	function replaceSubstring(InString, oldSubstring, newSubstring) {

		OutString = "";

		var sublength = oldSubstring.length;

		for (Count = 0; Count < InString.length; Count++) {

			TempStr = InString.substring(Count, Count + sublength);

			TempChar = InString.substring(Count, Count + 1);

			if (TempStr != oldSubstring)

				OutString = OutString + TempChar

			else {

				OutString = OutString + newSubstring;

				Count += sublength - 1

			}

		}

		return (OutString);

	}


	function parser(InString, Sep) {

		var NumSeps = 0;
		var Count = 0;

		var location = new Array;

		location[0] = -1;

		var len = InString.length;

		for (Count = 0; Count < len; Count++) {

			if (InString.charAt(Count) == Sep) {

				NumSeps++;

				location[NumSeps] = Count;

			}

		}

		var parse = new makeArray(NumSeps + 2);

		if (NumSeps == 0) {
			parse[0] = 1;
			parse[1] = InString;
			return (parse);
		}

		parse[0] = NumSeps + 1;

		for (var i = 1; i <= NumSeps; i++) {

			parse[i] = InString.substring(location[i - 1] + 1, location[i]);
		}

		parse[NumSeps + 1] = InString.substring(location[NumSeps] + 1, len);

		return (parse);

	}

	function parseLinearExpr(InString) {

		InString = stripChar(InString, "(");

		InString = stripChar(InString, ")");

		var stringlen = InString.length

		if (!looksLikeANumber(InString.charAt(0))) InString = "1" + InString;

		if (InString.charAt(0) != "-") InString = "+" + InString;

		var variableList = "";

		InString = replaceSubstring(InString, "+", "_+");

		InString = replaceSubstring(InString, "-", "_-");

		var ch = "_";

		var Ar = parser(InString, ch);

		var parsd = new makeArray(Ar[0] + 1, "");
		for (var i = 1; i < Ar[0]; i++) {
			parsd[i] = stripChar(Ar[i + 1], "_");
		}
		var vars = [];
		for (var i = 1; i < Ar[0]; i++) {
			vars[i - 1] = /([a-zA-Z].*)/.exec(parsd[i])[1];

			parsd[i] = parsd[i].replace(/[a-zA-Z].*/, '');

			if (parsd[i] == "+") parsd[i] = "1"; // fix up the coefficients

			else if (parsd[i] == "-") parsd[i] = "-1";

			parsd[i] = stripChar(parsd[i], "+");

		}
		parsd[0] = vars;
		return (parsd);

	}
	// ****************SIMPLEX METHOD****************

	function simplexMethod(InMatrix, rows, cols) {

		var negIndicator = false;

		var testRatio = new Array();

		var theRow = 0;
		singular = false;

		var displayInplaceOfDocument = "working..";

		while ((phase1) && (TableauNumber <= maxSteps)) {
			var checkingForZeros = true;
			var foundAZero = false;
			while (checkingForZeros) {
				checkingForZeros = false;
				for (i = 1; i <= numRows - 1; i++) {
					if (starred[i] == 1) break;
				} // i
				theRowx = i;
				// check the first column to see if it has a zero on the
				// right-hand side and is hence equivalent to <= constraint
				// Fix 01 if it is really small make it zero first:
				if (roundSigDig(InMatrix[theRowx][cols], maxSigDig) == 0) InMatrix[theRowx][cols] = 0;

				if ((InMatrix[theRowx][cols] == 0) && (starred[theRowx] == 1)) {
					checkingForZeros = true;
					foundAZero = true;
					for (var j = 1; j <= cols - 1; j++) {
						InMatrix[theRowx][j] *= -1;
					} // j
					starred[theRowx] = 0;
					// add additional tableaus
					TableauNumber += 1;
					displayInplaceOfDocument += "..";
					// document.theSpreadsheet.expr.value += "..";
					displayMatrix(1);
				} // found a zero on the right-hand side
			} // while checking for zeros

			// at this  point, check if there are any starred rows left
			phase1 = false;
			for (var i = 1; i <= numConstraints; i++) {
				if (starred[i] == 1) {
					phase1 = true;
					break
				}
			} // i

			if (phase1) {
				// there are starred rows left
				// scan the first starred row starred row for the largest pos. element & pivot on that column
				// this is actually step 2
				if (!foundAZero) {
					// find the largest positive entry in the first starred row
					// and pivot
					var rowmax = 0;
					for (i = 1; i <= numRows - 1; i++) {
						if (starred[i] == 1) break;
					} // i

					theRowx = i;

					for (j = 1; j <= numCols - 2; j++) {

						numx = roundSigDig(InMatrix[i][j], 10);

						if (numx > rowmax) {
							rowmax = numx;
							theColx = j;
						}

					} // j

					if (rowmax == 0) {
						singular = true;
						displayFinalStatus();
						return (InMatrix)
					} else {
						// get the lowest ratio and pivot on theRowx, theColx;
						for (var i = 1; i <= rows - 1; i++) {
							testRatio[i] = -1;
							if (roundSigDig(InMatrix[i][theColx], maxSigDig) > 0) // dont want to pivot on a number too close to zero
							{
								if (Math.abs(InMatrix[i][cols]) < epsilon) InMatrix[i][cols] = 0;
								// fixing numbers really close to zero
								testRatio[i] = InMatrix[i][cols] / InMatrix[i][theColx];
							}
						} // i
						var minRatio = 10000000000000;

						theRow = 0; // this will have smallest ratio

						for (var i = 1; i <= rows - 1; i++) {
							if ((testRatio[i] >= 0) && (testRatio[i] < minRatio)) {
								minRatio = testRatio[i];
								theRow = i;
							} // end if
							else if ((testRatio[i] >= 0) && (testRatio[i] == minRatio)) {
								if (starred[i] == 1) theRow = i;
								// select starred ones in preference to others
								else if (Math.random() > .5) theRow = i;
								// random tie-breaking
							}
						} // i
						// escape clause follows
						if (theRow == 0) {
							singular = true;
							displayFinalStatus();
							return (InMatrix)
						}
						InMatrix = pivot(InMatrix, rows, cols, theRow, theColx);
						// end of this step
					} // if did not find a zero
					TableauNumber += 1;
					displayInplaceOfDocument += "..";
					displayMatrix(1);
				}
			} // end of phase 1 treatment  
		}
		// END OF PHASE I

		// NOW PHASE II  

		var testnum = 0;
		for (var i = 1; i <= cols - 1; i++) {
			testnum = roundSigDig(InMatrix[rows][i], 10)
			if (testnum < 0) {
				negIndicator = true;
			}
		} // i
		var theCol = 0;
		if (negIndicator) {
			// look for most negative of them;
			var minval = 0;
			for (i = 1; i <= cols - 1; i++) {
				testnum = roundSigDig(InMatrix[rows][i], 10);
				if (testnum < minval) {
					minval = testnum;
					theCol = i;
				}
			} // i 
		}
		while ((negIndicator) && (TableauNumber <= maxSteps)) // phase 2
		{
			for (var i = 1; i <= rows - 1; i++) {
				testRatio[i] = -1;
				if (roundSigDig(InMatrix[i][theCol], maxSigDig) > 0) // dont want to pivot on a number too close to zero
				{
					if (Math.abs(InMatrix[i][cols]) < epsilon) InMatrix[i][cols] = 0;
					// fixing numbers really close to zero
					testRatio[i] = InMatrix[i][cols] / InMatrix[i][theCol];
				}
			} // i

			var minRatio = 10000000000000;
			theRow = 0; // this will have smallest ratio
			for (var i = 1; i <= rows - 1; i++) {
				if ((testRatio[i] >= 0) && (testRatio[i] < minRatio)) {
					minRatio = testRatio[i];
					theRow = i;
				} else if ((testRatio[i] >= 0) && (testRatio[i] == minRatio)) {
					if (Math.random() > .5) theRow = i;
					// random tie-breaking
				}
			} // i
			// escape clause:
			if (theRow == 0) {
				singular = true;
				displayFinalStatus();
				return (InMatrix)
			}
			InMatrix = pivot(InMatrix, rows, cols, theRow, theCol);
			// end of this step
			TableauNumber += 1;
			displayInplaceOfDocument += "..";
			displayMatrix(1);
			negIndicator = false;
			for (var i = 1; i <= cols - 1; i++) {
				if (roundSigDig(InMatrix[rows][i], 10) < 0) {
					negIndicator = true;
				}
			} // i
			// ERROR CORRECTION BELOW:

			if (negIndicator) // need to select the most negative EVERY time
			{
				// look for most negative of them;
				var minval = 0;

				for (i = 1; i <= cols - 1; i++) {
					testnum = roundSigDig(InMatrix[rows][i], 10);
					if (testnum < minval) {
						minval = testnum;
						theCol = i;
					}
				} // i
			} // end if negIndicator is still true
			//alert(theCol)
		} // while negIndicator
		displayFinalStatus();
		return (InMatrix);
	}

	function SetupTableau() {

		// reads problem and sets up the first tableau

		// get out of here if not ok

		if (!okToRoll) return (666);

		// first, adjust some globals...

		maximization = true;

		singular = false; // start with a clean slate

		var theString = s;
		theString += cr; // want an extra cr at the end

		theString = stripSpaces(theString);

		theString = stripChar(theString, tab); // get rid of tabs

		theString = stripChar(theString, ":"); // get rid of colons

		theString = replaceSubstring(theString, lf, cr); // replace line feeds by carriage returns

		// convert everything to lower case

		theString = theString.toLowerCase();

		// now parse commas into line breaks and introduce a line break after "subject to"

		theString = replaceSubstring(theString, "to", "to" + cr);

		theString = replaceSubstring(theString, ",", cr);

		theString = replaceSubstring(theString, cr + "subject", "subject"); // in case they have introduced a line break or comma before 'subject to'

		// now get rid of double carriage returns


		var doublecr = true;

		while (doublecr) {

			if (checkString(theString, cr + cr, false) == -1) doublecr = false;

			else theString = replaceSubstring(theString, cr + cr, cr);

		}

		// get rid of terminating cr

		if (lastChar(theString) == cr) theString = rightTrim(theString, 1);
		theString = replaceSubstring(theString, "<=", lteSymbol);

		theString = replaceSubstring(theString, ">=", gteSymbol);

		theString = replaceSubstring(theString, lte, lteSymbol);

		theString = replaceSubstring(theString, gte, gteSymbol);

		// look for "maximize" and chop the string there

		var check = checkString(theString, "maxi", false)

		if (check == -1) {
			check = checkString(theString, "mini", false);
			maximization = false;
			phase1 = true
		}

		if (check == -1) {

			okToRoll = false;
			return (666);
		}

		len = theString.length;

		theString = theString.substring(check, len);

		// now the string starts with "max or "min"
		// now extract the objective and constraints

		var tempAr = parser(theString, cr);

		var numConstTemp = tempAr[0] - 1;
		//alert(numConstTemp);
		for (var i = 2; i <= numConstTemp + 1; i++) {

			if (tempAr[i] && tempAr[i].match(/=/)) {

				tempAr[i] = tempAr[i].replace(/=/, lteSymbol);

				tempAr[numConstTemp + 2] = tempAr[i].replace(lteSymbol, gteSymbol);
				numConstTemp += 1;
				tempAr[0] += 1;

			}

		}

		// alert("HERElines of the problem are: "+tempAr[0] + " blocks " + tempAr[1] + " \n" + tempAr[2] + "\n" + tempAr[3] + "\n" +  tempAr[4] + " \n " +  tempAr[5] + "***")    

		var line1 = tempAr[1];

		// get rid of "subject to, if there"

		check = checkString(line1, "subj", true);

		if (check > 0) line1 = line1.substring(0, check);

		// now look for objective

		check = checkString(line1, "=", false);

		if (check <= 0) return (666);

		objectiveName = line1.charAt(check - 1);

		len = line1.length;

		var expression = line1.substring(check + 1, len);

		// alert(expression);

		var OBJ = parseLinearExpr(expression);

		variables = OBJ[0];

		// alert (variables);

		numConstraints = tempAr[0] - 1;

		// alert(numConstraints+1);

		// make the tableau .. note that all the variables are assumed to appear in the objective!!!

		numVariables = variables.length;

		// alert("number of variables =" +  numVariables)

		numRows = numConstraints + 1;

		numCols = numRows + numVariables + 1;

		theTableau = new makeArray2(numRows, numCols);

		theStringTableau = new makeArray2(numRows, numCols); // for display purposes

		if (phase1) starred = new makeArray(numRows); // for starred rows

		// do the last row

		for (var j = 1; j <= numCols; j++) theTableau[numRows][j] = 0; // init

		for (var i = 1; i <= numVariables; i++) {

			if (maximization) theTableau[numRows][i] = -eval(OBJ[i]);

			else theTableau[numRows][i] = eval(OBJ[i]);

		}

		theTableau[numRows][numCols - 1] = 1;

		theTableau[numRows][numCols] = 0;

		theString = tempAr[2];

		var x = checkString(theString, "to", false);

		len = theString.length;

		if (x != -1) theString = theString.substring(x + 2, len);

		// alert(theString);

		tempAr[2] = theString;

		var GTE = false; // greater-than-eq flag
		for (var i = 1; i <= numConstraints; i++) {

			activeVars[i] = i + numVariables;
			starred[i] = 0;

			GTE = false; // clean slate
			twoPart = parser(tempAr[1 + i], lteSymbol);

			if (twoPart[0] < 2) {
				twoPart = parser(tempAr[1 + i], gteSymbol);
				phase1 = true;
				GTE = true;

			}

			if (twoPart[0] < 2) {
				// error verifier

				i += 1;

				okToRoll = false;
				return (666)

			}
			var leftHandSide = parseLinearExpr(twoPart[1]);
			for (var j = 1; j <= numCols; j++) theTableau[i][j] = 0; // init

			theTableau[i][numCols] = eval(twoPart[2]); // the right-hand side

			if (GTE) {
				theTableau[i][numVariables + i] = -1;
				starred[i] = 1;
				phase1 = true;
			} else theTableau[i][numVariables + i] = 1;
			var theIndex = 0;

			for (var j = 1; j <= numVariables; j++) {

				theVar = variables[j - 1];
				theIndex = -1;
				for (var k = 0; k < leftHandSide[0].length; k++) {
					if (leftHandSide[0][k] == theVar) {
						theIndex = k;
						break;
					}
				}
				if (theIndex == -1) theTableau[i][j] = 0;
				else theTableau[i][j] = eval(leftHandSide[theIndex + 1]);
			}
		}
		displayMatrix(1);
		return (1);
	}

	function displayMatrix(number) {

		var theString = "Tableau #" + TableauNumber + cr;


		if (singular) theString += "undefined";


		else {

			var RowNum = numRows;


			var ColNum = numCols;

			// alert("about to display a "+ RowNum+ " x " + ColNum + "matrix");


			// first round all the results and get the longest resulting string

			var maxLength = 1;

			var x = "",
				i = 0,
				j = 0,
				k = 0;

			var xLen = 0;

			// ok to here

			// prepare the stringmatrix if integer mode:


			if (integerMode) theStringTableau = makeInteger(theTableau, RowNum, ColNum, true);


			// else, handle fractions & decimals

			else {

				for (i = 1; i <= RowNum; i++) {

					for (j = 1; j <= ColNum; j++) {

						// alert("i = "+i + " j = " + j + "table entry = " + theTableau[i][j]);

						if (fractionMode) x = toFrac(roundSigDig(theTableau[i][j], 15), maxDenom, tol);

						else x = roundSigDig(theTableau[i][j], numSigDigs).toString();

						// alert("x = "+x);

						xLen = x.length;

						// alert("xLen =" + xLen);

						if (xLen > maxLength) maxLength = xLen;

						theStringTableau[i][j] = x;


					} // j

				} // i

			} // end else (if not integer mode)


			if (maxLength < 6) maxLength = 6; // more space


			var spaceString = "";

			for (i = 0; i <= RowNum; i++) // was 1

			{


				for (j = 1; j <= ColNum; j++) {

					if (i == 0) {

						if (j <= numVariables) x = variables[j - 1];

						else if (j == numVariables + numConstraints + 1) {
							x = objectiveName;
							if (!maximization) x = "-" + x;
						} else if (j < ColNum) {
							var mmm = j - numVariables;
							x = "s" + mmm.toString();
						} else if (j == ColNum) x = " ";

					} // end if
					else x = theStringTableau[i][j];


					sp = maxLength - x.length

					spaceString = "";

					for (k = 0; k <= sp; k++) spaceString += " ";

					theString += x + spaceString;


				} // j

				theString += cr;

			} // i

		}
		spreedsheetOutputValue += theString + cr;
		// document.theSpreadsheet.output.value += theString + cr;

		return (0);

	}

	function makeArray3(X, Y, Z) {

		var count;

		this.length = X + 1;

		for (var count = 1; count <= X + 1; count++)

			// to allow starting at 1

			this[count] = new makeArray2(Y, Z);

	} // makeArray3

	function makeArray2(X, Y) {

		var count;

		this.length = X + 1;

		for (var count = 0; count <= X + 1; count++)

			// to allow starting at 1

			this[count] = new makeArray(Y);

	} // makeArray2
	function makeArray(Y) {

		var count;

		this.length = Y + 1;

		for (var count = 1; count <= Y + 1; count++)

			this[count] = 0;

	} // makeArray

	function stripSpaces(InString) {

		OutString = "";

		for (Count = 0; Count < InString.length; Count++) {

			TempChar = InString.substring(Count, Count + 1);

			if (TempChar != " ")

				OutString = OutString + TempChar;

		}

		return (OutString);

	}

	function stripChar(InString, symbol) {

		OutString = "";

		for (Count = 0; Count < InString.length; Count++) {

			TempChar = InString.substring(Count, Count + 1);

			if (TempChar != symbol)

				OutString = OutString + TempChar;

		}

		return (OutString);

	}

	function doIt() {
		fractionMode = false;
		integerMode = false;
		var theMode = 0;
		var num = 1;
		TableauNumber = 1;
		SetupTableau();

		theTableau = simplexMethod(theTableau, numRows, numCols);
	}
	doIt();
	function displayFinalStatus() {

		// gives the solution or error messages

		let x;
		// if (TableauNumber > maxSteps) document.theSpreadsheet.expr.value = "No optimal solution found after 50 steps. Aborted.";
		//       if (TableauNumber > maxSteps){
		// displayInplaceOfDocument = "No optimal solution found after 50 steps. Aborted."
		//       alert("No optimal solution found after 50 steps. Aborted.");
		//       } 
		// else if (singular) document.theSpreadsheet.expr.value = "No optimal solution exists for this problem."
		// else if (singular){
		//   displayInplaceOfDocument = "No optimal solution exists for this problem."
		// alert("No optimal solution exists for this problem");
		// }
	
		// else

		// {
		x = "Optimal Solution: " + objectiveName + " = ";
		//alert(x)
		// document.theSpreadsheet.expr.value = "Optimal Solution: " + objectiveName + " = ";
		displayInplaceOfDocument = "Optimal Solution: " + objectiveName + " = ";
		var numx = 0;
		var theRowx = 0;
		var theColx = 0;
		var count = 0;
		var theChar = "";
		var theStr = "";
		var objectiveVal = theTableau[numRows][numCols];

		if (!maximization) objectiveVal = -objectiveVal;
		// here we get the p value
		if ((fractionMode) || (integerMode)) {
			displayInplaceOfDocument += toFrac(roundSigDig(objectiveVal, 15), maxDenom, tol) + "; ";
			// document.theSpreadsheet.expr.value += toFrac(roundSigDig(objectiveVal, 15), maxDenom, tol) + "; ";
			x += toFrac(roundSigDig(objectiveVal, 15), maxDenom, tol) + "; ";
			//alert(x)
		} else {
			// document.theSpreadsheet.expr.value += roundSigDig(objectiveVal, numSigDigs).toString() + "; ";
			displayInplaceOfDocument += roundSigDig(objectiveVal, numSigDigs).toString() + "; ";
			x += roundSigDig(objectiveVal, numSigDigs).toString() + "; ";
			//alert(x) // Optimal Solution: p = 115;
		}

		var thePivotPosn = new Array();
		var useThis = true;
		var outputValues = new Array();
		// var variablesToInEquation= new Array();
		for (var j = 1; j <= numVariables; j++) {
			useThis = true;
			count = 0;
			theRowx = 0;
			theChar = variables[j - 1]; // name of this variable
			thePivotPosn[j] = 0;
			useThis = true;
			displayInplaceOfDocument += theChar + " = ";
			// document.theSpreadsheet.expr.value += theChar + " = ";
			//alert(theChar);
			x += theChar + " = ";
			// variablesToInEquation.push(x)
			// alert("This is the variablesToInEquation output"+variablesToInEquation)
			// alert(x) // Optimal Solution: p = 115; x =
			// Another LOOP
			// Optimal Solution: p = 115; x = 10, y =
			// Another loop
			// Optimal Solution: p = 115; x = 10, y = 10, z =
			// Another loop
			// Optimal Solution: p = 115; x = 10, y = 10, z = 0, w =

			for (var i = 1; i <= numRows; i++) {
				numx = roundSigDig(theTableau[i][j], 10);
				if (numx != 0) {
					count++; // counting number of bnonzero entries in the column
					if (numx != 0) theRowx = i
				}
			} // i
			//alert(theRowx)
			if ((count == 1) && (roundSigDig(theTableau[theRowx][j], 10) > 0)) {

				// correction May 20 2010 he second condition above did not check that the pivot was positive!!!
				thePivotPosn[j] = theRowx; // row of that pivot
				// check if we have not already used a pivot in that row
				// in the case of more than one pivot per row
				if (theRowx == numRows) useThis = false; // Fix 02 added this line. Reason: (positive) pivot in the bottom row indicates that that variable is zero
				for (var u = 1; u <= j - 1; u++)
					if (thePivotPosn[j] == thePivotPosn[u]) useThis = false;

				// present solution
				// alert(useThis)
				if (useThis) {
					//alert("In the use case");
					if ((fractionMode) || (integerMode)) theStr = toFrac(roundSigDig((theTableau[theRowx][numCols] / theTableau[theRowx][j]), 15), maxDenom, tol);
					else theStr = roundSigDig((theTableau[theRowx][numCols] / theTableau[theRowx][j]), numSigDigs).toString();
				} else theStr = "0";
				outputValues.push(theStr);
				//alert(theStr)
				if (j < numVariables) theStr += ", ";
				// document.theSpreadsheet.expr.value += theStr;
				//alert(theStr)
				displayInplaceOfDocument += theStr;
				// alert("This PUBG "+displayInplaceOfDocument)
				x += theStr;
				//alert(x);
				// Optimal Solution: p = 115; x = 10,
				// Another loop
				//Optimal Solution: p = 115; x = 10, y = 10,
				// Another LOOP
				// Optimal Solution: p = 115; x = 10, y = 10, z = 0, w = 20
				//alert("starred row is row #" + theRowx + "column is "+j)
			} // if a pivot there
			else {
				theStr = "0";
				outputValues.push(theStr);
				if (j < numVariables) theStr += ", ";
				// document.theSpreadsheet.expr.value += theStr;
				displayInplaceOfDocument += theStr;
				x += theStr;
				//alert(x);
				// Optimal Solution: p = 115; x = 10, y = 10, z = 0,
			}
		} // j
		//alert("This is outputvalue from solver "+ outputValues);
		cpValueDry = 0; nEMValueDry = 0; nEGValueDry = 0; caValueDry = 0; pValueDry = 0;
		// finaloutput value stored in an array
		asFedoutputValue = [];
		// dryMatteroutput value stored in an array
		dryMatterOutputValue = [];
		for (var i = 0; i < cpArray.length; i++) {
			if (inputQuantity[i] == "" ||inputQuantity[i] == NaN) {
				asFedoutputValue.push(outputValues[i])
				dryMatterOutputValue.push((outputValues[i]*(dryMatterValues[i]))/100)
			} else {
				asFedoutputValue.push(inputQuantity[i])
				dryMatterOutputValue.push(inputQuantity[i]*dryMatterValues[i]/100)
			}
		}
		console.log("This is inputQuantity  " + inputQuantity)
		console.log("This is outputValues  " + outputValues)
		console.log("This is asFedoutputValue  " + asFedoutputValue)
		console.log("This is dryMatterOutputValue  "+ dryMatterOutputValue)
		for (var i = 0; i < cpArray.length; i++) {
		
			  cpValueDry += parseFloat(cpFeedstuffValues[i]*dryMatterOutputValue[i])

			  nEMValueDry += parseFloat(nEmFeedstuffValues[i]*dryMatterOutputValue[i]) 
		
			  nEGValueDry += parseFloat(nEgFeedstuffValues[i]*dryMatterOutputValue[i])

			  caValueDry += parseFloat(caFeedstuffValues[i]*dryMatterOutputValue[i])

			  pValueDry += parseFloat(pFeedstuffValues[i]*dryMatterOutputValue[i])
		}
		// console.log(outputValues)
		// It send the output values to Ration Balance Page
		//  sends data to ration balance page
		function localStorageToSendOutputValues(asFedoutputValue) {
			console.log("This is total output withouth limitation " + asFedoutputValue);

			// To convert the output w.r.t to 100 lb.
			dryMatterOutputpercentage = dryMatterOutputValue.map(input => (parseFloat(input)*100/dryMatterOutputValue.reduce((a,b) =>
			 parseFloat(a) + parseFloat(b))).toFixed(4));
			//  Total dry-matter quantity 
			dryMattertotalSum = dryMatterOutputValue.reduce((a, b) => parseFloat(a) + parseFloat(b)).toFixed(4);

			// console.log("This is final output w.r.t to 100 lb  " + finalOutput);
			sessionStorage.setItem('drymatterPercentage', JSON.stringify(dryMatterOutputpercentage));
			sessionStorage.setItem('dryMatterOutputValue', JSON.stringify(dryMatterOutputValue));
			sessionStorage.setItem('asFedValue', JSON.stringify(asFedoutputValue));
			sessionStorage.setItem('cpValueDry', JSON.stringify((parseFloat(cpValueDry)/dryMattertotalSum).toFixed(3)));
			sessionStorage.setItem('nEMValueDry', JSON.stringify((parseFloat(nEMValueDry/100)/dryMattertotalSum).toFixed(3)));
			sessionStorage.setItem('nEGValueDry', JSON.stringify((parseFloat(nEGValueDry/100) /dryMattertotalSum).toFixed(3)));
			sessionStorage.setItem('caValueDry', JSON.stringify((parseFloat(caValueDry)/dryMattertotalSum).toFixed(3)))
			sessionStorage.setItem('pValueDry', JSON.stringify((parseFloat(pValueDry)/dryMattertotalSum).toFixed(3)))
			return false;
		}
		// console.log("THis is CPARRAY " + cpArray)
		// console.log("This is feedstuff name  " + value1)
		localStorageToSendOutputValues(asFedoutputValue);
		// alert("This is the expression for "+ cpValue.join('+'))
		// console.log(cpValue.join('+'))
		// console.log("This is the value of CP" + cpValueDry)
		// console.log("This is the value of nEm" + parseFloat(nEMValueDry) / 100)
		// console.log("This is the value of nEG" + parseFloat(nEGValueDry) / 100)
		// console.log("This is the value of ca" + caValueDry)
		// console.log("This is the value of p" + pValueDry)
		// location.href = '/rationweights';
	// }
	} // end of presentation
}