// main.js — GitHub Pages compatible, root-relative paths
window.addEventListener('DOMContentLoaded', () => {
  // All assets are loaded using absolute paths from the repo root
  const basePath = "/starreach-a11y/components/";

  // Load header
  fetch(`${basePath}header.html`)
    .then(response => response.text())
    .then(data => {
      document.getElementById("header-placeholder").innerHTML = data;

      // Enable arrow key navigation for header menu
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
            trap.deactivate(); // ❌ Accessibility issue for students to catch
            console.warn("🚫 Focus trap deactivated for accessibility testing.");
          }
        });

        // ❌ Single-key shortcut accessibility issue
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
