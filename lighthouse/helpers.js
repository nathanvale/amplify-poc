
//TODO: https://github.com/llatinov/sample-performance-testing-in-browser
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');


async function gatherPerformanceTimingMetric(page, metricName) {
  const metric = await page.evaluate(metric => window.performance.timing[metric], metricName);
  return metric;
}

async function gatherPerformanceTimingMetrics(page) {
  // The values returned from evaluate() function should be JSON serializeable.
  const rawMetrics = await page.evaluate(() => JSON.stringify(window.performance.timing));
  const metrics = JSON.parse(rawMetrics);
  return metrics;
}

async function processPerformanceTimingMetrics(metrics) {
  return {
    dnsLookup: metrics.domainLookupEnd - metrics.domainLookupStart,
    tcpConnect: metrics.connectEnd - metrics.connectStart,
    request: metrics.responseStart - metrics.requestStart,
    response: metrics.responseEnd - metrics.responseStart,
    domLoaded: metrics.domComplete - metrics.domLoading,
    domInteractive: metrics.domInteractive - metrics.navigationStart,
    pageLoad: metrics.loadEventEnd - metrics.loadEventStart,
    fullTime: metrics.loadEventEnd - metrics.navigationStart
  }
}

async function gatherLighthouseMetrics(page, config) {
  // Port is in formаt: ws://127.0.0.1:52046/devtools/browser/675a2fad-4ccf-412b-81bb-170fdb2cc39c
  const port = await page.browser().wsEndpoint().split(':')[2].split('/')[0];
  return await lighthouse(page.url(), { port: port }, config).then(results => {
    delete results.artifacts;
    return results;
  });
}

async function getMetrics(url,preset) {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  // Connect to Chrome DevTools
  const client = await page.target().createCDPSession()
  // Set throttling property
  await client.send('Network.emulateNetworkConditions', preset)
  await page.goto(url);
  const rawMetrics = await gatherPerformanceTimingMetrics(page);
  const metrics = await processPerformanceTimingMetrics(rawMetrics);
  
  await browser.close();
  return metrics
}

const NETWORK_PRESETS = {
  'GPRS': {
    'offline': false,
    'downloadThroughput': 50 * 1024 / 8,
    'uploadThroughput': 20 * 1024 / 8,
    'latency': 500
  },
  'REGULAR_2G': {
    'offline': false,
    'downloadThroughput': 250 * 1024 / 8,
    'uploadThroughput': 50 * 1024 / 8,
    'latency': 300
  },
  'GOOD_2G': {
    'offline': false,
    'downloadThroughput': 450 * 1024 / 8,
    'uploadThroughput': 150 * 1024 / 8,
    'latency': 150
  },
  'REGULAR_3G': {
    'offline': false,
    'downloadThroughput': 750 * 1024 / 8,
    'uploadThroughput': 250 * 1024 / 8,
    'latency': 100
  },
  'GOOD_3G': {
    'offline': false,
    'downloadThroughput': 1.5 * 1024 * 1024 / 8,
    'uploadThroughput': 750 * 1024 / 8,
    'latency': 40
  },
  'REGULAR_4G': {
    'offline': false,
    'downloadThroughput': 4 * 1024 * 1024 / 8,
    'uploadThroughput': 3 * 1024 * 1024 / 8,
    'latency': 20
  },
  'DSL': {
    'offline': false,
    'downloadThroughput': 2 * 1024 * 1024 / 8,
    'uploadThroughput': 1 * 1024 * 1024 / 8,
    'latency': 5
  },
  'WIFI': {
    'offline': false,
    'downloadThroughput': 30 * 1024 * 1024 / 8,
    'uploadThroughput': 15 * 1024 * 1024 / 8,
    'latency': 2
  }
}

module.exports = {
  gatherPerformanceTimingMetric,
  gatherPerformanceTimingMetrics,
  processPerformanceTimingMetrics,
  gatherLighthouseMetrics,
  NETWORK_PRESETS,
  getMetrics
};

