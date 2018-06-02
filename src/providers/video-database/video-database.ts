import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { FirebaseListFactoryOpts } from 'angularfire2/database-deprecated/interfaces';
import { Video } from '../../model/interface/video';

/*
  Generated class for the VideoDatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VideoDatabaseProvider {

  constructor(
    private database:AngularFireDatabase
  ) { }

  opts: FirebaseListFactoryOpts;



  save(video:Video){
    //user.sort = this.countUser();
    return this.database.list('/video').push(video);
  }

  getList():FirebaseListObservable<Video[]>{
    return this.database.list('/video');
  }

}
