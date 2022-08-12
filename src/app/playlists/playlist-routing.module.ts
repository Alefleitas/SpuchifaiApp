import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistAddComponent } from './pages/playlist-add/playlist-add.component';
import { PlaylistListComponent } from './pages/playlist-list/playlist-list.component';
import { HomeComponent } from './pages/home/home.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'playlist-add',
        component: PlaylistAddComponent
      },
      {
        path: 'playlist-list',
        component: PlaylistListComponent
      },
      {
        path: 'playlist-edit/:playlistName',
        component: PlaylistAddComponent
      },
      {
        path: 'playlist-search',
        component: PlaylistAddComponent
      },
      {
        path: ':playlistName',
        component: PlaylistComponent
      },
      {
        path: '**',
        redirectTo: 'playlist-list'
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PlaylistRoutingModule { }
