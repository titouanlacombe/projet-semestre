async function loadFilesExplorer()
{
	const filesParent = document.getElementById("filesRoot");
	const files = await window.electronAPI.openFile()

	for (const file of files) {
		let child = filesParent.appendChild(document.createElement("li"));
		child.innerText = file;
		child.className = "file";
	}
}

window.addEventListener('DOMContentLoaded', () =>
{
	loadFilesExplorer();
});
