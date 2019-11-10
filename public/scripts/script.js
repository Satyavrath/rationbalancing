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

