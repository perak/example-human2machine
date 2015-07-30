// initial text
var initialText = 
"I want site with three pages: home, customers and about.\n" +
"In home page I want jumbotron with title: \"This application is written in human language!\", text: \"Human to describe app, machine to write code!\", button url: \"customers\".\n"+
"Please create one collection: customers.\n"+
"In customers collection I want three fields: name, address and e-mail.\n"+
"In customers page I want CRUD for customers collection.\n"+
"In about page I want text: \"This application is written in human language using Meteor Kitchen, code generator for Meteor\".\n"+
"";

Template.TEMPLATE_NAME.created = function() {
	if(!Session.get("humanEditorText")) Session.set("humanEditorText", initialText);
};

Template.TEMPLATE_NAME.rendered = function() {
	// function sets editor and preview panel to full height
	function setFullHeight() {
		var viewHeight = $(window).height();
		var footerHeight = $("#footer").outerHeight();
		var codeTop = $(".CodeMirror").offset().top;

		var availableHeight = viewHeight - footerHeight - codeTop;
		if(availableHeight < 200) {
			availableHeight = 200;
		}

		$(".CodeMirror").height(availableHeight);
		$(".full-height").height(availableHeight);
	}

	// set full height on window resize
	$(window).resize(function() {
		setFullHeight();
	});

	// full height initialy
	setFullHeight();
	window.scrollTo(0, 0);
	this.autorun(function (tracker) {
		var txt = Session.get("humanEditorText");
		if(txt) {
			Session.set("jsonEditorText", JSON.stringify(human2machine(txt), null, "  "));
		}
	});
};

Template.TEMPLATE_NAME.events({
});

Template.TEMPLATE_NAME.helpers({
	// codemirror options here
	"humanEditorOptions": function() {
		return {
			lineNumbers: false
		}
	},

	"jsonEditorOptions": function() {
		return {
			lineNumbers: false,
			readOnly: true
		}
	}
});
