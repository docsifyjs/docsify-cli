/*!
 * Simple webhook for Gitlab/Gogs
 *
 * Usually docsify is used as a personal/team internal wiki,
 * and the source files will be managed by git service,
 * docsify support live-reload but don't support webhook
 * to pull changes from git server automatically,
 * I think it is an useful feature for real world scenario.
 *
 * How to test:
 *
 * Start docsify:
 * $ docsify serve docs
 * 
 * Then run the test script:
 * $ ./test gitlab
 * $ ./test gogs
 * Or use bash:
 * $ ./test.sh
 * $ ./test.sh gogs
 *
 * Copyright(c) Donkey <anjingyu_ws@foxmail.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 * @private
 */
const { spawnSync } = require('child_process');

/**
 * Module exports.
 * @public
 */
module.exports = webhook;

/**
 * Create webhook handler.
 *
 * @param {string} path The root path of documentation repos.
 * @return {function} Middleware for `connect` module.
 * @public
 */
function webhook (path) {
  return (req, res, next) => {
    console.log(req.headers);
	if (req.method !== 'POST'
		|| (!('x-gitlab-event' in req.headers)
	        && !('x-gogs-event' in req.headers))) {
	  return next();
	}

	var buf = [];

	req.on('data', data => {
	  buf.push(data);
	});

	req.on('end', () => {
	  var requestJson = JSON.parse(Buffer.concat(buf).toString());
	  var curPath = process.cwd();
	  /// Just goto the root path of documentation/repo
	  /// Then run `git pull` to pull all the changes
	  process.chdir(path);
	  var gitOutput = spawnSync('git', ['pull', '--ff-only'],
	                            {
								  'shell': true,
								  'encoding': 'utf-8'
								});
      if (gitOutput.status !== 0) {
        console.log(gitOutput.stderr);
      }
	  process.chdir(curPath);
	  res.end();
	});
  };
};


