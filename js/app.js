const wrapper = document.querySelector(".wrapper")
const loading = document.querySelector(".loading")
const btn = document.querySelector(".more")
const category = document.querySelector(".category")
const LINK = "https://dummyjson.com"
let limitCount = 4
let offset = 1

async function getData(endpoint, count) {
    const response = await fetch(`${LINK}/${endpoint}?limit=${limitCount * count}`)
    response
        .json()
        .then(res => createProduct(res))
        .catch(err => console.log(err))
        .finally(() => {
            loading.style.display = "none"
        })
}
getData("products", offset)


function createProduct(data) {
    while (wrapper.firstChild) {
        wrapper.firstChild.remove()
    }
    data.products.forEach((product) => {
        const card = document.createElement("div")
        card.dataset.id = product.id
        card.className = "card"
        card.innerHTML = `
         <img src=${product.images[0]} class="card_image" alt="">
         <div>
           <h3>${product.title}</h3>
           <div>
              <strong>${product.price}</strong>
              <button>Buy now</button>
           </div>
         </div>
        `
        wrapper.appendChild(card)
    });
}



async function getCategory(endpoint) {
    const response = await fetch(`${LINK}/${endpoint}`)
    response
        .json()
        .then(res => createCategory(res))
}
getCategory("products/category-list")

let categoryType = "products"
function createCategory(data) {
    data.forEach((item) => {
        const liEl = document.createElement("li")
        const dataEl = document.createElement("data")
        liEl.className = "category_item"
        dataEl.innerHTML = item
        dataEl.setAttribute("value", `/category/${item}`)
        dataEl.addEventListener("click", (e) => {
            categoryType = "products/" + e.target.value
            getData(categoryType, offset)
        })

        liEl.appendChild(dataEl)
        category.appendChild(liEl)
    })
}

btn.addEventListener("click", () => {
    offset++
    getData(categoryType, offset)
})
wrapper.addEventListener("click", (e) => {
    if (e.target.className === "card_image") {
        let id = e.target.closest(".card").dataset.id

        open(`/pages/product.html?q=${id}`, "_self")
    } else {
        console.log("boshqa joy");
    }
})