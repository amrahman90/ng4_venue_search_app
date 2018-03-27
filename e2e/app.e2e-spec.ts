import { Sample2Page } from './app.po';

describe('sample2 App', () => {
  let page: Sample2Page;

  beforeEach(() => {
    page = new Sample2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
