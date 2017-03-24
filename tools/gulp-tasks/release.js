module.exports = {
  github: (gulp) => (done) => {
    const conventionalGithubReleaser = require('conventional-github-releaser')
    conventionalGithubReleaser({
      type: 'oauth',
      token: process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN
    }, {
      preset: 'angular'
    }, done)
  }
}
