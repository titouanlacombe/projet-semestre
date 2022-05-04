const rootKey = "fileExplorer://";
const childsKey = ":childs";

// Icons
const fileIcon = "bi-file-earmark";
const dirOpenedIcon = "bi-folder2-open";
const dirClosedIcon = "bi-folder2";

function initFile(domElement, isDir, path)
{
	domElement.className = "file";
	domElement.dataset.opened = "false";
	domElement.dataset.isDir = isDir;

	domElement.dataset.path = path;
	domElement.id = rootKey + domElement.dataset.path;
	domElement.onclick = () => toggleFolder(domElement.dataset.path);
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
	const files = await window.electronAPI.getFiles(folder.dataset.path);

	// Create wrapper list
	const childs = document.createElement("ul");
	childs.id = rootKey + folder.dataset.path + childsKey;

	// Create childs & fill childs
	for (const file of files) {
		const child = document.createElement("li");
		initFile(child, file.isDir, folder.dataset.path + "/" + file.name);

		// File / Folder icon
		const icon = createIcon(file.isDir ? dirClosedIcon : fileIcon);
		child.appendChild(icon);

		child.innerHTML += file.name;

		childs.appendChild(child);
	}

	return childs;
}

function getChilds(folder)
{
	return document.getElementById(rootKey + folder.dataset.path + childsKey);
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

function toggleFolder(path)
{
	// Get folder element
	const folder = document.getElementById(rootKey + path);

	// If trying to open file
	if (!JSON.parse(folder.dataset.isDir)) {
		return;
	}

	let opened = JSON.parse(folder.dataset.opened);

	// Open if closed & vice versa
	opened ? closeFolder(folder) : openFolder(folder);

	// Toggle opened
	folder.dataset.opened = !opened;

	// TODO update icon
}

export async function initFileExplorer()
{
	// Init root
	let root = document.getElementById(rootKey);
	const homeDirPath = await window.electronAPI.getHomeDir();
	initFile(root, true, homeDirPath);

	// Open root
	toggleFolder(root.dataset.path);
}
