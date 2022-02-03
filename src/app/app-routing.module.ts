import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RoverComponent } from './components/rover/rover.component';

const routes: Routes = [
  { path: 'rover/1', component: RoverComponent },
  { path: 'rover/2', component: RoverComponent },
  { path: 'rover/3', component: RoverComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [RoverComponent, HomeComponent];
