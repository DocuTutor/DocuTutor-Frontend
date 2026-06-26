import { Routes } from '@angular/router';
import { DashboardShellComponent } from './layouts/dashboard/dashboard-shell.component';
import { DashboardPage } from './features/dashboard/pages/dashboard/dashboard.page';
import { WorkspacePage } from './features/workspace/pages/workspace/workspace.page';
import { SettingsComponent } from './features/settings/components/settings-component/settings-component';
import { UploadDocumentPage } from './features/documents/pages/upload-document/upload-document.page';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { LoginComponent } from './features/authentication/pages/login/login.component';
import { RegisterComponent } from './features/authentication/pages/register/register.component';
import { ResetPasswordComponent } from './features/authentication/pages/reset-password/reset-password.component';

export const routes: Routes = [
  {
  path: '',
  component: AppLayoutComponent,
  children: [
  ],
},
  {
  path: 'dashboard',
  component: DashboardShellComponent,
  children: [
    { path: '', component: DashboardPage },
    { path: 'upload', component: UploadDocumentPage },
    { path: 'documents/:id', component: WorkspacePage },
    { path: 'settings', component: SettingsComponent },
  ],
},
 {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {path:'reset-password',component:ResetPasswordComponent}
    ]
  }
];
