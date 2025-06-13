// Load reusable components and fix paths
const basePath = window.componentBasePath || "components/";

const loadComponent = async (id, file) => {
  try {
    const response = await fetch(basePath + file);
    if (response.ok) {
      const html = await response.text();
      document.getElementById(id).innerHTML = html;
    }
  } catch (error) {
    console.error("Error loading", file, error);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("header-placeholder", "header.html");
  await loadComponent("footer-placeholder", "footer.html");
  await loadComponent("modal-container", "contact-modal.html");
  fixHeaderFooterLinks();
});

// Fix relative paths dynamically for both root and subpages
function fixHeaderFooterLinks() {
  const inSubfolder = window.location.pathname.includes("/services/") || window.location.pathname.includes("/missions-pages/");
  const prefix = inSubfolder ? "../" : "";

  // Fix <header> links and images
  document.querySelectorAll("header a[href]").forEach(el => {
    const href = el.getAttribute("href");
    if (!href.startsWith("http") && !href.startsWith("#")) {
      el.setAttribute("href", prefix + href.replace(/^(\.\.\/)?/, ""));
    }
  });

  document.querySelectorAll("header img[src]").forEach(el => {
    const src = el.getAttribute("src");
    if (!src.startsWith("http")) {
      el.setAttribute("src", prefix + src.replace(/^(\.\.\/)?/, ""));
    }
  });

  // Fix <footer> links and images
  document.querySelectorAll("footer a[href]").forEach(el => {
    const href = el.getAttribute("href");
    if (!href.startsWith("http") && !href.startsWith("#")) {
      el.setAttribute("href", prefix + href.replace(/^(\.\.\/)?/, ""));
    }
  });

  document.querySelectorAll("footer img[src]").forEach(el => {
    const src = el.getAttribute("src");
    if (!src.startsWith("http")) {
      el.setAttribute("src", prefix + src.replace(/^(\.\.\/)?/, ""));
    }
  });
}
