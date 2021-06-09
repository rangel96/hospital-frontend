import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  // Example
  /*transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }*/

  transform(img: string, type: 'usuarios' | 'hospitales' | 'medicos'): string {
    if (!img) {
      return `${baseUrl}/uploads/${type}/no-img`;
    }

    if (img.includes('http')) {
      return img;
    }

    return (img)
      ? `${baseUrl}/uploads/${type}/${img}`
      : `${baseUrl}/uploads/${type}/no-img`;
  }

}
