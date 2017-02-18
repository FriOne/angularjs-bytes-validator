import { BytesService } from './bytes-validator.service';

/** @internal */
export interface Attributes extends ng.IAttributes {
  bytesValidate: string;
}

/** @internal */
export interface Validators extends ng.IModelValidators {
  bytes: any;
}

/** @internal */
export interface NgModelController extends ng.INgModelController {
  $validators: Validators
}

const DEFAULT_BYTES_LIMIT = 140;

/** @internal */
export class BytesValidator implements ng.IDirective {

  static $inject: Array<string> = ['$bytes'];

  static instance($bytes: BytesService): ng.IDirective {
    return new BytesValidator($bytes);
  }

  require = 'ngModel';
  restrict = 'A';

  constructor(public $bytes: BytesService) {}

  link($scope: ng.IScope,
       $element: ng.IAugmentedJQuery,
       $attrs: Attributes,
       ngModelCtrl: NgModelController) {

    let limit = parseInt($attrs.bytesValidate) || DEFAULT_BYTES_LIMIT;
    ngModelCtrl.$validators.bytes = (modelValue, viewValue) => {
      let value = modelValue || viewValue;
      if (!value) {
        return true;
      }
      return (this.$bytes.lengthInUtf8Bytes(value) <= limit);
    };
  }
}
