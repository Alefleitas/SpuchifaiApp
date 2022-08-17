import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Playlist } from '../../interfaces/playlist.interface';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-playlist-search',
  templateUrl: './playlist-search.component.html'
})
export class PlaylistSearchComponent implements OnInit {

  term!: string;
  playlists: Playlist[] = [];
  selectedPlaylist: Playlist | undefined;

  constructor(private _playlistService: PlaylistService) { }

  ngOnInit(): void {
  }

  onSearch() {
    this._playlistService.getSuggestions(this.term.trim())
      .subscribe(playlists => this.playlists = playlists );
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {
    console.log(event.option.value);

    if (!event.option.value) {
      this.selectedPlaylist = undefined;
      return;
    }
    let playlist: Playlist = event.option.value;
    this.term = playlist.name;

    this._playlistService.getPlaylistById(playlist.name)
      .subscribe(playlist => this.selectedPlaylist = playlist);

      
  }
}
