import * as Paths from "./paths.js";

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image").querySelector("img");
const lightboxVideo = document.getElementById("lightbox-video").querySelector("video");
const lightboxCaption = document.getElementById("caption-panel").querySelector(".panel-c");

/** DATA **/

const Media = Object.freeze(
{
	IMAGE: "image",
	VIDEO: "video"
});

const MEDIA_DATA = await loadMediaData();

const companies = [
	{
		name: "enduring_games",
		title: "Enduring Games",
		type: Media.IMAGE
	},
	{
		name: "azra_games",
		title: "Azra Games",
		type: Media.IMAGE
	},
	{
		name: "wayforward",
		title: "Wayforward",
		type: Media.IMAGE
	},
	{
		name: "gearbox",
		title: "Gearbox",
		type: Media.IMAGE
	},
	{
		name: "farbridge",
		title: "FarBridge",
		type: Media.IMAGE
	},
	{
		name: "sega",
		title: "Sega",
		type: Media.IMAGE
	},
	{
		name: "hyperkinetic",
		title: "Hyperkinetic",
		type: Media.IMAGE
	},
	{
		name: "crunchy",
		title: "Crunchy Games",
		type: Media.IMAGE
	},
	{
		name: "gaia_online",
		title: "Gaia Online",
		type: Media.IMAGE
	},
	{
		name: "lab_zero_games",
		title: "Lab Zero Games",
		type: Media.IMAGE
	},
	{
		name: "reverge_labs",
		title: "Reverge Labs",
		type: Media.IMAGE
	},
	{
		name: "gorilla_systems_corp",
		title: "Gorilla Systems Corp",
		type: Media.IMAGE
	}
]
companies.forEach(logo =>{
	logo.name = `${Paths.COMPANIES_DIR}${logo.name}.png`;
});

const platforms = [
	{
		name: "nintendo_switch_2",
		title: "Nintendo Switch 2",
		type: Media.IMAGE
	},
	{
		name: "nintendo_switch",
		title: "Nintendo Switch",
		type: Media.IMAGE
	},
	{
		name: "nintendo_wii",
		title: "Nintendo Wii",
		type: Media.IMAGE
	},
	{
		name: "nintendo_ds",
		title: "Nintendo DS",
		type: Media.IMAGE
	},
	{
		name: "playstation_5",
		title: "Playstation 5",
		type: Media.IMAGE
	},
	{
		name: "playstation_3",
		title: "Playstation 3",
		type: Media.IMAGE
	},
	{
		name: "xbox_series_s_x",
		title: "XBox Series S|X",
		type: Media.IMAGE
	},
	{
		name: "xbox_one",
		title: "XBox One",
		type: Media.IMAGE
	},
	{
		name: "meta_quest",
		title: "Meta Quest",
		type: Media.IMAGE
	},
	{
		name: "windows",
		title: "Windows",
		type: Media.IMAGE
	},
	{
		name: "android",
		title: "Android",
		type: Media.IMAGE
	},
	{
		name: "unreal_engine",
		title: "Unreal Engine",
		type: Media.IMAGE
	},
	{
		name: "unity",
		title: "Unity",
		type: Media.IMAGE
	},
	{
		name: "godot",
		title: "Godot Game Engine",
		type: Media.IMAGE
	},
	{
		name: "nvidia",
		title: "Nvidia",
		type: Media.IMAGE
	}
]
platforms.forEach(logo => {
	logo.name = `${Paths.PLATFORMS_DIR}${logo.name}.png`;
});

const properties = [
	{
		name: "borderlands4",
		title: "Borderlands 4",
		type: Media.IMAGE
	},
	{
		name: "homeworld_vast_reaches",
		title: "Homeworld: Vast Reaches",
		type: Media.IMAGE
	},
	{
		name: "sonic_the_hedgehog",
		title: "Sonic the Hedgehog",
		type: Media.IMAGE
	},
	{
		name: "starbreak",
		title: "StarBreak",
		type: Media.IMAGE
	},
	{
		name: "heralds_of_chaos",
		title: "Heralds of Chaos",
		type: Media.IMAGE
	},
	{
		name: "zomg",
		title: "ZOMG!",
		type: Media.IMAGE
	},
	{
		name: "skullgirls",
		title: "Skull Girls",
		type: Media.IMAGE
	}
]
properties.forEach(logo => {
	logo.name = `${Paths.PROPERTIES_DIR}${logo.name}.png`
});

