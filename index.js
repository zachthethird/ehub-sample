const ehub = require('./src/ehub')

function main(fieldName, path, timestamp) {
    const date = new Date(timestamp);
    const isLocal = !(path.includes('s3://'));
    
        if(isNaN(Date.parse(date))) {
            console.error('Invalid Timestamp');
            return;
        }      

        ehub.getFieldData(date, fieldName, path, isLocal)
        .then(res => {
            console.log(res);
        }, err => {
            console.error(err.message);
        })
}

(function() {
    const args = process.argv.slice(2);
    const fieldName = args[0];
    const path = args[1];
    const timestamp = args[2];

    main(fieldName, path, timestamp);
})();