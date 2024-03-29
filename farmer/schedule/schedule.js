// Function to set colors for specific dates
function setColors() {
  const colorMapping = {
    '2024-01-02': 'red',
    '2024-01-07': 'blue',
    '2024-01-15': 'yellow',
    '2024-02-03': 'red',
    '2024-02-09': 'blue',
    '2024-02-18': 'yellow',
    '2024-03-05': 'red',
    '2024-03-12': 'blue',
    '2024-03-20': 'yellow',
    // Add more dates and colors as needed
  };

  const allCells = document.querySelectorAll('td[data-date]');
  allCells.forEach(cell => {
    const date = cell.getAttribute('data-date');
    if (colorMapping[date]) {
      cell.classList.add(colorMapping[date]);
    }
    // Create 'Proceed' button for each date
    const proceedButton = document.createElement('button');
    proceedButton.textContent = 'Proceed';
    proceedButton.addEventListener('click', function() {
      proceedDate(date);
    });
    cell.appendChild(proceedButton);
  });
}

// Function to generate the calendar for a specific month
function generateCalendar(year, month) {
  const calendarContainer = document.getElementById('calendar-container');
  calendarContainer.innerHTML = ''; // Clear previous content

  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const monthHeader = document.createElement('th');
  monthHeader.colSpan = 7;
  monthHeader.textContent = new Date(year, month - 1, 1).toLocaleString('en-US', { month: 'long' });
  headerRow.appendChild(monthHeader);
  table.appendChild(headerRow);

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

  let currentDay = 1;

  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j < firstDayOfWeek) {
        // Empty cells before the first day of the month
        cell.textContent = '';
      } else if (currentDay <= daysInMonth) {
        cell.textContent = currentDay;
        cell.setAttribute('data-date', `${year}-${month.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`);
        currentDay++;
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  calendarContainer.appendChild(table);

  // Set colors after generating the calendar
  setColors();
}

// Function to update the calendar when the month changes
function updateCalendar() {
  const selectYear = document.getElementById('selectYear');
  const selectMonth = document.getElementById('selectMonth');
  const selectedYear = parseInt(selectYear.value);
  const selectedMonth = parseInt(selectMonth.value);
  generateCalendar(selectedYear, selectedMonth);
}

// Function to change the month
function changeMonth(step) {
  const selectYear = document.getElementById('selectYear');
  const selectMonth = document.getElementById('selectMonth');
  const currentYear = parseInt(selectYear.value);
  let currentMonth = parseInt(selectMonth.value);

  // Calculate the new month and year
  currentMonth += step;
  if (currentMonth < 1) {
    currentMonth = 12;
    selectYear.value = currentYear - 1;
  } else if (currentMonth > 12) {
    currentMonth = 1;
    selectYear.value = currentYear + 1;
  }

  // Update the select element values and calendar
  selectMonth.value = currentMonth;
  updateCalendar();
}

// Function to add the selected date to the proceeded dates list
function proceedDate(date) {
  let proceededDates = JSON.parse(localStorage.getItem('proceededDates')) || [];
  proceededDates.push(date);
  localStorage.setItem('proceededDates', JSON.stringify(proceededDates));
  updateProceededDatesList(proceededDates);
}

// Function to update the list of proceeded dates
function updateProceededDatesList(proceededDates) {
  const proceededDatesContainer = document.getElementById('proceeded-dates');
  proceededDatesContainer.innerHTML = ''; // Clear previous content
  proceededDates.forEach(date => {
    const listItem = document.createElement('li');
    listItem.textContent = date;
    proceededDatesContainer.appendChild(listItem);
  });

  // Update the proceeded dates in proceeded_dates.html as well
  const proceededDatesHtml = `<h2>Proceeded Dates</h2>
    <ul>${proceededDates.map(date => `<li>${date}</li>`).join('')}</ul>`;
  localStorage.setItem('proceededDatesHtml', proceededDatesHtml);
}

// Call the function to generate the initial calendar
generateCalendar(2024, 1);
