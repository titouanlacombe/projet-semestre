import { initFileExplorer } from "./Components/Sidebar/FileExplorer.js";
import { testDatabase } from "./Models/Model.js";

window.addEventListener('DOMContentLoaded', () =>
{
	initFileExplorer();
	testDatabase();
});
