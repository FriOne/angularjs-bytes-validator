/** @internal */
import { ng as angular } from './angular';

import { BytesService } from './bytes-validator.service';
import { BytesValidator } from './bytes-validator.directive';
import { BytesFilter, StringToBytesFilter } from './bytes-validator.filter';

const module = angular.module('bytes-validator', []);
module.service('$bytes', BytesService);
module.filter('bytes', BytesFilter);
module.filter('stringToBytes', StringToBytesFilter);
module.directive('bytesValidate', BytesValidator.instance);
