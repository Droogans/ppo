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
        '{{{{ binding.data }}}}',
        '{{{{ binding.fn() }}}}',
        '{{{{ binding.fn(input) }}}}',
        '{{{{ typeof binding.data }}}}',
        '{{{{binding.data}}}}',
        '{{{{binding.fn()}}}}',
        '{{{{binding.fn(input)}}}}',
        '{{{{typeof binding.data}}}}'
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
        '{{{{ "binding.data | filter" }}}}',
        '{{{{ "binding.data | filter:this" }}}}',
        '{{{{ "binding.data" }}}}',
        '{{{{ "binding.data|filter" }}}}',
        '{{{{ "binding.fn()" }}}}',
        '{{{{ "binding.fn(input)" }}}}',
        '{{{{ "typeof binding.data" }}}}',
        '{{{{"binding.data | filter"}}}}',
        '{{{{"binding.data | filter:this"}}}}',
        '{{{{"binding.data"}}}}',
        '{{{{"binding.data|filter"}}}}',
        '{{{{"binding.fn()"}}}}',
        '{{{{"binding.fn(input)"}}}}',
        '{{{{"typeof binding.data"}}}}'
      ]
    },

    model: {
      first: [
        'by model "typeof binding.data"',
        'by model "binding.data"',
        'by model "binding.fn()"',
        'by model "binding.fn(input)"'
      ],
      all: [
        'all by model "typeof binding.data"',
        'all by model "binding.data"',
        'all by model "binding.fn()"',
        'all by model "binding.fn(input)"'
      ]
    },

    buttonText: {
      first: [
        'by buttonText "Save for Later"',
        'by buttonText "Submit"',
      ],
      all: [
        'all by buttonText "Save for Later"',
        'all by buttonText "Submit"',
      ]
    },

    partialButtonText: {
      first: [
        'by partialButtonText "Save for "',
        'by partialButtonText "Sub"',
      ],
      all: [
        'all by partialButtonText "Save for "',
        'all by partialButtonText "Sub"',
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
        '..class-name',
        '..className',
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
        'all by css "div[labelFor="Title"]"'
      ]
    },

    id: {
      first: [
        '#id-name',
        '#idName',
        'by id "id"'
      ],
      all: [
        '##id-name',
        '##idName',
        'all by id "id"'
      ]
    },

    js: {
      first: [
        'by js "2 + 2"',
        'by js "2 + "2""',
        'by js "function (input) { return input.indexOf("string"); })"',
        '`2 + 2`',
        '`2 + "2"`',
        '`function (input) { return input.indexOf("string"); }`',
      ],
      all: [
        'all by js "2 + 2"',
        'all by js "2 + "2""',
        'all by js "function (input) { return input.indexOf("string"); })"',
        '```2 + 2```',
        '```2 + "2"```',
        '```function (input) { return input.indexOf("string"); }```',
      ]
    },

    linkText: {
      first: [
        'by link text "Submit"',
        'href="Submit"'
      ],
      all: [
        'all by link text "Submit"',
        'hrefs="Submit"'
      ]
    },

    partialLinkText: {
      first: [
        'by link text "Submit"',
        'href*="Submit"'
      ],
      all: [
        'all by link text "Submit"',
        'hrefs*="Submit"'
      ]
    },

    name: {
      first: [
        'name="Submit"'
      ],
      all: [
        'names="Submit"'
      ]
    },

    tagName: {
      first: [
        '<span>',
        '<li>'
      ],
      all: [
        '<<span>>',
        '<<li>>'
      ]
    },

    xpath: {
      first: [
        '/span',
        '/div'
      ],
      all: [
        '//span',
        '//div'
      ]
    }
  };

  it('should have every selector available in protractor listed', function () {
    var selectors = _.keys(protractorSelectors).concat(_.keys(seleniumSelectors));
    expect(_.difference(_.functions(by), selectors.sort())).to.eql(['addLocator']);
  });

});
