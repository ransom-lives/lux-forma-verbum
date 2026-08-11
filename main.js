import * as Paths from "./paths.js";
import { populateCardDisplay, populateLogoDisplay } from "./images.js";

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image").querySelector("img");

/**
	Data
**/

const images = [
	{
		name: "ig_quintent_promo.png",
		title: "Indigo Gaming - Quintet",
		caption: "Indigo Gaming Quintent documentary key image."
	},
	{
		name: "samus.png",
		title: "Samus Aran",
		caption: "Samus Aran."
	},
	{
		name: "twin_perfect.png",
		title: "Twin Perfect",
		caption: "Twin Perfect promo image."
	}
]

/**
	
**/

const pageStrats = {
	
	"main": {
		init()
		{
			document.querySelectorAll(".logo-display").forEach(display =>{
				populateLogoDisplay(display);
			});
		}
	},
	
	"2d": {
		init()
		{
			document.querySelectorAll(".card-display").forEach(display => {
				populateCardDisplay(display);
			});
		}
	},
	
}


/**
	Templates
**/

const response = await fetch("templates/card.html")
const html = await response.text();
document.body.insertAdjacentHTML("beforeend", html);


/**
	Events
**/

document.querySelectorAll(".nav-link").forEach(link => {
	link.addEventListener("click", evt => {
		evt.preventDefault();
		
		if (link.classList.contains("disabled")) {
			return;
		}
		
		loadPage(link.dataset.page, "#content-frame");
	});	
});

lightboxImage.onload = () => {
	
	lightbox.classList.remove("hidden");
	
	lightboxImage.classList.remove("reveal");
	void lightboxImage.offsetWidth;
	lightboxImage.classList.add("reveal");
};

document.addEventListener("click", (evt) => {
	
	const card = event.target.closest(".card");
	
	if (!card)
	{
		return;
	}
	
	lightbox.classList.add("hidden");
	lightboxImage.src = card.dataset.imagePath;
});


lightbox.addEventListener("click", (evt) =>{
	
	lightbox.classList.add("hidden");
	
});

/**
	Funcs
**/

function prepareImages() {
	
	document.querySelectorAll(".clickable-image").forEach(image => {
	
	const imageName = image.dataset.imageName;
	const thumbnailPath = `${Paths.THUMBS_DIR}${imageName}`
	const artPath = `${Paths.ART_DIR}${imageName}`
	
	image.src = artPath;
	
	});
}

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
	setActivePage(page)
	
	//pageStrats[page]?.init();
	
	document.querySelectorAll(".logo-display").forEach(display =>{
		populateLogoDisplay(display);
	});

	document.querySelectorAll(".card-display").forEach(display => {
		populateCardDisplay(display);
	});
}


/**
	Main
**/

loadPage("sidebar", "#sidebar");
loadPage("main", "#content-frame");
