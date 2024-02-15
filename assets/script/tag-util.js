
    export function readTags(sessionStorage) {
        let tags = sessionStorage.getItem('activatedTags');
        if (!tags) {
            return [];
        }
        tags = tags.split(' ').filter(v => v);
        
        console.log(tags);
        return tags;
    }

    const selectedPosts = function(sessionStorage) {
        const tmpResult = readTags(sessionStorage)
            .map(v => v.toLowerCase())
            .map(v => document.querySelectorAll('li.post--tag__' + v));
        let elements = new Set();
        for (let t of tmpResult) {
            elements = new Set([...elements, ...t]);
        }
        return elements;
    }

    export function displayPostsWithTags(sessionStorage) {
        let allPosts = document.querySelectorAll('li.tagposts--link');
        console.log(allPosts);
        let elements = selectedPosts(sessionStorage);
        for (let p of allPosts) {
            if (elements.has(p)) {
                p.style.display = 'list-item';
            }
            else {
                p.style.display = 'none';
            }
        }
    }