import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { Project } from '../../model/interface/project';

/*
  Generated class for the ProjectLikeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectLikeProvider {

  constructor(
    private database:AngularFireDatabase
  ) { }

  opts: FirebaseListFactoryOpts;


  search(keyword:string):FirebaseListObservable<Project[]>{
    let uid = localStorage.getItem("user_id");
    this.opts = {
      query: {
        orderByChild: 'name',
        equalTo: keyword
      }
    };
    return this.database.list('/Like/'+uid,this.opts);
  }

  save(project:Project){
    let uid = localStorage.getItem("user_id");
    return this.database.list('/Like/'+uid).push(project);
  }

  remove(key:string){
    let uid = localStorage.getItem("user_id");
    return this.database.list('/Like/'+uid).remove(key);
  }

  getList():FirebaseListObservable<Project[]>{
    let uid = localStorage.getItem("user_id");
    return this.database.list('/Like/'+uid);
  }

  

}
