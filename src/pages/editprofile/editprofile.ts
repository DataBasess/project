import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDatabaseProvider } from '../../providers/user-database/user-database';
import { User } from '../../model/interface/User';

/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  user:FormGroup;
  uid:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App,
    public formBuilder: FormBuilder,
    private userDatabase:UserDatabaseProvider,
    public toastCtrl: ToastController,
  ) {
    this.form();
    this.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  getUser(){
    let uid = localStorage.getItem("user_id");
    this.userDatabase.get(uid).subscribe(user=>{  
      this.user.setValue(user);
      this.uid = user.$key;
      console.log(user);
      
    })
  }


  form(){

    this.user = this.formBuilder.group({
      name:['',Validators.compose([Validators.required,
                                         Validators.minLength(3),
                                         Validators.maxLength(30)
                                        ])],
      last_name:['',Validators.compose([Validators.required,
                                        Validators.minLength(3),
                                        Validators.maxLength(30)
                                        ])],
      password:['',Validators.compose([Validators.required,
                                                  Validators.minLength(8),
                                                  Validators.pattern("[a-zA-Z0-9.-_*#@$%&!]{1,}")])],
      con_password:['',Validators.compose([Validators.required,
                                                    Validators.minLength(8),
                                                    Validators.pattern("[a-zA-Z0-9.-_*#@$%&!]{1,}")])],
      email:['',Validators.compose([Validators.required,
                                                  Validators.email])],
      age:['',Validators.compose([Validators.required])],
      sex:['',Validators.compose([Validators.required])],
      permission:[true]
      
    })

  }

  update(user:FormGroup){
    console.log(user.value);
    let profile:User = user.value;
    this.userDatabase.update(this.uid,profile).then(res=>{
      this.addUserSuccess();
      this.navCtrl.setRoot("UserPage")
        const root = this.app.getRootNav();
              root.popToRoot();
    })    
  }

  addUserSuccess() {
    let toast = this.toastCtrl.create({
      message: 'อัพเดทข้อมูลสำเร็จ',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
