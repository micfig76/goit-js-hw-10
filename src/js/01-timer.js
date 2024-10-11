const input = document.querySelector('input#datetime-picker');
const btn = document.querySelector('button[data-start]');

function validateDate(selectedDate) {
  const now = Date.now();
  const selectedTimeStamp = selectedDate.getTime();
  const isPastDate = selectedTimeStamp < now;
  if (isPastDate) {
    btn.disabled = true;
    iziToast.warning({
      title: 'Please choose a date in the future',
    });
  } else {
    btn.disabled = false;
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    validateDate(selectedDates[0]);
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(num) {
  return num.toString().padStart(2, '0');
}

function setTimer({ days, hours, minutes, seconds }) {
  document.querySelector('span.value[data-days]').textContent =
    addLeadingZero(days);
  document.querySelector('span.value[data-hours]').textContent =
    addLeadingZero(hours);
  document.querySelector('span.value[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('span.value[data-seconds]').textContent =
    addLeadingZero(seconds);
}

/*set interval co 0,1s jeżeli interval => 0 wartości ustawiamy na zero to clear interval
tost: time is up!
*/
btn.addEventListener('click', () => {
  const interval = setInterval(() => {
    const targetMs = new Date(input.value).getTime();
    const timeDif = targetMs - Date.now();
    if (timeDif <= 0) {
      clearInterval(interval);
      setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    } else {
      const converted = convertMs(timeDif);
      setTimer(converted);
    }
  }, 1_000);
});
