import { WeatherPage } from './app.po';

describe('weather App', function() {
  let page: WeatherPage;

  beforeEach(() => {
    page = new WeatherPage();
  });

  it('should have a page title', () => {
    page.navigateTo();
    expect(page.getBrowserTitle()).toEqual('WW#1 Prototype');
  });
});
