import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { DataService } from 'src/app/shared/services/data/data.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent {
  public routes = routes;

 constructor(
    private data: DataService, private datePipe: DatePipe,
    private commonService:CommonService
  ) {}
  
  userProfileData:any;
  userProfileId:string='';
  getUserProfileById(){
    const payload ={
        userProfileId: this.userProfileId.toString(),
    }
    this.commonService.getUserProfileById(payload).subscribe((response:any) => {
      if (response.status == 'true') {
       this.userProfileData = response.data;
       console.log(this.userProfileData);
      } else {
        console.log("No Cars Data Present");
      }
    });
  }
}
