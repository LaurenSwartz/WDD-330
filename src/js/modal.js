document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("registerModal");
    const closeBtn = document.querySelector(".modal .close");

    // Check if the user has already seen the modal
    const hasSeenModal = localStorage.getItem("hasSeenRegisterModal");

    if (!hasSeenModal) {
         // Show modal
        modal.style.display = "block";

        // Mark as seen
        localStorage.setItem("hasSeenRegisterModal", "true");
    }

      // Close modal when clicking the X
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close when clicking outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});