# Angular Byte Validator Directive

Main idea was to create directive to validate model size in bytes to limit text that should be pasted into push notification. But now module also includes **$bytes** service to format and calculate bytes number from UTF-8 string and two filters(**bytes** and **stringToBytes**) to format string and bytes to pretty format.


**Module is built with webpack and typescript now. It has typescript definition file and can be load by any type of module loader.**


### Install
```sh
    npm install angularjs-bytes-validator --save
```
### Usage
```javascript
    require('angularjs-bytes-validator');
    // or import 'angularjs-bytes-validator';
    var app = module('somApp', ['bytes-validator']);

    function SomeCtrl($bytes) { // or $bytes: BytesService
        // ...
        $bytes.lengthInUtf8Bytes(utf8String); // Get utf-8 string length in bytes.
        $bytes.formatBytes(bytesCount); // Format bytes in pretty format.
        // Units for formatter ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'].
    }
```
```html
    <!-- Default value is 140 bytes (<= to be valid) -->
    <input ng-model="someCtrl.pushText" name="pushMessage" bytes-validate="140">
    <textarea ng-model="someCtrl.pushText" bytes-validate="140"></textarea>
    <div ng-messages="someCtrl.form.pushMessage.$error">
        <div ng-message="bytes">Too big text size for push notification</div>
    </div>
    <div class="bytes">{{::bytesNumber | bytes}}</div>
    <div class="bytes">{{::utf8String | stringToBytes}}</div>
```
