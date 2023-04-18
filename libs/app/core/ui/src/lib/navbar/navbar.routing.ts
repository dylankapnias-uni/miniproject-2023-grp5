import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    children: [
        {
          path: 'messages',
          loadChildren: () =>
            import('@mp/app/messages/feature').then((m) => m.MessagesModule),
        },
        {
          path: 'profile',
          loadChildren: () =>
            import('@mp/app/profile/feature').then((m) => m.ProfileModule),
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: '/home/dashboard',
        },
      ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavbarRouting {}