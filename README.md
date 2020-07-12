# Coding Sample

### Set Up

Must have node installed on system in order to run the script. Install necessary dependecies by running: 
```console
$ npm install
```
In order to run the script to access S3 files, valid AWS credentials must be added to `config.json` before running.

### Usage

Project can by run by specifying the field name, file path, and timestamp. Example usage:
```console
$ node index ambientTemp s3://net.energyhub.assets/public/dev-exercises/thermostat-data/ 2016-01-01T03:00
$ node index ambientTemp /tmp/ehub_data 2016-01-01T03:00
```

### Tests
For simplicity, the unit tests assume that field data matching files contained in the example `thermostat-data.tar.gz` archive exists both locally at `/tmp/ehub_data` and within the S3 bucket `s3://net.energyhub.assets`.
Unit tests can be run with:
```console
$ npm test
```