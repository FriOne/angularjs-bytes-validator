# Angular Byte Validator Directive
Main idea was to create directive to validate model size in bytes to limit text that should be pasted into push notification. But now module also includes **$bytes** service to format and calculate bytes number from UTF-8 string and **bytes** filter to format bytes in pretty format.
### Install
```sh
    npm install angularjs-bytes-validator --save
```
### Usage
```javascript
    require('angularjs-bytes-validator');
    var app = module('somApp', ['bytes-validator']);

    function SomeCtrl($bytes) {
        // ...
        $bytes.lengthInUtf8Bytes(utf8String); // Get utf-8 string length in bytes.
        $bytes.formatBytes(bytesCount); // Format bytes in pretty format.
        // Units for formatter ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'].
    }
```
```html
    <!-- Default value is 140 bytes (<= to be valid) -->
    <input ng-model="someCtrl.pushText" bytes-validate="140">
    <textarea ng-model="someCtrl.pushText" bytes-validate="140"></textarea>
    <div class="bytes">{{::bytesNumber | bytes}}</div>
```