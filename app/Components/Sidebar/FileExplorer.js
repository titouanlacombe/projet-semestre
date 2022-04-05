const idKey = "fileExplorer://";
const childsKey = ":childs";

// Icons
const fileIcon = "bi-file-earmark";
const folderOpenedIcon = "bi-folder2-open";
const folderClosedIcon = "bi-folder2";

function initFile(file, fullPath)
{
	file.className = "file";
	file.dataset.opened = "false";

	file.dataset.fullPath = fullPath;
	file.id = idKey + file.dataset.fullPath;
	file.onclick = () => toggleFolder(file.dataset.fullPath);
}

function createIcon(name)
{
	const icon = document.createElement("i");
	icon.className = name;
	icon.style = "padding-right: 8px;";
	return icon;
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

		// File / Folder icon
		const icon = createIcon(fileIcon);

		const child = document.createElement("li");
		initFile(child, folder.dataset.fullPath + "/" + fileName);
		child.appendChild(icon);
		child.innerHTML += fileName;

		list.appendChild(child);
	}

	return list;
}

function getChilds(folder)
{
	return document.getElementById(idKey + folder.dataset.fullPath + childsKey);
}

async function openFolder(folder)
{
	let childs = getChilds(folder);

	// If child list not exist create & cache it
	if (childs === null) {
		// Create child list
		childs = await loadFiles(folder);

		// Append it after folder
		folder.after(childs);
	}

	childs.hidden = false;
}

function closeFolder(folder)
{
	// Get childs list & hide it
	let childs = getChilds(folder);

	childs.hidden = true;
}

function toggleFolder(folderPath)
{
	// Get folder element
	const folder = document.getElementById(idKey + folderPath);

	let opened = JSON.parse(folder.dataset.opened);

	// Open if closed & vice versa
	opened ? closeFolder(folder) : openFolder(folder);

	// Toggle opened
	folder.dataset.opened = !opened;
}

export function initFileExplorer()
{
	// Setup root element
	let root = document.getElementById(idKey);
	initFile(root, ".");

	// Init root
	toggleFolder(root.dataset.fullPath);
}
