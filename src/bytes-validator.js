BytesValidator.$inject = BytesFilter.$inject = StringToBytesFilter.$inject = ['$bytes'];

var module = angular.module('bytes-validator', []);
module.service('$bytes', BytesService);
module.filter('bytes', BytesFilter);
module.filter('stringToBytes', StringToBytesFilter);
module.directive('bytesValidate', BytesService);

function BytesService() {

  this.formatBytes = formatBytes;
  this.lengthInUtf8Bytes = lengthInUtf8Bytes;

  function lengthInUtf8Bytes(string) {
    // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
    var m = encodeURIComponent(string).match(/%[89ABab]/g);
    return string.length + (m ? m.length : 0);
  }

  function formatBytes(number) {
    var exponent;
    var unit;
    var negative = number < 0;
    var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    if (negative) {
      number = -number;
    }

    if (number < 1) {
      return (negative ? '-' : '') + number + ' B';
    }

    exponent = Math.min(Math.floor(Math.log(number) / Math.log(1000)), units.length - 1);
    number = Number((number / Math.pow(1000, exponent)).toFixed(2));
    unit = units[exponent];

    return (negative ? '-' : '') + number + ' ' + unit;
  }
}

function BytesFilter($bytes) {

  return function(number) {
    if (!number || parseInt(number) == 0) {
      return '';
    }
    return $bytes.formatBytes(number);
  }
}

function StringToBytesFilter($bytes) {

  return function(string) {
    if (!string || string === '') {
      return '';
    }
    return $bytes.formatBytes($bytes.lengthInUtf8Bytes(string));
  }
}

function BytesValidator($bytes) {

  return {
    require: 'ngModel',
    link: function ($scope, $elem, $attr, ngModelCtrl) {
      var limit = $attr.bytesValidate || 140;

      // For DOM -> model validation
      ngModelCtrl.$parsers.unshift(function (value) {
        ngModelCtrl.$setValidity('bytes', $bytes.lengthInUtf8Bytes(value) <= limit);
        return valid ? value : undefined;
      });

      // For model -> DOM validation
      ngModelCtrl.$formatters.unshift(function (value) {
        ngModelCtrl.$setValidity('bytes',  $bytes.lengthInUtf8Bytes(value) <= limit);
        return value;
      });
    }
  };
}
