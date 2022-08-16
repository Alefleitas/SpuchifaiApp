import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../interfaces/playlist.interface';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private apiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }


  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.apiUrl}/Playlist`)
  }

  getPlaylistById(playlistName: string): Observable<Playlist> {
    return this.http.get<Playlist>(`${this.apiUrl}/Playlist/${playlistName}`)
  }

  getSuggestions(term: string): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${this.apiUrl}/Playlist?q=${term}&_limit=5`)

  }

  postAddPlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.post<Playlist>(`${this.apiUrl}/Playlist`, playlist)
  }

  putUpdatePlaylist(playlist: Playlist): Observable<Playlist> {
    return this.http.put<Playlist>(`${this.apiUrl}/Playlist/${playlist.name}`, playlist)
  }
}
