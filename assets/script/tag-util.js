
    const itemName = 'activatedTags';

    // read active tags from session storage
    export function readTags(sessionStorage) {
        let tags = sessionStorage.getItem(itemName);
        if (!tags) {
            return [];
        }
        tags = tags.split(' ').filter(v => v);
        
        console.log(tags);
        return tags;
    }

    // retrieve posts with active tags
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

    // display posts with active tags
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


    export function redirectToTagPage() {
        if (!window.location.href.endsWith('/tag/')) {
            window.location.href = '/tag/';
        };
    }

    const setSessionStorage = function(content) {
        sessionStorage.setItem(itemName, content);
        window.dispatchEvent(new Event("tagClicked"));
    }


    export function alterActiveTags(sessionStorage, tagContent) {
        let activatedTags = sessionStorage.getItem(itemName);
        if (!activatedTags) {
            setSessionStorage(tagContent);
            redirectToTagPage();
            return;
        }
        // when there is active tags, and the current one is not in them
        // put the current tag at the end of stored text 
        let index = activatedTags.indexOf(tagContent);
        if (index < 0) {
            activatedTags = activatedTags.concat(' ', tagContent);
            redirectToTagPage();
        }
        else {
            // if current tag was activated, then deactivate it by deleting it from session sotrage
            activatedTags = activatedTags.replace(tagContent, '').trim();
        }
        setSessionStorage(activatedTags);
    }

    export function clearSessionStorage(sessionStorage) {
        sessionStorage.removeItem(itemName);
    }