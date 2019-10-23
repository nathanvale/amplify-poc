
//TODO: https://github.com/llatinov/sample-performance-testing-in-browser
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const fs = require('fs');
const md5 = require('md5');


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
  const CIRCLE_SHELL_ENV = process.env.CIRCLE_SHELL_ENV
  console.log('LIGHTHOUSE_URL', process.env.LIGHTHOUSE_URL)
  console.log('CIRCLE_SHELL_ENV', CIRCLE_SHELL_ENV)
  const filename = md5('message');
  console.log('filename', filename)
  const result = await lighthouse(page.url(), { port: port, output: ['html','json'] }, config).then(results => {
    delete results.artifacts;
    return results;
  });
  fs.writeFileSync(`reports/${filename}.html`, result.report[0])
  fs.writeFileSync(`reports/${filename}.json`, result.report[1])
  return result
}

async function getMetrics(url,preset) {
  console.log('url',url)
  const browser = await puppeteer.launch({
    headless: true,
        args: ['--disable-gpu'],
  });
  const page = await browser.newPage();
  await page.goto(url);
  
  const results = await gatherLighthouseMetrics(page, {
    extends: 'lighthouse:default',
    settings: {
      onlyCategories: ['performance'],
    },
  })
  await browser.close();
  return results
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

