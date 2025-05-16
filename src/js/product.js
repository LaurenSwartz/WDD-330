//import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import productDetails from "./ProductDetails.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new productDetails(productId, dataSource);
product.init();

/* for testing
const dataSource = new ProductData("tents");
const productId = getParam("product");
console.log(dataSource.findProductById(productId));
*/

/* MOVED TO ProductDetails.mjs
function addProductToCart(product) {
 // setLocalStorage("so-cart", product);
  const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}

*/
// add to cart button event handler
//async function addToCartHandler(e) {
// const product = await dataSource.findProductById(e.target.dataset.id);
//  addProductToCart(product);
//}

// add listener to Add to Cart button
//document.getElementById("addToCart").addEventListener("click", addToCartHandler);
