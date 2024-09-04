const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

function searchPlace() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('resultDiv');

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let result = '';
            
            function shuffle(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }

            if (input === 'countries') {
                const shuffledCountries = shuffle(data.countries);
                shuffledCountries.slice(0, 2).forEach(country => {
                    result += `<h2>${country.name}</h2> <br>`;
                    const shuffledCities = shuffle(country.cities);
                    shuffledCities.slice(0, 2).forEach(city => {
                        result += `<h3>${city.name}</h3><p>${city.description}</p><img src="${city.imageUrl}"  alt="${city.name}" width="100px" height="100px"> <br>`;
                    });
                });
            } else if (input === 'beaches') {
                const shuffledBeaches = shuffle(data.beaches);
                shuffledBeaches.slice(0, 2).forEach(beach => {
                    result += `<h2>${beach.name}</h2><p>${beach.description}</p><img src="${beach.imageUrl}" alt="${beach.name}" width="100px" height="100px"> <br>`;
                });
            } else if (input === 'temples') {
                const shuffledTemples = shuffle(data.temples);
                shuffledTemples.slice(0, 2).forEach(temple => {
                    result += `<h2>${temple.name}</h2><p>${temple.description}</p><img src="${temple.imageUrl}" alt="${temple.name}"width="100px" height="100px"> <br>`;
                });
            } else {
                result = `<h5>Category not found.</h5>`;
            }

            resultDiv.innerHTML = result;
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}


btnSearch.addEventListener('click', searchPlace);

function clearAll(){
    resultDiv.innerHTML = '';
}

btnClear.addEventListener('click', clearAll);