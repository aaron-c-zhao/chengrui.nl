const navCheckbox = document.getElementById("nav-trigger");
const sidebar = document.getElementById("sidebar");


const navButtonHandler = (event) => {
    if (navCheckbox.checked) {
        sidebar.classList.add("nav--sidebar__active");
    }
    else {
        sidebar.classList.remove('nav--sidebar__active');
    }
};

navCheckbox.addEventListener("change", navButtonHandler);