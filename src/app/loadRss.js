import axios from 'axios';

const getProxiedUrl = (url) => `https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`;

export default (url) => axios.get(getProxiedUrl(url))
  .then((response) => {
    if (response.status !== 200) {
      throw new Error('network');
    }
    return response.data.contents;
  });
