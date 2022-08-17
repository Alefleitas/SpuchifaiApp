export interface Playlist {
    idPlaylist: number;
    name: string;
    description: string;
    idSongs: IDSong[];
}

export interface IDSong {
    idSong: number | undefined;
    name: string;
    artist: string;
    album: string;
}
