import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageFormComponent } from './language/language-form/language-form.component';
import { LanguageListComponent } from './language/language-list/language-list.component';
import { FrameworkListComponent } from './framework/framework-list/framework-list.component';
import { FrameworkFormComponent } from './framework/framework-form/framework-form.component';


const routes: Routes = [
  {
    path: 'language',
    children: [
      {
        path: '',
        component: LanguageListComponent
      },
      {
        path: 'form',
        component: LanguageFormComponent
      },
      {
        path: 'form/:id',
        component: LanguageFormComponent
      }
    ]
  },
  {
    path: 'framework',
    children: [
      {
        path: '',
        component: FrameworkListComponent
      },
      {
        path: 'form',
        component: FrameworkFormComponent
      },
      {
        path: 'form/:id',
        component: FrameworkFormComponent
      }
    ]
  }, {
    path: '**',
    redirectTo: 'language'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
