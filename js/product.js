const content = document.querySelector(".content")
const LINK = "https://dummyjson.com"


async function getData() {
    let query = new URLSearchParams(window.location.search)
    let id = query.get("q")
    const response = await fetch(`${LINK}/products/${id}`)
    response
        .json()
        .then(res => createContent(res))

}
getData()

function createContent(data) {
    console.log(data);
    content.innerHTML = `
     <div>
            <img class="detail_image" src=${data.images[0]} alt="">
     </div>
     <div class="item_content">
            <p class="title">${data.title}</p>
            <p class="brend">${data.brand}</p>
            <p class="price">${data.price} USD</p>
            <p class="categorys">${data.category}</p>
            <p class="stock">${data.stock}</p>
            <p class="descrip">${data.description}</p>
     </div>
    `
}

