import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RefreshTokenInterceptor } from './core/interceptors/refresh-token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [
   
      { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

