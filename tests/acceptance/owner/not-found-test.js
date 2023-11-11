import {
  currentURL,
  visit,
} from '@ember/test-helpers';
import {Logger as EmberLogger, Test as EmberTest} from 'ember';
import { module, test } from 'qunit';
import { setupApplicationTestCustom } from 'travis/tests/helpers/setup-application-test';
import nonExistentOwnerPage from 'travis/tests/pages/owner/non-existent';
import { enableFeature } from 'ember-feature-flags/test-support';
import signInUser from 'travis/tests/helpers/sign-in-user';
import { setupMirage } from 'ember-cli-mirage/test-support';

let adapterException;
let loggerError;

module('Acceptance | owner/not found', function (hooks) {
  setupApplicationTestCustom(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    adapterException = EmberTest.adapter.exception;
    loggerError = EmberLogger.error;
    EmberTest.adapter.exception = () => {};
    EmberLogger.error = () => null;
  });

  hooks.afterEach(function () {
    EmberTest.adapter.exception = adapterException;
    EmberLogger.error = loggerError;
  });

  test('visiting /non-existent-owner shows error message when authenticated', async function (assert) {
    const user = this.server.create('user');
    await signInUser(user);

    await visit('/non-existent-owner');

    assert.equal(currentURL(), '/non-existent-owner');
    assert.ok(nonExistentOwnerPage.showsBarricadeIllustration, 'Shows image for aesthetics');
    assert.equal(nonExistentOwnerPage.errorMessage, 'We couldn\'t find the owner non-existent-owner', 'Shows message that repository was not found');
    assert.ok(nonExistentOwnerPage.errorMessageProisHidden, 'does not show .com authenticated message');
  });

  test('visiting /non-existent-owner shows error message when unauthenticated', async function (assert) {
    enableFeature('proVersion');
    await visit('/non-existent-owner');

    assert.equal(currentURL(), '/non-existent-owner');
    assert.ok(nonExistentOwnerPage.showsBarricadeIllustration, 'Shows image for aesthetics');
    assert.equal(nonExistentOwnerPage.errorMessage, 'We couldn\'t find the owner non-existent-owner', 'Shows message that repository was not found');
    assert.ok(nonExistentOwnerPage.errorMessageProUnauthenticated, 'shows .com authenticated message');
  });
});
