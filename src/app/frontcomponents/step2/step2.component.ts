import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit,AfterContentChecked {

  private ROOT_URL=environment.Api_Url + '/';
  formdetails:any;
  user_id:string;
  lisc_preview :string;
  allmoa_prv:string;
  allmoa_prv_images = [];
  attach_lisc:string;
  showCompProfile:boolean = false;
  attachAllFiles:string [] = [];
  todayDate:string;
  constructor(private userService:UserService, private router:Router,private ref: ChangeDetectorRef) {
  
   }

  ngOnInit(): void {
    var userdetails = JSON.parse(localStorage.getItem('userDetails'));
    this.formdetails = userdetails;
    console.log(userdetails.attach_allmoa);
    this.allmoa_prv = userdetails.attach_allmoa;
    console.log(this.allmoa_prv);
    
    // for(let i = 0; i < userdetails.attach_allmoa.length; i++){
    //   console.log(userdetails.attach_allmoa[i].path);
    // }
   
     this.attach_lisc = userdetails.attach_liscense.replace(/\\/g,'/');
     //console.log(this.attach_lisc);
     this.lisc_preview = this.ROOT_URL + this.attach_lisc;
    // console.log(this.preview);

     
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
}

  toggleCompProfile(){
    this.showCompProfile = !this.showCompProfile;
  }

  onAttachLisc(event) {
    if (event.target.files.length > 0) {
      //this.fileuploaded = true;
      const file = event.target.files[0];
      this.modelform.patchValue({
        fileSource: file
      });

      this.modelform.get('fileSource').updateValueAndValidity()
      const reader = new FileReader();
      reader.onload = () => {
        this.lisc_preview = reader.result as string;
  
      }
      reader.readAsDataURL(file)
    }
  }

  onAttachAllmoa(event){
    if (event.target.files.length > 0) {
      //this.fileuploaded = true;
      for (var i = 0; i < event.target.files.length; i++) { 
        this.attachAllFiles.push(event.target.files[i]);

        var reader = new FileReader();
   
                reader.onload = (event:any) => {
                   this.allmoa_prv_images.push(event.target.result); 
   
                  //  this.myForm.patchValue({
                  //     fileSource: this.images
                  //  });
                }
  
                reader.readAsDataURL(event.target.files[i]);
    }
    }
  }
  get f() { return this.modelform.controls; }

  replaceImgSrc(src: string){
    return src.replace(/\\/g,'/');
  }

  modelform=new FormGroup({
    fileSource: new FormControl(""),
    comp_name:new FormControl("",[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
    trade_liscense:new FormControl("",[Validators.required,Validators.minLength(5)]),
    liscense_issued:new FormControl("",Validators.required),
    date_incorp:new FormControl("",Validators.required),
    trade_expiry:new FormControl("",Validators.required),
    attach_liscense:new FormControl(""),
    last_moa:new FormControl("",Validators.required),
    attach_allmoa:new FormControl(""),
    comp_address:new FormControl("",[Validators.required, Validators.minLength(5)]),
    uae:new FormControl(""),
    emirates:new FormControl("",[Validators.required,Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]),
    area:new FormControl("",[Validators.required,Validators.minLength(5)]),
    street:new FormControl("",[Validators.required,Validators.minLength(5)]),
    building_name:new FormControl("",[Validators.required,Validators.minLength(5)]),
    floor:new FormControl("",[Validators.required,Validators.minLength(1),Validators.maxLength(3), Validators.pattern('^[0-9]+$')]),
    door_no:new FormControl("",[Validators.required,Validators.minLength(1),Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
    po_box_no:new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
    comp_profile:new FormControl(""),
    office_land:new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10), Validators.pattern('^[0-9]+$')]),
    comp_email:new FormControl("",Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')),
    website:new FormControl("",Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')),
    linkdin_page:new FormControl("",Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')),
    twitter_page:new FormControl("",Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')),
    facebook_page:new FormControl("",Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'))
  });

 step2(){
   //console.log(this.modelform.value);
   var formData: any = new FormData();
   formData.append("comp_name", this.modelform.value.comp_name);
   formData.append("trade_liscense", this.modelform.value.trade_liscense);
   formData.append("liscense_issued", this.modelform.value.liscense_issued );
   formData.append("date_incorp", this.modelform.value.date_incorp);
   formData.append("trade_expiry", this.modelform.value.trade_expiry);
   if(this.modelform.get('fileSource').value){
    formData.append('attach_liscense', this.modelform.get('fileSource').value);
   }
  
   formData.append("comp_address", this.modelform.value.comp_address);
   formData.append("uae", this.modelform.value.uae);
   formData.append("emirates", this.modelform.value.emirates);
   formData.append("area", this.modelform.value.area);
   formData.append("street", this.modelform.value.street);
   formData.append("building_name", this.modelform.value.building_name);
   formData.append("floor", this.modelform.value.floor);
   formData.append("door_no", this.modelform.value.door_no);
   formData.append("po_box_no", this.modelform.value.po_box_no);
   formData.append("comp_profile", this.modelform.value.comp_profile);
   formData.append("office_land", this.modelform.value.office_land);
   formData.append("comp_email", this.modelform.value.comp_email);
   formData.append("website", this.modelform.value.website);
   formData.append("linkdin_page", this.modelform.value.linkdin_page);
   formData.append("twitter_page", this.modelform.value.twitter_page);
   formData.append("facebook_page", this.modelform.value.facebook_page);
   formData.append("activeStep", 2);

 if(this.attachAllFiles.length > 0 ){
  for (var i = 0; i < this.attachAllFiles.length; i++) { 
    formData.append("attach_allmoa", this.attachAllFiles[i]);
  }
 }

   //console.log(this.attachAllFiles);
   if(this.formdetails._id){
    this.user_id = this.formdetails._id;
  }
  else{
   this.user_id = this.formdetails.id;
  }
   this.userService.userUpdate(formData, "/auth/", "updateprofile/" + this.user_id).subscribe(res => {
    //console.log(res);
    if (res.status == 'Active' ) {
      this.userService.setuserDetailsToken(JSON.stringify(res))
      this.router.navigate(['/user/step3']);
      //console.log(res.data);      
    }
  },
  err => {
    console.log(err);
  });
 }
}
