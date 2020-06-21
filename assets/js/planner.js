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
