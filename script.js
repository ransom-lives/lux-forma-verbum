PAGE_ROOT = "pages/"

document.querySelectorAll(".nav-link").forEach(link => {
	link.addEventListener("click", event => {
		event.preventDefault();
		
		if (link.classList.contains("disabled")) {
			return;
		}
		
		loadPage(link.dataset.page, "#content");
	});	
});

function setActivePage(pageName) {
	
	const links = document.querySelectorAll(".nav-link");
	
	links.forEach(element => {
		element.classList.toggle("active", element.dataset.page === pageName);
	});	
}

async function loadPage(page, targetID)
{
	const response = await fetch(`${PAGE_ROOT}${page}.html`);
	
	
	const html = await response.text();
	document.querySelector(targetID).innerHTML = html;
	setActivePage(page)
	
}

window.onload = function()
{
	loadPage("sidebar", "#sidebar");
	loadPage("main", "#content");
}