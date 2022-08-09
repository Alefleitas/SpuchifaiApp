import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Playlist } from '../models/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class PlaylistsService {

  private baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.baseApiUrl + '/api/v1/Playlist')

  }
}
