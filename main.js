(function () {
  const views = {
    home: document.getElementById("view-home"),
  };

  document.querySelectorAll("[id^='view-highlight-']").forEach((element) => {
    views[element.id.replace("view-", "")] = element;
  });

  const navLinks = document.querySelectorAll("[data-view]");

  function setActiveNav(viewId) {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.view === viewId);
    });
  }

  function showView(viewId, scrollTarget) {
    Object.entries(views).forEach(([id, element]) => {
      if (!element) return;
      element.hidden = id !== viewId;
    });

    setActiveNav(viewId);
    window.scrollTo(0, 0);

    if (viewId === "home" && scrollTarget) {
      const target = document.querySelector(scrollTarget);
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    }
  }

  function viewFromHash() {
    const hash = window.location.hash;
    if (!hash) return "home";
    const viewId = hash.slice(1);
    return views[viewId] ? viewId : "home";
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const viewId = link.dataset.view;
      if (!viewId || !views[viewId]) return;

      event.preventDefault();
      const scrollTarget =
        viewId === "home" && link.getAttribute("href")?.startsWith("#")
          ? link.getAttribute("href")
          : null;

      const href = link.getAttribute("href");
      if (viewId === "home" && href === "index.html") {
        history.pushState(null, "", "index.html");
      } else if (href?.startsWith("#")) {
        history.pushState(null, "", href);
      }

      showView(viewId, scrollTarget);
    });
  });

  window.addEventListener("popstate", () => {
    const viewId = viewFromHash();
    const hash = window.location.hash;
    const scrollTarget = viewId === "home" && hash ? hash : null;
    showView(viewId, scrollTarget);
  });

  const initialView = viewFromHash();
  if (initialView !== "home") {
    showView(initialView, null);
  }

  const profilePhotoWrap = document.querySelector(".profile-photo-wrap");
  if (profilePhotoWrap) {
    profilePhotoWrap.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
    profilePhotoWrap.addEventListener("dragstart", (event) => {
      event.preventDefault();
    });
  }
})();
