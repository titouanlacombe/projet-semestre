async function appendFiles(parent, folder)
{
	const files = await window.electronAPI.getFiles(folder);

	for (const file of files) {
		let child = parent.appendChild(document.createElement("li"));
		child.innerText = file;
		child.className = "file";
	}
}

window.addEventListener('DOMContentLoaded', () =>
{
	appendFiles(document.getElementById("filesRoot"), ".");
});
