export default (rssText) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(rssText, 'application/xml');

  const parserError = doc.querySelector('parsererror');
  if (parserError) {
    throw new Error('parsing');
  }

  const feed = {
    title: doc.querySelector('channel > title')?.textContent ?? '',
    description: doc.querySelector('channel > description')?.textContent ?? '',
  };

  const posts = [...doc.querySelectorAll('item')].map((item) => ({
    title: item.querySelector('title')?.textContent ?? '',
    description: item.querySelector('description')?.textContent ?? '',
    link: item.querySelector('link')?.textContent ?? '',
  }));

  return { feed, posts };
};
