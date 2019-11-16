module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit)

  shipit.initConfig({
    keepReleases: 2,
    default: {
      deployTo: '/home/forge/test.wedevs.com/test',
      repositoryUrl: 'git@github.com:tareq1988/nuxt-example.git'
    },
    staging: {
      servers: 'forge@54.237.143.44'
    }
  })

  shipit.on('deployed', () => {
    const processName = 'awesome-app'
    const env = shipit.environment

    let cmd = ''
    cmd += `cd ${shipit.releasePath} && `
    cmd += 'npm install && '
    cmd += 'npm run build && '
    cmd += `(
        pm2 restart ${processName} ||
        NODE_ENV=${env} pm2 start npm --name ${processName} -- start
    )`

    shipit.remote(cmd)
  })
}