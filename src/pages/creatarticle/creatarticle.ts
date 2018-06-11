import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Creatarticle } from '../../model/interface/creatarticle';
import { CreatarticleProvider } from '../../providers/creatarticle/creatarticle';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { storage } from 'firebase';

/**
 * Generated class for the CreatarticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creatarticle',
  templateUrl: 'creatarticle.html',
})
export class CreatarticlePage {


  img: string = '';
  myphoto: string = '';
  section: string = "index";
  creatarticle: Creatarticle = { name: '', detail: '', uid: '', status: '', Img: '',date:'' };
  public options: CameraOptions;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public CreatarticleProvider: CreatarticleProvider,
    public camera: Camera,
    public toastCtrl: ToastController,
  ) {
    this.options = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatarticlePage');

  }
  

  save(creatarticle) {
    // this.uploadSuccess(creatarticle.Img);
    // let img = sessionStorage.getItem('img');
    if(creatarticle.name!=''&&creatarticle.detail!=''&&creatarticle.Img!=''){
      let dateNow = Date.now().toString();
      let id = localStorage.getItem("user_id");
      this.creatarticle = { name: creatarticle.name, detail: creatarticle.detail, uid: id, status: 'wait', Img: creatarticle.Img , date:dateNow };
      this.CreatarticleProvider.save(this.creatarticle).then(res => {
        console.log(this.creatarticle);
        this.creatarticle = { name: '', detail: '', uid: '', status: '', Img: '',date:'' };
        this.navCtrl.push('MyarticlePage')
      })
    }else{
      this.uploadSuccess('กรุณากรอกข้อมูลให้ถูกต้อง');
    }
    
  }

  async takePhoto() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    const result = await this.camera.getPicture(options);
    const image = 'data:image/jpeg;base64,' + result;
    let name = 'img' + Date.now();
    const picture = storage().ref().child('images/article/' + name + '.jpg');
    picture.putString(image, 'data_url').then(data => {
      this.creatarticle.Img = data.downloadURL;
    }).catch(e => {
      console.log(e);
    });

  }

  async getImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }

    const result = await this.camera.getPicture(options);
    const image = 'data:image/jpeg;base64,' + result;
    let name = 'img' + Date.now();
    const picture = storage().ref().child('images/article/' + name + '.jpg');
    picture.putString(image, 'data_url').then(data => {
      this.creatarticle.Img = data.downloadURL;
      this.img = data.downloadURL;
    }).catch(e => {
      console.log(e);
    });

  }

  async cropImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300
    }

    try { 
      await this.camera.getPicture(options).then((imageData) => {
        // this.uploadSuccess(imageData);
        this.myphoto = 'data:image/jpeg;base64,' + imageData;
        // this.uploadSuccess(this.myphoto);
        this.upload(this.myphoto);   
      })
    }catch(e){
      this.uploadSuccess('ไม่สำเร็จ :' + e);
    }

  }

  upload(photo){
    // this.uploadSuccess(photo);
    let name = 'img' + Date.now();
    const picture = storage().ref().child('images/article/' + name + '.jpg');
    picture.putString(photo, 'data_url').then(data => {
      this.creatarticle.Img = data.downloadURL;
      this.uploadSuccess('สำเร็จ');
    }).catch(e => {
      console.log(e);
      this.uploadSuccess('ไม่สำเร็จ :' + e);
    });
  }

  uploadSuccess(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}

