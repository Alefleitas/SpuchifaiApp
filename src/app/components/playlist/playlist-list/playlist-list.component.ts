import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../../models/playlist.model';
import { PlaylistsService } from '../../../services/playlists.service';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent implements OnInit {

  playlists: Playlist[] = [
    {
      name: 'Cumbia',
      description: 'Enganchado'
    },
    {
      name: 'Rock',
      description: 'Enganchado'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // this.playlistsService.getAllPlaylists()
    //   .subscribe({
    //     next: (playlists) => {
    //      this.playlists = playlists

    //     },
    //     error: (response) => {
    //       console.log(response);

    //     }
    //   })
  }

}
