'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    this.option('flow-bin');
  },
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the funkadelic ' + chalk.red('generator-flowtype') + ' generator!'
    ));

    var prompts = [{
      type: 'confirm',
      name: 'installFlowBin',
      message: 'Would you like to install flow-bin in your project devDependencies?',
      default: true,
      when: function () {
        return !this.options["flow-bin"];
      }
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },
  writing() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    const scripts = Object.assign({}, pkg.scripts, {flow: "flow check"});
    const newPkg = Object.assign({}, pkg, {scripts: scripts});
    this.fs.writeJSON(this.destinationPath('package.json'), newPkg);
  },
  install: function () {
    if (this.props.installFlowBin) {
      this.npmInstall(['flow-bin'], {saveDev: true});
    }
  },
  end: function () {
    var done = this.async();
    if (this.props.installFlowBin) {
      this.spawnCommand("./node_modules/.bin/flow", ["init"], done);
    } else {
      this.spawnCommand("flow", ["init"], done);
    }
  }
});
