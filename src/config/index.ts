import localConfig from './cfg.local';
import productionConfig from './cfg.production';
import testConfig from './cfg.test';
import defaultConfig from './cfg.default';
import * as merge from 'lodash.merge';

const configs = {
  local: localConfig,
  test: testConfig,
  production: productionConfig,
};
const env = process.env.NODE_ENV || 'local';
export default () => merge(defaultConfig, configs[env]);
