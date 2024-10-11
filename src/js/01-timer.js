const input = document.querySelector("input#datetime-picker");
const btn =
document.querySelector("button[data-start]");

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
            alert("Please choose a date in the future");
        }
        else {
            btn.disabled = false;
        }
    },
};

flatpickr(input, options);

btn.addEventListener("click", () => {
const targetMs = new Date(input.value).getTime();
console.log(targetMs)        
});


