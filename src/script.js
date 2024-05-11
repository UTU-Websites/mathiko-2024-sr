const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const events = [
    { date: '2024-04-10', description: 'Meeting with Bob' },
    { date: '2024-04-15', description: 'Dentist appointment' },
    { date: '2024-05-05', description: 'Project deadline' }
];

let currentDate = new Date();

function isLeapYear(year) {
    return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

function isEventDate(date) {
    const formattedDate = date.toISOString().split('T')[0];  // YYYY-MM-DD
    return events.find(event => event.date === formattedDate);
}

function renderCalendar(date) {
    const calendarDays = document.getElementById('calendar-days');
    calendarDays.innerHTML = '';

    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    // Add padding for days from previous month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day';
        calendarDays.appendChild(emptyDay);
    }

    // Add the days for the current month
    for (let day = 1; day <= lastDayOfMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        const currentDay = new Date(date.getFullYear(), date.getMonth(), day);

        const event = isEventDate(currentDay);
        if (event) {
            dayDiv.classList.add('event');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = event.description;
            dayDiv.appendChild(tooltip);
        }

        dayDiv.textContent = day;
        calendarDays.appendChild(dayDiv);
    }

    const monthYear = document.getElementById('calendar-month-year');
    monthYear.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar(currentDate);
}

renderCalendar(currentDate);  // Initialize calendar with current month