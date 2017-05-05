import { browser, element, by } from 'protractor';

export class ShapeGuiNg2Page {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('sh-root h1')).getText();
  }
}
