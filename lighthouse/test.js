
const { getMetrics, NETWORK_PRESETS } = require('./helpers');

(async () => {

  const metrics = await getMetrics('https://staging.nathanvale.dev', NETWORK_PRESETS.GOOD_3G);
  console.log(`DNS: ${metrics.dnsLookup}`);
  console.log(`TCP: ${metrics.tcpConnect}`);
  console.log(`Req: ${metrics.request}`);
  console.log(`Res: ${metrics.response}`);
  console.log(`DOM load: ${metrics.domLoaded}`);
  console.log(`DOM interactive: ${metrics.domInteractive}`);
  console.log(`Document load: ${metrics.pageLoad}`);
  console.log(`Full load time: ${metrics.fullTime}`); 
})(); 