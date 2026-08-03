async function loadPage(page, targetID)
{
	const response = await fetch(page);
	
	const html = await response.text();
	
	document.getElementById(targetID).innerHTML = html;
}

window.onload = function()
{
	loadPage("pages/main.html", "content");
	loadPage("pages/sidebar.html", "sidebar")
}