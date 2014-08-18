var protractor = require('protractor');
var by = protractor.By;
// This will likely become the global `element` object once the implementation is ironed out.
var element = protractor.wrapDriver().element;

var compact = function (string) {
  return string.replace(/\s+/, '');
};

var firstChars = function (selectorString, limit) {
  return compact(selectorString).slice(0, limit);
};

var onlyAlphas = /^[A-Za-z]+/;
var firstWord = function (selectorString) {
  var exact = selectorString.match(onlyAlphas);
  var fallback = selectorString.split(' ');
  return (exact === null) ? fallback[0] : exact[0];
};

var firstGroupedSymbols = /[^a-zA-Z\d\s:]+/;
var firstSymbols = function (selectorString) {
  var match = selectorString.match(firstGroupedSymbols);
  return match === null ? undefined : match[0];
};

var stripPrefixes = function (selectorString) {
  return selectorString.replace(/^all\s+/, '').replace(/^by\s+/, '');
};

var detectBindingSelector = function (selectorString) {
  return compact(firstChars(selectorString, 3)) === '{{"' ? 'exactBinding' : 'binding';
};

var cssContainsText = /([^$\("].*[^\)"])[\)"][,]?\s+"(.*)"/;
var detectCssSelector = function (selectorString) {
  return selectorString.match(cssContainsText) === null ? 'css' : 'cssContainingText';
};

var longFormParts = /(all\s+)?by\s+(\b[a-zA-Z]+\b)/;
var longFormByFunction = function (selectorString) {
  return selectorString.match(longFormParts)[2];
};

var repeater = [/\w+\b\s+in\s+/, 'repeater'];
var options = [/\w+\b\s+for\s+\w+\b\s+in\s+/, 'options'];

var matchComplexSelector = function (selectorString) {
  var matchedName;
  var complexSelectors = [repeater, options];

  complexSelectors.forEach(function (regexAndName) {
    var regex = regexAndName[0];
    var name = regexAndName[1];
    if (regex.test(selectorString)) {
      matchedName = name;
      return false;
    }
  });

  return matchedName;
};

var shortcutByFunction = function (selectorString) {
  var symboled, worded;
  symboled = {
    '{' : detectBindingSelector(selectorString),
    '$' : detectCssSelector(selectorString),
    '.' : 'className',
    '#' : 'id',
    '`' : 'js',
    '<' : 'tagName',
    '/' : 'xpath'
  }[firstChars(selectorString, 1)];

  if (symboled !== undefined) {
    return symboled;
  }

  worded = {
    'model="': 'model',
    'button="': 'buttonText',
    'button*="': 'partialButtonText',
    'href="': 'linkText',
    'href*="': 'partialLinkText',
    'name="': 'name'
  }[firstWord(selectorString) + firstSymbols(selectorString)];

  if (worded !== undefined) {
    return worded;
  }

  return matchComplexSelector(selectorString);

};

var byFunction = function (selectorString) {
  var byFn = shortcutByFunction(selectorString);
  var strippedSelector = stripPrefixes(selectorString);
  byFn = byFn || shortcutByFunction(strippedSelector);
  byFn = byFn || longFormByFunction(selectorString);
  return byFn;
};

var elementFunction = function (selectorString) {
  if (['$$', '``', '//'].indexOf(firstChars(selectorString, 2)) > -1) {
    return [element.all, 'element.all'];
  }

  var word = firstWord(selectorString);
  if (matchComplexSelector(selectorString) !== undefined) {
    // Catch 'by option "option selector"' or 'by repeater "repeater selector"'.
    // Without this 'by' keyword, it defaults to 'element.all'.
    return word === 'by' ? [element, 'element'] : [element.all, 'element.all'];
  }

  return word === 'all' ? [element.all, 'element.all'] : [element, 'element'];
};

var simpleQuoteMatch = /"(.*)"/;
var parseInput = function (selectorString, byFnName) {
  // Since cssContainingText has two arguments, all responses are returned as a list.

  selectorString = stripPrefixes(selectorString);
  if (firstWord(selectorString) === byFnName) {
    selectorString = selectorString.slice(byFnName.length).trim();
  }

  if (['options', 'repeater'].indexOf(byFnName) > -1) {
    // The entire selector string is the input, minus any surrounding quotes.
    return [selectorString.replace(/^"/, '').replace(/"$/, '').trim()];
  }

  if (byFnName === 'cssContainingText') {
    var matches = selectorString.match(cssContainsText);
    return [matches[1].trim(), matches[2].trim()];
  }

  if (['"', '="', '*="'].indexOf(firstSymbols(selectorString)) > -1) {
    return [selectorString.match(simpleQuoteMatch)[1].trim()];
  }

  var shortcutMatch = selectorString.match({
    binding: /{{(.*)}}/,
    exactBinding: /{{[\s+]?"(.*)"[\s+]?}}/,
    css: /([^$\("].*[^\)"])[\)"]/,
    className: /\.(.*)/,
    id: /#(.*)/,
    js: /`{1,3}(.*[^`])`{1,3}/,
    tagName: /<(.*)>/,
    xpath: /\/{1,2}(.*)/
  }[byFnName]);

  return shortcutMatch === null ? undefined : [shortcutMatch[1].trim()];

};

module.exports.parse = function (selectorString) {
  var byFnName = byFunction(selectorString);

  var elementOutput = elementFunction(selectorString);
  var elementFn = elementOutput[0];
  var elementName = elementOutput[1];

  return {
    selectorString: selectorString,
    by: { fn: by[byFnName], name: byFnName },
    element: { fn: elementFn, name: elementName },
    input: parseInput(selectorString, byFnName)
  };
};
