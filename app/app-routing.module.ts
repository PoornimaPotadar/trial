import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirlinesListComponent } from './airlines-list/airlines-list.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
/* Import the necessary files here */

/* DONE
  1. Configure the routes here to load the routed components
    -- for 'airlines' route path, it should load AirlinesListComponent
    -- for 'book-ticket/:airlinesId' route path, it should load BookTicketComponent
  2. Any invalid route should redirect to Airlines Page
*/
const routes: Routes = [
  {
    path: 'airlines',
    component: AirlinesListComponent,
  },
  {
    path: 'book-ticket/:airlinesId',
    component: BookTicketComponent,
  },
  {
    path: '**',
    redirectTo: 'airlines',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
