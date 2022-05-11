async function launchImport()
{
	let response = await window.electronAPI.systemDialog(['openDirectory']);
	if (response.canceled) {
		console.log("Import canceled");
		return;
	}

	let path = response.filePaths[0];
	console.log(`Launching import on ${path}`);
}

window.addEventListener('DOMContentLoaded', () =>
{
	document.getElementById("importButton").onclick = launchImport;
});
