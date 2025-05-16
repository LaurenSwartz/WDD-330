
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
export default class productDetails{

    constructor(productId, dataSource){
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    async init(){
        // use the datasource to get details for the current product. findProductById will return a promise!  use await or .then() to process it
        // the product details are needed before rendering the Html
        
        this.product = await this.dataSource.findProductById(this.productId);
        

        // the product details are needed before rendering the HTML
        this.renderProductDetails();

        // once the HTML is rendered, add a listener to the Add to Cart button
        //Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the reading from this week on 'this' to understand why.
        document.getElementById("addToCart")
        .addEventListener("click", this,addProductToCart.bind(this));

    }

    addProductToCart() {
        // setLocalStorage("so-cart", product);
        const cartItems = getLocalStorage("so-cart") || []; // get cart array of items from local storage if null set to empty array
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails(){
        productDetailsTemplate(this.product);
    }

    // one more function to write 'productDetailsTemplate

    
}
    function productDetailsTemplate(product){
        
        document.querySelector("h2").textContent = product.Brand.Name;
        document.querySelector("h3").textContent = product.NameWithoutBrand;

        const productImage = document.getElementById("productImage");
        productImage.src = product.Image;
        productImage.alt = product.NameWithoutBrand;

        document.getElementById("productPrice").textContent = product.FinalPrice;
        document.getElementById("productColor").textContent = product.Colors[0].ColorName;
        document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimpple;

        document.getElementById("addToCart").dataset.id = product.id;

    }