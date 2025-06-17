import axios from 'axios';
import parseRss from './parseRss.js';

const getProxyUrl = (url) => {
  const proxy = 'https://allorigins.hexlet.app/get';
  return `${proxy}?disableCache=true&url=${encodeURIComponent(url)}`;
};

const updatePosts = (state) => {
  const promises = state.feeds.map((feed) => {
    return axios.get(getProxyUrl(feed.url))
      .then((response) => {
        const { posts } = parseRss(response.data.contents);
        const existingLinks = state.posts.map((post) => post.link);

        const newPosts = posts
          .filter((post) => !existingLinks.includes(post.link))
          .map((post) => ({
            ...post,
            feedId: feed.id,
            id: `post-${Date.now()}-${Math.random()}`,
          }));

        if (newPosts.length > 0) {
          state.posts.unshift(...newPosts);
        }
      })
      .catch((e) => {
        // Ошибки просто игнорируем для устойчивости
        console.error('Ошибка обновления потока', feed.url, e.message);
      });
  });

  Promise.all(promises).finally(() => {
    setTimeout(() => updatePosts(state), 5000); // ⏱ Перезапуск через 5 сек
  });
};

export default updatePosts;
