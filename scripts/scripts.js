const API_KEY = '07289903b0cf41e288a93c214805b69d';
const newsList = document.querySelector('.cards');
const element = document.querySelector('.js-choise');
const formSearch = document.querySelector('.header__form');
const title = document.querySelector('.titles__title');
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
    .catch(err => {
      alert(`текстюююю ${err}`);
    })
  return data;
}
const getDateCorrectFormat = isoDate => {
  const date = new Date(isoDate);
  const fullDate = date.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
  const fullTime = date.toLocaleString('en-GB', {
    hour: 'numeric',
    minute: 'numeric'
  });
  return `<span >${fullDate}</span> ${fullTime}`
}
const getImage = url => new Promise((resolve) => {
  const image = new Image;
  image.addEventListener('load', () => {
    resolve(image);
  });
  image.addEventListener('error', () => {
    image.src = '../images/nophoto.jpg';
    resolve(image);
  });
  image.src = url || '../images/nophoto.jpg';
  image.className = 'card__image';

  return image;
})
const renderCard = (data) => {
  newsList.textContent = '';
  data.forEach(async (news) => {
    const { urlToImage, title, url, description, publishedAt, author } = news;
    const card = document.createElement('li');
    card.className = 'card';
    const image = await getImage(urlToImage);
    image.alt = title;
    card.append(image);
    card.innerHTML += `
    
    <div class="card__text-zone"><h3><a class="card__title" href="${url}" target="_blank">${title || ''}</a></h3>
    <p class="card__text">${description || ''}</p></div>
    <div class="card__caption">
      <time class="card__datetime" datetime="2022-03-16T16:11:06Z">
      ${getDateCorrectFormat(publishedAt)}
      </time>
      <div class="card__author">${author || ''}</div>
    </div>
    `;
    newsList.append(card);
  })
}

const loadNews = async (valueCountry) => {
  newsList.innerHTML = '<li class="preload"></li>';
  if (!valueCountry) {
    valueCountry = 'ru';
  }
  const data = await getData(`https://newsapi.org/v2/top-headlines?country=${valueCountry}`);
  renderCard(data.articles);
}
const loadSearch = async (value) => {

  const data = await getData(`https://newsapi.org/v2/everything?q=${value}`);
  title.textContent = `По вашему запросу “${value}” найдено ${data.articles.length} результатов`;
  renderCard(data.articles);
}
element.addEventListener('change', (evt) => {
  const valueCountry = evt.detail.value;
  loadNews(valueCountry);
  localStorage.getItem('country', valueCountry);
})
formSearch.addEventListener('submit', (evt) => {
  evt.preventDefault();

  loadSearch(formSearch.search.value);
  formSearch.reset();
})
loadNews();