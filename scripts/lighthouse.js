const spawn = require('cross-spawn')


function lighthouse() {
  try {
    const result = spawn.sync('jest', ['--config', './lighthouse/jest.config.js', '--verbose','--runInBand'], {stdio: 'inherit',  env: {...process.env, LIGHTHOUSE_URL: 'https://staging.nathanvale.dev'},})
    console.log(result)
  } catch (error) {
    console.log(error)

  }

}

;(async () => {
  await lighthouse()
})()
