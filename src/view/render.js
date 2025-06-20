import renderForm from './renderForm.js'
import renderFeeds from './renderFeeds.js'
import renderPosts from './renderPosts.js'
import renderModal from './renderModal.js'

export default (elements, state) => (path) => {
  const handlers = {
    'form.status': () => renderForm(elements, state.form),
    'form.error': () => renderForm(elements, state.form),
    'feeds': () => renderFeeds(elements, state.feeds),
    'posts': () => renderPosts(elements, state),
    'ui.viewedPosts': () => renderPosts(elements, state),
    'ui.modalPostId': () => {
      const post = state.posts.find((p) => p.id === state.ui.modalPostId)
      if (post) renderModal(elements, post)
    },
  }

  const handler = handlers[path]
  if (handler) handler()
  
}
