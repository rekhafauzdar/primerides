import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from 'src/app/shared/routes/routes';
import { DataService } from 'src/app/shared/services/data/data.service';
import { listingGrid } from 'src/app/shared/services/model/model';
import { CommonService } from 'src/app/shared/services/common/common.service';
interface data {
  value: string;
}
@Component({
  selector: 'app-listing-grid',
  templateUrl: './listing-grid.component.html',
  styleUrls: ['./listing-grid.component.css'],
})
export class ListingGridComponent {
  public selectedValue1!: string;
  public selectedValue2!: string;
  public selectedValue3!: string;
  public listingGrid: listingGrid[] = [];

  constructor(
    private data: DataService,private datePipe: DatePipe,
    private commonService: CommonService){
 
    this.listingGrid = this.data.listingGrid;
    this.getAllCars();
    
    }

  public routes = routes;

  slidevalue = 55;

  selectedList1: data[] = [
    { value: '5' },
    { value: '10' },
    { value: '15' },
    { value: '20' },
  ];
  selectedList2: data[] = [{ value: 'Newest' }, { value: 'Relevance' },{ value: 'Low to High' },{ value: 'High to Low' },{ value: 'Best Rated' },{ value: 'Distance' },{ value: 'Popularity' }];
  selectedList3: data[] = [
    { value: 'Popular' },
    { value: 'Toyota Camry SE 350' },
    { value: 'Audi A3 2019 new' },
    { value: 'Ferrari 458 MM Speciale' },
    { value: 'Chevrolet Camaro' },
    { value: 'Acura Sport Version' },
  ];
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return `${value}`;
  }
  carOwlOptions: OwlOptions = {
    items: 4,
    margin: 24,
    nav: true,
    dots: false,
    loop: true,
    rtl: false,
    navText: [
      "<i class='fa-solid fa-arrow-left'></i>",
      "<i class='fa-solid fa-arrow-right'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 3,
      },
      1170: {
        items: 3,
      },
      1200: {
        items: 3,
      },
    },
  };
  toggleClass(index: number) {
    this.isClassAdded[index] = !this.isClassAdded[index];
  }
  public isClassAdded: boolean[] = [false];
  toggleTimePicker(value: string): void {
    if (this.showTimePicker[0] !== value) {
      this.showTimePicker[0] = value;
    } else {
      this.showTimePicker = [];
    }
  }
  formatTime(date: Date) {
    const selectedDate: Date = new Date(date);
    return this.datePipe.transform(selectedDate, 'h:mm a');
  }
  showTimePicker: Array<string> = [];
  myTime: Date = new Date();
  myTime2: Date = new Date();

  location: string = '';
  cityLocations: string[] = ["Indirapuram","IGI Airport","Gaur City"];
  bookingDate: string = '';
  bookingTime: string = '';
  endingDate: string = '';
  endingTime: string = '';
  city: string = '';
  pickupLocation: string = '';
  transmission: string = '';
  fuel: string = '';
  seater:  string = '';
  carData:any;

  getAllCars(){
    this.commonService.getAllCar().subscribe((response:any) => {
      if (response.status == 'true') {
       this.carData = response.data;
       console.log(this.carData);
      } else {
        console.log("No Cars Data Present");
      }
    });
  }

  searchCarAvailibility(){
    const payload={      
        bookingDate: this.bookingDate,
        bookingTime: this.bookingDate,
        endingDate: this.bookingDate,
        endingTime: this.bookingDate,
        city: this.bookingDate,
        pickupLocation: this.bookingDate,
        transmission: this.bookingDate,
        fuel: this.bookingDate,
        seater:   this.seater,        
    }

    this.commonService.getCarAvailibility(payload).subscribe((response:any) => {
      if (response.status == 'true') {
       this.carData = response.data;
       console.log(this.carData);
      } else {
        console.log("No Cars Data Present");
      }
    });
  }
}
