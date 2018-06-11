import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, App, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { LoginProvider } from '../../providers/user/login';
import { TabsPage } from '../tabs/tabs';
import { UserPage } from '../user/user';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user:FormGroup;
  user1:User;

  checkLogin:Boolean;
  profile:User=null;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public loginProvider: LoginProvider,
              public toastCtrl: ToastController,
              private app:App,
              private angularFireAuth:AngularFireAuth,
              public alertCtrl: AlertController,
              ) {

                this.form();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.form();
    


  }

  form(){

    this.user = this.formBuilder.group({

      password:['',Validators.compose([Validators.required,
                                                  Validators.minLength(8),
                                                  Validators.pattern("[a-zA-Z0-9.-_*#@$%&!]{1,}")])],
      email:['',Validators.compose([Validators.required,
                                                  Validators.email])]
    })

  }

  login(user:User){
    let form:User = this.user.value;
    console.log('user===',form);
    this.angularFireAuth.auth.signInWithEmailAndPassword(form.email,form.password).then(user=>{
      this.loginProvider.getUser(user.uid).subscribe((account:User)=>{
        if(account.permission){
          this.loginSuccess()
          this.profile = account;
          console.error("uer===",account);
          localStorage.setItem("user_id",user.uid);
          localStorage.setItem("email",account.email);
          localStorage.setItem("name",account.name);

          this.navCtrl.setRoot(TabsPage);    
          const root = this.app.getRootNav();
          root.popToRoot();
        }else{
          this.invalid();
          this.navCtrl.setRoot('LoginPage');    
          const root = this.app.getRootNav();
          root.popToRoot();
        }
        
      })
    }).catch(e=>{
        this.invalid();
        this.navCtrl.setRoot('LoginPage');    
        const root = this.app.getRootNav();
        root.popToRoot();
    });

    // this.login_.loginProvider(this.user.value).then(user=>{

    //   this.user1 = user;
    //   if(this.user1!=null){
    //     this.loginSuccess()
    //     console.error("uer===",this.user1);

    //     localStorage.setItem("user_id",this.user1.user_id);
    //     localStorage.setItem("email",this.user1.email);
    //     localStorage.setItem("name",this.user1.name);
    //     // localStorage.setItem("last_name",this.user1.last_name);
    //     //  this.navCtrl.push("UserPage");
    //     this.navCtrl.setRoot(TabsPage);    
    //     const root = this.app.getRootNav();
    //     root.popToRoot();
    //   }
    //   else{
    //     this.invalid();
    //     this.navCtrl.setRoot('LoginPage');    
    //     const root = this.app.getRootNav();
    //     root.popToRoot();
    //   }

    // })

  }

  loginSuccess() {
    let toast = this.toastCtrl.create({
      message: 'ลงชื่อเข้าใช้สำเร็จ',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  invalid() {
    let toast = this.toastCtrl.create({
      message: 'ข้อมูลผู้ใช้ไม่ถูกต้อง',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  fogot(){
          let prompt = this.alertCtrl.create({
            title: 'กรอก"Email"',
            message: "กรุณากรอก 'Email' เพื่อรับลิงค์",
            inputs: [
              {
                name: 'email',
                placeholder: 'Email'
              },
            ],
            buttons: [
              {
                text: 'ยกเลิก',
                handler: data => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'ส่งอีเมล',
                handler: data => {
                  console.log('Saved clicked',data.email);
                  this.angularFireAuth.auth.sendPasswordResetEmail(data.email).then(r=>{
                    this.showToast();
                  }).catch(e=>{
                    this.fogot();
                  })
                }
              }
            ]
          });
          prompt.present();
    }

    showToast() {
      let toast = this.toastCtrl.create({
        message: 'กรุณาตรวจสอบ Email',
        duration: 5000,
        position: 'middle'
      });
  
      toast.present(toast);
    }



}


