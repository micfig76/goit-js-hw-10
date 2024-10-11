const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(form.querySelector('input[name="delay"]').value);

  const state = form.querySelector('input[name="state"]:checked').value;

  createNotification(delay, state)
    .then(() => {
      console.log('success!');
    })
    .catch(error => {
      console.error('Error:', error);
    })
    .finally(() => {
      form.reset();
    });
});

function createNotification(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        iziToast.success({
          title: 'Success',
          message: `Fulfilled promise in ${delay}ms`,
        });
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        iziToast.error({
          title: 'Error',
          message: `Rejected promise in ${delay}ms`,
        });
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}
