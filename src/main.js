import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import validate from './validation.js';
import onChange from 'on-change';

const state = {
  form: {
    status: 'filling', // 'filling' | 'submitting' | 'failed' | 'finished'
    error: null,
  },
  feeds: [],
};

const elements = {
  form: document.getElementById('rss-form'),
  input: document.getElementById('rss-url'),
  feedback: document.querySelector('.feedback'), // предполагается, что элемент с этим классом есть
  feedsContainer: document.getElementById('rss-feeds'),
};

const render = (path, value) => {
  switch (path) {
    case 'form':
      const { status, error } = value;
      if (status === 'failed') {
        elements.input.classList.add('is-invalid');
        elements.feedback.textContent = error;
      } else if (status === 'finished') {
        elements.input.classList.remove('is-invalid');
        elements.feedback.classList.remove('text-danger');
        elements.feedback.classList.add('text-success');
        elements.feedback.textContent = 'RSS успешно загружен';
      } else {
        elements.input.classList.remove('is-invalid');
        elements.feedback.textContent = '';
      }
      break;

    default:
      break;
  }
};


const watchedState = onChange(state, render);

elements.form.addEventListener('submit', (e) => {
  e.preventDefault();
  const url = elements.input.value.trim();
  const existingUrls = watchedState.feeds.map((feed) => feed.url);

  watchedState.form = { status: 'submitting', error: null };

  validate(url, existingUrls)
    .then(() => fetchRssFeed(url))
    .then((feed) => {
      watchedState.feeds.push({ url, ...feed });
      watchedState.form = { status: 'finished', error: null };
      elements.form.reset();
      elements.input.focus();
      displayFeed(feed);
    })
    .catch((err) => {
      watchedState.form = { status: 'failed', error: err.message };
    });
});

function fetchRssFeed(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url.includes('error')) {
        reject(new Error('Ошибка загрузки RSS'));
      } else {
        resolve({
          title: 'Sample Feed',
          items: [
            { title: 'Item 1', description: 'Description 1' },
            { title: 'Item 2', description: 'Description 2' }
          ]
        });
      }
    }, 1000);
  });
}

function displayFeed(feed) {
  elements.feedsContainer.innerHTML = `
    <div class="col-12">
      <div class="card mb-4">
        <div class="card-header">
          <h2>${feed.title}</h2>
        </div>
        <div class="card-body">
          <ul class="list-group">
            ${feed.items.map(item => `
              <li class="list-group-item">
                <h5>${item.title}</h5>
                <p>${item.description}</p>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}
