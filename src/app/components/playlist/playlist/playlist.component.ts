import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../../models/playlist.model';
import { PlaylistsService } from '../../../services/playlists.service';
import { Observable } from 'rxjs';

const ELEMENT_DATA: Playlist[] = [
  { name: 'Pop Internacional', description: 'Enganchado de musica pop' },
  { name: 'Rock Nacional Argentino', description: 'Enganchado de musica rock nacional argentino' },
  { name: 'Reggaeton', description: 'Enganchado de musica reggaeton' },
  { name: 'Cumbia', description: 'Enganchado de musica cumbia' }
];
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'action'];
  // dataSource: Playlist[] = [];
  dataSource: Playlist[] = ELEMENT_DATA;
  constructor(
    // private playlistService: PlaylistsService
  ) { }

  ngOnInit(): void {

    // this.playlistService.getAllPlaylists()
    //   .subscribe({
    //     next: (playlist) => {
    //       this.dataSource = playlist;
    //     },
    //     error: (response) => {
    //       console.log(response);

    //     }
    //   })


  }

}
