const file = require('./file');

const MAX_SEARCH_DAYS = 3;

const getFieldData = async (date, fieldName, path, local)  => {
    let daysSearched = 0;
    let searchDate = new Date(date);

    while(daysSearched < MAX_SEARCH_DAYS) {
        let res = await file.searchFieldDataForDate(searchDate, fieldName, path, local);

        if(!res) {
            console.log(`No updates for [${fieldName}] found for ${searchDate.toLocaleDateString()}`);
            console.log('Checking previous day...')

            searchDate.setDate(searchDate.getDate() - 1);
            searchDate.setHours(23,59,59,999);
            daysSearched++;
        } else {
            return res;
        }
    }

    throw new Error(`\nNo measurements found for [${fieldName}] within three days of ${date.toLocaleDateString()}`)
}

exports.getFieldData = getFieldData;