const logos = {
	"companies": companies,
	"platforms": platforms,
	"properties": properties
};


/** EVENTS */

lightboxImage.onload = () => {
	
	lightbox.classList.remove("hidden");
	lightboxVideo.classList.remove("reveal");
	lightboxVideo.classList.add("hidden");
	
	lightboxImage.classList.remove("reveal");
	void lightboxImage.offsetWidth;
	lightboxImage.classList.add("reveal");
	lightboxImage.classList.remove("hidden");
};

lightboxVideo.addEventListener("canplay", () => {
	
	lightbox.classList.remove("hidden");
	lightboxImage.classList.remove("reveal");
	lightboxImage.classList.add("hidden");
	
	lightboxVideo.classList.remove("reveal");
	void lightboxVideo.offsetWidth;	
	lightboxVideo.classList.add("reveal");
	lightboxVideo.classList.remove("hidden");
	
	lightboxVideo.play();
});

lightbox.addEventListener("click", (evt) =>{
	
	lightbox.classList.add("hidden");
	
});

/** CLASSES */

class ImageCard
{
	constructor(template, data)
	{
		this.element = template.content.firstElementChild.cloneNode(true);
		
		let card = this.element.querySelector(".card");
		if (data.type === Media.VIDEO)
		{
			card.dataset.videoPath = `${Paths.VIDEOS_DIR}${data.name}`;
			card.dataset.cardType = data.type;
		}
		else if (data.type === Media.IMAGE)
		{
			card.dataset.imagePath = `${Paths.ART_DIR}${data.name}`
			card.dataset.cardType = data.type;
		}
		
		card.querySelector(".card-image img").src = `${Paths.THUMBS_DIR}${data.name}.png`;
		card.querySelector(".card-caption").textContent = data.title;
		card.dataset.caption = data.caption;
		
		card.addEventListener("click", this.PrepareLightbox);
	}
	
	PrepareLightbox(evt){
		
		const card = evt.target;
		
		lightbox.classList.add("hidden");
		
		if (card.dataset.cardType === Media.VIDEO) {
			lightboxVideo.src = `${card.dataset.videoPath}.mp4`;
			lightboxVideo.load();
		}
		else if (card.dataset.cardType === Media.IMAGE)	{
			lightboxImage.src = `${card.dataset.imagePath}.png`;
		}
		
		lightboxCaption.textContent = card.dataset.caption;
	}
}


/** FUNCS **/

async function loadMediaData() {
	const response = await fetch("./data/portfolio_content.json");
	
	if (!response.ok) {
		throw new Error(`Couldn't load content data: ${response.status}.`);
	}
	
	return await response.json();
}

function getMediaByTag(tag) {
	return MEDIA_DATA.filter(data => data.tags.includes(tag));
}

export function populateCardDisplay(cardDisplay) {
	
	const tags = cardDisplay.dataset.mediaTags
		?.split(",")
		.map(tag => tag.trim()) ?? [];
	
	let gathered_media = new Set();
	
	for (const tag of tags) {
		const matchingMedia = getMediaByTag(tag);
		matchingMedia.forEach(data => {
			gathered_media.add(data);
		});
	}
	
	const template = document.querySelector("#card-template");
	
	gathered_media.forEach(data => {
		cardDisplay.appendChild(new ImageCard(template, data).element);
	});
}

export function populateLogoDisplay(display) {
	
	const logoCollection = logos[display.dataset.imageSet];
	
	logoCollection.forEach(logo => {
		
		const image = document.createElement("img");
		image.src = logo.name;
		
		display.appendChild(image);
		
	});
}

/** MAIN */

