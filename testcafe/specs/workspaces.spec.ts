import { waitForReact } from 'testcafe-react-selectors';

import {
  allWorkspacesPage,
  commonPage,
  createWorkspacePage,
  loginPage,
  workspaceDetailsPage,
} from '../pages';

fixture(`User validates workspace CRUD functionalities`)
  .page(`https://web.postman.co/workspaces?type=personal`)
  .beforeEach(async () => {
    await loginPage.loginUser(process.env.USERNAME, process.env.PASSWORD);
    await waitForReact();
  });

test('user successfully performs the CRUD operation for personal workspace', async () => {
  // user creates a new personal workspace
  await allWorkspacesPage.clickCreateWorkSpaceButton();
  await createWorkspacePage.setWorkspaceName('test-template');
  await createWorkspacePage.setSummary('this is a sample test');
  await createWorkspacePage.clickCreateNewWorkspaceButton();
  await commonPage.checkToastMessage('Personal workspace created');

  // user reads the newly created workspace
  await workspaceDetailsPage.navigateToAllWorkspace();
  await allWorkspacesPage.validateNewlyCreatedWorkspace('test-template');

  // user updates the newly created workspace
  await allWorkspacesPage.clickOnWorkspaceLink('test-template');
  await workspaceDetailsPage.clickMoreIcon();
  await workspaceDetailsPage.clickRename();
  await createWorkspacePage.setWorkspaceName('test-template-updated');
  await createWorkspacePage.clickSaveChangesButton();
  await commonPage.checkToastMessage('Workspace details updated');
  await workspaceDetailsPage.navigateToAllWorkspace();
  await allWorkspacesPage.validateNewlyCreatedWorkspace(
    'test-template-updated'
  );

  // user deletes the newly created workspace
  await allWorkspacesPage.clickMoreIconBasedOnWorkspaceName(
    'test-template-updated'
  );
  await allWorkspacesPage.performDeleteOperation();
  await commonPage.checkToastMessage('Personal workspace deleted');
});

test('user validates create new workspace button is disabled if name field is not populated', async () => {
  await allWorkspacesPage.clickCreateWorkSpaceButton();
  await createWorkspacePage.setSummary(
    'This will test create new button disablement'
  );
  await createWorkspacePage.checkCreateNewWorkspaceButtonIsDisabled();
});

test('user successfully cancel the delete operation', async () => {
  //create a new workspace
  await allWorkspacesPage.clickCreateWorkSpaceButton();
  await createWorkspacePage.setWorkspaceName('test-delete-template');
  await createWorkspacePage.setSummary('this is for test');
  await createWorkspacePage.clickCreateNewWorkspaceButton();
  await workspaceDetailsPage.navigateToAllWorkspace();

  //perform delete cancel operation
  await allWorkspacesPage.clickMoreIconBasedOnWorkspaceName(
    'test-delete-template'
  );
  await allWorkspacesPage.performCancelOperation();
  await allWorkspacesPage.validateNewlyCreatedWorkspace('test-delete-template');
}).after(async () => {
  // tear down the test data
  await allWorkspacesPage.clickMoreIconBasedOnWorkspaceName(
    'test-delete-template'
  );
  await allWorkspacesPage.performDeleteOperation();
  await commonPage.checkToastMessage('Personal workspace deleted');
});
