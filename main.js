import * as Paths from "./paths.js";
import { populateCardDisplay, populateLogoDisplay } from "./images.js";

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image").querySelector("img");
const lightboxVideo = document.getElementById("lightbox-video").querySelector("source");

/** Templates */

const response = await fetch("templates/card.html")
const html = await response.text();
document.body.insertAdjacentHTML("beforeend", html);

/** Events */

document.querySelectorAll(".nav-link").forEach(link => {
	link.addEventListener("click", evt => {
		evt.preventDefault();
		
		if (link.classList.contains("disabled")) {
			return;
		}
		
		loadPage(link.dataset.page, "#content-frame");
	});	
});

/**	Funcs */

function setActivePage(pageName) {
	
	const links = document.querySelectorAll(".nav-link");
	
	links.forEach(element => {
		element.classList.toggle("active", element.dataset.page === pageName);
	});	
}

async function loadPage(page, targetID)
{
	const response = await fetch(`${Paths.PAGE_DIR}${page}.html`);
	
	
	const html = await response.text();
	document.querySelector(targetID).innerHTML = html;
	setActivePage(page);
	
	
	document.querySelectorAll(".logo-display").forEach(display =>{
		populateLogoDisplay(display);
	});

	document.querySelectorAll(".card-display").forEach(display => {
		populateCardDisplay(display);
	});
}


/**	Main */

loadPage("sidebar", "#sidebar");
loadPage("main", "#content-frame");
