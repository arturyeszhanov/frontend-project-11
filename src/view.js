import onChange from 'on-change';

const renderFormState = (elements, formState) => {
  const { input, feedback } = elements;

  switch (formState.state) {
    case 'filling':
      input.classList.remove('is-invalid');
      feedback.textContent = '';
      break;
    case 'submitting':
      break;
    case 'failed':
      input.classList.add('is-invalid');
      feedback.textContent = formState.error;
      break;
    case 'finished':
      input.classList.remove('is-invalid');
      feedback.textContent = 'RSS успешно загружен';
      break;
    default:
      throw new Error(`Unknown state: ${formState.state}`);
  }
};

export default (state, elements) => onChange(state, (path) => {
  if (path === 'form') {
    renderFormState(elements, state.form);
  }
});
