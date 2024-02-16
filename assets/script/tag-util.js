
    const itemName = 'activatedTags';

    // read active tags from session storage
    export function readTags(sessionStorage) {
        let tags = sessionStorage.getItem(itemName);
        if (!tags) {
            return [];
        }
        tags = tags.split(' ').filter(v => v);
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

    const isTagActivated = function(activatedTags, tag) {
        return activatedTags && activatedTags.indexOf(tag.textContent) >= 0;
    }

    export function displayTags(sessionStorage, allTags) {
        let tagContainer = document.querySelector('.tag--all');
        let children = Array.from(tagContainer.children);

        // remove all tag element from tag container
        // to achieve dynamic sorting
        for (let child of children) {
            tagContainer.removeChild(child);
            console.log(child)
        }
        
        // sort the tags by whether it's activated
        let activatedTags = sessionStorage.getItem(itemName);
        let sortedTags = Array.from(allTags);
        sortedTags.sort((a, b) => {
            if (isTagActivated(activatedTags, a) && !isTagActivated(activatedTags, b)) {
                return -1;
            }
            else if (!isTagActivated(activatedTags, a) && isTagActivated(activatedTags, b)) {
                return 1;
            }
            else return 0;
        });
        
        // add back all tags 
        for (let tag of sortedTags) {
            let tagSpan = document.createElement('span');
            tagSpan.innerHTML = tag.textContent;
            tagSpan.classList.add('post--tag');

            if (isTagActivated(activatedTags, tag)) {
                tagSpan.classList.add('post--tag__active');
            }
            tagSpan.addEventListener('click', () => alterActiveTags(sessionStorage, tag.textContent))

            tagContainer.appendChild(tagSpan);
        }
        
    }

    // display posts with active tags
    export function displayPostsWithTags(sessionStorage) {
        let allPosts = document.querySelectorAll('li.tagposts--link');
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