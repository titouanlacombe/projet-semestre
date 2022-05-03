const idKey = "fileExplorer://";
const childsKey = ":childs";

// Icons
const fileIcon = "bi-file-earmark";
const dirOpenedIcon = "bi-folder2-open";
const dirClosedIcon = "bi-folder2";

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
    for (const file of files) {

        // File / Folder icon
        const icon = createIcon(file.isDir ? dirClosedIcon : fileIcon);

        const child = document.createElement("li");
        initFile(child, folder.dataset.fullPath + "/" + file.name);
        child.appendChild(icon);
        if (file.name.length > 13)
            file.name = file.name.slice(0, 13) + " ...";
        child.innerHTML += file.name;

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

export async function initFileExplorer()
{
    // Setup root element
    let root = document.getElementById(idKey);
    const homeDirPath = await window.electronAPI.getHomeDir();
    initFile(root, homeDirPath);

    // Init root
    toggleFolder(root.dataset.fullPath);
}
