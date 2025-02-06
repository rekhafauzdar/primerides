import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { pageSelection, PaginationService, tablePageSize } from 'src/app/shared/custom-pagination/pagination.service';
import { routes } from 'src/app/shared/routes/routes';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { DataService } from 'src/app/shared/services/data/data.service';
import {
  userBookings,
  apiResultFormat,
} from 'src/app/shared/services/model/model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  public routes = routes;
  public tableData: Array<userBookings> = [];
  dataSource!: MatTableDataSource<userBookings>;
  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;

  constructor(
    private data: DataService,
    private router: Router,
    private pagination: PaginationService,
    private commonService: CommonService,
    private fb: FormBuilder,
  ) {
    this.data.getUserBookings().subscribe((apiRes: apiResultFormat) => {
      this.totalData = apiRes.totalData;
      this.pagination.tablePageSize.subscribe((res: tablePageSize) => {
        if (this.router.url == this.routes.userBookings) {
          this.getTableData({ skip: res.skip, limit: this.totalData });
          this.pageSize = res.pageSize;
        }
      });
    });

    this.getAllCars();
    this.getCarsById();
  }

  private getTableData(pageOption: pageSelection): void {
    this.data.getUserBookings().subscribe((apiRes: apiResultFormat) => {
      this.tableData = [];
      this.serialNumberArray = [];
      this.totalData = apiRes.totalData;
      apiRes.data.map((res: userBookings, index: number) => {
        const serialNumber = index + 1;
        if (index >= pageOption.skip && serialNumber <= pageOption.limit) {
          res.id = serialNumber;
          this.tableData.push(res);
          this.serialNumberArray.push(serialNumber);
        }
      });
      this.dataSource = new MatTableDataSource<userBookings>(
        this.tableData
      );
      this.pagination.calculatePageSize.next({
        totalData: this.totalData,
        pageSize: this.pageSize,
        tableData: this.tableData,
        serialNumberArray: this.serialNumberArray,
      });
    });
  }
  public searchData(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.tableData = this.dataSource.filteredData;
  }
  initChecked = false;

  selectAll(initChecked: boolean) {
    if (!initChecked) {
      this.tableData.forEach((f) => {
        f.isSelected = true;
      });
    } else {
      this.tableData.forEach((f) => {
        f.isSelected = false;
      });
    }
  }

 // PickupDate: this.PickupDate,
    // DropupDate: this.DropupDate,
    // StartTime: this.StartTime,
    // EndTime: this.EndTime,
    // BookingDate: this.BookingDate,
    // BookingTime: this.BookingTime,
    // EndingDate: this.EndingDate,
    // EndingTime: this.EndingTime,


  locations: string[] = ["Gaur City"];
  status:number=1;
  createdBy: string ='Admin';
  pickupDate: string = '';
  dropupDate: string = '';
  startTime: string = '';
  endTime: string = '';
  bookingDate: string = '';
  bookingTime: string = '';
  endingDate: string = '';
  endingTime: string = '';
  segment: string = '';
  brand: string = '';
  modal: string = '';
  seater: string = '';
  year: string = '';
  fuel: string = '';
 
  transmission: string = '';
  firstRangePrice: string = '';
  secondRangePrice: string = '';
  thirdRangePrice: string = '';
  monthlyPrice: string = '';
  securityDeposit: string = '';
  bgColor : string = ''; 

  firstRangeKms: string = ''; 
  secondRangeKms: string = ''; 
  thirdRangeKms: string = ''; 
  monthlyKms: string = ''; 
  location: string = '';
 


  // onFileSelected(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
      
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       this.selectedFile = reader.result as string; // Base64 string store karna
  //     };
  //   }
  // }

  imageId: number = 0;
  imageUrl: string | null = null;
   selectedFile: File | null = null;
  
   onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
  
      const formData = new FormData();
  
      if (this.selectedFile) {  
        formData.append('image', this.selectedFile); 
        formData.append('imageType','Car_Image');
      }
  
      this.commonService.uploadImage(formData).subscribe({
        next: (res: any) => {
          if (res.status == "true") {
            Swal.fire('', 'Image Uploaded Successfully!', 'success');
            this.imageId = res.data.imageId; 
          } else {
            Swal.fire('', 'Image Failed to Upload!', 'error');
          }
        },
        error: (err) => {
          console.error('Error uploading image:', err);
          Swal.fire('', 'Something went wrong!', 'error');
        }
      });
    }
  }
  
  

  saveNewCar(): void {
   const payload={
    status:1,
    createdBy: 56767,
    segment: this.segment,
    brand: this.brand,
    modal: this.modal,
    seater: this.seater,
    year: this.year,
    fuel: this.fuel,
    imageId: this.imageId,
    transmission: this.transmission,
    firstRangePrice: this.firstRangePrice,
    secondRangePrice: this.secondRangePrice,
    thirdRangePrice: this.thirdRangePrice,
    monthlyPrice: this.monthlyPrice,
    securityDeposit: this.securityDeposit,
    bgColor : this.bgColor,   
    firstRangeKms: this.firstRangeKms, 
    secondRangeKms: this.secondRangeKms, 
    thirdRangeKms: this.thirdRangeKms,
    monthlyKms: this.monthlyKms,
    location: this.location, 
   }
    
    this.commonService.addNewCar(payload).subscribe({
      next:(res:any)=>{
        if (res.status == "true") {
          Swal.fire('','Car Added Sucessfully!','success');
          
        } else {
          Swal.fire('','Car Failed to Add!','error');
        }
      },
      error: (err) => {
        console.error('Error adding car:', err);
        Swal.fire('', 'Something went wrong!', 'error');
      }
      
    });
  }



  updateCar(): void {
    const payload={
      carId:"34",
      imageId: this.imageId.toString(),
    }
     
     this.commonService.updateCar(payload).subscribe({
       next:(res:any)=>{
         if (res.status == "true") {
           Swal.fire('','Car Updated Sucessfully!','success');
           
         } else {
           Swal.fire('','Car Failed to Update!','error');
         }
       },
       error: (err) => {
         console.error('Error Updating car:', err);
         Swal.fire('', 'Something went wrong!', 'error');
       }
       
     });
   }

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

  carId:number=8;
  getCarsById(){
    const payload={
      carId:this.carId.toString(),
    }
    this.commonService.getCarById(payload).subscribe((response:any) => {
      if (response.status == 'true') {
        this.carData = response.data;
       console.log(this.carData);
      } else {
        console.log("No Car Data Present");
      }
    });
  }

  editCar(){

  }
}
