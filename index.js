
var notepad = {
	template: '<div class="panel panel-info">' +
				    '<div class="panel-heading" role="tab" id="heading{{i}}">' +
				      '<h4 class="panel-title">' +
				        '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse{{i}}" aria-expanded="true" aria-controls="collapse{{i}}">' +
				          '{{title}}' +
				        '</a>' +
				      '</h4>' +
                    '</div>' +
                   
				    '<div id="collapse{{i}}" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading{{i}}">' +
				      '<div class="panel-body">' +
				        '{{body}}' +
                      '</div>' +
                      '<button class="btn btn-info" id="update">Update</button>'+
                      '<button class="btn btn-danger pull-right" id="delete" onclick="notepad.delete({{i}})">Delete</button>'+
                      
				    '</div>' +
				  '</div>',
	init: function(){
		var data = notepad.fetch();

		notepad.display(data);

		$("#save").click(function(e){
			var title = $("#note-heading").val();
			var body = $("#note-body").val();

			notepad.save(title, body);
		});
		$("#clear").click(notepad.clear);
	},
	save: function(title, body){
		var data = notepad.fetch();

		data.push({
			title: title,
			body: body
		});

		notepad.display(data);

		localStorage["notes"] = JSON.stringify(data);
	},
	clear: function(){
		$("#note-heading").val("");
		$("#note-body").val("");
	},
	fetch: function(){
		var data = localStorage["notes"];
		if(typeof data == "undefined")
			data = [];
		else
			data = JSON.parse(data);

		return data;
	},
	display: function(data){
		var HTML = "";
		var output = "";
		for(i = 0; i < data.length; i++){
			HTML = notepad.template;
			HTML = HTML.replace("{{i}}", i);
			HTML = HTML.replace("{{i}}", i);
			HTML = HTML.replace("{{i}}", i);
			HTML = HTML.replace("{{i}}", i);
			HTML = HTML.replace("{{i}}", i);
			HTML = HTML.replace("{{i}}", i);
			HTML = HTML.replace("{{title}}", data[i].title);
			HTML = HTML.replace("{{body}}", data[i].body);
			output += HTML;
		}

		$("#accordion").html(output);
	},
	delete: function(id) {
		var data = notepad.fetch();
		data.splice(id, 1);
		notepad.display(data);
		localStorage["notes"] = JSON.stringify(data);
	}
}

$(document).ready(notepad.init);