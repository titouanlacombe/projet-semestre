import { initFileExplorer } from "./rendererProcess/Components/Sidebar/FileExplorer.js";
import { Database } from "./rendererProcess/Database/Database.js";

window.addEventListener('DOMContentLoaded', () =>
{
	initFileExplorer();

	// TODO comment for prod
	Database.seedDatabase();
});
