'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-generator').test;

describe('generator-flowtype:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({installFlowBin: true})
      .on('end', done);
  });

  it('creates flowconfig files', function () {
    assert.file([
      '.flowconfig'
    ]);
  });

  it('add `flow` command to npm scripts', function () {
    assert.fileContent('package.json', '"flow": "flow check"');
  });
});
