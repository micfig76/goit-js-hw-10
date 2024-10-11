const input = document.querySelector('input#datetime-picker');
const btn = document.querySelector('button[data-start]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const selectedDate = selectedDates[0];

    const now = Date.now();
    const selectedTimeStamp = selectedDate.getTime();
    const isPastDate = selectedTimeStamp < now;
    if (isPastDate) {
      btn.disabled = true;
      alert('Please choose a date in the future');
    } else {
      btn.disabled = false;
    }
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

btn.addEventListener('click', () => {
  const targetMs = new Date(input.value).getTime();
/*set interval co 0,5s jeżeli interval => 0 wartości ustawiamy na zero to clear interval
tost: time is up!
*/

  console.log(targetMs);
  const timeDif = targetMs - Date.now();
  const { days, hours, minutes, seconds } = convertMs(timeDif);
  document.querySelector('span.value[data-days]').textContent=days; /*padstart*/
  document.querySelector('span.value[data-hours]').textContent=hours; /*padstart*/
  document.querySelector('span.value[data-minutes]').textContent=minutes; /*padstart*/
  document.querySelector('span.value[data-seconds]').textContent=seconds; /*padstart*/
});
