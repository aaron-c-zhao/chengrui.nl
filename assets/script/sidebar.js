import { readTags, alterActiveTags } from "./tag-util.js";

document.addEventListener('DOMContentLoaded', function() {
    const sessionStorage = window.sessionStorage;
    let tags = document.querySelectorAll('.sidebar--tags > .post--tag');

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
        tag.addEventListener('click', () => alterActiveTags(sessionStorage, tag.textContent));
    }
});
