import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";




const dataSource = new ProductData("tents");

const listElement = document.querySelector(".product-list");

const productList = new ProductList("Tents", dataSource, listElement);


let products = [];

async function loadProducts() {
  const response = await fetch("/public/json/tents.json");
  products = await response.json();
}

loadProducts();

document.addEventListener("DOMContentLoaded", () => {
  const sortSelect = document.getElementById("sort-options");
  const productList = document.querySelector(".product-list");

  function productCardTemplate(product) {
    return `
      <li class="product-card">
        <a href="product_pages/?products=${product.Id}">
          <img src="${product.Image}" alt="${product.Name}" />
          <h3 class="card__brand">${product.Brand.Name}</h3>
          <h2 class="card__name">${product.Name}</h2>
          <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
        </a>
      </li>
    `;
  }

  function renderProductList(productsToRender) {
    productList.innerHTML = productsToRender.map(productCardTemplate).join("");
  }

  sortSelect.addEventListener("change", () => {
    const sortBy = sortSelect.value;
    let sortedProducts = [...products];

    switch (sortBy) {
      case "name-asc":
        sortedProducts.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case "name-desc":
        sortedProducts.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      case "price-asc":
        sortedProducts.sort((a, b) => a.FinalPrice - b.FinalPrice);
        break;
      case "price-desc":
        sortedProducts.sort((a, b) => b.FinalPrice - a.FinalPrice);
        break;
    }

    renderProductList(sortedProducts);
  });

  renderProductList(products);
});

productList.init();
