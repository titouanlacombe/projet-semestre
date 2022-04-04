const idKey = "fileExplorer://";
const childsKey = ":childs";

function initFile(file, fullPath)
{
	file.className = "file";
	file.dataset.opened = "false";
	file.dataset.loaded = "false";

	file.dataset.fullPath = fullPath;
	file.id = idKey + file.dataset.fullPath;
	file.onclick = () => toggleFolder(file.dataset.fullPath);
}

async function loadFiles(folder)
{
	// Call API for files
	const files = await window.electronAPI.getFiles(folder.dataset.fullPath);

	// Create wrapper list
	const list = document.createElement("ul");
	list.id = idKey + folder.dataset.fullPath + childsKey;

	// Create childs & fill list
	for (const fileName of files) {

		const child = document.createElement("li");
		initFile(child, folder.dataset.fullPath + "/" + fileName);
		child.innerText = fileName;

		list.appendChild(child);
	}

	return list;
}

function getChildList(folder)
{
	return document.getElementById(idKey + folder.dataset.fullPath + childsKey);
}

async function openFolder(folder)
{
	// Wether data is already loaded or not
	if (JSON.parse(folder.dataset.loaded)) {
		// Get child list & show it
		const childs = getChildList(folder);
	}
	else {
		// Create files element
		const files = await loadFiles(folder);

		// Append it after folder
		folder.after(files);

		// Update folder loaded status
		folder.dataset.loaded = "true";
	}

	// Update folder opened status
	folder.dataset.opened = "true";
}

function closeFolder(folder)
{
	// Get childs list & hide it
	const childs = getChildList(folder);

	// Update folder opened status
	folder.dataset.opened = "false";
}

function toggleFolder(folderPath)
{
	// Get folder element
	const folder = document.getElementById(idKey + folderPath);

	// Open if closed & vice versa
	JSON.parse(folder.dataset.opened) ? closeFolder(folder) : openFolder(folder);
}

export function initFileExplorer()
{
	// Setup root element
	let root = document.getElementById(idKey);
	initFile(root, ".");

	// Init root
	toggleFolder(root.dataset.fullPath);
}
