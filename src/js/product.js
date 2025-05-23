import { getParam, getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

const productDetails = new ProductDetails(productID, dataSource);
productDetails.init();

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  
  const existingIndex = cartItems.findIndex(item => item.Id === product.Id);

  if (existingIndex !== 1) {
    // If exist, increase the quantity
    if (!cartItems[existingIndex].quantity) {
      cartItems[existingIndex].quantity = 1;
    }
    cartItems[existingIndex].quantity += 1;
  } else {
    // If doens't exist, only add 1 quantity
    product.quantity = 1;
    cartItems.push(product);
  }
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const id = e.target?.dataset?.id;
  if (!id) {
    // console.error("No product ID found on button click!");
    return;
  }

  const selectedProduct = await dataSource.findProductById(id);
  addProductToCart(selectedProduct);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
