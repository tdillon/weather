export class WeatherPage {
  navigateTo() {
    return browser.get('/');
  }

  getBrowserTitle() {
    return browser.getTitle();
  }
}
