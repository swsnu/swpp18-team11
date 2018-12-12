import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor() { }

  isUrlStore(locationUrl: string): boolean {
    if (!locationUrl) {
      return false;
    }
    else if (
      locationUrl.startsWith('order') ||
      locationUrl.startsWith('mycart') ||
      locationUrl.startsWith('payment')
    ) {
      return true;
    }
    else {
      return false;
    }
  }

  getPageTitle(locationUrl: string): string {
    if (!locationUrl) {
      return ""
    }
    if (this.isUrlStore(locationUrl)) {
      return "KingBurger" // TODO: to return store-specific title
    }
    switch(locationUrl) {
      case "sign-in": return "Sign In";
      case "sign-up": return "Sign Up";
      case "store": return "Select Store!";
      case "my-order": return "My Orders";
      default: return "Not a valid page"
    }
  }

}
