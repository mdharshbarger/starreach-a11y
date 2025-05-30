window.addEventListener('DOMContentLoaded', () => {
  // Load header
  fetch("/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;

      // Enable keyboard arrow navigation
      const waitForMenu = setInterval(() => {
        const menuItems = document.querySelectorAll('[role="menuitem"]');
        if (menuItems.length > 0) {
          clearInterval(waitForMenu);
          menuItems.forEach((item, index) => {
            item.addEventListener('keydown', (e) => {
              if (e.key === 'ArrowRight') {
                menuItems[(index + 1) % menuItems.length].focus();
              } else if (e.key === 'ArrowLeft') {
                menuItems[(index - 1 + menuItems.length) % menuItems.length].focus();
              }
            });
          });
        }
      }, 50);
    });

  // Load footer
  fetch("/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });

  // Load contact modal
  fetch("/contact-modal.html")
    .then(response => response.text())
    .then(html => {
      document.getElementById("modal-container").innerHTML = html;

      const modal = document.getElementById('contactModal');
      if (modal) {
        modal.addEventListener('shown.bs.modal', () => {
          const trap = bootstrap?.Modal?.getInstance(modal)?._focustrap;
          if (trap && typeof trap.deactivate === "function") {
            trap.deactivate();
            console.warn("🚫 Focus trap deactivated for accessibility testing.");
          } else {
            console.warn("⚠️ Could not find focus trap to deactivate.");
          }
        });
      }
    });
});
