import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';

// Components
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { NavbarModule } from './components/shared/navbar/navbar.module';
import { FooterModule } from './components/shared/footer/footer.module';
import { AdminLayoutComponent } from './components/layouts/admin/admin-layout.component';

// services
import { ToastService } from './service/toast/toast.service';
import { AlertService } from './service/alert/alert.service';
import { GenericService } from './service/generic/GenericService';
import { AuthService } from './security/auth-service/auth.service';
import { InterceptService } from './service/interceptor/intercept-serve';
import { AuthGuardService } from './security/auth-guard/authguard.service';

// module
import { MaterialModule } from './material.module';
import { GenericModule } from './generic/generic.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateService } from './generic/translate/translate.service';
import { TRANSLATION_PROVIDERS } from './generic/translate/translations';
import { environment } from 'src/environments/environment';


@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    NavbarModule,
    FooterModule,
    CommonModule,
    SidebarModule,
    MaterialModule,
    GenericModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],

  providers: [
    AuthService,
    AlertService,
    ToastService,
    GenericService,
    AuthGuardService,
    InterceptService,
    TranslateService,
    TRANSLATION_PROVIDERS,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
  ],

  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

