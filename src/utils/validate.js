import * as yup from 'yup'

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
  .notOneOf(existingUrls)

  export default (url, existingUrls) => buildSchema(existingUrls).validate(String(url))
