const spawn = require('cross-spawn')
const path = require('path')
const fs  = require('fs')


function lighthouse() {
  try {
    
    const fromRoot = (...p) => path.join(process.cwd(), ...p)
    console.log(fromRoot('./lighthouse/jest.config.js'))
    const result = spawn.sync('npx', ['jest','--config', fromRoot('./lighthouse/jest.config.js'), '--verbose', '--runInBand'], { stdio: 'inherit', shell: true, env: {...process.env, LIGHTHOUSE_URL: 'https://staging.nathanvale.dev'},})
    console.log(result)
    const reportsDir = process.argv[3];

    const reports = {
      anonymous: {
        json: [],
        htmlFilenames: [],
      }
    };
    fs.readdirSync(reportsDir).forEach(file => {
      const userType = file.split('-')[0];

      if (path.extname(file) === ".json") {
        reports[userType].json.push(
          JSON.parse(fs.readFileSync(path.resolve(reportsDir, file), "utf8"))
        );
      } else if (path.extname(file) === ".html") {
        reports[userType].htmlFilenames.push(file);
      }
    });

    console.log(JSON.stringify(reports))
  } catch (error) {
    console.log(error)

  }

}

;(async () => {
  await lighthouse()
})()
