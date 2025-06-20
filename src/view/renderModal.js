import { Modal } from 'bootstrap'

let modalInstance = null

const renderModal = (elements, post) => {
  const { modal, modalTitle, modalBody, modalReadFull } = elements

  if (!modalInstance) {
    modalInstance = new Modal(modal)

    modal.addEventListener('hidden.bs.modal', () => {
      document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.remove())
      document.body.classList.remove('modal-open')
    })
  }

  modalTitle.textContent = post.title
  modalBody.textContent = post.description
  modalReadFull.setAttribute('href', post.link)

  modalInstance.show()
}

export default renderModal
