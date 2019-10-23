const spawn = require('cross-spawn')


function lighthouse() {
  try {
    console.log(process.cwd())
    const result = spawn.sync('jest', ['--config', './lighthouse/jest.config.js', '--verbose', '--runInBand'], { stdio: 'inherit', cwd: process.cwd(),  env: {...process.env, LIGHTHOUSE_URL: 'https://staging.nathanvale.dev'},})
    console.log(result)
  } catch (error) {
    console.log(error)

  }

}

;(async () => {
  await lighthouse()
})()
