import { Selector, t } from 'testcafe';
import { ReactSelector } from 'testcafe-react-selectors';

class CreateWorkspacePage {
  private workspaceName: Selector;
  private textarea: Selector;
  private createNewWorkspaceButton: Selector;
  private cancelButton: Selector;
  private saveChangesButton: Selector;
  constructor() {
    this.workspaceName = Selector('input[label="Name"]');
    this.textarea = ReactSelector('textarea');
    this.createNewWorkspaceButton = Selector('button').withText(
      'Create a new workspace'
    );
    this.cancelButton = Selector('button').withText('Cancel');
    this.saveChangesButton = Selector('button').withText('Save Changes');
  }

  public async setWorkspaceName(name: string): Promise<void> {
    await t
      .click(this.workspaceName)
      .pressKey('ctrl+a delete')
      .typeText(this.workspaceName, name);
  }

  public async setSummary(summary: string): Promise<void> {
    await t.typeText(this.textarea, summary);
  }

  public async clickCreateNewWorkspaceButton(): Promise<void> {
    await t.click(this.createNewWorkspaceButton);
  }

  public async clickCancelButton(): Promise<void> {
    await t.click(this.cancelButton);
  }

  public async clickSaveChangesButton(): Promise<void> {
    await t.click(this.saveChangesButton);
  }

  public async checkCreateNewWorkspaceButtonIsDisabled(): Promise<void> {
    await t.expect(this.createNewWorkspaceButton.hasAttribute('disabled')).ok();
  }
}

export const createWorkspacePage: CreateWorkspacePage = new CreateWorkspacePage();
