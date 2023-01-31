const socket = io();

let products = document.querySelector('.bigContainer');

socket.on('updatedProduct', (data) => {
  products.innerHTML = "";

  createHtml(data);
});

socket.on('deletedProducts', (data) => {
  products.innerHTML = "";

  createHtml(data);
})

const createHtml = (data) => {
  return data.length
    ? data.map((product) => {
        products.innerHTML += 
          `<div class="productCards">
            <img class="productImage" src="${product.thumbnail}"></img>
            <div class="textCardsContainer">
              <h2 class="cardsTexts cardTitle">${product.title}</h2>
              <h3 class="cardsTexts cardVolume">${product.volume}</h3>
              <h4 class="cardsTexts cardEditorial">${product.editorial}</h4>
              <h5 class="cardsTexts cardAuthor">${product.author}</h5>
              <h5 class="cardsTexts cardPrice"><b>$${product.price}</b></h5>
              <p class="cardsTexts cardStock">${product.stock} unidades</p>
              <button class="seeMoreButton"><a class="seeMoreAnchor" href="">VER MÁS</a></button>
            </div>
          </div>`
        ;
      })
    : (products.innerHTML += 
        `<div class="productCards">
          <img class="productImage" src="${data.thumbnail}"></img>
          <div class="textCardsContainer">
            <h2 class="cardsTexts cardTitle">${data.title}</h2>
            <h3 class="cardsTexts cardVolume">${data.volume}</h3>
            <h4 class="cardsTexts cardEditorial">${data.editorial}</h4>
            <h5 class="cardsTexts cardAuthor">${data.author}</h5>
            <h5 class="cardsTexts cardPrice"><b>$${data.price}</b></h5>
            <p class="cardsTexts cardStock">${data.stock} unidades</p>
            <button class="seeMoreButton"><a class="seeMoreAnchor" href="">VER MÁS</a></button>
          </div>
        </div>`
      );
};