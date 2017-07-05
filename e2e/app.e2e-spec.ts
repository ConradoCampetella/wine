import { WinePage } from './app.po';

describe('wine App', () => {
  let page: WinePage;

  beforeEach(() => {
    page = new WinePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
