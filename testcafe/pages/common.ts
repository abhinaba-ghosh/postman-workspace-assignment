import { Selector, t } from 'testcafe';

class CommonPage {
  private toastHeader: Selector;
  private toastButton: Selector;

  constructor() {
    this.toastHeader = Selector('div[class*="pm-toast"] h4');
    this.toastButton = Selector('div[class*="pm-toast"] button');
  }
  public async checkToastMessage(message: string): Promise<void> {
    await t.expect(this.toastHeader.textContent).contains(message);
    await t.click(this.toastButton);
  }
}

export const commonPage: CommonPage = new CommonPage();
