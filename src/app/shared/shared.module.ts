import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { materialModule } from './material.module';
import { CountUpModule } from 'ngx-countup';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LightboxModule } from 'ngx-lightbox';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import {MatSliderModule} from '@angular/material/slider';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import {
  BsDatepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap/datepicker';
import { CustomPaginationModule } from './custom-pagination/custom-pagination.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GoogleMapsModule } from '@angular/google-maps';
import { LightgalleryModule } from 'lightgallery/angular';
import { FullCalendarModule } from '@fullcalendar/angular';
@NgModule({ declarations: [],
    exports: [
        CommonModule,
        materialModule,
        CountUpModule,
        CarouselModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        BsDatepickerModule,
        SlickCarouselModule,
        LightboxModule,
        TimepickerModule,
        MatSliderModule,
        
        MatSortModule,
        CustomPaginationModule,
        MatTooltipModule,
        GoogleMapsModule,
        LightgalleryModule,
        FullCalendarModule
    ], imports: [CommonModule,
        materialModule,
        CountUpModule,
        CarouselModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        SlickCarouselModule,
        LightboxModule,
        TimepickerModule,
        MatSliderModule,
        MatSortModule,
        BsDatepickerModule.forRoot(),
        CustomPaginationModule,
        MatTooltipModule,
        GoogleMapsModule,
        LightgalleryModule,
        FullCalendarModule], providers: [DatePipe, BsDatepickerConfig, provideHttpClient(withInterceptorsFromDi())] })
export class SharedModule {}
