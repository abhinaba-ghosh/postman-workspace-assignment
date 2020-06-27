import { Selector, t } from 'testcafe';
import { ReactSelector } from 'testcafe-react-selectors';

class AllWorkspacesPage {
  private workspaceButton: Selector;
  private deleteOption: Selector;
  private deleteConfirmation: Selector;

  private cancelConfirm: Selector;
  private urlRoute: string;

  constructor() {
    this.urlRoute = '/workspaces?type=personal';
    this.workspaceButton = Selector('button').withText(
      'Create a new workspace'
    );
    this.deleteOption = ReactSelector('OptionRenderer').withProps({
      label: 'Delete',
    });
    this.deleteConfirmation = Selector('button').withText('Delete');
    this.cancelConfirm = Selector('button').withText('Cancel');
  }
  public async visitAllWorkspacesPage(): Promise<void> {
    await t.navigateTo(this.urlRoute);
  }

  public async clickCreateWorkSpaceButton(): Promise<void> {
    await t.click(this.workspaceButton);
  }

  public async validateNewlyCreatedWorkspace(
    workspaceName: string
  ): Promise<void> {
    await t.expect(Selector('a').withText(workspaceName).exists).ok();
  }

  public async clickOnWorkspaceLink(workspaceName: string): Promise<void> {
    await t.click(Selector('a').withText(workspaceName));
  }

  public async clickMoreIconBasedOnWorkspaceName(
    workspaceName: string
  ): Promise<void> {
    await t.click(
      Selector('div[role*="row"]').withText(workspaceName).find('svg')
    );
  }

  public async performDeleteOperation(): Promise<void> {
    await t.click(this.deleteOption);
    await t.click(this.deleteConfirmation);
  }

  public async performCancelOperation(): Promise<void> {
    await t.click(this.deleteOption);
    await t.click(this.cancelConfirm);
  }
}

export const allWorkspacesPage: AllWorkspacesPage = new AllWorkspacesPage();
