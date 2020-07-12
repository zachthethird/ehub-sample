const fs = require('fs');
const zlib = require('zlib');
const readline = require('readline');
const AWS = require('aws-sdk');


async function searchFieldDataForDate(date, field, path, local) {
    let file;

    if(local) {
        let name = buildFileName(`${path}/`, date);
        if(!fs.existsSync(name)) {
            return null;
        }
        file = fs.createReadStream(name);
    } else {
        AWS.config.loadFromPath('./config.json');
        let s3 = new AWS.S3({apiVersion: '2006-03-01'});
        let params = getS3Params(path, date);

        try {
            await s3.headObject(params).promise();
            file = s3.getObject(params).createReadStream();
        } catch (err) {
            return null;
        }
    }

    let unzippedStream = file.pipe(zlib.createGunzip());
    return await searchFile(unzippedStream, field, date);
}


async function searchFile(stream, field, date) {
    try {
        const reader = readline.createInterface({
            input: stream
        });

        let mostRecentValue = null;
        for await (const line of reader) {
            let measurement = parseMeasurement(line);
            if(measurement.time < date) {
                if(measurement.update[field]) {
                    mostRecentValue = measurement.update[field];
                }
            } else {
                break;
            }
        }

        return mostRecentValue;
    } catch(err) {
        return null;
    }  
}


function getS3Params(path, date) {
    let url = path.split('//').slice(1)[0];
    let arr = url.split('/');

    let bucket = arr.splice(0, 1)[0];
    let key = buildFileName(arr.join('/'), date);

    return {Bucket: bucket, Key: key};
}


function buildFileName(base, date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${base}${year}/${month}/${day}.jsonl.gz`;
}

function parseMeasurement(line) {
    let json = JSON.parse(line);
    let updateInfo = json.update;
    let updateTime = new Date(json.updateTime);

    return {
        time: updateTime,
        update: updateInfo
    }
}

exports.searchFieldDataForDate = searchFieldDataForDate;