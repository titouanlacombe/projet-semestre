export function dirname(path)
{
	let separatorIndex = Math.max(path.lastIndexOf("\\"), path.lastIndexOf("/"));
	return path.substring(0, separatorIndex + 1);
}

export function filename(path)
{
	return path.replace(/^.*[\\\/]/, '');
}

// Return wether filename starts with a '.'
export function is_hidden(file_name)
{
	return file_name[0] == '.';
}

// Return the extension of a path
export function extension(path)
{
	let splitted = path.split(".");
	return splitted[splitted.length - 1];
}
