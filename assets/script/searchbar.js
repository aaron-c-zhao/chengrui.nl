const searchbarInput = document.querySelector('#search');
const searchIcon = document.querySelector('.fa-search');

const handleSearchBarAction = (event) => {
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

searchbarInput.addEventListener("mouseover", handleSearchBarAction)
searchbarInput.addEventListener("focus", handleSearchBarAction)
searchbarInput.addEventListener("focusout", handleSearchBarAction)
searchbarInput.addEventListener("mouseleave", handleSearchBarAction)
