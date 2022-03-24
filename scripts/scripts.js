const API_KEY = '07289903b0cf41e288a93c214805b69d';
const newsList = document.querySelector('.cards');
const element = document.querySelector('.js-choise');
console.log(element);
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: '',

});
const getData = async (url) => {
  const response = await fetch(url, {
    headers: {
      'X-Api-Key': API_KEY,
    }
  });
  const data = await response.json()
  return data;
}
const renderCard = (data) => {
  newsList.textContent = '';
  data.forEach(news => {
    const card = document.createElement('li');
    card.className = 'card';
    card.innerHTML = `
    <img class="card__image" src="${news.urlToImage}" alt="${news.title}" />
    <h3><a class="card__title" href="${news.url}" target="_blank">${news.title}</a></h3>
    <p class="card__text">${news.description}</p>
    <div class="card__caption">
      <time class="card__datetime" datetime="2022-03-16T16:11:06Z">
        <span>${news.publishedAt}</span>${news.publishedAt}
      </time>
      <div class="card__author">${news.author}</div>
    </div>
    `;
    newsList.append(card);
  })
}

const loadNews = async () => {
  const data = await getData('https://newsapi.org/v2/top-headlines?country=ru');
  renderCard(data.articles);
}
loadNews();