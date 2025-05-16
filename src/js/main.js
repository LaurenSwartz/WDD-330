import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs"

const element = document.querySelector(".product-list");
const dataSource = new ProductData("tents");
const productList = new ProductList("Tents", dataSource, element);

productList.init();
