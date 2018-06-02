import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GetProjectIntroProvider } from '../../providers/project/get-project-intro';
import { GetProjectProvider } from '../../providers/project/get-project';
import { GetProjectByProvinceProvider } from '../../providers/project/get-projectByProvice';
import { GetProjectByKeyWordProvider } from '../../providers/project/get-projectByKeyWord';
import { ProjectDatabaseProvider } from '../../providers/project-database/project-database';
import { Project } from '../../model/interface/project';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  listProjectIntro:any;
 
  projectList:Project[];

  constructor(public navCtrl: NavController,
              public projectIntro: GetProjectIntroProvider,
              public project: GetProjectProvider,
              public projectByProvince: GetProjectByProvinceProvider,
              public projectByKeyWord: GetProjectByKeyWordProvider,
              private projectDatabase:ProjectDatabaseProvider,
            ) {
              this.getList();
            }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectPage');
  }

  async getList(){
    await this.projectDatabase.getList().subscribe(list=>{
      this.projectList = list;
    }) 
  }

  search(ev: any){

    let keyword = ev.target.value;
    console.log(keyword);
    this.projectByKeyWord.getProjecByKeyWord(keyword).then((data:any) => {
      this.projectList = data;
    })
    
  }
  showProjectByCategory(item){
    let id=item.category_id;
    this.projectByProvince.getProjecByProvince(id).then((data:any) => {
      this.projectList = data;
    })
  }

  showDetial(item){
    // alert(item.detail)
    this.navCtrl.push("Projectdetail2Page",item);
    
  }

}
