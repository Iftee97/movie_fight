const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
    root.innerHTML = `
        <label><b>Search</b></label>
        <input class="input" />
        <div class="dropdown">
            <div class="dropdown-menu">
                <div class="dropdown-content results"></div>
            </div>
        </div>
    `;

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');

    // // debouncing an input: waiting for some time to pass after the last event to actually do something
    const onInput = debounce(async (event) => {
        const items = await fetchData(event.target.value);
        // console.log(items);

        if (!items.length) {
            dropdown.classList.remove('is-active');
        }

        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');

        for (let item of items) {
            const option = document.createElement('a');
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item);
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                onOptionSelect(item);
            });
            resultsWrapper.append(option);
        }
    });

    input.addEventListener('input', onInput);
    document.addEventListener('click', (event) => {
        // console.log(event.target);
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    });
};
