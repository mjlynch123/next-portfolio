const searchForm = document.querySelector("#search-form")

searchForm.addEventListener("submit", (event) => {
event.preventDefault();

    const keyword = document.querySelector("#keyword").value;

    if(!keyword) {
        window.location.href = "/allPlants"
    } else {
        window.location.href = "/search/" + keyword;
    }

    
})