import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {Platform} from "ionic-angular";
import {GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent} from "@ionic-native/google-maps";
import { ProjectDatabaseProvider } from '../../providers/project-database/project-database';
import { Project } from '../../model/interface/project';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ProjectLikeProvider } from '../../providers/project-like/project-like';

/**
 * Generated class for the Projectdetail2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projectdetail2',
  templateUrl: 'projectdetail2.html',
})
export class Projectdetail2Page {
  key:string;
  youtube:SafeResourceUrl;
  googleMap:SafeResourceUrl;
  project:Project= {status:true,home:true,category:'',contact:'',detail:'',hostelry:'',imageproject:'',gallery:null,location:'',name:'',store:'',travel:'',video:'',};
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private projectDatabase:ProjectDatabaseProvider,
              private domSanitizer:DomSanitizer,
              private projectLike:ProjectLikeProvider,
              public toastCtrl: ToastController,
            ) {
              this.project = this.navParams.data;
              
              this.youtube = this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.project.video);
              this.googleMap = this.domSanitizer.bypassSecurityTrustResourceUrl(this.project.location);
            }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Projectdetail2Page');
    this.project = this.navParams.data;

  }

  

  like(project:Project){
    this.projectLike.search(project.name).subscribe(list=>{
      if(list.length==0){
        this.projectLike.save(project).then(res=>{
          this.ok();
        })
      }else{
        this.err();
      }
    })  
    
  }


  err() {
    let toast = this.toastCtrl.create({
      message: 'ขออภัย..! โครงการนี้มีอยู่ในล้ว',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  ok() {
    let toast = this.toastCtrl.create({
      message: 'เพิ่มโครงการที่ชอบแล้ว',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

  


}
