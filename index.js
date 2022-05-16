const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '57fa5073',
            s: searchTerm
        }
    });

    if (response.data.Error) {
        return [];
    }

    return response.data.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search for a movie</b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

// // debouncing an input: waiting for some time to pass after the last event to actually do something
const onInput = debounce(async (event) => {
    const movies = await fetchData(event.target.value);
    // console.log(movies);
    resultsWrapper.innerHTML = '';
    dropdown.classList.add('is-active');

    for (let movie of movies) {
        const option = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        option.classList.add('dropdown-item');
        option.innerHTML = `
            <img src="${imgSrc}" />
            ${movie.Title}
        `;
        resultsWrapper.append(option);
    }
});

input.addEventListener('input', onInput);


// --------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------


// // without debounce:
// let timeoutId;
// const onInput = (event) => {
//     // make searches after 1 second of no typing
//     if (timeoutId) {
//         clearTimeout(timeoutId);
//     }

//     timeoutId = setTimeout(async () => {
//         const movies = await fetchData(event.target.value);
//         // console.log(movies);
//         for (let movie of movies) {
//             const div = document.createElement('div');
//             div.innerHTML = `
//                 <img src="${movie.Poster}" alt="${movie.Title}" />
//                 <h1>${movie.Title}</h1>
//             `;
//             document.querySelector('#target').append(div);
//         }
//     }, 1000);
// };

// input.addEventListener('input', onInput);
