import * as yup from 'yup';

const buildSchema = (existingUrls) => yup
  .string()
  .url('Ссылка должна быть валидным URL')
  .required('Не должно быть пустым')
  .notOneOf(existingUrls, 'RSS уже существует');

export default (url, existingUrls) => buildSchema(existingUrls).validate(url);