const menuButton = document.querySelector(".menu-button");
function toggleMenu() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);

function handleResize() {
    const menu = document.querySelector(".menu");
    if (window.innerWidth > 1000) {
      menu.classList.remove("hide");
    } else {
      menu.classList.add("hide");
    }
  }
  
  handleResize();
  window.addEventListener("resize", handleResize);

function viewerTemplate(pic, alt) {
    return `<div class="viewer">
      <button class="close-viewer">X</button>
      <img id="bigboy" src="${pic}" alt="${alt}">
      </div>`;
}

function viewHandler(event) {
  let thingClicked = event.target;
  let src = thingClicked.getAttribute("src");
  let srcParts = src.split("-");
  let newSrc = srcParts[0] + "-full.jpeg";
  document.body.insertAdjacentHTML("afterbegin", viewerTemplate(newSrc, "large image."));
  function closeViewer() {
    let removeableDiv = document.querySelector(".viewer");
    removeableDiv.remove();
  }
  const x = document.querySelector(".close-viewer");
  x.addEventListener("click", closeViewer);
}
let imageClicked = document.querySelector(".gallery");
imageClicked.addEventListener("click", viewHandler);

