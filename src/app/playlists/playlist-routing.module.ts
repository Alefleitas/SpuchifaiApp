import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistAddComponent } from './pages/playlist-add/playlist-add.component';
import { PlaylistListComponent } from './pages/playlist-list/playlist-list.component';

const routes: Routes = [
  {
    path: '',
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
        path: 'playlist-add',
        component: PlaylistAddComponent
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
        component: PlaylistAddComponent
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
