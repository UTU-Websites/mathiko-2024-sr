const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const events = [
      { day: 0, date: 'YYYY-MM-DD', title: "Morning Jog", time: "07:00 AM" },
      { day: 1, date: 'YYYY-MM-DD', title: "Team Meeting", time: "10:00 AM" },
      { day: 2, date: 'YYYY-MM-DD', title: "Project Deadline", time: "05:00 PM" },
      { day: 3, date: 'YYYY-MM-DD', title: "testing", time: "10:00 AM" },
      { day: 4, date: 'YYYY-MM-DD', title: "Doctor Appointment", time: "02:00 PM" },
      { day: 6, date: 'YYYY-MM-DD', title: "Family Dinner", time: "08:00 PM" }
    ];
    // {day: 0, date: 'YYYY-MM-DD', title: "event title", time: "07:00 AM", location: "where", (or locationURL: "https....") description: "details/ short description" },
    //0 sun, 1 mon,  2 tue, 3 wed, 4 thur, 5 fri, 6 sat
    function updateCurrentDay() {
      const today = new Date();
      const currentDayIndex = today.getDay();
      const month = monthsOfYear[today.getMonth()];
      const currentDayText = `~ ${daysOfWeek[currentDayIndex]} ~ </br> <small>${today.getDate()} ${month} ${today.getFullYear()}</small>`;

      const currentDayDiv = document.getElementById("current-day");
      currentDayDiv.innerHTML = `<h4>${currentDayText}</h4>`; // Display day and date

      // Find events for the current day
      const currentDayEvents = events.filter(event => event.day === currentDayIndex);
      if (currentDayEvents.length > 0) {
        const eventsList = document.createElement("ul");
        for (const event of currentDayEvents) {
          const eventItem = document.createElement("li");
          eventItem.textContent = `${event.title} at ${event.time}`;
          eventsList.appendChild(eventItem);
        }
        currentDayDiv.appendChild(eventsList); // Append events to the current day section
      }
    }

    function generateWeekCalendar() {
      const weekCalendar = document.getElementById("week-calendar");
      const today = new Date();
      const currentDay = today.getDay();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - currentDay);

      weekCalendar.innerHTML = ""; // Clear existing content

      for (let i = 0; i < 7; i++) {
        const dayElement = document.createElement("div");
        dayElement.className = "day";

        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);

        const dayText = `${daysOfWeek[i]} (${date.getDate()} ${monthsOfYear[date.getMonth()]} ${date.getFullYear()})`;
        dayElement.textContent = dayText;

        const dayEvents = events.filter(event => event.day === i);
        if (dayEvents.length > 0) {
          const eventsList = document.createElement("ul");
          for (const event of dayEvents) {
            const eventItem = document.createElement("li");
            const locationLink = '<a href="${event.locationURL}" target="_blank">${event.location}</a>';
            eventItem.textContent = `${event.title} at ${event.time} (${event.location})`;
            eventsList.appendChild(eventItem);
          }
          dayElement.appendChild(eventsList);
        }

        weekCalendar.appendChild(dayElement);
      }
    }

    function updateCalendar() {
      updateCurrentDay();
      generateWeekCalendar();
    }

    updateCalendar(); // Initial update

    setInterval(updateCalendar, 86400000); // 24-hour interval