import {Injectable} from '@angular/core';

@Injectable()
export class LocaleService {
  public getFile(filePath: string): Promise<string> {
    const promise =  new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', filePath + '?v=' + Math.random(), true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          if (xhr.readyState === 4) {
            resolve();
          }
        }
      };
      xhr.send();
    });
    return promise;
  }
}
