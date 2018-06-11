import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user_id:string;
  checkLogin:Boolean;
  name:string='';
  email:string='';

  constructor(public navCtrl: NavController, 
              private app: App,
              public alt: AlertController,
              public navParams: NavParams,
              private angularFireAuth:AngularFireAuth,
            ) {

                this.user_id = localStorage.getItem('user_id'); 
                console.log(this.user_id);
                
                let user_id = localStorage.getItem("user_id");


               let user=localStorage.getItem('user_id'); 
               if(user!=null){
                this.name = localStorage.getItem('name');
                this.email = localStorage.getItem('email');     
                this.checkLogin = true;
               }else{
                this.checkLogin = false;
              }
              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  logout() {
    localStorage.clear();
    this.angularFireAuth.auth.signOut();
    this.navCtrl.setRoot(UserPage);    
        const root = this.app.getRootNav();
        root.popToRoot();
  }

  checkUserId(n){

    if(this.user_id!=null && n==1){
      this.navCtrl.push("SaveprojectPage");
    }
    else if(this.user_id!=null && n==2){
      this.navCtrl.push("MyarticlePage");
    }
    else if(this.user_id!=null && n==3){
      this.navCtrl.push("EditprofilePage");
    }
    else{
      this.showAlert();
    }

  }

  showAlert(){
    let alert = this.alt.create({
      title: 'ขออภัย!',
      subTitle: 'กรุณาเข้าสู่ระบบ',
      buttons: ['ปิด']
    });
    alert.present();
  }

  home(){
    this.navCtrl.setRoot(TabsPage);    
    const root = this.app.getRootNav();
    root.popToRoot();
  }
  
}
