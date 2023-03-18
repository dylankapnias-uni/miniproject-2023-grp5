import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesPage } from './messages.page';
const routes: Routes = [
    {
        path: 'messages',
        component: MessagesPage,
        children:[
            {
                path: 'dashboard',
                loadChildren: () =>
                  import('@mp/app/dashboard/feature').then((m) => m.DashboardModule),
            },
        ]
    }
];
//Add child for chats
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class MessagesRouting {}