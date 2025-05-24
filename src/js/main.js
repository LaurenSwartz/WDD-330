import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

checkForDiscounts();

async function checkForDiscounts() {
  const baseURL = import.meta.env.VITE_SERVER_URL;

  try {
    const response = await fetch(`${baseURL}products`);
    const data = await response.json();
    const products = data.Result;

    const discounted = products.some(
      (p) => p.FinalPrice < p.SuggestedRetailPrice,
    );

    if (discounted) {
      showDiscountMessage();
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

function showDiscountMessage() {
  const missionDiv = document.querySelector(".mission");
  const discountMessage = document.createElement("p");
  discountMessage.classList.add("discount-hero-msg");
  discountMessage.innerHTML = `🎉 Many items now <strong>on sale</strong>! Check out the savings inside.`;

  missionDiv.appendChild(discountMessage);
}
