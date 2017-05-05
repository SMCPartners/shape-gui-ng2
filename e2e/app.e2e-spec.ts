import { ShapeGuiNg2Page } from './app.po';

describe('shape-gui-ng2 App', () => {
  let page: ShapeGuiNg2Page;

  beforeEach(() => {
    page = new ShapeGuiNg2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('sh works!');
  });
});
