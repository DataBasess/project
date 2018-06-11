import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Category } from '../../model/interface/category';

/*
  Generated class for the CatrgoryDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CatrgoryDatabaseProvider {

  constructor(
    private database:AngularFireDatabase
  ) { }

  getList():FirebaseListObservable<Category[]>{
    return this.database.list('/category');
  }

}
