import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {

  modelform: FormGroup;
  private ROOT_URL=environment.Api_Url + '/';
  showResident:boolean = false;
  attachPassPrev = [];
  attachEmidPrev = [];
  formdetails:any = [];
  user_id:string;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    var userdetails = JSON.parse(localStorage.getItem('userDetails'));
    //console.log(userdetails.BusinessDetailsArray);
    this.formdetails = userdetails;

    this.modelform = this.formBuilder.group({
      businessDetailsArray: new FormArray([]),
    })

    if (this.formdetails.BusinessDetailsArray && this.formdetails.BusinessDetailsArray.length > 0) {
      
      var ind = 0
      for (let formdetaildata of this.formdetails.BusinessDetailsArray) {
        //console.log(formdetaildata.emid);
        if(formdetaildata.attachpass && formdetaildata.attachpass.length > 0){
          //console.log(formdetaildata.attachpass);
          
          this.attachPassPrev[ind] = this.ROOT_URL + formdetaildata.attachpass.replace(/\\/g,'/');
          console.log(this.attachPassPrev[ind]);
          
        }
        if(formdetaildata.emid && formdetaildata.emid.length > 0){
          this.attachEmidPrev[ind] = this.ROOT_URL + formdetaildata.emid.replace(/\\/g,'/');
          console.log(this.attachEmidPrev[ind]);
          
        }
        
        ind++;
        

        this.t.push(this.formBuilder.group({
          busifirstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
          busimiddleName: ['', [Validators.pattern('^[a-zA-Z ]*$')]],
          busilastName: ['', [Validators.pattern('^[a-zA-Z ]*$')]],
          busiCcode: ['', Validators.required],
          busimobile: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10), Validators.pattern('^[0-9]+$')]],
          busiemail: ['', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
          Ownership: ['', Validators.required],
          shareholding: ['', [Validators.required,Validators.maxLength(3),Validators.pattern('^[0-9]+$')]],
          busidob: ['', Validators.required],
          nationality: ['', Validators.required],
          passNo: ['', [Validators.required,Validators.maxLength(16),Validators.pattern('^[0-9]+$')]],
          dateIssue: ['', Validators.required],
          expDate: ['',Validators.required],
          resident: [''],
          emiratesId: ['',[Validators.maxLength(16),Validators.pattern('^[0-9]+$')]],
          uaeissuedate: [''],
          uaeexpdate: [''],
          attachpass: [''],
          emid: [''],
          recentbill: ['',[Validators.maxLength(16),Validators.pattern('^[0-9]+$')]],
        }));

       }
      this.t.patchValue(this.formdetails.BusinessDetailsArray);
      

  }
  else{
   // console.log("test");
    this.t.push(this.formBuilder.group({
      busifirstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      busimiddleName: ['', [Validators.pattern('^[a-zA-Z ]*$')]],
      busilastName: ['', [Validators.pattern('^[a-zA-Z ]*$')]],
      busimobile: ['', Validators.required],
      busiCcode: ['', Validators.required],
      busiemail: ['', Validators.required],
      Ownership: ['', Validators.required],
      shareholding: ['', Validators.required],
      busidob: ['', Validators.required],
      nationality: ['', Validators.required],
      passNo: ['', Validators.required],
      dateIssue: ['', Validators.required],
      expDate: ['',Validators.required],
      resident: [''],
      emiratesId: [''],
      uaeissuedate: [''],
      uaeexpdate: [''],
      attachpass: [''],
      emid: [''],
      recentbill: [''],
    }));
  }


}

fileup(event, index){
  //console.log(event.target.files[0]);
  if(event.target.files){
    const reader = new FileReader();
    reader.onload = () => {
      this.attachPassPrev[index] = reader.result as string;
      //console.log(this.attachPassPrev[index]);

    }
    reader.readAsDataURL(event.target.files[0])
  }


}

attachemid(event, indx){
  
  if(event.target.files){
    
    const reader = new FileReader();
    reader.onload = () => {
      this.attachEmidPrev[indx] = reader.result as string;
      //console.log(this.attachEmidPrev[indx]);

    }
    reader.readAsDataURL(event.target.files[0])
  }
 
}

  get f() { return this.modelform.controls; }
  get t() { return this.f.businessDetailsArray as FormArray; }
  get add_compDetails(): FormArray {
		return this.modelform.get('busifirstname') as FormArray;
	}

  add_compDet() {
    this.t.push(this.formBuilder.group({
      busifirstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      busimiddleName: ['', [Validators.pattern('^[a-zA-Z ]*$')]],
      busilastName: ['', [Validators.pattern('^[a-zA-Z ]*$')]],
      busimobile: ['', Validators.required],
      busiCcode: ['', Validators.required],
      busiemail: ['', Validators.required],
      Ownership: ['', Validators.required],
      shareholding: ['', Validators.required],
      busidob: ['', Validators.required],
      nationality: ['', Validators.required],
      passNo: ['', Validators.required],
      dateIssue: ['', Validators.required],
      expDate: ['', Validators.required],
      resident: [''],
      emiratesId: [''],
      uaeissuedate: [''],
      uaeexpdate: [''],
      attachpass: [''],
      emid: [''],
      recentbill: [''],
    }));
  }

  delete_compDetails(numder, sclass) {
    this.t.removeAt(numder - 1);
    
  }


  step3(){
     //console.log(this.modelform.value);
     var businessDetailsArray = this.modelform.get('businessDetailsArray').value
     var formData: any = new FormData();
     for (let i = 0; i < businessDetailsArray.length; i++) {
  
      if((<HTMLInputElement>document.getElementById('file' + i))){
        const selectedFileList = (<HTMLInputElement>document.getElementById('file' + i)).files;
        const attachpass = selectedFileList.item(0);
        if (attachpass ) {
          formData.append("attachpass",attachpass);
          businessDetailsArray[i].attachpass = attachpass.name;
        }
      }
      if((<HTMLInputElement>document.getElementById('file2' + i))){
        const selectedFileList2 = (<HTMLInputElement>document.getElementById('file2' + i)).files;
        const emid = selectedFileList2.item(0);
      //console.log(emid.name);
      
      if (emid ) {
        formData.append("emid",emid);
        businessDetailsArray[i].emid = emid.name;
       
      }
      }



   }

   formData.append("BusinessDetailsArray",JSON.stringify(businessDetailsArray));

   if(this.formdetails._id){
    this.user_id = this.formdetails._id;
  }
  else{
   this.user_id = this.formdetails.id;
  }
   this.userService.userUpdate(formData, "/auth/", "updateprofile/" + this.user_id).subscribe(res => {
    console.log(res);
    if (res.status == 'Active' ) {
      this.userService.setuserDetailsToken(JSON.stringify(res))
      this.router.navigate(['/user/thankyou']);
      //console.log(res.data);      
    }
  },
  err => {
    console.log(err);
  });
     
  }

}
