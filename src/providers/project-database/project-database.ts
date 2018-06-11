import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Project } from '../../model/interface/project';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';

/*
  Generated class for the ProjectDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectDatabaseProvider {

  constructor(
    private database:AngularFireDatabase
  ) { }

  opts: FirebaseListFactoryOpts;



  save(project:Project){
    //user.sort = this.countUser();
    return this.database.list('/project').push(project);
  }

  getList():FirebaseListObservable<Project[]>{
    this.opts = {
      query: {
        orderByChild: 'home',
        equalTo: true
      }
    };
    return this.database.list('/project',this.opts);
  }

  get(key:string):FirebaseObjectObservable<Project>{
    return this.database.object('/project/'+key);
  }

  search(keyword:string):FirebaseListObservable<Project[]>{
    this.opts = {
      query: {
        orderByChild: 'name',
        equalTo: keyword
      }
    };
    return this.database.list('/project',this.opts);
  }

  getProjectCat(category:string):FirebaseListObservable<Project[]>{
    this.opts = {
      query: {
        orderByChild: 'category',
        equalTo: category,
      }
    };
    return this.database.list('/project',this.opts);
  }

  update(project:Project){
    //user.sort = this.countUser();
    return this.database.list('/project').update(project.$key,project);
  }

  delete(project:Project){
    //user.sort = this.countUser();
    return this.database.list('/project').remove(project.$key);
  }

}
