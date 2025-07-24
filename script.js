const API_KEY = "a1d07ce326ae418cb3fa0a694b5b5eb3";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() =>fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews (query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    //jitne articles aa rhe h utne hi template banane h and container mei append krte jaoge
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsContainer.innerHTML = '';//agar ye ni krenge to hoga kya ki jitni bi baar bind data kroge toh uske niche card dalte jaenge

    articles.forEach(article => {
        if(!article.urlToImage) return; //agar image nhi aa rhi hai api se toh pehle hi return krdenge 
        const cardClone = newsCardTemplate.content.cloneNode(true); //iska matlab we wanna make deep clone sabkuch clone ho
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: 'Asia/Jakarta'
    }); //time dalna h agar toh time banake

    newsSource.innerHTML = `${article.source.name} 🕖 ${date}`;

    cardClone.firstElementChild.addEventListener('click',() =>{
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active');
    //pichle se active class nikal jaegi and agle mei chli jaegi jab ham koi bi select krenge to
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click', ()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = null;
});



//darkmode
const toggleCheckbox = document.getElementById("toggle-checkbox");

toggleCheckbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Load saved theme from localStorage
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        toggleCheckbox.checked = true;
    }
});
