const currentPage = location.pathname
const menuItems = window.document.querySelectorAll("header .links a")
for (item of menuItems) {
    if(currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}
