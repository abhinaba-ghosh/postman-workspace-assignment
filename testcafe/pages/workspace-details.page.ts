import { Selector, t } from 'testcafe';
import { ReactSelector } from 'testcafe-react-selectors';

class WorkspaceDetailsPage {
  private headerDropdown: Selector;
  private allWorkspaceLink: Selector;

  private moreOption: Selector;

  private renameOption: Selector;
  constructor() {
    this.headerDropdown = ReactSelector('Icon').withProps({
      name: 'down',
    });

    this.allWorkspaceLink = Selector('li').withText('All Workspaces');

    this.moreOption = ReactSelector('Icon').withProps({
      className: 'pm-btn__default-icon',
      name: 'more',
      pmStyle: 'secondary',
      size: 'sm',
    });

    this.renameOption = ReactSelector('OptionRenderer').withProps({
      label: 'Rename',
    });
  }
  public async navigateToAllWorkspace(): Promise<void> {
    await t.click(this.headerDropdown);
    await t.click(this.allWorkspaceLink);
  }

  public async clickMoreIcon(): Promise<void> {
    await t.click(this.moreOption);
  }

  public async clickRename(): Promise<void> {
    await t.click(this.renameOption);
  }
}

export const workspaceDetailsPage: WorkspaceDetailsPage = new WorkspaceDetailsPage();
