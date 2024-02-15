import { readTags } from "./tag-util.js";

document.addEventListener('DOMContentLoaded', function() {
    const sessionStorage = window.sessionStorage;
    let tags = document.querySelectorAll('.sidebar--tags > .post--tag');

    const setSessionStorage = function(content) {
        sessionStorage.setItem('activatedTags', content);
        window.dispatchEvent(new Event("tagClicked"));
    }

    const tagActiveClassName = 'post--tag__active';

    const displayTagActiveStyle = function() {
        let tagNames = new Set(readTags(sessionStorage));
        for (let tag of tags) {
            if (tagNames.has(tag.textContent)) {
                tag.classList.add(tagActiveClassName);
            }
            else {
                tag.classList.remove(tagActiveClassName)
            }
        }
    }

    window.addEventListener('load', displayTagActiveStyle);
    window.addEventListener('tagClicked', displayTagActiveStyle);
    
    for (let tag of tags) {
        tag.addEventListener('click', function() {
            let activatedTags = sessionStorage.getItem('activatedTags');
            // when session storage is empty, set the current tag to be initial value
            if (!activatedTags) {
                setSessionStorage(tag.textContent);
                return;
            }
            // when there is active tags, and the current one is not in them
            // put the current tag at the end of stored text 
            let index = activatedTags.indexOf(tag.textContent);
            if (index < 0) {
                activatedTags = activatedTags.concat(' ', tag.textContent);
            }
            else {
                // if current tag was activated, then deactivate it by deleting it from session sotrage
                let toBeRemovedStr = tag.textContent;
                activatedTags = activatedTags.replace(toBeRemovedStr, '').trim();
            }
            setSessionStorage(activatedTags);
        });
    }
});
