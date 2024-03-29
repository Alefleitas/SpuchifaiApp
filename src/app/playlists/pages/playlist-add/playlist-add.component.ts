import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../interfaces/playlist.interface';
import { PlaylistService } from '../../services/playlist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-playlist-add',
  templateUrl: './playlist-add.component.html',
  styles: [`button{
    margin: 0px 10px;
  }`]
})
export class PlaylistAddComponent implements OnInit {

  form!: FormGroup
  minLengthForName: number = 5;

  playlist: Playlist = {
    name: '',
    description: '',
    idPlaylist: 0,
    idSongs: []
  }

  constructor(
    private _playlistService: PlaylistService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      name: [this.playlist.name, [Validators.required, Validators.minLength(this.minLengthForName)]],
      description: [this.playlist.description, [Validators.required, Validators.minLength(this.minLengthForName)]]
    });

    this.activatedRoute.params
      .pipe(
        switchMap(({ playlistName }) => this._playlistService.getPlaylistById(playlistName))
      )
      .subscribe(playlist => {
        this.playlist = playlist;
        this.form.get('name')?.setValue(playlist.name);
        this.form.get('description')?.setValue(playlist.description);
      })
  }

  SaveForm(form: FormGroup): void {

    if(this.playlist.description === form.get('description')?.value) return;

    this.playlist.name = form.get('name')?.value;
    this.playlist.description = form.get('description')?.value;


    if (this.playlist.name.trim().length === 0) {
      return;
    }

    if (this.playlist.idPlaylist !== 0 ) {

      this._playlistService.putUpdatePlaylist(this.playlist)
        .subscribe(playlist => this.showSnackbar("Playlist actualizada"))

    } else {
      this._playlistService.postAddPlaylist(this.playlist)
        .subscribe(playlist => {
          this.router.navigate(['/playlist'])
          this.showSnackbar("Playlist creada");
        })

    }


  }

  RemovePlaylist():void {

    const dialog = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: this.playlist
    })

    dialog.afterClosed()
      .subscribe((result) => {
        if (result) {

          this._playlistService.deletePlaylist(this.playlist.name)
            .subscribe(resp => {
              this.router.navigate(['/playlist'])
              this.showSnackbar("Playlist borrada con éxito");
            });
        }
      })
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, 'ok!', {
      duration: 5000
    });

  }
}
