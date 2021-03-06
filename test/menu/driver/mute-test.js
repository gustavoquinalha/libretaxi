/* eslint-disable no-new, no-unused-vars */
import test from 'ava';
import routes from '../../../src/routes'; // to aviod circular dependencies
import DriverMute from '../../../src/actions/menu/driver/mute';
import { i18n } from '../../spec-support';

const user = {};

test('can be constructed with default parameters', t => {
  new DriverMute({ i18n, user });
  t.pass();
});

test('should return composite response on call', t => {
  const action = new DriverMute({ i18n, user });
  const response = action.call();
  t.is(response.type, 'composite');
  t.is(response.responses[0].type, 'user-state');
  t.is(response.responses[0].state.muted, true);
  t.is(response.responses[1].type, 'text');
  t.is(response.responses[1].message, i18n.__('driver-mute.mute_ok'));
  t.is(response.responses[2].type, 'redirect');
  t.is(response.responses[2].path, 'driver-index');
});
