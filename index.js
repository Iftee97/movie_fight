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

const input = document.querySelector('input');

// // debouncing an input: waiting for some time to pass after the last event to actually do something
const onInput = debounce(async (event) => {
    const movies = await fetchData(event.target.value);
    // console.log(movies);
    for (let movie of movies) {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" />
            <h1>${movie.Title}</h1>
        `;
        document.querySelector('#target').append(div);
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
