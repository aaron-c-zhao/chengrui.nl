import { displayPostsWithTags } from "./tag-util.js";

document.addEventListener('DOMContentLoaded', function() {
    const sessionStorage = window.sessionStorage;


    window.addEventListener('load', () => displayPostsWithTags(sessionStorage));
    window.addEventListener('tagClicked', () => displayPostsWithTags(sessionStorage));
});

//TODO: display style change when tag actiavetd
//TODO: allow tags in the posts to be clickable too