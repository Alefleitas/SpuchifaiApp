import { switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDSong, Playlist } from '../../interfaces/playlist.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaylistService } from '../../services/playlist.service';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.css'],
  styles: [`button{
    margin: 0px 10px;
  }`]
})
export class SongAddComponent implements OnInit {

  song: IDSong = {
    idSong: 0,
    name: '',
    artist: '',
    album: ''
  };

  playlist!: Playlist;

  form!: FormGroup
  minLengthForName: number = 5;
  constructor(
    private readonly fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _playlistService: PlaylistService,
    private router: Router
  ) { }

  ngOnInit(): void {

    console.log(this.activatedRoute.params);


    this.form = this.fb.group({
      name: [this.song.name, [Validators.required, Validators.minLength(this.minLengthForName)]],
      artist: [this.song.artist, [Validators.required, Validators.minLength(this.minLengthForName)]],
      album: [this.song.album, [Validators.required, Validators.minLength(this.minLengthForName)]]
    });

    this.activatedRoute.params
      .pipe(
        switchMap(({ playlistName }) =>
          this._playlistService.getPlaylistById(playlistName)
        )
      )
      .subscribe(resp => this.playlist = resp)

    this.activatedRoute.params
      .pipe(
        switchMap(({ playlistName, songName }) => this._playlistService.getSongById(playlistName, songName)))
      .subscribe(resp => {

        if (resp) {

          this.song = resp;
          this.form.get('name')?.setValue(this.song.name);
          this.form.get('artist')?.setValue(this.song.artist);
          this.form.get('album')?.setValue(this.song.album);
        }
      });

  }

  SaveForm(form: FormGroup): void {

    if (this.song.artist === form.get('artist')?.value &&
      this.song.album === form.get('album')?.value) return;

    this.song.name = form.get('name')?.value;
    this.song.artist = form.get('artist')?.value;
    this.song.album = form.get('album')?.value;

    if (this.song.name.trim().length === 0) {
      return;
    }

    if (this.song.idSong! > 0) {

      this._playlistService.putUpdateSong(this.playlist.name, this.song)
        .subscribe(playlist => this.showSnackbar("Playlist actualizada"))

    } else {
      this._playlistService.postAddSong(this.playlist.name, this.song)
        .subscribe(playlist => {
          this.router.navigate(['/playlist', this.playlist.name])
          this.showSnackbar("Cancion agregada");
        })

    }
  }

  RemoveSong() {

    const dialog = this.dialog.open(ConfirmComponent, {
      width: '300px',
      data: this.song
    })

    dialog.afterClosed()
      .subscribe((result) => {


        if (result) {

          this._playlistService.deleteSong(this.playlist.name, this.song.name)
            .subscribe(resp => {
              this.router.navigate(['/playlist', this.playlist.name])
              this.showSnackbar("Cancion borrada con éxito");
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
