import { NgModule } from '@angular/core';
import { PlaylistAddComponent } from './pages/playlist-add/playlist-add.component';
import { PlaylistSearchComponent } from './pages/playlist-search/playlist-search.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { HomeComponent } from './pages/home/home.component';
import { PlaylistListComponent } from './pages/playlist-list/playlist-list.component';
import { PlaylistRoutingModule } from './playlist-routing.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    PlaylistAddComponent,
    PlaylistSearchComponent,
    PlaylistComponent,
    HomeComponent,
    PlaylistListComponent
  ],
  imports: [
    PlaylistRoutingModule,
    MaterialModule
  ]
})
export class PlaylistsModule { }
