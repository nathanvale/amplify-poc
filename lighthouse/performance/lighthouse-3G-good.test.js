

const { getMetrics, NETWORK_PRESETS} = require('../helpers');

// the url to be audited
const url = process.env.LIGHTHOUSE_URL || 'http://localhost:3000';

// lighthouse options and flags

let metrics;

describe('3G Good performance audit via Lighthouse', () => {
  // the timeout is increased to match lighthouse so we don't fail on spinup
  beforeAll(async () => {
    // run and wait for the trace
    metrics = await getMetrics(url, NETWORK_PRESETS.GOOD_3G);
  }, 45000);

  test('dom loaded less than 5600', () => {
    expect(metrics.domLoaded)
      .toBeLessThanOrEqual(5600);
  });

  test('dom interactive less than 4000', () => {
    expect(metrics.domInteractive)
      .toBeLessThanOrEqual(4000);
  });

});
