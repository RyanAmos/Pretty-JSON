var JSON_PRETTY = new function () {
	
	var pretty = {
		"parse": function (member) {
			return this[(member == undefined) ? 'null' : member.constructor.name.toLowerCase()](member);
		},
		
		"null": function (value) {
			return this['value']('null', 'null');
		},
		"array": function (value) {
			var results = '';
			for (var x=0; x < value.length; x++) {
				results += '<li>' + this['parse'](value[x]) + '</li>';
			}
			return '[ ' + ((results.length > 0) ? '<ul class="array">' + results + '</ul>' : '') + ' ]';
		},
		"object": function (value) {
			var results = '';
			for (member in value) {
				results += '<li>' + this['value']('object', member) + ': ' + this['parse'](value[member]) + '</li>';
			}
			return '{ ' + ((results.length > 0) ? '<ul class="object">' + results + '</ul>' : '') + ' }';
		},
		"number": function (value) {
			return this['value']('number', value);
		},
		"string": function (value) {
			return this['value']('string', value);
		},
		"boolean": function (value) {
			return this['value']('boolean', value);
		},
		
		"value": function (type, value) {
			if (/^(http|https):\/\/[^\s]+$/.test(value)) {
				return this['value'](type, '<a href="' + value + '" target="_blank">' + value + '</a>');
			}
			return '<span class="' + type + '">' + value + '</span>';
		}
	};
	
	var parse = {
		"error": function (error) {
			return '<h1>Unable to parse JSON.</h1><p><h2>Error Message:</h2><textarea>' + error + '</textarea><br /><br /><h2>Response:</h2><textarea>' + document.body.innerText + '</textarea></p>';
		}
	}
	
	try {
		var output = pretty.parse (eval ('(' + document.body.innerText + ')'));
	}
	catch (error) {
		var output = parse.error (error);
	}
	
	document.body.innerHTML = output;
};