declare module "bytes-validator" {
  export function BytesFilter($bytes: BytesService): (value: string | number) => string;
  export function StringToBytesFilter($bytes: BytesService): (string: string) => string;
  export class BytesService {
    lengthInUtf8Bytes(string: string): number;
    formatBytes(number: number): string;
  }
}
