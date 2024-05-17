//0 sunday 1 monday 2 tuesday 3 wednesday 4 thursday 5 friday 6 saturday 
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const events = [
  { day: 0, date: '2024-05-12', title: "Morning Jog", time: "07:00 AM", location: "Park" },
  { day: 1, date: '2024-05-13', title: "Team Meeting", time: "10:00 AM", location: "Office" },
  { day: 2, date: '2024-05-14', title: "Project Deadline", time: "05:00 PM", location: "Online" },
  { day: 3, date: '2024-05-15', title: "Doctor Appointment", time: "10:00 AM", location: "Clinic" },
  { day: 1, date: '2024-05-20', title: "Client Meeting", time: "02:00 PM", location: "Client's Office" },
  { day: 2, date: '2024-05-21', title: "Team Lunch", time: "12:00 PM", location: "Restaurant" },
  { day: 3, date: '2024-05-22', title: "Family Dinner", time: "08:00 PM", location: "Home" }
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
    noEventsMsg.textContent = "Nothing planned today";
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

    weekCalendar.appendChild(dayElement);
  }
}

function updateCalendar() {
  console.log("Updating calendar...");
  updateCurrentDay();
  generateWeekCalendar();
}

updateCalendar(); // Initial update

setInterval(updateCalendar, 86400000); // 24-hour interval
