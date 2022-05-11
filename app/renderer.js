import { initFileExplorer } from "./rendererProcess/Components/Sidebar/FileExplorer.js";
import { Database } from "./rendererProcess/Database/Database.js";
import { Album } from "./rendererProcess/Models/Album.js";

window.addEventListener('DOMContentLoaded', initApp);

function initApp()
{
	initFileExplorer();
	testDB();
}

async function testDB()
{
	await Database.initDB();
}
