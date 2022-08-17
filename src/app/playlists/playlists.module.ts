import { NgModule } from '@angular/core';
import { PlaylistAddComponent } from './pages/playlist-add/playlist-add.component';
import { PlaylistSearchComponent } from './pages/playlist-search/playlist-search.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { HomeComponent } from './pages/home/home.component';
import { PlaylistListComponent } from './pages/playlist-list/playlist-list.component';
import { PlaylistRoutingModule } from './playlist-routing.module';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SongAddComponent } from './pages/song-add/song-add.component';



@NgModule({
  declarations: [
    PlaylistAddComponent,
    PlaylistSearchComponent,
    PlaylistComponent,
    HomeComponent,
    PlaylistListComponent,
    ConfirmComponent,
    SongAddComponent

  ],
  imports: [
    PlaylistRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class PlaylistsModule { }
