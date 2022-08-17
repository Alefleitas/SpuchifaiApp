import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { Playlist, IDSong } from '../../interfaces/playlist.interface';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']

})
export class PlaylistComponent implements OnInit {

  playlist: Playlist = {
    idPlaylist: 0,
    name: '',
    description: '',
    idSongs: []
  };
  songs: IDSong[] = [];
  displayedColumns: string[] = ['name', 'artist', 'album', 'date', 'action']
  constructor(
    private activatedRoute: ActivatedRoute,
    private _playlistService: PlaylistService) { }

  ngOnInit(): void {

    console.log(this.activatedRoute.params
      .subscribe(res => console.log(res)
      )
    );


    this.activatedRoute.params
      .pipe(
        switchMap(({ playlistName }) => this._playlistService.getPlaylistById(playlistName))
      )
      .subscribe(res => {
        this.playlist = res;
        this.songs = res.idSongs;
      }
      );

  }

}
