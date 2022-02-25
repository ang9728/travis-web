import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Integration | Component | master-filter', function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<MasterFilter />`);
    await click('[data-test-down-caret]');
    assert.dom('[data-test-search-icon]').exists('renders the search svg');
  });

  test('it renders Repositories label', async function (assert) {
    await render(hbs`<MasterFilter />`);
    assert
      .dom('[data-test-filter-container]')
      .exists('All Repositories are exist');
    assert
      .dom('.build-filter-label')
      .exists('Contain All Repo Name');
    assert.dom('.build-filter-label').hasText('All Builds');

    await click('.build-filter-label');
  });
});