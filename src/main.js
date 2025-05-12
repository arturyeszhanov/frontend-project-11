import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

document.getElementById('rss-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const url = document.getElementById('rss-url').value;
  
  fetchRssFeed(url)
    .then((feed) => {
      displayFeed(feed);
    })
    .catch((error) => {
      console.error('Error fetching RSS:', error);
      alert('Error fetching RSS feed');
    });
});

function fetchRssFeed(url) {
  return new Promise((resolve, reject) => {
    // Здесь будет реальный запрос к RSS
    // Для примера используем setTimeout
    setTimeout(() => {
      if (url.includes('error')) {
        reject(new Error('Invalid RSS URL'));
      } else {
        resolve({
          title: 'Sample Feed',
          items: [
            { title: 'Item 1', description: 'Description 1' },
            { title: 'Item 2', description: 'Description 2' }
          ]
        });
      }
    }, 1000);
  });
}

function displayFeed(feed) {
  const feedsContainer = document.getElementById('rss-feeds');
  feedsContainer.innerHTML = `
    <div class="col-12">
      <div class="card mb-4">
        <div class="card-header">
          <h2>${feed.title}</h2>
        </div>
        <div class="card-body">
          <ul class="list-group">
            ${feed.items.map(item => `
              <li class="list-group-item">
                <h5>${item.title}</h5>
                <p>${item.description}</p>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}