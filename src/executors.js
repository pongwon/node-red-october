const execa = require('execa');
const Mustache = require('mustache');

module.exports = function(RED) {
	RED.nodes.registerType('docker', function(config) {
		let node = this;

		RED.nodes.createNode(this, config);

		node.on('input', function(msg) {
			execa('docker', ['run', '--rm', Mustache.render(config.image, msg), 'bash', '-c', Mustache.render(config.command, msg)]).then(({stdout}) => {
				msg.payload = stdout;
				node.send(msg);
			});
		});
	});
};
