import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectLikeProvider } from '../../providers/project-like/project-like';
import { Project } from '../../model/interface/project';

/**
 * Generated class for the SaveprojectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-saveproject',
  templateUrl: 'saveproject.html',
})
export class SaveprojectPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private projectLike:ProjectLikeProvider,
  ) {
    this.getList();
  }
  projectList:Project[];
  ionViewDidLoad() {
    console.log('ionViewDidLoad SaveprojectPage');
  }
  
  getList(){
    this.projectLike.getList().subscribe(list=>{
      this.projectList = list;
      console.log(list);
      
    })
  }

  remove(project:Project){
    this.projectLike.remove(project.$key);
  }

}
