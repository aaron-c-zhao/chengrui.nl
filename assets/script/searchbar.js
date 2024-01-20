const searchbarInput = document.querySelector('#search');
const searchIcon = document.querySelector('.fa-search');

const handleSearchBarDisplay = (event) => {
    switch(event.type) {
        case "mouseover":
        case "focus":
            searchIcon.style.display = "none";
            break;
        default:
            if (document.activeElement.id !== 'search') {
                searchbarInput.value = "";
                searchIcon.style.display = "block";
            }
    }
};
searchbarInput.addEventListener("mouseover", handleSearchBarDisplay)
searchbarInput.addEventListener("focus", handleSearchBarDisplay)
searchbarInput.addEventListener("focusout", handleSearchBarDisplay)
searchbarInput.addEventListener("mouseleave", handleSearchBarDisplay)