import i18next from 'i18next'

const renderPosts = (elements, state) => {
  const { posts: postsContainer } = elements
  const { posts, ui } = state
  postsContainer.innerHTML = ''

  const card = document.createElement('div')
  card.classList.add('card', 'border-0')

  const cardBody = document.createElement('div')
  cardBody.classList.add('card-body')

  const cardTitle = document.createElement('h2')
  cardTitle.classList.add('card-title', 'h4')
  cardTitle.textContent = i18next.t('posts')

  cardBody.append(cardTitle)
  card.append(cardBody)

  const list = document.createElement('ul')
  list.classList.add('list-group', 'border-0', 'rounded-0')

  posts.forEach((post) => {
    const item = document.createElement('li')
    item.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-start',
      'border-0',
      'border-end-0',
    )

    const link = document.createElement('a')
    link.setAttribute('href', post.link)
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'noopener noreferrer')
    link.dataset.id = post.id
    link.classList.add(ui.viewedPosts.has(post.id) ? 'fw-normal' : 'fw-bold')
    link.textContent = post.title

    const button = document.createElement('button')
    button.setAttribute('type', 'button')
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm')
    button.dataset.id = post.id
    button.dataset.bsToggle = 'modal'
    button.dataset.bsTarget = '#modal'
    button.textContent = i18next.t('preview')

    item.append(link, button)
    list.append(item)
  })

  card.append(list)
  postsContainer.append(card)
}

export default renderPosts
