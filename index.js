// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=57fa5073

const fetchData = async () => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '57fa5073',
            s: 'avengers'
        }
    });
    console.log(response.data.Search);
};

fetchData();
