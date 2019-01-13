import { ElevatorsPage } from './app.po';

describe('elevators App', () => {
  let page: ElevatorsPage;

  beforeEach(() => {
    page = new ElevatorsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
