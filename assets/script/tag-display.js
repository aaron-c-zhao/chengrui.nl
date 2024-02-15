import { displayPostsWithTags, clearSessionStorage } from "./tag-util.js";

document.addEventListener('DOMContentLoaded', function() {
    const sessionStorage = window.sessionStorage;

    window.addEventListener('load', () => displayPostsWithTags(sessionStorage));
    window.addEventListener('tagClicked', () => displayPostsWithTags(sessionStorage));
    window.addEventListener('beforeunload', () => clearSessionStorage(sessionStorage));
});
