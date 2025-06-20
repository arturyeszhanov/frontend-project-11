export default (rssText) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rssText, 'application/xml');
  
    const parserError = doc.querySelector('parsererror');
    if (parserError) {
      throw new Error('parsing');
    }
  
    const title = doc.querySelector('channel > title')?.textContent;
    const description = doc.querySelector('channel > description')?.textContent;
    const items = [...doc.querySelectorAll('item')].map((item) => ({
      title: item.querySelector('title')?.textContent,
      description: item.querySelector('description')?.textContent,
      link: item.querySelector('link')?.textContent,
    }));
  
    return { title, description, items };
  };
  