import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { GetVideoProvider } from '../../providers/video/get-video';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { VideoDatabaseProvider } from '../../providers/video-database/video-database';
import { Video } from '../../model/interface/video';
/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  videoList:Video[];
  linkList=[];

  l:string="https://www.youtube.com/embed/y782WflFL-U";
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public getVideo: GetVideoProvider,
              public loadingCtrl: LoadingController,
              private domSanitizer: DomSanitizer,
              private videoDatabase:VideoDatabaseProvider
            ){
                this.videoDatabase.getList().subscribe(list=>{
                  this.videoList = list;
                  console.log(list);
                  this.videoList.forEach(video=>{
                    let url = this.dom(video.link);
                    this.linkList.push({link:url,title:video.name,detail:video.detail});
                  })
                })

                console.log(this.linkList);
                
              }
    trustedVideoUrl: SafeResourceUrl;
    loading: Loading;

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
  }

  dom(id):SafeResourceUrl{
    return this.domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+id);
  }


}
