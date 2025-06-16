import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import i18next from 'i18next';
import onChange from 'on-change';

import initI18n from './i18n.js';
import validate from './validation.js';
import render from './view.js';
import parseRss from './parseRss.js';

const buildProxyUrl = (url) => {
  const baseUrl = 'https://allorigins.hexlet.app/get';
  const params = new URLSearchParams({
    disableCache: 'true',
    url,
  });
  return `${baseUrl}?${params.toString()}`;
};

const loadRss = (url) => {
  const proxyUrl = buildProxyUrl(url);
  return fetch(proxyUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('network');
      }
      return response.json();
    })
    .then((data) => {
      const parsed = parseRss(data.contents);
      parsed.url = url;
      return parsed;
    });
};

const state = {
  form: {
    status: 'filling', // 'submitting' | 'finished' | 'failed'
    error: null,
  },
  feeds: [],
  posts: [],
};

const elements = {
  input: document.getElementById('rss-url'),
  form: document.getElementById('rss-form'),
  feedback: document.querySelector('.feedback'),
  submitButton: document.querySelector('button[type="submit"]'),
  feedsContainer: document.getElementById('rss-feeds'),
  postsContainer: document.getElementById('rss-posts'),
};

initI18n().then(() => {
  const watchedState = onChange(state, render(elements, state));

  // Переводы
  elements.input.placeholder = i18next.t('form.placeholder');
  document.querySelector('label[for="rss-url"]').textContent = i18next.t('form.placeholder');
  elements.submitButton.textContent = i18next.t('form.submit');
  document.title = i18next.t('title');
  document.querySelector('h1').textContent = i18next.t('title');
  document.querySelector('p.lead').textContent = i18next.t('subtitle');
  document.querySelector('.opacity-50').textContent = i18next.t('example');

  // Обработчик формы
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = elements.input.value.trim();
    const existingUrls = watchedState.feeds.map((feed) => feed.url);

    watchedState.form.status = 'submitting';
    watchedState.form.error = null;

    validate(url, existingUrls)
      .then(() => loadRss(url))
      .then((parsed) => {
        const feedId = Date.now(); // можно заменить на uuid
        const feed = { id: feedId, url: parsed.url, title: parsed.title, description: parsed.description };
        const posts = parsed.items.map((item, index) => ({
          id: `${feedId}-${index}`,
          feedId,
          title: item.title,
          link: item.link,
        }));

        watchedState.feeds.unshift(feed);
        watchedState.posts.unshift(...posts);

        watchedState.form.status = 'finished';
        elements.form.reset();
        elements.input.focus();
      })
      .catch((err) => {
        watchedState.form.status = 'failed';
        watchedState.form.error = err.message;
      });
  });
});
