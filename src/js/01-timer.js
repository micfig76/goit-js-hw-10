
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
    },
};

flatpickr("input#datetime-picker", options);

document.querySelector("button[data-start]").addEventListener("click", () => {
const value = document.querySelector("input#datetime-picker").value;
const targetMs = new Date(value).getTime();
console.log(targetMs)        
});

