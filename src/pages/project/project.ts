import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { GetProjectProvider } from '../../providers/project/get-project';
import { GetProjectByProvinceProvider } from '../../providers/project/get-projectByProvice';
import { GetProjectByKeyWordProvider } from '../../providers/project/get-projectByKeyWord';
import { CategoryProvider } from '../../providers/category/category';
import { ProjectDatabaseProvider } from '../../providers/project-database/project-database';
import { Project } from '../../model/interface/project';

/**
 * Generated class for the ProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {

  projectList:Project[];

  category:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheet: ActionSheetController,
              public project: GetProjectProvider,
              public projectByProvince: GetProjectByProvinceProvider,
              public projectByKeyWord: GetProjectByKeyWordProvider,
              private projectDatabase:ProjectDatabaseProvider,
              public cate: CategoryProvider) {

              this.projectDatabase.getList().subscribe(list=>{
                this.projectList = list;
              })  


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectPage');
  }

  showDetial(item){
    // alert(item.detail)
    this.navCtrl.push("Projectdetail2Page",item);
    
  }

  search(ev: any){

    let keyword = ev.target.value;
    console.log(keyword);
    this.projectByKeyWord.getProjecByKeyWord(keyword).then((data:any) => {
      this.projectList = data;
    })
    
  }

  doProvice() {
    let actionSheet = this.actionSheet.create({
      buttons: [
        {
          text: 'เชียงใหม่',
          role: 'destructive',
          handler: () => {
            let id=2;

            this.projectByProvince.getProjecByProvince(id).then((data:any) => {
              this.projectList = data;
            })
          }
        },
        {
          text: 'แม่ฮองสอน',
          role: 'destructive',
          handler: () => {
            let id=8;

            this.projectByProvince.getProjecByProvince(id).then((data:any) => {
              this.projectList = data;
            })
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  showProjectByCategory(item){
    let id=item.category_id;
    this.projectByProvince.getProjecByProvince(id).then((data:any) => {
      this.projectList = data;
    })
  }

}
