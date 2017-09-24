import { FrontEvolutionPage } from './app.po';

describe('front-evolution App', () => {
  let page: FrontEvolutionPage;

  beforeEach(() => {
    page = new FrontEvolutionPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
