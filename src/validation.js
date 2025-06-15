import * as yup from 'yup';

// Устанавливаем глобальные коды ошибок вместо текстов
yup.setLocale({
  mixed: {
    required: () => 'required',
    notOneOf: () => 'notOneOf',
  },
  string: {
    url: () => 'url',
  },
});

const buildSchema = (existingUrls) => yup
  .string()
  .url()
  .required()
  .notOneOf(existingUrls);

export default (url, existingUrls) => buildSchema(existingUrls).validate(url);
