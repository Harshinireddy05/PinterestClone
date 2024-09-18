const apiKey = 'VVm7jT9quhW1_3g6v5GXhxzj2IW28dysBnw_Rrh1HXk';
let page = 1;
let fetching = false;
const container = document.getElementById('container');
const cols = Array.from(container.getElementsByClassName('col'));
const searchInput = document.getElementById('searchInput');
let currentQuery = 'nature';

console.log(cols);

const fetchImageData = async (count = 30, query = 'nature') => {
    try {
        fetching = true;
        document.getElementById('loader').style.display = 'block';
        const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        fetching = false;
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        fetching = false;
        throw error;
    }
};

const searchImages = () => {
    const query = searchInput.value.trim();
    if (query) {
        currentQuery = query;
        clearImages();
        fetchImageData(30, currentQuery).then((images) => {
            if (images.length > 0) {
                images.forEach((image, index) => {
                createCard(image.urls.regular, cols[index % cols.length]);
                });
            }
        }).catch((error) => {
        console.error("Error during search:", error);
    });
    }
};

const clearImages = () => {
    cols.forEach(col => col.innerHTML = '');
};

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchImages();
    }
});

fetchImageData(30, currentQuery).then((images) => {
    if (images.length > 0) {
        images.forEach((image, index) => {
        createCard(image.urls.regular, cols[index % cols.length]);
        });
    }
    }).catch((error) => {
        console.error("Error initial fetch:", error);
    });

const createCard = (imageUrl, col) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = "Unsplash Image";
    img.style.width = "100%";
    img.onerror = function () {
        this.parentElement.style.display = "none";
    };
    img.onload = function () {
        document.getElementById('loader').style.display = 'none';
    };
    card.appendChild(img);
    col.appendChild(card);
};

const handleScroll = () => {
    if (fetching) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.documentElement.scrollHeight;

    if (bodyHeight - scrollTop - windowHeight < 800) {
        page++;
        fetchImageData(30, currentQuery).then((images) => {
        if (images.length > 0) {
            images.forEach((image, index) => {
                createCard(image.urls.regular, cols[index % cols.length]);
            });
        }
        }).catch((error) => {
            console.error("Error handling scroll:", error);
        });
    }
};

window.addEventListener('scroll', handleScroll);