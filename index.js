// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=57fa5073

const fetchData = async (searchTerm) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '57fa5073',
            s: searchTerm
        }
    });
    console.log(response.data);
};

const input = document.querySelector('input');

// debouncing an input: waiting for some time to pass after the last event to actually do something
const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

const onInput = debounce(event => {
    fetchData(event.target.value);
});

input.addEventListener('input', onInput);

// let timeoutId;
// const onInput = (event) => {
//     // make searches after 1 second of no typing
//     if (timeoutId) {
//         clearTimeout(timeoutId);
//     }

//     timeoutId = setTimeout(() => {
//         fetchData(event.target.value);
//     }, 1000);
// };

// input.addEventListener('input', onInput);
