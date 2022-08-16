import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../interfaces/playlist.interface';
import { PlaylistService } from '../../services/playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-playlist-add',
  templateUrl: './playlist-add.component.html'
})
export class PlaylistAddComponent implements OnInit {

  playlist: Playlist = {
    name: '',
    description: '',
    idPlaylist: 0,
    idSongs: []
  }

  constructor(
    private _playlistService: PlaylistService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // console.log(this.activatedRoute.params);

    this.activatedRoute.params
      .pipe(
        switchMap(({ playlistName }) => this._playlistService.getPlaylistById(playlistName))
      )
      .subscribe(playlist => this.playlist = playlist)

  }

  SaveForm() {
    if (this.playlist.name.trim().length === 0) {
      return;
    }

    if (this.playlist.name) {
      console.log(this.playlist);

      this._playlistService.putUpdatePlaylist(this.playlist)
        .subscribe(playlist => console.log('Actualizando...', playlist)
        )
    } else {

      this._playlistService.postAddPlaylist(this.playlist)
        .subscribe(playlist => {
          this.router.navigate(['playlist/playlist-edit', playlist.name]);
        })

    }


  }
}
