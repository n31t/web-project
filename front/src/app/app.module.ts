import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BigTextComponent } from './big-text/big-text.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { GameComponent } from './game/game.component';
import { GpuComponent } from './gpu/gpu.component';
import { CpuComponent } from './cpu/cpu.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo:'main-page', pathMatch: 'full' },
      { path: 'main-page', component: BigTextComponent, title : 'Requirements Forge'},
      { path: 'game/:gameId', component: GameComponent, title : 'Game'},
      { path: 'gpu/:gpuId', component: GpuComponent, title : 'GPU'},
      { path: 'cpu/:cpuId', component: CpuComponent, title : 'CPU'},
      {path: 'search', component: SearchComponent, title : 'Search'},
      {path: '**', component: NotFoundComponent, title : 'Not Found'}
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    BigTextComponent,
    NotFoundComponent,
    SearchComponent,
    GameComponent,
    GpuComponent,
    CpuComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/