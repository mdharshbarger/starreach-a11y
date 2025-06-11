// main.js — Loads header, footer, and modal with adaptive paths
window.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const basePath = path.includes("missions-pages") ? "../components/" : "components/";
  const jsBase = path.includes("missions-pages") ? "../js/" : "js/";

  // Load header
  fetch(`${basePath}header.html`)
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;

      // Add keyboard navigation to nav menu items
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
  fetch(`${basePath}footer.html`)
    .then(response => response.text())
    .then(data => {
      document.getElementById("footer-placeholder").innerHTML = data;
    });

  // Load contact modal
  fetch(`${basePath}contact-modal.html`)
    .then(response => response.text())
    .then(html => {
      document.getElementById("modal-container").innerHTML = html;

      const modal = document.getElementById('contactModal');
      if (modal) {
        modal.addEventListener('shown.bs.modal', () => {
          const trap = bootstrap?.Modal?.getInstance(modal)?._focustrap;
          if (trap && typeof trap.deactivate === "function") {
            trap.deactivate(); // ❌ Deliberately disabling for accessibility demo
            console.warn("🚫 Focus trap deactivated for accessibility testing.");
          }
        });

        // ❌ Accessibility issue: single-key shortcut without opt-out
        document.addEventListener('keydown', (e) => {
          if (e.key === 's') {
            const modalInstance = new bootstrap.Modal(modal);
            modalInstance.show();
            console.warn("⚠️ Modal opened via single-key shortcut (accessibility violation).");
          }
        });
      }
    });
});
