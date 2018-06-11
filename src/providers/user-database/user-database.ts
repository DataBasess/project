import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { User } from '../../model/interface/User';

/*
  Generated class for the UserDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserDatabaseProvider {

  constructor(
    private database:AngularFireDatabase
  ) { }

  opts: FirebaseListFactoryOpts;



  update(key:string,user:User){
    //user.sort = this.countUser();
    return this.database.object('/User/'+key).update(user);
  }

  getList():FirebaseListObservable<User[]>{
    return this.database.list('/User');
  }

  get(uid:string):FirebaseObjectObservable<User>{
    return this.database.object('/User/'+uid);
  }

}
