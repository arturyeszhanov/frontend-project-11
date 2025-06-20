import i18next from 'i18next';

const renderFeeds = (elements, feeds) => {
  const { feeds: feedsContainer } = elements;
  feedsContainer.innerHTML = ''

  const card = document.createElement('div')
  card.classList.add('card', 'border-0')

  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')

  const cardTitle = document.createElement('h2')
  cardTitle.classList.add('card-title', 'h4')
  cardTitle.textContent = i18next.t('feeds')

  cardBody.append(cardTitle)
  card.append(cardBody)

  const list = document.createElement('ul')
  list.classList.add('list-group', 'border-0', 'rounded-0')

  feeds.forEach((feed) => {
    const item = document.createElement('li')
    item.classList.add('list-group-item', 'border-0', 'border-end-0');

    const title = document.createElement('h3')
    title.classList.add('h6', 'm-0')
    title.textContent = feed.title;

    const desc = document.createElement('p')
    desc.classList.add('m-0', 'small', 'text-black-50')
    desc.textContent = feed.description;

    item.append(title, desc)
    list.append(item)
  });

  card.append(list);
  feedsContainer.append(card)
};

export default renderFeeds;