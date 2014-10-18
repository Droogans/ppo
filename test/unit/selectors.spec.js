var _ = require('lodash');
var util = require('util');
var protractor = require('protractor');
var by = protractor.By;

var parse = require('../../lib/ppo/selectors').parse;

describe('selectors', function () {
  var protractorSelectors = {
    binding: {
      inputs: [
        ['binding.data'],
        ['binding.fn()'],
        ['binding.fn(input)'],
        ['typeof binding.data'],
      ],

      first: [
        'by binding "%s"',
        '{{ %s }}',
        '{{%s}}'
      ],

      all: [
        'all by binding "%s"',
        'all {{ %s }}',
        'all {{%s}}'
      ]
    },

    exactBinding: {
      inputs: [
        ['binding.data | filter:this'],
        ['binding.data | filter'],
        ['binding.data'],
        ['binding.data|filter'],
        ['binding.fn()'],
        ['binding.fn(input)'],
        ['typeof binding.data']
      ],

      first: [
        'by exactBinding "%s"',
        '{{ "%s" }}',
        '{{"%s"}}'
      ],

      all: [
        'all by exactBinding "%s"',
        'all by {{"%s"}}',
        'all {{ "%s" }}',
        'all {{"%s"}}'
      ]
    },

    model: {
      inputs: [
        ['binding.data | filter:this'],
        ['binding.data | filter'],
        ['binding.data'],
        ['binding.data|filter'],
        ['binding.fn()'],
        ['binding.fn(input)'],
        ['typeof binding.data'],
      ],

      first: [
        'by model "%s"',
        'model="%s"'
      ],

      all: [
        'all by model "%s"',
        'all model="%s"'
      ]
    },

    buttonText: {
      inputs: [
        ['Save for Later'],
        ['Submit']
      ],

      first: [
        'by buttonText "%s"',
        'button="%s"'
      ],

      all: [
        'all by buttonText "%s"',
        'all button="%s"'
      ]
    },

    partialButtonText: {
      inputs: [
        ['Save for'],
        ['Sub']
      ],

      first: [
        'by partialButtonText "%s"',
        'button*="%s"'
      ],

      all: [
        'all by partialButtonText "%s"',
        'all button*="%s"'
      ]
    },

    repeater: {
      inputs: [
        ['thing in repeater'],
        ['thing in repeater.fn()'],
        ['thing in repeater.fn(input)'],
        ['thing in repeaterfn()'],
        ['thing in repeaterfn(input)'],
      ],

      first: [
        'by repeater "%s"'
      ],

      all: [
        'all by repeater "%s"',
        '%s'
      ]
    },

    cssContainingText: {
      inputs: [
        ['.title', 'Has Text'],
        ['.title', 'Submit'],
        ['div[labelFor="Title"]', 'Has Text'],
        ['div[labelFor="Title"]', 'Submit']
      ],

      first: [
        '$(%s) "%s"',
        '$(%s), "%s"',
        'by cssContainingText "%s" "%s"',
        'by cssContainingText "%s", "%s"'
      ],

      all: [
        '$$(%s) "%s"',
        '$$(%s), "%s"',
        'all $$(%s) "%s"',
        'all $$(%s), "%s"',
        'all $(%s) "%s"',
        'all $(%s), "%s"',
        'all by cssContainingText "%s" "%s"',
        'all by cssContainingText "%s", "%s"',
      ]
    },

    options: {
      inputs: [
        ['opt for opt in options'],
        ['opt for opt in options.fn()'],
        ['opt for opt in options.fn(input)'],
        ['opt for opt in optionsfn()'],
        ['opt for opt in optionsfn(input)'],
        ['opt.property as opt for opt in optionsfn(input)'],
      ],

      first: [
        'by options "%s"'
      ],

      all: [
        'all by options "%s"',
        '%s'
      ]
    }
  };

  var seleniumSelectors = {
    className: {
      inputs: [
        ['class-name'],
        ['className'],
        ['class-name other classes'],
      ],

      first: [
        '.%s',
        'by className "%s"'
      ],

      all: [
        'all .%s',
        'all by className "%s"'
      ]
    },

    css: {
      inputs: [
        ['.title'],
        ['.title'],
        ['div[labelFor="Title"]'],
        ['div[labelFor="Title"]']
      ],

      first: [
        '$(%s)',
        'by css "%s"'
      ],

      all: [
        '$$(%s)',
        'all by css "%s"',
        'all $$(%s)',
        'all $(%s)'
      ]
    },

    id: {
      inputs: [
        ['id-name'],
        ['idName'],
        ['id']
      ],

      first: [
        '#%s',
        'by id "%s"'
      ],

      all: [
        'all #%s',
        'all by id "%s"'
      ]
    },

    js: {
      inputs: [
        ['2 + "2"'],
        ['2 + 2'],
        ['function (input) { return input.indexOf("string"); }']
      ],

      first: [
        '`%s`',
        'by js "%s"'
      ],

      all: [
        '```%s```',
        'all `%s`',
        'all ```%s```',
        'all by js "%s"'
      ]
    },

    linkText: {
      inputs: [
        ['Submit']
      ],

      first: [
        'by linkText "%s"',
        'href="%s"'
      ],

      all: [
        'all by linkText "%s"',
        'all href="%s"'
      ]
    },

    partialLinkText: {
      inputs: [
        ['Submit']
      ],

      first: [
        'by partialLinkText "%s"',
        'href*="%s"'
      ],

      all: [
        'all by partialLinkText "%s"',
        'all href*="%s"'
      ]
    },

    name: {
      inputs: [
        ['Submit']
      ],

      first: [
        'by name "%s"',
        'name="%s"'
      ],

      all: [
        'all by name "%s"',
        'all name="%s"'
      ]
    },

    tagName: {
      inputs: [
        ['span'],
        ['img']
      ],

      first: [
        'by tagName "%s"',
        '<%s>'
      ],

      all: [
        'all by tagName "%s"',
        'all <%s>'
      ]
    },

    xpath: {
      inputs: [
        ['span'],
        ['div']
      ],

      first: [
        'by xpath "%s"',
        '/%s'
      ],

      all: [
        'all by xpath "%s"',
        '//%s',
        'all //%s'
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
    describe(selectorName, function () {

      it('should have a "by" singular ElementFinder shortcut', function () {
        expect(_.some(shortcuts.first, function (shortcut) { return hasBy.test(shortcut); })).to.be.true;
      });

      it('should have an "all by" ElementArrayFinder shortcut', function () {
        expect(_.some(shortcuts.all, function (shortcut) { return hasAllBy.test(shortcut); })).to.be.true;
      });

      _.forEach(shortcuts.inputs, function (input) {
        describe('one element', function () {

          _.forEach(shortcuts.first, function (first) {

            var selector = util.format.apply(util, _.flatten([first, input]));
            var parsed = parse(selector);

            it('should resolve "' + selector + '" to by.' + selectorName, function () {
              expect(parsed.by.name).to.equal(selectorName);
            });

            it('should resolve "' + selector + '" to element', function () {
              expect(parsed.element.name).to.equal('element');
            });

            it('should match the input "' + input.join(', ') +  '"', function () {
              expect(parsed.input).to.eql(input);
            });

          });
        });

        describe('element.all', function () {

          _.forEach(shortcuts.all, function (all) {

            var selector = util.format.apply(util, _.flatten([all, input]));
            var parsed = parse(selector);

            it('should resolve "' + selector + '" to by.' + selectorName, function () {
              expect(parsed.by.name).to.equal(selectorName);
            });

            it('should resolve "' + selector + '" to element.all', function () {
              expect(parsed.element.name).to.equal('element.all');
            });

            it('should match the input "' + input.join(', ') +  '"', function () {
              expect(parsed.input).to.eql(input);
            });

          });
        });
      });
    });
  });
});
