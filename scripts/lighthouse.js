const spawn = require('cross-spawn')
const path = require('path')


function lighthouse() {
  try {
    
    const fromRoot = (...p) => path.join(process.cwd(), ...p)
    console.log(fromRoot('./lighthouse/jest.config.js'))
    const result = spawn.sync('jest', ['--config', fromRoot('./lighthouse/jest.config.js'), '--verbose', '--runInBand'], { stdio: 'inherit', env: {...process.env, LIGHTHOUSE_URL: 'https://staging.nathanvale.dev'},})
    console.log(result)
  } catch (error) {
    console.log(error)

  }

}

;(async () => {
  await lighthouse()
})()
