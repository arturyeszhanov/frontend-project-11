import i18next from 'i18next'

const renderForm = (elements, form) => {
  const { input, feedback, submitButton } = elements

  switch (form.status) {
    case 'filling':
      input.classList.remove('is-invalid')
      feedback.textContent = ''
      feedback.classList.remove('text-danger', 'text-success')
      submitButton.disabled = false
      break

    case 'submitting':
      submitButton.disabled = true
      break

    case 'failed':
      input.classList.add('is-invalid')
      feedback.textContent = i18next.t(`errors.${form.error}`) || i18next.t('errors.unknown')
      feedback.classList.remove('text-success')
      feedback.classList.add('text-danger')
      submitButton.disabled = false
      break

    case 'finished':
      input.classList.remove('is-invalid')
      feedback.textContent = i18next.t('success')
      feedback.classList.remove('text-danger')
      feedback.classList.add('text-success')
      submitButton.disabled = false
      break

    default:
      throw new Error(`Unknown form status: ${form.status}`)
  }
}

export default renderForm
