import { NgModule } from '@angular/core';
import {
    AuthGuard,
    redirectLoggedInTo,
    redirectUnauthorizedTo
} from '@angular/fire/auth-guard';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const redirectLoggedOut = () => redirectUnauthorizedTo(['']);
const redirectLoggedIn = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedIn },
    loadChildren: () =>
      import('@mp/app/welcome/feature').then((m) => m.WelcomeModule),
  },
  // {
  //   path: 'response',
  //   loadChildren: () =>
  //     import('./response/response.module').then((m) => m.ResponsePageModule),
  // },
  // {
  //   path: 'responses',
  //   loadChildren: () =>
  //     import('./responses/responses.module').then((m) => m.ResponsesPageModule),
  // },
  {
    path: 'home',
    //canActivate: [AuthGuard],
    //data: { authGuardPipe: redirectLoggedOut },

    loadChildren: () =>
      import('@mp/app/home/feature').then((m) => m.HomeModule),
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('@mp/app/messages/feature').then((m) => m.MessagesModule),
  },
  {
    path:'chat/:id',
    loadChildren: () =>
      import('@mp/app/chat/feature').then((m) => m.ChatModule),
  },
  {
    path: 'tos',
    loadChildren: () => import('@mp/app/tos/feature').then((m) => m.TosModule),
  },
  {
    path: 'privacy',
    loadChildren: () =>
      import('@mp/app/privacy/feature').then((m) => m.PrivacyModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('@mp/app/profile/feature').then((m) => m.ProfileModule),
  },
  {
    path: 'other-user/:id',
    loadChildren: () =>
      import('@mp/app/other-user/feature').then((m) => m.OtherUserModule),
  },
  // {
  //   path: 'notification',
  //   loadChildren: () =>
  //     import('@mp/app/notification/feature').then((m) => m.NotificationModule),
  // },
  {
    path: 'interests',
    loadChildren: () =>
      import('@mp/app/interests/feature').then((m) => m.interestsPageModule),
  },
  // {
  //   path: 'verify',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   data: { authGuardPipe: redirectLoggedIn },
  //   loadChildren: () =>
  //     import('./verify/verify.module').then((m) => m.VerifyPageModule),
  // },
  // {
  //   path: 'reset',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   data: { authGuardPipe: redirectLoggedIn },
  //   loadChildren: () =>
  //     import('./reset/reset.module').then((m) => m.ResetPageModule),
  // },
  // {
  //   path: 'forgot',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   data: { authGuardPipe: redirectLoggedIn },
  //   loadChildren: () =>
  //     import('./forgot/forgot.module').then((m) => m.ForgotPageModule),
  // },
  {
    path: 'register',
    pathMatch: 'full',
    loadChildren: () =>
      import('@mp/app/register/feature').then((m) => m.RegisterModule),
  },
  {
    path: 'login',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedIn },
    loadChildren: () =>
      import('@mp/app/login/feature').then((m) => m.LoginModule),

  },
  {
    path: 'welcome',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedOut },
    loadChildren: () =>
      import('@mp/app/welcome/feature').then((m) => m.WelcomeModule),
  },
  {
    path: 'settings',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedIn },
    loadChildren: () =>
      import('@mp/app/settings/feature').then((m) => m.SettingsPageModule),
  },
  {
    path: 'account',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedIn },
    loadChildren: () =>
      import('@mp/app/account/feature').then((m) => m.AccountPageModule),
  },

  {
    path: 'edit-profile',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedIn },
    loadChildren: () =>
      import('@mp/app/edit-profile/feature').then((m) => m.EditProfilePageModule),
  },

  {
    path: 'shop',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedIn },
    loadChildren: () =>
      import('@mp/app/shop/feature').then((m) => m.ShopPageModule),
  },

  {
    path: 'about',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedIn },
    loadChildren: () =>
      import('@mp/app/about/feature').then((m) => m.AboutPageModule),
  },

  {
    path: 'privacy-policy',
    pathMatch: 'full',
    loadChildren: () =>
      import('@mp/app/privacy-policy/feature').then((m) => m.PrivacyPolicyPageModule),
  },
  
  {
    path: 'updates',
    pathMatch: 'full',
    loadChildren: () =>
      import('@mp/app/updates/feature').then((m) => m.UpdatesPageModule),
  },

  {
    path: 'blocked',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLoggedIn },
    loadChildren: () =>
      import('@mp/app/blocked/feature').then((m) => m.BlockedPageModule),
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('@mp/app/messages/feature').then((m) => m.MessagesModule),
  },
  {
    path: 'chat/:id',
    loadChildren: () =>
      import('@mp/app/chat/feature').then((m) => m.ChatModule),
  },
  {
    path: 'profile',
    // canActivate: [AuthGuard],
    // data: { authGuardPipe: redirectLoggedIn },
    loadChildren: () =>
      import('@mp/app/profile/feature').then((m) => m.ProfileModule),
  },
  {
    path: 'notifications',
    // canActivate: [AuthGuard],
    // data: { authGuardPipe: redirectLoggedIn },
    loadChildren: () =>
      import('@mp/app/notifications/feature').then((m) => m.notificationsPageModule),
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class CoreRouting {}