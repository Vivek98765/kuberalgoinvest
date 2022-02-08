import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component implements OnInit,AfterContentChecked {
  private ROOT_URL=environment.Api_Url;
  formdetails:any;
  preview :string;
  user_id:string;
  image_url:string;
  imgs:string;
  constructor(public userService : UserService, private router: Router,private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
      var userdetails = JSON.parse(localStorage.getItem('userDetails'));
      //console.log(userdetails.id);
      this.formdetails = userdetails;
      this.imgs = userdetails.business_card.replace(/\\/g,'/');
      this.preview = this.ROOT_URL+ '/' + this.imgs;
      // console.log(this.preview);    
      // if(this.imgs){
      //   this.modelform.patchValue({
      //   business_card:this.preview
      // })
      // }
      
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
}

  onFileChange(event) {
    if (event.target.files.length > 0) {
      //this.fileuploaded = true;
      const file = event.target.files[0];
      this.modelform.patchValue({
        fileSource: file
      });
    
      this.modelform.get('fileSource').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;

    }
    reader.readAsDataURL(file)
    }
  }

  get f() { return this.modelform.controls; }
  
  modelform=new FormGroup({
    fileSource: new FormControl(""),
    username:new FormControl("",[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    middlename:new FormControl("",Validators.pattern('^[a-zA-Z ]*$')),
    lastname:new FormControl("",Validators.pattern('^[a-zA-Z ]*$')),
    email:new FormControl("",Validators.required),
    designation:new FormControl("",[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    contact_land:new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
    contact_mob:new FormControl("",[Validators.required, Validators.minLength(10),Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
    countryCodeMob:new FormControl("",Validators.required),
    business_card:new FormControl(""),
    agree:new FormControl("",Validators.required),
    recieve_sms:new FormControl("")
  });



 step1(){
   //console.log(this.modelform.value);
   var formData: any = new FormData();
    formData.append("username", this.modelform.value.username);
    formData.append("middlename", this.modelform.value.middlename);
    formData.append("lastname", this.modelform.value.lastname);
    formData.append("designation", this.modelform.value.designation);
    formData.append("contact_land", this.modelform.value.contact_land);
    formData.append("countryCodeMob", this.modelform.value.countryCodeMob);
    formData.append("contact_mob", this.modelform.value.contact_mob);
   // formData.append("business_card", this.modelform.value.business_card);
    formData.append("agree", this.modelform.value.agree);
    formData.append("recieve_sms", this.modelform.value.recieve_sms);
    formData.append("activeStep", 1);
    if(this.modelform.get('fileSource').value){
        formData.append('business_card', this.modelform.get('fileSource').value);
    }
    

   //console.log(formData);
   if(this.formdetails._id){
     this.user_id = this.formdetails._id;
   }
   else{
    this.user_id = this.formdetails.id;
   }
   this.userService.userUpdate(formData, "/auth/", "updateprofile/" + this.user_id).subscribe(res => {
    //console.log(res);
    if (res.status == "Active" ) {
      this.userService.setuserDetailsToken(JSON.stringify(res))
      //this.country_list=res.data;
      //alert("Data Added Successfully!");
      this.router.navigate(['/user/step2']);
      //console.log(res.data);
      
    }
  },
  err => {
    console.log(err);
  });
   
   
   //this.userService.userUpdate(this.modelform.value, '/auth/', 'updateprofile',this.id)
 }
}
