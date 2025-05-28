import { getLocalStorage} from "./utils.mjs";

export default class CheckoutProcess{

    constructor()
    {
        this.resultado = this.calculateSubTotal();
        this.tax = 0.06;
        this.subtotal = this.resultado.total;
        this.subtotalwithtax = this.resultado.total * (1 + this.tax);
        this.shipping = this.resultado.shipping;
        this.total = this.subtotalwithtax + this.shipping;

    }

    init(){
        
        const subtotalSpan = document.getElementById("subtotal");
        subtotalSpan.textContent = `Subtotal: ${this.subtotal.toFixed(2)}`;

        const tax = document.getElementById("tax");
        tax.textContent =  `Tax: ${(this.tax * 100)} "%"`;

        const shipping_estimate = document.getElementById("shipping-estimate");
        shipping_estimate.textContent = `Shipping Estimate: ${this.shipping.toFixed(2)}`;

        const orderTotal = document.getElementById("order-total");
        orderTotal.textContent = `Order Total: ${this.total.toFixed(2)}`;
    }

    calculateSubTotal(){
        const cartItems = getLocalStorage("so-cart") || [];
        let total = 0;
        let shippingTotal = 0;
        for (const item of cartItems) {
            if (item && typeof item.FinalPrice === "number") {
                if (total == 0) {
                    shippingTotal = 10;
                }
                else{
                    shippingTotal += 2;
                }
                total += item.FinalPrice;
            }
        }
         
        return {total: total, 
            shipping: shippingTotal}   
    }

}

const checkProcess = new CheckoutProcess();
checkProcess.init();


