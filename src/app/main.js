import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import i18next from 'i18next';
import onChange from 'on-change';
import initI18n from '../utils/i18n.js';
import validate from '../utils/validate.js';
import parseRss from '../utils/parseRss.js';
import render from '../view/render.js';
import updatePosts from '../utils/updatePosts.js';

const buildProxyUrl = (url) => {
  const baseUrl = 'https://allorigins.hexlet.app/get';
  const params = new URLSearchParams({
    disableCache: 'true',
    url,
  });
  return `${baseUrl}?${params.toString()}`
};

const loadRss = (url) => {
  const proxyUrl = buildProxyUrl(url)
  return fetch(proxyUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('network')
      }
      return response.json()
    })
    .then((data) => {
      const parsed = parseRss(data.contents)
      parsed.url = url
      return parsed
    });
};

const state = {
  form: {
    status: 'filling',
    error: null,
  },
  feeds: [],
  posts: [],
  ui: {
    viewedPosts: new Set(),
    modalPostId: null,
  },
};

const elements = {
  title: document.querySelector('[data-element="title"]'),
  subtitle: document.querySelector('[data-element="subtitle"]'),
  form: document.querySelector('[data-element="form"]'),
  input: document.querySelector('[data-element="input"]'),
  label: document.querySelector('[data-element="label"]'),
  submitButton: document.querySelector('[data-element="submit"]'),
  example: document.querySelector('[data-element="example"]'),
  feedback: document.querySelector('[data-element="feedback"]'),
  feeds: document.querySelector('[data-element="feeds"]'),
  posts: document.querySelector('[data-element="posts"]'),
  modal: document.querySelector('[data-element="modal"]'),
  modalTitle: document.querySelector('[data-element="modalTitle"]'),
  modalBody: document.querySelector('[data-element="modalBody"]'),
  modalReadFull: document.querySelector('[data-element="modalReadFull"]'),
  modalCloseButton: document.querySelector('[data-element="modalCloseButton"]'),
};


initI18n().then(() => {
  const watchedState = onChange(state, render(elements, state));

  document.title = i18next.t('title');
  elements.title.textContent = i18next.t('header.title');
  elements.subtitle.textContent = i18next.t('header.subtitle');
  elements.label.textContent = i18next.t('form.label');
  elements.input.placeholder= i18next.t('form.placeholder');
  elements.submitButton.textContent= i18next.t('form.submit');
  elements.submitButton.textContent= i18next.t('form.submit');
  elements.example.textContent= i18next.t('example');
  elements.modalReadFull.textContent= i18next.t('modal.read_full');
  elements.modalCloseButton.textContent= i18next.t('modal.close');

  elements.posts.addEventListener('click', (e) => {

    const { target } = e;
    if (!target || !target.dataset.id) return;

    const postId = target.dataset.id;
  
    if (target.tagName === 'BUTTON') {
      const updatedViewedPosts = new Set(watchedState.ui.viewedPosts);
      updatedViewedPosts.add(postId);
      watchedState.ui.viewedPosts = updatedViewedPosts;
  
      watchedState.ui.modalPostId = postId;
    }
  
    if (target.tagName === 'A') {
      const updatedViewedPosts = new Set(watchedState.ui.viewedPosts);
      updatedViewedPosts.add(postId);
      watchedState.ui.viewedPosts = updatedViewedPosts;
    }
  });
  
  
  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = elements.input.value.trim();
    const existingUrls = watchedState.feeds.map((feed) => feed.url);

    watchedState.form.status = 'submitting';
    watchedState.form.error = null;

    validate(url, existingUrls)
      .then(() => loadRss(url))
      .then((parsed) => {
        const feedId = Date.now();
        const feed = { id: feedId, url: parsed.url, title: parsed.title, description: parsed.description };
        const posts = parsed.items.map((item, index) => ({
          id: `${feedId}-${index}`,
          feedId,
          title: item.title,
          link: item.link,
          description: item.description,
        }));
      
        watchedState.feeds.unshift(feed);
        watchedState.posts.unshift(...posts);
      
        watchedState.form.status = 'finished';
        elements.form.reset();
        elements.input.focus();
      
        updatePosts(watchedState);

      })
      .catch((err) => {
        watchedState.form.status = 'failed';
        watchedState.form.error = err.message;
      });
      
  });
});
