// To search any ingredient based by name.

$(document).ready(function () {
  $("#calculateBtn").hide();
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

// To avoid duplicate entry and to display in selected ingredients in table-format
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
    '<td> <input type="text" class="form-control text-field-button" id=' + customId + "Quantity" + ' value=""> </td>' +
    '<td><input type="text" class="form-control text-field-button" id=' + customId + "Cost" + ' value=""></td>' +
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
  }
  else {
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
// On click function to navigate to feedstuff page
function clickedNEXTBTN() {

  let cpMin = document.getElementById("CP-Min").value;
  let cpMax = document.getElementById("CP-Max").value;
  cp.push(cpMin);
  cp.push(cpMax);
  let nemMin = document.getElementById("NEM-Min").value;
  let nemMax = document.getElementById("NEM-Max").value;
  nem.push(nemMin); nem.push(nemMax);
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
  localStorage.setItem('objectToPass', listofIngs);
}
function calculateBTN() {
  tableOfContents = [];
  var unique = ingredients.filter(function (elem, index, self) {
    return index === self.indexOf(elem);
  })
  var minMaxRange = localStorage.getItem('objectToPass');
    for (var i = 0; i < unique.length; i++) {
      let ing = unique[i];
      let keyIng = ing.replace(/[ ,.%()]/g, "");
      let valCost = document.getElementById(keyIng + "Cost").value;
      tableOfContents.push({
        key: ing,
        value: valCost
      });
    }

    function localStorageToSendIngredients(unique) {
      console.log(unique);
    
      // localStorage.setItem("selectedIngredients", JSON.stringify("unique"));
      // Storage.prototype.setObject = function(key, value) {
      //   this.setItem(key, JSON.stringify(unique));
      // }
      localStorage.setItem('key', JSON.stringify(unique));
      return false;
    }
    
    localStorageToSendIngredients(unique);
    // To store selected ingredients key and value in an array.
      var objectiveEquation = [];
      for (var i in tableOfContents) {
        objectiveEquation.push(tableOfContents[i].value + tableOfContents[i].key.replace(/[ ,.%()]/g, ""));
      }
      // To fetch index number of selected ingredient in json data
      var dataId = [];
      var selectednutrientvalue = [];
      for (i = 0; i <= unique.length; i++) {
        for (j = 0; j < 277; j++) {
          if (ourData[j].name == unique[i]) {
            dataId.push(j);
          }
        }
      }
      alert(dataId)
      cpFeedstuffValues = []
      nEmFeedstuffValues = []
      nEgFeedstuffValues = []
      caFeedstuffValues = []
      pFeedstuffValues = []

      value1 = []
      // To store CP,NEm,NEg,Ca,P of selected nutrients in a new array
      for (var index in dataId) {
        selectednutrientvalue.push(ourData[dataId[index]].CP + ourData[dataId[index]].name.replace(/[ ,.%()]/g, ""));
        selectednutrientvalue.push(ourData[dataId[index]].NEm + ourData[dataId[index]].name.replace(/[ ,.%()]/g, ""));
        selectednutrientvalue.push(ourData[dataId[index]].NEg + ourData[dataId[index]].name.replace(/[ ,.%()]/g, ""));
        selectednutrientvalue.push(ourData[dataId[index]].Ca + ourData[dataId[index]].name.replace(/[ ,.%()]/g, ""));
        selectednutrientvalue.push(ourData[dataId[index]].P + ourData[dataId[index]].name.replace(/[ ,.%()]/g, ""));
        value1.push(ourData[dataId[index]].name.replace(/[ ,.%()]/g, ""))
        cpFeedstuffValues.push(ourData[dataId[index]].CP)
        nEmFeedstuffValues.push(ourData[dataId[index]].NEm)
        nEgFeedstuffValues.push(ourData[dataId[index]].NEg)
        caFeedstuffValues.push(ourData[dataId[index]].Ca)
        pFeedstuffValues.push(ourData[dataId[index]].P)


      }


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
      for (i in unique){
        aggregateArray.push(unique[i].replace(/[ ,.%()]/g, ""));
      }

      var data = minMaxRange.split(',');

      var s = "Minimize P = " + objectiveEquation.join('+') + " subject to\n" + cpArray.join('+') + ">=" + data[0] + "\n"
        + cpArray.join('+') + "<=" + data[1] + "\n" + nEMArray.join('+') + ">=" + data[2] + "\n" + nEMArray.join('+') + "<=" + data[3] + "\n"
        + nEGArray.join('+') + ">=" + data[4] + "\n" + nEGArray.join('+') + "<=" + data[5] + "\n" + caArray.join('+') + ">=" + data[6] + "\n"
        + caArray.join('+') + "<=" + data[7] + "\n" + pArray.join('+') + ">=" + data[8] + "\n" + pArray.join('+') + "<=" +  data[9]+ "\n" +aggregateArray.join('+') +"= 100";
        console.log(s);
