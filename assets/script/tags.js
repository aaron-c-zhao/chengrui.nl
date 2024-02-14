document.addEventListener('DOMContentLoaded', function() {
    const sessionStorage = window.sessionStorage;
    const readTags = function() {
        let tags = sessionStorage.getItem('activatedTags');
        if (!tags) {
            return [];
        }
        tags = tags.split(' ').filter(v => v);
        
        console.log(tags);
        return tags;
    }

    const selectedPosts = function() {
        const tmpResult = readTags()
            .map(v => v.toLowerCase())
            .map(v => document.querySelectorAll('li.post--tag__' + v));
        let elements = new Set();
        for (t of tmpResult) {
            elements = new Set([...elements, ...t]);
        }
        return elements;
    }

    const displayPostsWithTags = function() {
        let allPosts = document.querySelectorAll('li.tagposts--link');
        console.log(allPosts);
        let elements = selectedPosts();
        for (p of allPosts) {
            if (elements.has(p)) {
                p.style.display = 'list-item';
            }
            else {
                p.style.display = 'none';
            }
        }
    }


    window.addEventListener('load', displayPostsWithTags);
    window.addEventListener('tagClicked', displayPostsWithTags);
});