document.addEventListener('DOMContentLoaded', function() {
  var spinnerContainer = document.getElementById('spinner-container');
  var content = document.getElementById('content');

  window.addEventListener('load', function() {
    spinnerContainer.style.display = 'none';
    content.style.display = 'block';
  });
});

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//0 sunday 1 monday 2 tuesday 3 wednesday 4 thursday 5 friday 6 saturday YYYY-MM-DD
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const events = [
  { day: 4, date: '2024-08-08', title: "Wake Service", time: "05:00 PM", location: "Home of the Bereaved" },
  { day: 5, date: '2024-08-09', title: "Wake Service", time: "05:00 PM", location: "Home of the Bereaved" },
  { day: 6, date: '2024-08-10', title: "Haramebee/Fundraising", time: "10:00 AM", location: "Restaurant Venue" },
  { day: 6, date: '2024-08-10', title: "Wake Service", time: "05:00 PM", location: "Home of the Bereaved" },
  { day: 0, date: '2024-08-11', title: "Wake Service", time: "05:00 PM", location: "Home of the Bereaved" },
  { day: 1, date: '2024-08-12', title: "Wake Service", time: "05:00 PM", location: "Home of the Bereaved" },
  { day: 2, date: '2024-08-13', title: "Wake Service", time: "05:00 PM", location: "Home of the Bereaved" },
  { day: 3, date: '2024-08-14', title: "Wake/Vigil Service", time: "4:00 PM", location: "Church" },
  { day: 3, date: '2024-08-14', title: "Reminder:Last Committee Meeting", time: "6:00 PM", location: "Home of the Bereaved" },
  { day: 5, date: '2024-08-15', title: "FUNERAL SERVICE ", time: "05:00 PM", location: "Home of the Bereaved" },
];

function updateCurrentDay() {
  const today = new Date();
  const currentDayIndex = today.getDay();
  const month = monthsOfYear[today.getMonth()];
  const currentDayText = `<span class="current-details">~ ${daysOfWeek[currentDayIndex]} ~</span> </br> ${today.getDate()} ${month} ${today.getFullYear()}`;

  const currentDayDiv = document.getElementById("current-day");
  currentDayDiv.innerHTML = `<h4 class="current-day-style">${currentDayText}</h4>`; // Display day and date

  // Find events for the current day
  const currentDayEvents = events.filter(event => event.day === currentDayIndex);
  if (currentDayEvents.length > 0) {
    const eventsList = document.createElement("ul");
    for (const event of currentDayEvents) {
      const eventItem = document.createElement("li");
      eventItem.textContent = `${event.title} at ${event.time} (${event.location})`;
      eventsList.appendChild(eventItem);
    }
    currentDayDiv.appendChild(eventsList); // Append events to the current day section
  } else {
    // If no events are scheduled for today
    const noEventsMsg = document.createElement("p");
    noEventsMsg.textContent = "Nothing Planned Today";
    currentDayDiv.appendChild(noEventsMsg);
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
    dayElement.setAttribute("data-day", i);

    if (i === currentDay) {
      dayElement.classList.add("active");
    }

    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    const dayText = `${daysOfWeek[i]} (${date.getDate()} ${monthsOfYear[date.getMonth()]} ${date.getFullYear()})`;
    dayElement.textContent = dayText;

    const dayEvents = events.filter(event => event.day === i);
    if (dayEvents.length > 0) {
      const eventsList = document.createElement("ul");
      for (const event of dayEvents) {
        const eventItem = document.createElement("li");
        eventItem.textContent = `${event.title} at ${event.time} (${event.location})`;
        eventsList.appendChild(eventItem);
      }
      dayElement.appendChild(eventsList);
    }

    const dotElement = document.createElement("div");
    dotElement.className = "ei_Dot";
    dayElement.appendChild(dotElement);

    weekCalendar.appendChild(dayElement);
  }
}

function updateCalendar() {
  console.log("Updating calendar...");
  updateCurrentDay();
  generateWeekCalendar();
}

// Initial update
updateCalendar();

// Update every minute (60000 milliseconds)
setInterval(updateCalendar, 60000);
