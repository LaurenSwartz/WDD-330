
import { getLocalStorage, alertMessage} from "./utils.mjs";

export class CheckoutProcess {
    constructor() {
        this.baseURL = import.meta.env.VITE_SERVER_URL;
        this.resultado = this.calculateSubtotal();
        this.tax = 0.06;
        this.subtotal = this.resultado.total;
        this.subtotalwithtax = this.resultado.total * (1 + this.tax);
        this.shipping = this.resultado.shipping;
        this.total = this.subtotalwithtax + this.shipping;
    }

    
    init(){
        
        const subtotalSpan = document.getElementById("subtotal");
        subtotalSpan.textContent = this.subtotal.toFixed(2);

        const tax = document.getElementById("tax");
        tax.textContent =  (this.tax * 100) + "%";

        const shipping_estimate = document.getElementById("shipping-estimate");
        shipping_estimate.textContent = this.shipping.toFixed(2);

        const orderTotal = document.getElementById("order-total");
        orderTotal.textContent = this.total.toFixed(2);

        const checkoutButton = document.getElementById("checkout-button");
        if (checkoutButton){
            checkoutButton.addEventListener("click", (e) => {
                e.preventDefault();
                const cartItems = getLocalStorage("so-cart") || [];
                this.packageItens(cartItems)});
        }

    }

    groupCartItems(cartItems) {
        const groupedItems = {}; // Usaremos um objeto para agrupar, onde as chaves serão os IDs dos produtos

        for (const item of cartItems) {
            // Verifica se o item e seu ID existem
            if (item && item.Id) {
                // Se o item (com este ID) já foi adicionado ao nosso objeto agrupado
                if (groupedItems[item.Id]) {
                    // Apenas incrementa a quantidade
                    groupedItems[item.Id].quantity++;
                } else {
                    // Se é a primeira vez que encontramos este item, adicione-o
                    // Certifique-se de pegar as propriedades corretas do seu item original (Name, FinalPrice)
                    groupedItems[item.Id] = {
                        id: item.Id,
                        name: item.Name,       // Supondo que 'Name' seja o nome do produto no item original
                        price: item.FinalPrice, // Supondo que 'FinalPrice' seja o preço do produto
                        quantity: 1            // Começa com 1, pois é a primeira vez que o encontramos
                    };
                }
            }
        }

        // Após varrer todos os itens, converta o objeto agrupado de volta para um array de valores.
        // Isso transforma { "id1": {itemObject1}, "id2": {itemObject2} } em [ {itemObject1}, {itemObject2} ]
        return Object.values(groupedItems);
    }

    packageItens(cartItems)
    {
        const date = new Date().toISOString();
        const fname = document.getElementById("first-name");
        const lname = document.getElementById("last-name");
        const street = document.getElementById("street-address");
        const city = document.getElementById("city");
        const state = document.getElementById("state");
        const zipcode = document.getElementById("zip-code");
        const cardNumber = document.getElementById("card-number");
        const expiration = document.getElementById("expiration-date");
        const code = document.getElementById("security-code");
    

        let isValid = true;

        if (!fname.value.trim()) {
            isValid = false;
            fname.classList.add("is-invalid");
            alertMessage("The 'First Name' field is required.", false, "error", 0); 
        }
            
        if (!lname.value.trim()) {
            isValid = false;
            lname.classList.add("is-invalid");
            alertMessage("The 'Last Name' field is required.", false, "error", 0);
        }

        if (!street.value.trim()) {
            isValid = false;
            street.classList.add("is-invalid");
            alertMessage("The 'Street Address' field is required.", false, "error", 0);
        }

        if (!city.value.trim()) {
            isValid = false;
            city.classList.add("is-invalid");
            alertMessage("The 'City' field is required.", false, "error", 0);
        }

        if (!state.value.trim()) {
            isValid = false;
            state.classList.add("is-invalid");
            alertMessage("The 'State' field is required.", false, "error", 0);
        }

        if (!zipcode.value.trim()) {
            isValid = false;
            zipcode.classList.add("is-invalid");
            alertMessage("The 'Zip Code' field is required.", false, "error", 0);
        }

        if (!cardNumber.value.trim() || cardNumber.value.trim().length < 16) {
            isValid = false;
            cardNumber.classList.add("is-invalid");
            alertMessage("The 'Card Number' field is invalid. It must be 16 digits.", false, "error", 0);
        }

        if (!expiration.value.trim()) {
            isValid = false;
            expiration.classList.add("is-invalid");
            alertMessage("The 'Expiration Date' field is required.", false, "error", 0);
        }

        if (!code.value.trim() || code.value.trim().length < 3) {
            isValid = false;
            code.classList.add("is-invalid");
            alertMessage("The 'Security Code' field is invalid. It must be at least 3 digits.", false, "error", 0);
        }

        // If any validation failed, stop execution
        if (!isValid) {
            // Optionally, if you want a general message AND individual ones, you can add one here.
            // For example: alertMessage("Please correct the highlighted errors.", true, "info", 5000);
            
            // Ensure the scroll to top happens only once if any alert is shown
            window.scrollTo({ top: 0, behavior: "smooth" }); 
            return; // Stops function execution
        }

        const items = this.groupCartItems(cartItems);

        

        const checkoutJson = `{
            "orderDate": "${date}",
            "fname": "${fname.value}",
            "lname": "${lname.value}",
            "street": "${street.value}",
            "city": "${city.value}",
            "state": "${state.value}",
            "zip": "${zipcode.value}",
            "cardNumber": "${cardNumber.value}",
            "expiration": "${expiration.value}",
            "code": "${code.value}",
            "items": ${JSON.stringify(items)},
            "orderTotal": "${this.total.toFixed(2)}",
            "shipping": "${this.shipping.toFixed(2)}", 
            "tax": "${(this.total * this.tax).toFixed(2)}"
        }`;
        this.sendOrderToBackend(checkoutJson);
        
    }

    

    calculateSubtotal() {
        
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

    // --- Função para enviar o pedido ---
    async sendOrderToBackend(orderData) {
        try {
            const response = await fetch(`${this.baseURL}checkout`, {
                method: "POST", // Definindo o método HTTP como POST
                headers: {
                    "Content-Type": "application/json" // Informando ao servidor que estamos enviando JSON
                    // Se precisar de autenticação, adicione aqui:
                    // 'Authorization': 'Bearer SEU_TOKEN_AQUI'
                },
                body: orderData // Converte o objeto JS para uma string JSON
            });

            // Verifica se a resposta da requisição foi bem-sucedida (status 2xx)
            if (response.ok) {
                const result = await response.json(); // Se o servidor retornar JSON na resposta
                alert("Request sent successfully! Server response");
                // Aqui você pode adicionar lógica para limpar o carrinho, redirecionar o usuário, etc.
            } else {
                // Se a resposta não foi bem-sucedida (ex: 400, 404, 500)
                const errorData = await response.json(); // Tenta ler o corpo da resposta como JSON de erro
                alert(`Failed to send request: ${errorData.message || "Unknown error" }`);
            }
        } catch (error) {
            // Erros de rede (falha na conexão, URL incorreta, etc.)
            console.error("Network error or error processing request:", error);
            alert("A connection error occurred. Please check your internet and try again.");
        }
    }

        
}



const checkProcess = new CheckoutProcess();
checkProcess.init();