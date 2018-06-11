import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CreatarticleProvider } from '../../providers/creatarticle/creatarticle';
import { Creatarticle } from '../../model/interface/creatarticle';

/**
 * Generated class for the MyarticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myarticle',
  templateUrl: 'myarticle.html',
})
export class MyarticlePage {
  CreatarticleList:Creatarticle[]
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public CreatarticleProvider:CreatarticleProvider
  ) {
    this.getlist();
  }

  ionViewDidLoad() {
    let uid = localStorage.getItem("user_id");
    console.log('ionViewDidLoad MyarticlePage',uid);
  }
  getlist(){
    this.CreatarticleProvider.getlist().subscribe(list=>{
      console.log(list);
      this.CreatarticleList=list
      
    })
  }

  showContent(item){
    this.navCtrl.push("ArticledetailPage",item);

  }
  delete(creatarticle:Creatarticle){    
    let key = creatarticle.$key;
    console.log(key);
    this.CreatarticleProvider.delete(key).then(res=>{
      console.log(res);      
    });

  }

}
