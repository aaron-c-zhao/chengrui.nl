window.addEventListener('load', function() {
        const sessionStorage = window.sessionStorage;

    const read_tags = function() {
        let tags = sessionStorage.getItem('activatedTags');
        tags = tags.split(',');
        console.log(tags);
        return tags;
    }

    const selected_posts = function() {
        const tmpResult = read_tags()
            .map(v => v.toLowerCase())
            .map(v => document.querySelectorAll('li.post--tag__' + v));
        let elements = new Set();
        for (t of tmpResult) {
            elements = new Set([...elements, ...t]);
        }
        return elements;
    }

    const display_posts_with_tags = function() {
        const elements = selected_posts();
        for (e of elements) {
            e.style.display = 'list-item';
        }
    }

    display_posts_with_tags();
});