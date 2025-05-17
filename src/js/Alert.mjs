export default class Alert {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
    }

    async showAlerts() {
        try {
            const response = await fetch(this.dataUrl);
            const alerts = await response.json();

            if (alerts.length > 0) {
                const alertSection = document.createElement("section");
                alertSection.classList.add("alert-list");

                alerts.forEach(alert => {
                    const p = document.createElement("p");
                    p.textContent = alert.message;
                    p.style.background = alert.background;
                    p.style.color = alert.color;
                    alertSection.appendChild(p);
                });

                const main = document.querySelector("main");
                if (main) {
                    main.prepend(alertSection);
                }
            }
        } catch (error) {
            console.error('Error loading alerts:', error);
        }
    }
}
