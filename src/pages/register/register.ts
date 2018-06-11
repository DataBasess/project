import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from '../../model/user';
import { RegisterProvider } from '../../providers/user/register';
import { TabsPage } from '../tabs/tabs';
import { UserPage } from '../user/user';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user:FormGroup;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public app: App,
              public formBuilder: FormBuilder,
              //public addUser: AddUserProvider,
              private angularFireAuth:AngularFireAuth,
              public toastCtrl: ToastController,
              public regis: RegisterProvider){

              this.form()
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');

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
  register(user:User){
    

    let form:User = this.user.value;
    console.log('user===',form);

    this.angularFireAuth.auth.createUserWithEmailAndPassword(form.email,form.password).then(profile=>{
      this.regis.createUser(profile.uid,form).then(res=>{
        this.navCtrl.setRoot("UserPage")
        const root = this.app.getRootNav();
              root.popToRoot();
      })
      
    }).catch(e=>{
      this.addUserNon_Success();
    }) 
    // this.regis.Register(this.user.value).then((data:User) => {

    //   if(data != null){
    //     this.addUserSuccess();

    //     localStorage.setItem("user_id",data.user_id);
    //     localStorage.setItem("email",data.email);
    //     localStorage.setItem("name",data.name);
    //     // localStorage.setItem("last_name",data.last_name);

    //     this.navCtrl.setRoot(UserPage);    
    //     const root = this.app.getRootNav();
    //     root.popToRoot();
    //   }
    //   else{
    //     this.addUserNon_Success();
    //   }

    // });
  }

  addUserSuccess() {
    let toast = this.toastCtrl.create({
      message: 'ลงทะเบียนสำเร็จ',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  addUserNon_Success() {
    let toast = this.toastCtrl.create({
      message: 'ขออภัย..! มีอีเมล์นี้อยู่ในระบบแล้ว',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}
