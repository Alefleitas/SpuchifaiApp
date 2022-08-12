import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../interfaces/playlist.interface';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-playlist-search',
  templateUrl: './playlist-search.component.html'
})
export class PlaylistSearchComponent implements OnInit {

  term: string = '';
  playlists: Playlist[] = [];


  constructor(private _playlistService: PlaylistService) { }

  ngOnInit(): void {
  }

  onSearch() {
    this._playlistService.getSuggestions(this.term)
      .subscribe(res => this.playlists = res);
  }
}
