const fs = require('fs');
const path = require('path');

class Sidebar
{
	get()
	{
		return document.getElementById("sidebar");
	}

	load()
	{
		let files = fs.readdirSync(".");
		let sidebar = this.get();
		for (const file of files) {
			let child = sidebar.appendChild("p");
			child.innerHTML = path.basename(file);
		}
	}
}

module.exports = new Sidebar();
