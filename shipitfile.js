module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit)

  shipit.initConfig({
    keepReleases: 2,
    config: {
      rsyncFrom: 'dist'
    },
    default: {
      deployTo: '/home/forge/test.wedevs.com/test',
      repositoryUrl: 'git@github.com:tareq1988/nuxt-example.git'
    },
    staging: {
      servers: 'forge@54.237.143.44'
    }
  })

  // 1. build the local project
  // 2. copy files to the remote releasePath
  // 3. run npm install
  // 4. stop pm2 and delete
  // 5. run pm2

  // shipit.blTask('deploy:update', async () => {
  //   // shipit.log(shipit)
  //   // await shipit.local('npm run build')
  //   // await shipit.copyToRemote('dist', shipit.releasePath + '/dist')
  // })

  shipit.on('published', () => {
    shipit.log(shipit)
  })

  // shipit.on('deployed', () => {
  //   const processName = 'awesome-app'

  //   let cmd = ''
  //   cmd += `cd ${shipit.releasePath} && `
  //   cmd += 'npm install && '
  //   cmd += 'npm run build && '
  //   cmd += `cd ${shipit.currentPath} && `
  //   cmd += `(
  //       pm2 restart ${processName} ||
  //       pm2 start npm --name ${processName} -- start
  //   )`

  //   shipit.remote(cmd)
  // })
}
