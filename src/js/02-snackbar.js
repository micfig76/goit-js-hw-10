const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(form.querySelector('input[name="delay"]').value);

  const state = form.querySelector('input[name="state"]:checked').value;

  createNotification(delay, state)
    .then(() => {
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(error => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .finally(() => {
      form.reset();
    });
});

function createNotification(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
       
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
       
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}
