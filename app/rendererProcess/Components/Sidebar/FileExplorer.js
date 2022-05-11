// Anchors
const fileAnchor = "fileExplorerFile:/";
const childsAnchor = "fileExplorerChilds:/";

// Icons
const fileIcon = "bi-file-earmark";
const dirOpenedIcon = "bi-folder2-open";
const dirClosedIcon = "bi-folder2";

// Other
const filenameOverflow = " ...";

function createIcon(name)
{
	const icon = document.createElement("i");
	icon.className = name;
	icon.style = "padding-right: 8px;";
	return icon;
}

function createFileEntry(isDir, dirpath, name)
{
	const file = document.createElement("li");

	// Dataset
	file.dataset.opened = "false";
	file.dataset.isDir = isDir;
	file.dataset.path = dirpath + "/" + name;

	// Basic data
	file.id = fileAnchor + file.dataset.path;
	file.className = "file";

	// Event
	file.onclick = () => toggleDirectory(file.dataset.path);

	// Icon
	file.appendChild(createIcon(isDir ? dirClosedIcon : fileIcon));

	// Text
	if (name.length > 13 + filenameOverflow.length) {
		// If name too long slice it
		file.innerHTML += name.slice(0, 13) + filenameOverflow;
	}
	else {
		file.innerHTML += name;
	}

	return file;
}

async function loadFiles(directory)
{
	// Call API for files
	const files = await window.electronAPI.getFiles(directory.dataset.path);

	// Create wrapper list
	const childs = document.createElement("ul");
	childs.id = childsAnchor + directory.dataset.path;

	// Fill childs
	for (const file of files) {
		// Ignore hidden files
		if (is_hidden(file.name)) {
			continue;
		}

		childs.appendChild(
			createFileEntry(file.isDir, directory.dataset.path, file.name)
		);
	}

	return childs;
}

function getChilds(directory)
{
	return document.getElementById(childsAnchor + directory.dataset.path);
}

async function openDirectory(directory)
{
	let childs = getChilds(directory);

	// If child list not exist create & cache it
	if (childs === null) {
		// Create child list
		childs = await loadFiles(directory);

		// Append it after directory
		directory.after(childs);
	}

	childs.hidden = false;
}

function closeDirectory(directory)
{
	// Get childs list & hide it
	let childs = getChilds(directory);

	childs.hidden = true;
}

function toggleDirectory(path)
{
	// Get directory element
	const directory = document.getElementById(fileAnchor + path);

	// If trying to open file
	if (!JSON.parse(directory.dataset.isDir)) {
		return;
	}

	let opened = JSON.parse(directory.dataset.opened);

	// Open if closed & vice versa
	opened ? closeDirectory(directory) : openDirectory(directory);

	// Toggle opened flag
	opened = !opened;
	directory.dataset.opened = opened;

	// Toggle icon
	let icons = directory.getElementsByTagName("i");
	if (icons.length != 1) {
		console.log(icons);
		throw new Error("Can't find directory icon of " + path);
	}

	icons[0].className = opened ? dirOpenedIcon : dirClosedIcon;
}

function dirname(path)
{
	let separatorIndex = Math.max(path.lastIndexOf("\\"), path.lastIndexOf("/"));
	return path.substring(0, separatorIndex + 1);
}

function filename(path)
{
	return path.replace(/^.*[\\\/]/, '');
}

// Return wether filename starts with a '.'
function is_hidden(file_name)
{
	return file_name[0] == '.';
}

window.addEventListener('DOMContentLoaded', async () =>
{
	// Init root
	const homeDirPath = await window.electronAPI.getHomeDir();
	const root = createFileEntry(true, dirname(homeDirPath), filename(homeDirPath));

	// Add root to sidebar
	document.getElementById("sidebar").appendChild(root);

	// Open root
	toggleDirectory(root.dataset.path);
});
