document.addEventListener('DOMContentLoaded', function() {
    const sessionStorage = window.sessionStorage;
    let tags = document.querySelectorAll('.sidebar--tags > .post--tag');
    for (let tag of tags) {
        tag.addEventListener('click', function() {
            let activatedTags = sessionStorage.getItem('activatedTags');
            if (!activatedTags) {
                activatedTags = tag.textContent;
            }
            if (activatedTags.indexOf(tag.textContent) < 0) {
                activatedTags = activatedTags.concat(',', tag.textContent);
            }
            sessionStorage.setItem('activatedTags', activatedTags);
        });
    }
});
