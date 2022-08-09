import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistListComponent } from './components/playlist/playlist-list/playlist-list.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: PlaylistListComponent
  // },
  {
    path: 'playlists',
    component: PlaylistListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
