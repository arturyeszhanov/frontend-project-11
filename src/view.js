import onChange from 'on-change';
import i18next from 'i18next';

const renderForm = (elements, form) => {
  const { input, feedback, submitButton } = elements;

  switch (form.status) {
    case 'filling':
      input.classList.remove('is-invalid');
      feedback.textContent = '';
      feedback.classList.remove('text-danger', 'text-success');
      submitButton.disabled = false;
      break;

    case 'submitting':
      submitButton.disabled = true;
      break;

    case 'failed':
      input.classList.add('is-invalid');
      feedback.textContent = i18next.t(`errors.${form.error}`) || i18next.t('errors.unknown');
      feedback.classList.remove('text-success');
      feedback.classList.add('text-danger');
      submitButton.disabled = false;
      break;

    case 'finished':
      input.classList.remove('is-invalid');
      feedback.textContent = i18next.t('success');
      feedback.classList.remove('text-danger');
      feedback.classList.add('text-success');
      submitButton.disabled = false;
      break;

    default:
      throw new Error(`Unknown form status: ${form.status}`);
  }
};

const renderFeeds = (elements, feeds) => {
  const { feedsContainer } = elements;
  feedsContainer.innerHTML = '';

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = i18next.t('feeds');

  cardBody.append(cardTitle);
  card.append(cardBody);

  const list = document.createElement('ul');
  list.classList.add('list-group', 'border-0', 'rounded-0');

  feeds.forEach((feed) => {
    const item = document.createElement('li');
    item.classList.add('list-group-item', 'border-0', 'border-end-0');

    const title = document.createElement('h3');
    title.classList.add('h6', 'm-0');
    title.textContent = feed.title;

    const desc = document.createElement('p');
    desc.classList.add('m-0', 'small', 'text-black-50');
    desc.textContent = feed.description;

    item.append(title, desc);
    list.append(item);
  });

  card.append(list);
  feedsContainer.append(card);
};

const renderPosts = (elements, posts) => {
  const { postsContainer } = elements;
  postsContainer.innerHTML = '';

  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.textContent = i18next.t('posts');

  cardBody.append(cardTitle);
  card.append(cardBody);

  const list = document.createElement('ul');
  list.classList.add('list-group', 'border-0', 'rounded-0');

  posts.forEach((post) => {
    const item = document.createElement('li');
    item.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0',
    );

    const link = document.createElement('a');
    link.setAttribute('href', post.link);
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
    link.classList.add('fw-bold');
    link.textContent = post.title;

    item.append(link);
    list.append(item);
  });

  card.append(list);
  postsContainer.append(card);
};

export default (elements, state) => (path) => {
  if (path === 'form.status' || path === 'form.error') {
    renderForm(elements, state.form);
  }

  if (path === 'feeds') {
    renderFeeds(elements, state.feeds);
  }

  if (path === 'posts') {
    renderPosts(elements, state.posts);
  }
};
