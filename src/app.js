import { validateUrl } from './validation.js';

export default (state, elements) => {
  const { formEl, input, submit } = elements;

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = input.value.trim();
    const existingUrls = state.feeds.map((feed) => feed.url);

    state.form.state = 'submitting';
    validateUrl(url, existingUrls)
      .then(() => {
        state.feeds.push({ url });
        state.form = { state: 'finished', error: null };
        formEl.reset();
        input.focus();
      })
      .catch((err) => {
        state.form = { state: 'failed', error: err.message };
      });
  });
};
