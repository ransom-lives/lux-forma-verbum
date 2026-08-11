import * as Paths from "./paths.js";

/** DATA **/

const companies = [
	{
		name: "enduring_games",
		title: "Enduring Games",
	},
	{
		name: "azra_games",
		title: "Azra Games"
	},
	{
		name: "wayforward",
		title: "Wayforward"
	},
	{
		name: "gearbox",
		title: "Gearbox"
	},
	{
		name: "farbridge",
		title: "FarBridge"
	},
	{
		name: "sega",
		title: "Sega"
	},
	{
		name: "hyperkinetic",
		title: "Hyperkinetic"
	},
	{
		name: "crunchy",
		title: "Crunchy Games"
	},
	{
		name: "gaia_online",
		title: "Gaia Online"
	},
	{
		name: "lab_zero_games",
		title: "Lab Zero Games"
	},
	{
		name: "reverge_labs",
		title: "Reverge Labs"
	},
	{
		name: "gorilla_systems_corp",
		title: "Gorilla Systems Corp"
	}
]
companies.forEach(logo =>{
	logo.name = `${Paths.COMPANIES_DIR}${logo.name}.png`;
});

const platforms = [
	{
		name: "nintendo_switch_2",
		title: "Nintendo Switch 2"
	},
	{
		name: "nintendo_switch",
		title: "Nintendo Switch"
	},
	{
		name: "nintendo_wii",
		title: "Nintendo Wii"
	},
	{
		name: "nintendo_ds",
		title: "Nintendo DS"
	},
	{
		name: "playstation_5",
		title: "Playstation 5"
	},
	{
		name: "playstation_3",
		title: "Playstation 3"
	},
	{
		name: "xbox_series_s_x",
		title: "XBox Series S|X"
	},
	{
		name: "xbox_one",
		title: "XBox One"
	},
	{
		name: "meta_quest",
		title: "Meta Quest"
	},
	{
		name: "windows",
		title: "Windows"
	},
	{
		name: "android",
		title: "Android"
	},
	{
		name: "unreal_engine",
		title: "Unreal Engine"
	},
	{
		name: "unity",
		title: "Unity"
	},
	{
		name: "godot",
		title: ""
	},
	{
		name: "nvidia",
		title: "Nvidia"
	}
]
platforms.forEach(logo => {
	logo.name = `${Paths.PLATFORMS_DIR}${logo.name}.png`;
});

const properties = [
	{
		name: "borderlands4",
		title: "Borderlands 4"
	},
	{
		name: "homeworld_vast_reaches",
		title: "Homeworld: Vast Reaches"
	},
	{
		name: "sonic_the_hedgehog",
		title: "Sonic the Hedgehog"
	},
	{
		name: "starbreak",
		title: "StarBreak"
	},
	{
		name: "heralds_of_chaos",
		title: "Heralds of Chaos"
	},
	{
		name: "zomg",
		title: "ZOMG!"
	},
	{
		name: "skullgirls",
		title: "Skull Girls"
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

const images2d = [
	{
		name: "ig_quintet_promo",
		title: "Indigo Gaming - Quintet",
		caption: "Indigo Gaming Quintent documentary key image."
	},
	{
		name: "samus",
		title: "Samus Aran",
		caption: "Samus Aran."
	},
	{
		name: "twin_perfect",
		title: "Twin Perfect",
		caption: "Twin Perfect promo image."
	},
	{
		name: "sonic_mania_2_style",
		title: "Sonic Mania 2 Style Concept",
		caption: "Sonic Mania 2 style concept."
	},
	{
		name: "stars_jared",
		title: "S.T.A.R.S. Jared",
		caption: "S.T.A.R.S. Jared for Avalanche Reviews."
	},
	{
		name: "sonic_bonus_concepts",
		title: "Sonic Bonus Gate Concepts",
		caption: "\"Bonus gate\" concept art for Sonic Mania 2."
	},
	{
		name: "ig_playing_god_promo",
		title: "Indigo Gaming \"Playing God\" Key Art",
		caption: "Key art for Indigo Gaming's \"Playing God\" documentary."
	},
	{
		name: "sonic_special_stage",
		title: "Sonic Special Stage",
		caption: "Special Stage concept art for Sonic Mania 2"
	},
	{
		name: "crono_anniversary_concept",
		title: "Chrono Trigger Anniversary Concept Art",
		caption: "Concept art to celebrate the anniversary of Chrono Trigger's release."
	},
	{
		name: "duskwing_key",
		title: "Duskwing",
		caption: "Key art for the Duskwing character from StarBreak."
	}
]
images2d.forEach(image => {
	image.name = `${image.name}.png`
});

const images3d = [
	{
		name: "crono_a",
		title: "Chrono Trigger Anniversary Sculpt",
		caption: "A sculpt of Crono to celebrate the anniversary of Chrono Trigger."
	}
]
images3d.forEach(image => {
	image.name = `${image.name}.png`
});


const images = {
	"2d": images2d,
	"3d": images3d
}

/** CLASSES **/

class ImageCard
{
	constructor(template, data)
	{
		this.element = template.content.firstElementChild.cloneNode(true);
		
		this.element.querySelector(".card").dataset.imagePath = `${Paths.ART_DIR}${data.name}`;
		this.element.querySelector(".card-image img").src = `${Paths.THUMBS_DIR}${data.name}`;
		this.element.querySelector(".card-caption").textContent = data.title;
	}
}


/** FUNCS **/

export function populateCardDisplay(cardDisplay) {
	
	const imageCollection = images[cardDisplay.dataset.imageSet];
	const template = document.querySelector("#card-template");
	
	imageCollection.forEach(image => {
		cardDisplay.appendChild(new ImageCard(template, image).element);
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