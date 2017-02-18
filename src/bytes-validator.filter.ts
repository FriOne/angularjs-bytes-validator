/** @internal */
import { BytesService } from './bytes-validator.service';

BytesFilter.$inject = StringToBytesFilter.$inject = ['$bytes'];

export function BytesFilter($bytes: BytesService) {

  return (value: string | number) => {
    let numberValue: number = (typeof value === 'number') ? value : parseInt(value);
    if (!numberValue || numberValue == 0) {
      return '';
    }
    return $bytes.formatBytes(numberValue);
  }
}

export function StringToBytesFilter($bytes: BytesService) {
  return (string: string) => {
    if (!string || string == '') {
      return '';
    }
    return $bytes.formatBytes($bytes.lengthInUtf8Bytes(string));
  }
}
