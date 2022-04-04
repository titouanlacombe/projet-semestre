async function loadSidebar()
{
	const sidebar = document.getElementById("sidebar");
	const files = await window.electronAPI.openFile()

	console.log("loading sidebar: " + files);

	for (const file of files) {
		let child = sidebar.appendChild(document.createElement("p"));
		child.innerText = file;
		child.className = "file";
	}

	console.log("loaded sidebar: " + sidebar);
}

window.addEventListener('DOMContentLoaded', () =>
{
	loadSidebar();
});
