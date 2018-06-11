import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Creatarticle } from '../../model/interface/creatarticle';

/**
 * Generated class for the ArticledetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-articledetail',
  templateUrl: 'articledetail.html',
})
export class ArticledetailPage {
  article:Creatarticle={name:'',detail:'',status:'',uid:'',Img:'',date:''};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams
            ) {
              this.article = this.navParams.data;
            }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticledetailPage');    
  }

}
