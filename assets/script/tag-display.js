import { displayPostsWithTags, clearSessionStorage, displayTags } from "./tag-util.js";

document.addEventListener('DOMContentLoaded', function() {
    const sessionStorage = window.sessionStorage;
    const allTags = new Set(document.querySelectorAll('.post--tag'));

    window.addEventListener('load', function() {
        displayPostsWithTags(sessionStorage);
        displayTags(sessionStorage, allTags);
    });
    window.addEventListener('tagClicked', function() {
        displayPostsWithTags(sessionStorage);
        displayTags(sessionStorage, allTags);
    });
    window.addEventListener('beforeunload', () => clearSessionStorage(sessionStorage));
});
