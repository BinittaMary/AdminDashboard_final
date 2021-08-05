import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule} from '@angular/forms'
import { MaterialElevationDirective } from './material-elevation.directive';
import { CourseComponent } from './course/course.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './registration/registration.component';
import { CategoryPipe } from './category.pipe';


@NgModule({
  declarations: [
    AppComponent, MaterialElevationDirective, CourseComponent, HeaderComponent, SearchFilterPipe, CourseDetailsComponent, RegistrationComponent, CategoryPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatCarouselModule.forRoot(),
    NgbModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
