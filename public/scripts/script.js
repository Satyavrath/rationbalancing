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