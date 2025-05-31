// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function alertMessage(message, scroll = true, type = "error", duration = 5000) {
    const alertContainer = document.getElementById("alert-container");
    
    
    // Verifica se o container existe
    if (!alertContainer) {
        console.error("Element #alert-container not found in DOM. The alert cannot be displayed.");
        return;
    }
    const computedStyle = window.getComputedStyle(alertContainer);
    if (computedStyle.display === "none") {
        alertContainer.style.display = "flex";
    }


    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert");

    // Adiciona a classe de tipo para estilização
    if (type === "success") {
        alertDiv.classList.add("success");
    } else if (type === "info") {
        alertDiv.classList.add("info");
    } else { // Padrão é "error"
        alertDiv.classList.add("error");
    }

    // Cria o elemento da mensagem
    const messageSpan = document.createElement("span");
    messageSpan.classList.add("alert-message");
    messageSpan.textContent = message;
    alertDiv.appendChild(messageSpan);

    // Cria o botão de fechar (o "X")
    const closeButton = document.createElement("button");
    closeButton.classList.add("alert-close");
    closeButton.textContent = "X";
    closeButton.setAttribute("aria-label", "Close Alert"); // Acessibilidade
    alertDiv.appendChild(closeButton);

    // Adiciona o alerta ao container
    alertContainer.appendChild(alertDiv);

    // Lógica para fechar o alerta
    const closeAlert = () => {
        alertDiv.style.animation = "fadeOutUp 0.3s ease-out forwards";
        // Remove o elemento do DOM após a animação de fade-out
        alertDiv.addEventListener("animationend", () => {
            alertDiv.remove();
        }, { once: true }); // Executa o listener apenas uma vez
    };

    // Adiciona evento de clique ao botão "X"
    closeButton.addEventListener("click", closeAlert);

    // Fecha o alerta automaticamente após a duração especificada
    if (duration > 0) {
        setTimeout(closeAlert, duration);
    }

    // Rola para o topo da página se scroll for true
    if (scroll) {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}