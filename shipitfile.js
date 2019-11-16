module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      deployTo: '/home/forge/test.wedevs.com/test'
    },
    staging: {
      servers: 'forge@54.237.143.44'
    }
  })
}
