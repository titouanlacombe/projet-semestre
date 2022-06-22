export class Database
{
    static version = 3;

    static async getVersion()
    {
        // Uncomment when experimenting with DB
        // return null;
        return (await this.sql("PRAGMA user_version", [], "get")).user_version;
    }


    static async drop()
    {
        await window.electronAPI.dropDB();
        console.log("Droped Database");
    }

    // Create tables & insert static data

    static async seed()
    {
        let requests = [
            // --- Database version ---
            `PRAGMA user_version = ${this.version}`,

            // --- albums ---
            `CREATE TABLE albums (
				name TEXT NOT NULL,                
                artist_id INTEGER NOT NULL REFERENCES artists(rowid),
				released_at TEXT DEFAULT NULL,
                UNIQUE(name, artist_id)
			);`,
            `INSERT INTO albums(name, artist_id) VALUES ('Mezzanine', 1)`,
            `INSERT INTO albums(name, artist_id) VALUES ('Mezzanine', 2)`,
            `INSERT INTO albums(name, artist_id) VALUES ('Mezzanine II', 1)`,
            `INSERT INTO albums(name, artist_id) VALUES ('Allumer le feu', 5)`,

            // --- bands ---
            `CREATE TABLE bands (
				name TEXT NOT NULL,
                UNIQUE(name)
			);`,

            `INSERT INTO bands(name) VALUES ('The Does')`,

            // --- artists ---
            `CREATE TABLE artists (
				firstname TEXT,
				lastname TEXT,
				stagename TEXT NOT NULL,
				band_id INTEGER REFERENCES bands(rowid),
                UNIQUE(stagename)
			);`,
            `INSERT INTO artists VALUES ('MezzanineArtist', 'MezzanineArtist', 'MezzanineArtist', 1)`,


            `INSERT INTO artists(firstname, lastname, stagename) VALUES ("Antoine", "Daniel", "Antoine Daniel");`,
            `INSERT INTO artists(firstname, lastname, stagename) VALUES ("Titouan", "Lacombe", "DJ Titou");`,

            // create unique artists examples
            `INSERT INTO artists(firstname, lastname, stagename, band_id) VALUES ("John", "Doe", "John Doe", "1");`,
            `INSERT INTO artists(firstname, lastname, stagename, band_id) VALUES ("Jane", "Doe", "Jane Doe", "1");`,
            `INSERT INTO artists(firstname, lastname, stagename) VALUES ("Johnny", "Halliday", "Johnny Halliday");`,



            /*             // --- worked_on ---
                        `CREATE TABLE worked_on (
                            artist_id INTEGER NOT NULL,
                            title_id INTEGER NOT NULL,
                            jobtype TEXT NOT NULL
                        );`, */

            // --- titles ---
            `CREATE TABLE titles (
				name TEXT NOT NULL,
				genre_id INTEGER REFERENCES genres(rowid),
				file_id INTEGER references files(file_id),
				album_id INTEGER references albums(rowid),
				released_at TEXT,
                UNIQUE(name, album_id)
			);`,

            // Insert 3 titles in Mezzanine
            `INSERT INTO titles(name, genre_id, album_id, released_at) VALUES ('Mezzanine', 1, 1, '2018-01-01')`,
            `INSERT INTO titles(name, genre_id, album_id, released_at) VALUES ('Mezzanine II', 2, 1, '2018-01-01')`,
            `INSERT INTO titles(name, genre_id, album_id, released_at) VALUES ('Allumer le feu', 3, 1, '2018-01-01')`,

            // --- files ---
            `CREATE TABLE files (
				path TEXT NOT NULL,
				imported_at TEXT NOT NULL,
                CHECK(path NOT NULL)
			);`,



            // insert file example
            `INSERT INTO files values ('./sound.mp3', '${new Date(Date.now()).toUTCString()}');`,

            // --- genres ---
            `CREATE TABLE genres (
				name TEXT NOT NULL,
                UNIQUE(name)
			);`,

            // insert genres
            `INSERT INTO genres values ('Rock');`,
            `INSERT INTO genres values ('Pop');`,
            `INSERT INTO genres values ('Metal');`,
            `INSERT INTO genres values ('Jazz');`,
            `INSERT INTO genres values ('Electro');`,
            `INSERT INTO genres values ('Folk');`,
            `INSERT INTO genres values ('Blues');`,
            `INSERT INTO genres values ('Reggae');`,
            `INSERT INTO genres values ('Classique');`,
            `INSERT INTO genres values ('Other');`,

        ];

        for (let request of requests) {
            await this.sql(request);
        }

        console.log("Seeded Database");
    }

    static async sql(sql, params = [], method = "run")
    {
        return window.electronAPI.sql(sql, params, method);
    }


    static async init()
    {
        // Do nothing if DB is at the right version
        let dbver = await this.getVersion();
        if (dbver == this.version) {
            return;
        }

        console.log("Warning: DB version missmatch: ", dbver, this.version);

        await this.drop();
        await this.seed();
    }

    static async reset()
    {
        await this.drop();
        await this.init();
    }
}

window.addEventListener('DOMContentLoaded', () =>
{
    Database.init();
});
