import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ArticleProvider } from '../../providers/article/article';
import { CreatarticleProvider } from '../../providers/creatarticle/creatarticle';
import { Creatarticle } from '../../model/interface/creatarticle';

/**
 * Generated class for the ArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {


  articleList:Creatarticle[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public article: ArticleProvider,
              public CreatarticleProvider:CreatarticleProvider
            ) {
              this.getAll();
            }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePage');
  }

  getAll(){
    this.CreatarticleProvider.getAll().subscribe(list=>{
      this.articleList = list;
      console.log(this.articleList);
      
    })
  }

  
  showContent(item){
    this.navCtrl.push("ArticledetailPage",item);

    
  }
    
  
  }


