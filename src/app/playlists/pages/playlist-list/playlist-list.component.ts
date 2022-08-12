import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist } from '../../interfaces/playlist.interface';
@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css']

})
export class PlaylistListComponent implements OnInit {
  dataSource: Playlist[] = [];
  displayedColumns: string[] = ['name', 'description', 'action']
  constructor(private _playlistService: PlaylistService) { }

  ngOnInit(): void {
    this._playlistService.getPlaylists().
      subscribe(res => {
        this.dataSource = res
      })
  }

}
