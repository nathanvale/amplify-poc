

const { getMetrics, NETWORK_PRESETS} = require('../helpers');

// the url to be audited
const url = process.env.LIGHTHOUSE_URL || 'http://localhost:3000';



// lighthouse options and flags

let audits;
let categories;

describe('3G Good performance audit via Lighthouse', () => {
  // the timeout is increased to match lighthouse so we don't fail on spinup
  beforeAll(async () => {
    // run and wait for the trace
    const results = await getMetrics(url, NETWORK_PRESETS.GOOD_3G);
    audits = results.lhr.audits
    categories = results.lhr.categories

  }, 45000);

  test('performance score must be acceptable', () => {

    expect(categories.performance.score)
      .toBeGreaterThanOrEqual(0.55);
  });

  test('bootup-time score must be acceptable', () => {

    expect(audits['bootup-time'].score, audits['bootup-time'].description)
      .toEqual(1);
  });

  test('dom-size score must be acceptable', () => {

    expect(audits['dom-size'].score, audits['dom-size'].description)
      .toEqual(1);
  });

  test('first-contentful-paint score must be acceptable', () => {

    expect(audits['first-contentful-paint'].score, audits['first-contentful-paint'].description)
      .toBeGreaterThanOrEqual(0.25);
  });

  test('first-cpu-idle score must be acceptable', () => {

    expect(audits['first-cpu-idle'].score, audits['first-cpu-idle'].description)
      .toBeGreaterThanOrEqual(0.65);
  });

  test('efficient-animated-content score must be acceptable', () => {

    expect(audits['efficient-animated-content'].score, audits['efficient-animated-content'].description)
      .toEqual(1);
  });

  test('estimated-input-latency score must be acceptable', () => {

    expect(audits['estimated-input-latency'].score, audits['estimated-input-latency'].description)
      .toEqual(1);
  });

  test('first-meaningful-paint score must be acceptable', () => {

    expect(audits['first-meaningful-paint'].score, audits['first-meaningful-paint'].description)
      .toBeGreaterThanOrEqual(0.25);
  });

  test('font-display score must be acceptable', () => {

    expect(audits['font-display'].score, audits['font-display'].description)
      .toEqual(1);
  });

  test('interactive score must be acceptable', () => {

    expect(audits['interactive'].score, audits['interactive'].description)
      .toBeGreaterThanOrEqual(0.7);
  });

  test('mainthread-work-breakdown score must be acceptable', () => {

    expect(audits['mainthread-work-breakdown'].score, audits['mainthread-work-breakdown'].description)
      .toEqual(1);
  });

  test('max-potential-fid score must be acceptable', () => {

    expect(audits['max-potential-fid'].score, audits['max-potential-fid'].description)
      .toEqual(1);
  });

  test('offscreen-images score must be acceptable', () => {

    expect(audits['offscreen-images'].score, audits['offscreen-images'].description)
      .toEqual(1);
  });

  test('redirects score must be acceptable', () => {

    expect(audits['redirects'].score, audits['redirects'].description)
      .toEqual(1);
  });

  test('render-blocking-resources score must be acceptable', () => {

    expect(audits['render-blocking-resources'].score, audits['render-blocking-resources'].description)
      .toBeGreaterThanOrEqual(0.56);
  });

  test('speed-index score must be acceptable', () => {

    expect(audits['speed-index'].score, audits['speed-index'].description)
      .toBeGreaterThanOrEqual(0.6);
  });

  test('third-party-summary score must be acceptable', () => {

    expect(audits['third-party-summary'].score, audits['third-party-summary'].description)
      .toEqual(1);
  });

  test('time-to-first-byte score must be acceptable', () => {

    expect(audits['time-to-first-byte'].score, audits['time-to-first-byte'].description)
      .toEqual(1);
  });

  test('total-blocking-time score must be acceptable', () => {

    expect(audits['total-blocking-time'].score, audits['total-blocking-time'].description)
      .toEqual(1);
  });

  test('total-byte-weight score must be acceptable', () => {

    expect(audits['total-byte-weight'].score, audits['total-byte-weight'].description )
      .toEqual(1);
  });

  test('unminified-css score must be acceptable', () => {

    expect(audits['unminified-css'].score, audits['unminified-css'].description)
      .toEqual(1);
  });

  test('unminified-javascript score must be acceptable', () => {

    expect(audits['unminified-javascript'].score, audits['unminified-javascript'].description)
      .toEqual(1);
  });

  test('unused-css-rules score must be acceptable', () => {

    expect(audits['unused-css-rules'].score, audits['unused-css-rules'].description)
      .toBeGreaterThanOrEqual(0.88);
  });

  test('uses-long-cache-ttl score must be acceptable', () => {

    expect(audits['uses-long-cache-ttl'].score, audits['uses-long-cache-ttl'].description)
      .toBeGreaterThanOrEqual(0.05);
  });

  test('uses-optimized-images score must be acceptable', () => {

    expect(audits['uses-optimized-images'].score, audits['uses-optimized-images'].description)
      .toEqual(1);
  });

  test('uses-rel-preconnect score must be acceptable', () => {

    expect(audits['uses-rel-preconnect'].score, audits['uses-rel-preconnect'].description)
      .toEqual(1);
  });

  test('uses-rel-preload score must be acceptable', () => {

    expect(audits['uses-rel-preload'].score, audits['uses-rel-preload'].description)
      .toEqual(1);
  });

  test('uses-responsive-images score must be acceptable', () => {

    expect(audits['uses-responsive-images'].score, audits['uses-responsive-images'].description)
      .toEqual(1);
  });

  test('uses-text-compression score must be acceptable', () => {

    expect(audits['uses-text-compression'].score, audits['uses-text-compression'].description)
      .toEqual(1);
  });

  test('uses-webp-images score must be acceptable', () => {

    expect(audits['uses-webp-images'].score, audits['uses-webp-images'].description)
      .toBeGreaterThanOrEqual(0.40);
  });
  
});
