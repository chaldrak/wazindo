import {
  DefaultUrlSerializer,
  UrlSerializer,
  UrlTree,
} from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {
  parse(url: any): UrlTree {

    //redirection de l'url pour capturer la page de callback kkiapay
    const equalSignIndex = url.indexOf('=');
    const pointInterrogationSignIndex = url.indexOf('?');
    const specialetSignIndex = url.indexOf('?');

    if (equalSignIndex > -1 && pointInterrogationSignIndex > -1 && specialetSignIndex > -1) {
      const dataInit = url.replace('?','/');
      const data = dataInit.replace('&','');
       url = data.replace('=','/');
       }

    const dus = new DefaultUrlSerializer();
    return dus.parse(url);
  }
  // unescape
  serialize(tree: UrlTree): any {
    const dus = new DefaultUrlSerializer();
    return dus.serialize(tree);
  }
}