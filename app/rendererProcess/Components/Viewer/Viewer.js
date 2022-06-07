export class Viewer
{
    static openAlbum(album)
    {
        const win = new BrowserWindow({
            autoHideMenuBar: true,
            icon: "./resources/icon.png",
            webPreferences: {
                preload: path.resolve('app/preload.js'),
            }
        });

        win.maximize();
        win.loadFile('app/album.html');
        return win;
    }
}
