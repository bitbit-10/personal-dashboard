
    function leapYearCheck(year){
      if (year % 4 === 0) {
        if(year % 100){
          if(year % 400){
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
    function removeAddDates(){
      var dates = document.getElementsByClassName("dates")[0];
      var container = document.getElementsByClassName("calendarContainer")[0];
      container.removeChild(dates);
      var newDates = document.createElement("UL");
      newDates.className = "dates";
      container.appendChild(newDates);
    }

      function previous(){
        removeAddDates();
        var year = parseInt(document.getElementById("year").textContent);

        var month;
        var currentMonth = document.getElementById("month").childNodes[0].nodeValue;

        if (currentMonth === "January") {
          month = 0 + 12;
          year = year -1;
        }
        else if (currentMonth === "February") {
          month = 1;
        }
        else if (currentMonth === "March") {
          month = 2;
        }
        else if (currentMonth === "April") {
          month = 3;
        }
        else if (currentMonth === "May") {
          month = 4;
        }
        else if (currentMonth === "June") {
          month = 5;
        }
        else if (currentMonth === "July") {
          month = 6;
        }
        else if (currentMonth === "August") {
          month = 7;
        }
        else if (currentMonth === "September") {
          month = 8;
        }
        else if (currentMonth === "October") {
          month = 9;
        }
        else if (currentMonth === "November") {
          month = 10;
        }
        else if (currentMonth === "December") {
          month = 11;
        }
        month = month - 1;
        var leapYear = leapYearCheck(year);
        monthNameDaysStart(month, year, 0, leapYear);
      }

      function next(){
        removeAddDates();
        var year = parseInt(document.getElementById("year").textContent);

        var month;
        var currentMonth = document.getElementById("month").childNodes[0].nodeValue;

        if (currentMonth === "January") {
          month = 0;
        }
        else if (currentMonth === "February") {
          month = 1;
        }
        else if (currentMonth === "March") {
          month = 2;
        }
        else if (currentMonth === "April") {
          month = 3;
        }
        else if (currentMonth === "May") {
          month = 4;
        }
        else if (currentMonth === "June") {
          month = 5;
        }
        else if (currentMonth === "July") {
          month = 6;
        }
        else if (currentMonth === "August") {
          month = 7;
        }
        else if (currentMonth === "September") {
          month = 8;
        }
        else if (currentMonth === "October") {
          month = 9;
        }
        else if (currentMonth === "November") {
          month = 10;
        }
        else if (currentMonth === "December") {
          month = 11 - 12;
          year = year + 1;
        }
        month = month + 1;
        var leapYear = leapYearCheck(year);
        monthNameDaysStart(month, year, 0, leapYear);
      }

      function today() {
        var today = new Date();
        var todayDate = today.getDate();
        //today - to find start position
        var todayMonth = today.getMonth(); //0-11
        var todayYear = today.getFullYear();
        var leapYear = leapYearCheck(todayYear);
        monthNameDaysStart(todayMonth, todayYear, todayDate, leapYear);
      }

      function monthNameDaysStart(todayMonth, todayYear, todayDate, leapYear){
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var daysInMonth;
        var month = todayMonth;
        var monthName = months[month];
        if (leapYear){
          daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        } else {
          daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }
        // info using today's info
        //(1) number of days in that month
        var numOfDays = daysInMonth[month];
        //(2)startDay of that month
        var year = todayYear;
        var x = new Date(year, month, 1);
        var startDay = x.getDay();
        makeCal(monthName, year, numOfDays, startDay, todayDate);
      }


      function makeCal(monthName, year, numOfDays, startDay, todayDate){

        //Header display month, year
        var headerMonth = document.getElementById("month");
        headerMonth.innerHTML = monthName + "<br><span id=\"year\">" + year + "</span>";

        //Body of Calendar - Dates
        var dates = document.getElementsByClassName("dates")[0];
        var i,j;

        //j starts from zero cos getDay starts from 0 for Sunday, < because the startDay should be 1st of the month which is the next for loop
        for (i = 0; i < startDay; i++){
          var nodeEmpty = document.createElement("LI");
          nodeEmpty.style.width = "13.6%";

          dates.appendChild(nodeEmpty);
        }

        //i starts from 1 because the number of days in a month start from 1
        for (j = 1; j <= numOfDays; j++) {
          if (j == todayDate){
            var node = document.createElement("LI");
            var textnode = document.createTextNode(j);

            node.appendChild(textnode);
            node.style.width = "13.6%";
            node.className = "active";

            dates.appendChild(node);
          }else {
            var node = document.createElement("LI");
            var textnode = document.createTextNode(j);

            node.appendChild(textnode);
            node.style.width = "13.6%";

            dates.appendChild(node);
          }
        }

      }
