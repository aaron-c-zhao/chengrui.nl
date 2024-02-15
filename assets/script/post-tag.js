import { alterActiveTags } from "./tag-util.js";

const sessionStorage = window.sessionStorage;
let postTags = document.querySelectorAll('.page-content .post--tag');
for (let tag of postTags) {
    tag.addEventListener('click', () => alterActiveTags(sessionStorage, tag.textContent));
}