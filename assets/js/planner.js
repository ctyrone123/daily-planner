var currentTime = moment().format("H");
var toDoList = [];

//display current day
$("#currentDay").text(moment().format("MMMM Do YYYY"));

//set up the array of activities
function intitializeActivities(){

  $(".time-block").each(function(){
    
    var todoItem = {
      hour: parseInt($(this).attr("data-hour")),
      text: "",
    }
    toDoList.push(todoItem);
  });

  //save objects to local storage as a string
  localStorage.setItem("activities", JSON.stringify(toDoList));
}

//color coding based on present time
function colorCodeing(){
    $(".time-block").each(function(){
      
      //add style to time blocks to show where we are in the day
      if (parseInt($(this).attr("data-hour")) == currentTime) {
        $(this).addClass("present").removeClass("past future");
      }
      if (parseInt($(this).attr("data-hour")) < currentTime) {
        $(this).addClass("past").removeClass("present future");
      }
      if (parseInt($(this).attr("data-hour")) > currentTime) {
        $(this).addClass("future").removeClass("past present");
      }
    });
}
//assign the text to the timeBlock with data-hour equal to hour.
function loadActivities(){
  toDoList = JSON.parse(localStorage.getItem("activities"));

  for (var i = 0; i < toDoList.length; i++){
    $("[data-hour=" + toDoList[i].hour + "]").children("textarea").val(toDoList[i].text);
  } 
}

function saveActivities(){
  
  //assign text to matching data-hour of button clicked
  for (var i = 0; i < toDoList.length; i++){
    if (toDoList[i].hour == $(this).parent().attr("data-hour")){
      toDoList[i].text = (($(this).parent()).children("textarea")).val();
    }
  }
  localStorage.setItem("activities", JSON.stringify(toDoList));
  loadActivities();
}

// when the page loads
$(document).ready(function(){
  colorCodeing();
  if(!localStorage.getItem("activities")){
    intitializeActivities();
  }

  //load schedule from local storage
  loadActivities();
  //save when save button is clicked
  $(".planner").on("click", "button", saveActivities);
});
