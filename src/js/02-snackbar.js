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
        resolve(`Notification created with delay ${delay}ms`);
      } else {
        reject(`Notification rejected with delay ${delay}ms`);
      }
    }, delay);
  });
}
