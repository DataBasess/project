import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';



import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GetProjectProvider } from '../providers/project/get-project';
import { HttpClientModule } from '@angular/common/http';
import { GetVideoProvider } from '../providers/video/get-video';
import { GetImagesProvider } from '../providers/images/get-images';
import { ArticleProvider } from '../providers/article/article';
import { GetProjectIntroProvider } from '../providers/project/get-project-intro';
import { GetProjectByProvinceProvider } from '../providers/project/get-projectByProvice';
import { GetProjectByKeyWordProvider } from '../providers/project/get-projectByKeyWord';
import { LoginProvider } from '../providers/user/login';
import { CategoryProvider } from '../providers/category/category';
import { RegisterProvider } from '../providers/user/register';
import { UserPage } from '../pages/user/user';
import { AngularFireModule } from 'angularfire2';
// for AngularFireDatabase
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireDatabase } from 'angularfire2/database-deprecated';

import { GoogleMaps } from '@ionic-native/google-maps';
import { ProjectDatabaseProvider } from '../providers/project-database/project-database';
import { CatrgoryDatabaseProvider } from '../providers/catrgory-database/catrgory-database';
import { ArticleDatabaseProvider } from '../providers/article-database/article-database';
import { VideoDatabaseProvider } from '../providers/video-database/video-database';
import { PipesModule } from '../pipes/pipes.module';
import { CreatarticleProvider } from '../providers/creatarticle/creatarticle';
import { UserDatabaseProvider } from '../providers/user-database/user-database';
import { ProjectLikeProvider } from '../providers/project-like/project-like';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
    apiKey: "AIzaSyCV4ggjXAljl9NciKcB_AOlHKdJhxfwX5M",
    authDomain: "royolproject-f9706.firebaseapp.com",
    databaseURL: "https://royolproject-f9706.firebaseio.com",
    projectId: "royolproject-f9706",
    storageBucket: "royolproject-f9706.appspot.com",
    messagingSenderId: "832108055817"
  }),
  AngularFireAuthModule,
  AngularFireDatabaseModule,
  PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetProjectProvider,
    GetVideoProvider,
    GetImagesProvider,
    ArticleProvider,
    GetProjectIntroProvider,
    GetProjectByProvinceProvider,
    GetProjectByKeyWordProvider,
    LoginProvider,
    CategoryProvider,
    RegisterProvider, 
    GoogleMaps,
    ProjectDatabaseProvider,
    CatrgoryDatabaseProvider,
    ArticleDatabaseProvider,
    VideoDatabaseProvider,
    CreatarticleProvider,
    UserDatabaseProvider,
    ProjectLikeProvider,
    Camera    
  ]
})
export class AppModule {}
