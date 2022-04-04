const separator = "fileExplorer://";

function folderOpened(folder)
{
	return JSON.parse(document.getElementById(separator + folder).dataset.opened);
}

async function appendFiles(folder)
{
	// Get parent and add after wrapper list
	const list = document.createElement("ul");
	const parent = document.getElementById(separator + folder)
	parent.after(list);
	parent.dataset.opened = "true";

	const files = await window.electronAPI.getFiles(folder);

	for (const file of files) {
		let filePath = folder + "/" + file;

		let child = list.appendChild(document.createElement("li"));

		child.innerText = file;
		child.className = "file";
		child.id = separator + filePath;
		child.dataset.opened = "false";
		child.onclick = () =>
		{
			// Precondition
			if (folderOpened(filePath)) {
				return;
			}

			appendFiles(filePath);
		};
	}
}

export function initFileExplorer()
{
	const rootFolder = ".";
	const root = document.getElementById(separator);

	root.id += rootFolder;
	appendFiles(rootFolder);
}
