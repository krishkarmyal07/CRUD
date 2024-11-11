import { RouterModule, Routes } from '@angular/router';
// import { CrudComponent } from './components/crud/crud.component';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './component/dashboard/dashboard.component';

export const routes: Routes = [
    // { path: '', component: CrudComponent }, 
    { path: '', component: DashboardComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), BrowserAnimationsModule],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}