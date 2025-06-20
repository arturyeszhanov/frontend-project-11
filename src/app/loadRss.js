import axios from 'axios'
import parseRss from '../utils/parseRss.js'

const buildProxyUrl = (url) => {
  const baseUrl = 'https://allorigins.hexlet.app/get'
  const params = new URLSearchParams({
    disableCache: 'true',
    url,
  })
  return `${baseUrl}?${params.toString()}`
}

const loadRss = (url) => {
  const proxyUrl = buildProxyUrl(url)
  return axios.get(proxyUrl)
    .then((response) => {
      const { contents } = response.data
      const parsed = parseRss(contents)
      return {
        url,
        feed: parsed.feed,
        posts: parsed.posts,
      }
    })
}

export default loadRss
