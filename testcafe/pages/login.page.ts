import { Selector, t } from 'testcafe';

class LoginPage {
  private userNameField: Selector;
  private passwordField: Selector;
  private loginButton: Selector;

  constructor() {
    this.userNameField = Selector('input[id="username"]');
    this.passwordField = Selector('input[id="password"]');
    this.loginButton = Selector('button[type="submit"]');
  }

  public async loginUser(userName: string, password: string): Promise<void> {
    await t.typeText(this.userNameField, userName);
    await t.typeText(this.passwordField, password);
    await t.click(this.loginButton);
  }
}

export const loginPage: LoginPage = new LoginPage();
