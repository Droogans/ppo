var selectors = require('../../lib/ppo/selectors');
var by = require('protractor').By;
var _ = require('lodash');

describe('selectors', function () {
  var protractorSelectors = {
    binding: {
      first: [
        'by binding "binding.data"',
        'by binding "binding.fn()"',
        'by binding "binding.fn(input)"',
        'by binding "typeof binding.data"',
        '{{ binding.data }}',
        '{{ binding.fn() }}',
        '{{ binding.fn(input) }}',
        '{{ typeof binding.data }}',
        '{{binding.data}}',
        '{{binding.fn()}}',
        '{{binding.fn(input)}}',
        '{{typeof binding.data}}'
      ],

      all: [
        'all by binding "typeof binding.data"',
        'all by binding "binding.data"',
        'all by binding "binding.fn()"',
        'all by binding "binding.fn(input)"',
        'all {{ binding.data }}',
        'all {{ binding.fn() }}',
        'all {{ binding.fn(input) }}',
        'all {{ typeof binding.data }}',
        'all {{binding.data}}',
        'all {{binding.fn()}}',
        'all {{binding.fn(input)}}',
        'all {{typeof binding.data}}'
      ]
    },

    exactBinding: {
      first: [
        'by exactBinding "binding.data | filter:this"',
        'by exactBinding "binding.data | filter"',
        'by exactBinding "binding.data"',
        'by exactBinding "binding.data|filter"',
        'by exactBinding "binding.fn()"',
        'by exactBinding "binding.fn(input)"',
        '{{ "binding.data | filter" }}',
        '{{ "binding.data | filter:this" }}',
        '{{ "binding.data" }}',
        '{{ "binding.data|filter" }}',
        '{{ "binding.fn()" }}',
        '{{ "binding.fn(input)" }}',
        '{{ "typeof binding.data" }}',
        '{{"binding.data | filter"}}',
        '{{"binding.data | filter:this"}}',
        '{{"binding.data"}}',
        '{{"binding.data|filter"}}',
        '{{"binding.fn()"}}',
        '{{"binding.fn(input)"}}',
        '{{"typeof binding.data"}}'
      ],

      all: [
        'all by exactBinding "binding.data | filter:this"',
        'all by exactBinding "binding.data | filter"',
        'all by exactBinding binding.data',
        'all by exactBinding binding.data|filter',
        'all by exactBinding binding.fn()',
        'all by exactBinding binding.fn(input)',
        'all by {{"binding.data | filter:this"}}',
        'all by {{"binding.data"}}',
        'all by {{"binding.data"}}',
        'all by {{"binding.data|filter"}}',
        'all by {{"binding.fn()"}}',
        'all by {{"binding.fn()"}}',
        'all by {{"binding.fn(input)"}}',
        'all by {{"binding.fn(input)"}}',
        'all {{ "binding.data | filter" }}',
        'all {{ "binding.data | filter:this" }}',
        'all {{ "binding.data" }}',
        'all {{ "binding.data|filter" }}',
        'all {{ "binding.fn()" }}',
        'all {{ "binding.fn(input)" }}',
        'all {{ "typeof binding.data" }}',
        'all {{"binding.data | filter"}}',
        'all {{"binding.data | filter:this"}}',
        'all {{"binding.data"}}',
        'all {{"binding.data|filter"}}',
        'all {{"binding.fn()"}}',
        'all {{"binding.fn(input)"}}',
        'all {{"typeof binding.data"}}'
      ]
    },

    model: {
      first: [
        'by model "typeof binding.data"',
        'by model "binding.data"',
        'by model "binding.fn()"',
        'by model "binding.fn(input)"',
        'model="typeof binding.data"',
        'model="binding.data"',
        'model="binding.fn()"',
        'model="binding.fn(input)"'
      ],
      all: [
        'all by model "binding.data"',
        'all by model "binding.fn()"',
        'all by model "binding.fn(input)"',
        'all by model "typeof binding.data"',
        'all model="binding.data"',
        'all model="binding.fn()"',
        'all model="binding.fn(input)"',
        'all model="typeof binding.data"'
      ]
    },

    buttonText: {
      first: [
        'by buttonText "Save for Later"',
        'by buttonText "Submit"',
        'button="Save for Later"',
        'button="Submit"'
      ],
      all: [
        'all by buttonText "Save for Later"',
        'all by buttonText "Submit"',
        'all button="Save for Later"',
        'all button="Submit"'
      ]
    },

    partialButtonText: {
      first: [
        'by partialButtonText "Save for "',
        'by partialButtonText "Sub"',
        'button*="Save for "',
        'button*="Sub"'
      ],
      all: [
        'all by partialButtonText "Save for "',
        'all by partialButtonText "Sub"',
        'all button*="Save for "',
        'all button*="Sub"'
      ]
    },

    repeater: {
      first: [
        'by repeater "thing in repeater"',
        'by repeater "thing in repeater.fn()"',
        'by repeater "thing in repeater.fn(input)"',
        'by repeater "thing in repeaterfn()"',
        'by repeater "thing in repeaterfn(input)"'
      ],
      all: [
        'all by repeater "thing in repeater"',
        'all by repeater "thing in repeater.fn()"',
        'all by repeater "thing in repeater.fn(input)"',
        'all by repeater "thing in repeaterfn()"',
        'all by repeater "thing in repeaterfn(input)"',
        'thing in repeater',
        'thing in repeater.fn()',
        'thing in repeater.fn(input)',
        'thing in repeaterfn()',
        'thing in repeaterfn(input)'
      ]
    },

    cssContainingText: {
      first: [
        '$(.title) "Has Text"',
        '$(.title) "Submit"',
        '$(div[labelFor="Title"]) "Has Text"',
        '$(div[labelFor="Title"]) "Submit"',
        'by cssContainingText div[labelFor="Title"] "Has Text"',
        'by cssContainingText div[labelFor="Title"] "Submit"',
      ],
      all: [
        '$$(.title) "Has Text"',
        '$$(.title) "Submit"',
        '$$(div[labelFor="Title"]) "Has Text"',
        '$$(div[labelFor="Title"]) "Submit"',
        'all $$(.title) "Has Text"',
        'all $$(.title) "Submit"',
        'all $$(div[labelFor="Title"]) "Has Text"',
        'all $$(div[labelFor="Title"]) "Submit"',
        'all $(.title) "Has Text"',
        'all $(.title) "Submit"',
        'all $(div[labelFor="Title"]) "Has Text"',
        'all $(div[labelFor="Title"]) "Submit"',
        'all by cssContainingText "div[labelFor="Title"]" "Has Text"',
        'all by cssContainingText "div[labelFor="Title"]" "Submit"'
      ]
    },

    options: {
      first: [
        'by options "opt for opt in options"',
        'by options "opt for opt in options.fn()"',
        'by options "opt for opt in options.fn(input)"',
        'by options "opt for opt in optionsfn()"',
        'by options "opt for opt in optionsfn(input)"'
      ],
      all: [
        'all by options "opt for opt in options"',
        'all by options "opt for opt in options.fn()"',
        'all by options "opt for opt in options.fn(input)"',
        'all by options "opt for opt in optionsfn()"',
        'all by options "opt for opt in optionsfn(input)"',
        'opt for opt in options',
        'opt for opt in options.fn()',
        'opt for opt in options.fn(input)',
        'opt for opt in optionsfn()',
        'opt for opt in optionsfn(input)'
      ]
    }
  };

  var seleniumSelectors = {
    className: {
      first: [
        '.class-name',
        '.className',
        'by className "class-name"',
        'by className "class-name other classes"'
      ],
      all: [
        'all .class-name',
        'all .className',
        'all by className "class-name"',
        'all by className "class-name other classes"'
      ]
    },

    css: {
      first: [
        '$(.title)',
        '$(div[labelFor="Title"])',
        'by css ".title"',
        'by css "div[labelFor="Title"]"'
      ],
      all: [
        '$$(.title)',
        '$$(div[labelFor="Title"])',
        'all by css ".title"',
        'all by css "div[labelFor="Title"]"',
        'all $$(.title)',
        'all $$(div[labelFor="Title"])',
        'all $(.title)',
        'all $(div[labelFor="Title"])'
      ]
    },

    id: {
      first: [
        '#id-name',
        '#idName',
        'by id "id"'
      ],
      all: [
        'all #id-name',
        'all #idName',
        'all by id "id"'
      ]
    },

    js: {
      first: [
        '`2 + "2"`',
        '`2 + 2`',
        '`function (input) { return input.indexOf("string"); }`',
        'by js "2 + "2""',
        'by js "2 + 2"',
        'by js "function (input) { return input.indexOf("string"); })"'
      ],
      all: [
        '```2 + "2"```',
        '```2 + 2```',
        '```function (input) { return input.indexOf("string"); }```',
        'all `2 + "2"```',
        'all `2 + 2```',
        'all ```2 + "2"```',
        'all ```2 + 2```',
        'all ```function (input) { return input.indexOf("string"); }```',
        'all `function (input) { return input.indexOf("string"); }```',
        'all by js "2 + "2""',
        'all by js "2 + 2"',
        'all by js "function (input) { return input.indexOf("string"); })"',
      ]
    },

    linkText: {
      first: [
        'by link text "Submit"',
        'href="Submit"'
      ],
      all: [
        'all by link text "Submit"',
        'all href="Submit"'
      ]
    },

    partialLinkText: {
      first: [
        'by link text "Submit"',
        'href*="Submit"'
      ],
      all: [
        'all by link text "Submit"',
        'all href*="Submit"'
      ]
    },

    name: {
      first: [
        'by name "Submit"',
        'name="Submit"'
      ],
      all: [
        'all by name "Submit"',
        'all name="Submit"'
      ]
    },

    tagName: {
      first: [
        'by tagName "span"',
        '<span>',
        '<img>'
      ],
      all: [
        'all by tagName "span"',
        'all <span>',
        'all <img>'
      ]
    },

    xpath: {
      first: [
        'by xpath "span"',
        '/span',
        '/div'
      ],
      all: [
        'all by xpath "span"',
        '//span',
        '//div',
        'all //span',
        'all //div',
        'all /span',
        'all /div'
      ]
    }
  };

  var selectors = _.merge(protractorSelectors, seleniumSelectors);

  it('should have every selector available in protractor listed', function () {
    expect(_.difference(_.functions(by), _.keys(selectors).sort())).to.eql(['addLocator']);
  });

  var hasBy = /^by\s.*/;
  var hasAllBy = /^all by\s.*/;
  _.forEach(selectors, function (shortcuts, selectorName) {

    it('should have a "by" singular ElementFinder shortcut for ' + selectorName, function () {
      expect(_.some(shortcuts.first, function (shortcut) { return hasBy.test(shortcut); })).to.be.true;
    });

    it('should have an "all by" ElementArrayFinder shortcut for ' + selectorName, function () {
      expect(_.some(shortcuts.all, function (shortcut) { return hasAllBy.test(shortcut); })).to.be.true;
    });

  });

});
