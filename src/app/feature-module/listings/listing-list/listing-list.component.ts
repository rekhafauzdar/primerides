import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { routes } from 'src/app/shared/routes/routes';
interface data {
  value: string ;
}
@Component({
  selector: 'app-listing-list',
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.css']
})
export class ListingListComponent {
  public routes = routes;
  public selectedValue1 !: string;
  public selectedValue2 !: string;
  public selectedValue3 !: string;

  selectedList1: data[] = [
    { value: '5' },
    { value: '10' },
    { value: '15' },
    { value: '20' },
  ];
  selectedList2: data[] = [
    { value: 'Low to High' },
    { value: 'High to Low' },
  ];
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
  public isClassAdded: boolean[] = [false];
  toggleClass(index: number) {
    this.isClassAdded[index] = !this.isClassAdded[index];
  }
  toggleTimePicker(value: string): void {
    if (this.showTimePicker[0] !== value) {
      this.showTimePicker[0] = value;
    } else {
      this.showTimePicker = [];
    }
  }
  constructor(private datePipe: DatePipe) {
   
  }
  formatTime(date: Date) {
    const selectedDate: Date = new Date(date);
    return this.datePipe.transform(selectedDate, 'h:mm a');
  }
  showTimePicker: Array<string> = [];
  myTime: Date = new Date();
  myTime2: Date = new Date();
  carimagesliderOwlOptions: OwlOptions = {
    loop:true,
    margin:30,
    nav:true,
    dots:true,
    smartSpeed: 2000,
    autoplay:false,
    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>'
    ],
    responsive:{
      0:{
        items:1
      },				
      550:{
        items:1
      },
      768:{
        items:1
      },
      1000:{
        items:1
      }
    }
  };
  public ngAfterViewInit(): void{
    window.dispatchEvent(new Event('resize'))
  }
}
