# ngx-validator

## Introduction

Angular2+ form validator, make error tips easy and automatic. don't need to manually write error tips templates.

## Demo

## Installation

```
npm install @why520crazy/ngx-validator --save
# or
yarn add @why520crazy/ngx-validator
```
## Usage

### Loading the module in the app/root module
```
import { NgxValidatorModule } from '@why520crazy/ngx-validator';

@NgModule({
  imports: [
    CommonModule,
    NgxValidatorModule.forRoot()
  ]
})
class AppModule {}
```
## Development

```
$ git clone git@github.com:why520crazy/ngx-validator.git
$ cd ngx-validator
$ npm install
$ npm run start
```

## Building & Publish
```
$ npm run build
$ npm run publish
```


