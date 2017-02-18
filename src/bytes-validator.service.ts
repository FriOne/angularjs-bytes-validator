export class BytesService {

  lengthInUtf8Bytes(string: string) {
    if (!string || !string.length) {
      return 0;
    }
    // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
    var m = encodeURIComponent(string).match(/%[89ABab]/g);
    return string.length + (m ? m.length : 0);
  }

  formatBytes(number: number) {
    let exponent;
    let unit;
    let negative = number < 0;
    let units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

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
