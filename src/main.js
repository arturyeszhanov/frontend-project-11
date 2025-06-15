import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import validate from './validation.js';
import onChange from 'on-change';

import initI18n from './i18n.js';
import i18next from 'i18next';

initI18n().then(() => {
  const elements = {
    input: document.getElementById('rss-url'),
    form: document.getElementById('rss-form'),
    feedback: document.querySelector('.feedback'),
    submitButton: document.querySelector('button[type="submit"]'),
    feedsContainer: document.getElementById('rss-feeds'),
  }


  elements.input.placeholder = i18next.t('form.placeholder');
  document.querySelector('label[for="rss-url"]').textContent = i18next.t('form.placeholder');
  elements.submitButton.textContent = i18next.t('form.submit');
  document.title = i18next.t('title');
  document.querySelector('h1').textContent = i18next.t('title');
  document.querySelector('p.lead').textContent = i18next.t('subtitle');
  document.querySelector('.opacity-50').textContent = i18next.t('example');
  

  const render = (path, value) => {
    switch (path) {
      case 'form': {
        const { status, error } = value;
  
        if (status === 'failed') {
          elements.input.classList.add('is-invalid');
          elements.feedback.classList.remove('text-success');
          elements.feedback.classList.add('text-danger');
  
          const translatedError = i18next.exists(`feedback.errors.${error}`)
            ? i18next.t(`feedback.errors.${error}`)
            : error;
  
          elements.feedback.textContent = translatedError;
        } else if (status === 'finished') {
          elements.input.classList.remove('is-invalid');
          elements.feedback.classList.remove('text-danger');
          elements.feedback.classList.add('text-success');
          elements.feedback.textContent = i18next.t('feedback.success');
        } else {
          elements.input.classList.remove('is-invalid');
          elements.feedback.textContent = '';
        }
  
        break;
      }
  
      default:
        break;
    }
  };
  

  const state = {
    form: {
      status: 'filling',
      error: null,
    },
    feeds: [],
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
          reject(new Error('network'));
        } else {
          resolve({
            title: 'Sample Feed',
            items: [
              { title: 'Item 1', description: 'Description 1' },
              { title: 'Item 2', description: 'Description 2' },
            ],
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
              ${feed.items
                .map(
                  (item) => `
                <li class="list-group-item">
                  <h5>${item.title}</h5>
                  <p>${item.description}</p>
                </li>
              `
                )
                .join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }
});
