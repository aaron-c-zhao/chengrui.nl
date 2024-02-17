window.addEventListener('load', function () {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    let postsData = []; // To store the posts data

    // Initialize Fuse.js options
    const fuseOptions = {
        includeScore: true,
        keys: ['title', 'content'],
        threshold: 0.3, // Adjust the threshold for fuzzy matching
    };

    let fuse;

    // Function to perform search with debouncing
    const performSearch = _.debounce(function (query) {
        const results = fuse.search(query);
        displayResults(results, query);
    }, 300);

    // Fetch the JSON data containing posts
    fetch('/assets/search-data.json')
        .then(response => response.json())
        .then(posts => {
            postsData = posts;
            fuse = new Fuse(posts, fuseOptions);

            const urlSearchParams = new URLSearchParams(window.location.search);
            const queryParam = urlSearchParams.get('query');

            // Set the initial search input value
            if (queryParam) {
                searchInput.value = queryParam;
                performSearch(queryParam);
            }

            // Event listener for input change
            searchInput.addEventListener('input', function () {
                const query = searchInput.value.trim().toLowerCase();
                performSearch(query);
            });
        })
        .catch(error => console.error('Error fetching search data:', error));

    // Function to display search results
    function displayResults(results, query) {
        searchResults.innerHTML = '';

        if (results.length === 0 && query) {
            searchResults.innerHTML = '<li class="foundNothing">No results found</li>';
        } else {
            results.forEach(result => {
                const post = result.item;
                const li = document.createElement('li');
                const highlightedTitle = highlightSearchTerm(post.title, query);
                li.innerHTML = `<a href="${post.url}">${highlightedTitle}</a>`;
                searchResults.appendChild(li);
            });
        }
    }

    // Function to highlight the search term in a string
    function highlightSearchTerm(text, query) {
        if (!query) {
            return text;
        }

        const regex = new RegExp(`(${query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

});

