const { spawnSync } = require('child_process');


function lighthouse() {
  try {
    const result = spawnSync('jest', ['--config', './lighthouse/jest.config.js', '--verbose','--runInBand'], {stdio: 'inherit',  env: {...process.env, LIGHTHOUSE_URL: 'https://staging.nathanvale.dev'},})
    console.log(result)
  } catch (error) {
    console.log(error)

  }

}

;(async () => {
  await lighthouse()
})()
