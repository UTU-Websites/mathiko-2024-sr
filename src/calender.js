document.addEventListener('DOMContentLoaded', function() {
  var spinnerContainer = document.getElementById('spinner-container');
  var content = document.getElementById('content');

  window.addEventListener('load', function() {
    spinnerContainer.style.display = 'none';
    content.style.display = 'block';
  });
});

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}

document.addEventListener("DOMContentLoaded", function() {
  updateCalendar();
});

//0 sunday 1 monday 2 tuesday 3 wednesday 4 thursday 5 friday 6 saturday YYYY-MM-DD
// Event data
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const events = [
  { day: 5, date: '2024-09-06', title: "Wake Service", time: "05:00 PM", location: "Home of the Bereaved" },
  { day: 6, date: '2024-09-07', title: "Wake Service", time: "05:00 PM", location: "Home of the Bereaved" },
  { day: 0, date: '2024-09-08', title: "Haramebee/Fundraising", time: "10:00 AM", location: "Restaurant Venue" },
  { day: 0, date: '2024-09-08', title: "Wake Service", time: "05:00 PM", location: "Home of the Bereaved" },
  { day: 2, date: '2024-09-10', title: "Wake Service", time: "05:00 PM", location: "Home of the Bereaved" },
  { day: 3, date: '2024-09-11', title: "Wake Service", time: "05:00 PM", location: "Home of the Bereaved" },
  { day: 4, date: '2024-09-12', title: "Wake Service", time: "05:00 PM", location: "Home of the Bereaved" },
  { day: 5, date: '2024-09-13', title: "FUNERAL SERVICE", time: "05:00 PM", location: "Home of the Bereaved"}
];

let startOfWeek = new Date();

function updateCurrentDay() {
  const today = new Date();
  const currentDayIndex = today.getDay();
  const currentDate = today.toISOString().split('T')[0];
  const month = monthsOfYear[today.getMonth()];
  const currentDayText = `<span class="current-details">~ ${daysOfWeek[currentDayIndex]} ~</span> </br> ${today.getDate()} ${month} ${today.getFullYear()}`;

  const currentDayDiv = document.getElementById("current-day");
  currentDayDiv.innerHTML = `<h4 class="current-day-style">${currentDayText}</h4>`;

  const currentDayEvents = events.filter(event => event.date === currentDate);
  if (currentDayEvents.length > 0) {
    const eventsList = document.createElement("ul");
    for (const event of currentDayEvents) {
      const eventItem = document.createElement("li");
      eventItem.textContent = `${event.title} at ${event.time} (${event.location})`;
      eventsList.appendChild(eventItem);
    }
    currentDayDiv.appendChild(eventsList);
  } else {
    const noEventsMsg = document.createElement("p");
    noEventsMsg.textContent = "Nothing Planned Today";
    currentDayDiv.appendChild(noEventsMsg);
  }
}

function generateWeekCalendar() {
  const weekCalendar = document.getElementById("week-calendar");
  const today = new Date();
  const currentDay = today.getDay();
  const startOfWeekCopy = new Date(startOfWeek);

  weekCalendar.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    const dayElement = document.createElement("div");
    dayElement.className = "day";
    dayElement.setAttribute("data-day", i);

    const date = new Date(startOfWeekCopy);
    date.setDate(startOfWeekCopy.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];

    if (date.toDateString() === today.toDateString()) {
      dayElement.classList.add("active");
    }

    const dayText = `${daysOfWeek[date.getDay()]} (${date.getDate()} ${monthsOfYear[date.getMonth()]} ${date.getFullYear()})`;
    dayElement.textContent = dayText;

    const dayEvents = events.filter(event => event.date === formattedDate);
    if (dayEvents.length > 0) {
      const eventsList = document.createElement("ul");
      for (const event of dayEvents) {
        const eventItem = document.createElement("li");
        eventItem.textContent = `${event.title} at ${event.time} (${event.location})`;
        eventsList.appendChild(eventItem);
      }
      dayElement.appendChild(eventsList);
    } else {
      const noEventsMsg = document.createElement("p");
      noEventsMsg.textContent = "Nothing Planned";
      dayElement.appendChild(noEventsMsg);
    }

    const dotElement = document.createElement("div");
    dotElement.className = "ei_Dot";
    dayElement.appendChild(dotElement);

    weekCalendar.appendChild(dayElement);
  }
}

function checkForScheduledEvents() {
  const prevWeekButton = document.getElementById('prev-week');
  const nextWeekButton = document.getElementById('next-week');

  let hasPreviousWeekEvents = false;
  let hasNextWeekEvents = false;

  const prevWeekStart = new Date(startOfWeek);
  prevWeekStart.setDate(startOfWeek.getDate() - 7);
  const nextWeekStart = new Date(startOfWeek);
  nextWeekStart.setDate(startOfWeek.getDate() + 7);

  // Check previous week
  for (let i = 0; i < 7; i++) {
    const date = new Date(prevWeekStart);
    date.setDate(prevWeekStart.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];

    if (events.some(event => event.date === formattedDate)) {
      hasPreviousWeekEvents = true;
      break;
    }
  }

  // Check next week
  for (let i = 0; i < 7; i++) {
    const date = new Date(nextWeekStart);
    date.setDate(nextWeekStart.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];

    if (events.some(event => event.date === formattedDate)) {
      hasNextWeekEvents = true;
      break;
    }
  }

  // Update button indicators
  if (hasPreviousWeekEvents) {
    prevWeekButton.classList.add('has-events');
  } else {
    prevWeekButton.classList.remove('has-events');
  }

  if (hasNextWeekEvents) {
    nextWeekButton.classList.add('has-events');
  } else {
    nextWeekButton.classList.remove('has-events');
  }
}

function navigateWeek(direction) {
  if (direction === 'prev') {
    startOfWeek.setDate(startOfWeek.getDate() - 7);
  } else if (direction === 'next') {
    startOfWeek.setDate(startOfWeek.getDate() + 7);
  }

  updateCalendar();
}

function updateCalendar() {
  console.log("Updating calendar...");
  updateCurrentDay();
  generateWeekCalendar();
  checkForScheduledEvents(); // Check for events in previous and next weeks
}

// Initial check on page load
window.addEventListener('DOMContentLoaded', (event) => {
  updateCalendar();  // Initialize the calendar
  checkForScheduledEvents();  // Ensure the dots show correctly on load
});

// Update calendar every minute (60000 milliseconds)
setInterval(updateCalendar, 60000);
