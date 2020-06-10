module.exports = function(RED) {
	RED.nodes.registerType('targets', function(config) {
		let node = this;

		RED.nodes.createNode(this, config);

		node.on('input', function(msg) {
			for(let target of config.targets.split('\n')) {
				node.send({payload: target});
			}
		});
	});

	RED.httpAdmin.post("/inject/:id", RED.auth.needsPermission("inject.write"), function(req,res) {
		var node = RED.nodes.getNode(req.params.id);
		if (node != null) {
			try {
				node.receive();
				res.sendStatus(200);
			} catch(err) {
				res.sendStatus(500);
				node.error(RED._("Scan failed",{error:err.toString()}));
			}
		} else {
			res.sendStatus(404);
		}
	});
};
