import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
/**
 * Generated class for the YoutubeAPiPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'APIYoutube',
})
export class YoutubeAPiPipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer,
  ) {}
  transform(url):SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+url);
    
  }
}
