import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist, IDSong } from '../interfaces/playlist.interface';
import { Controller } from 'src/app/enum/controller.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private apiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }


  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.apiUrl}/${Controller.Playlist}`)
  }

  getPlaylistById(playlistName: string): Observable<Playlist> {

    return this.http.get<Playlist>(`${this.apiUrl}/${Controller.Playlist}/${playlistName}`)
  }


  getSuggestions(term: string): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.apiUrl}/${Controller.Playlist}?q=${term}&_limit=5`)

  }

  postAddPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(`${this.apiUrl}/${Controller.Playlist}`, playlist)
  }


  putUpdatePlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.put<Playlist>(`${this.apiUrl}/${Controller.Playlist}?name=${playlist.name}`, playlist)
  }

  deletePlaylist(playlistName: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${Controller.Playlist}?name=${playlistName}`)
  }

  postAddSong(playlistName: string, song: IDSong): Observable<IDSong> {
    return this.http.post<IDSong>(`${this.apiUrl}/${Controller.Playlist}/${playlistName}/Songs`, song)
  }

  getSongsByPlaylist(playlistName: string): Observable<IDSong[]> {
    return this.http.get<IDSong[]>(`${this.apiUrl}/${Controller.Playlist}/${playlistName}/Songs`)
  }

  getSongById(playlistName: string, songName: string): Observable<IDSong> {

    return this.http.get<IDSong>(`${this.apiUrl}/${Controller.Playlist}/${playlistName}/Songs/${songName}`)
  }

  putUpdateSong(playlistName: string, song: IDSong): Observable<IDSong> {
    return this.http.put<IDSong>(`${this.apiUrl}/${Controller.Playlist}/${playlistName}/Songs/${song.name}`, song)
  }

  deleteSong(playlistName: string, songName: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${Controller.Playlist}/${playlistName}/Songs/${songName}`)
  }
}
