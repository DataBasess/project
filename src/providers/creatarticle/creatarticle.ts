import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Creatarticle } from '../../model/interface/creatarticle';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';

/*
  Generated class for the CreatarticleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CreatarticleProvider {
  opts: FirebaseListFactoryOpts;
  constructor(
    public http: HttpClient,
    private database:AngularFireDatabase
  ) {
    console.log('Hello CreatarticleProvider Provider');
  }
  save(creatarticle:Creatarticle){
    //user.sort = this.countUser();
    return this.database.list('/Creatarticle').push(creatarticle);

  }

  getAll():FirebaseListObservable<Creatarticle[]>{
    this.opts = {
      query: {
        orderByChild: 'status',
        equalTo: 'approve'
      }
    };
    return this.database.list('/Creatarticle',this.opts);
  }

  getlist():FirebaseListObservable<Creatarticle[]>{
    let uid = localStorage.getItem("user_id");
    console.log(uid," : uid");
    
    this.opts = {
      query: {
        orderByChild: 'uid',
        equalTo: uid
      }
    };
    
    return this.database.list('/Creatarticle',this.opts);
  }
  delete(key){
    return this.database.list('/Creatarticle').remove(key);
  }
}

