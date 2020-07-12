const file = require('./file')

const LOCAL_PATH = '/tmp/ehub_data';
const S3_PATH = 's3://net.energyhub.assets/public/dev-exercises/thermostat-data/'

describe('file.js', () => {

    describe('when searching local field data', () => {

        test('returns most recent measurement before given date', async () => {
            const path = LOCAL_PATH;
            const date = new Date('2016-11-02T03:00');
            const isLocal = true;
            const field = 'ambientTemp'
        
            let expected = 79;
            let actual = await file.searchFieldDataForDate(date, field, path, isLocal);
        
            expect(actual).toBe(expected);
        });
        
        test('returns null if matching date file does not exist', async () => {
            const path = LOCAL_PATH;
            const date = new Date('2016-11-01T03:00');
            const isLocal = true;
            const field = 'ambientTemp'
        
            let actual = await file.searchFieldDataForDate(date, field, path, isLocal);
        
            expect(actual).toBe(null);
        });
        
        test('returns null if no matching measurements found', async () => {
            const path = LOCAL_PATH;
            const date = new Date('2016-11-03T03:00');
            const isLocal = true;
            const field = 'garbage'
        
            let actual = await file.searchFieldDataForDate(date, field, path, isLocal);
        
            expect(actual).toBe(null);
        });
    });

    describe('when searching S3 bucket data', () => {

        test('returns most recent measurement before given date', async () => {
            const path = S3_PATH;
            const date = new Date('2016-11-02T03:00');
            const isLocal = false;
            const field = 'ambientTemp'
        
            let expected = 79;
            let actual = await file.searchFieldDataForDate(date, field, path, isLocal);
        
            expect(actual).toBe(expected);
        });
        
        test('returns null if matching date file does not exist', async () => {
            const path = S3_PATH;
            const date = new Date('2016-11-01T03:00');
            const isLocal = false;
            const field = 'ambientTemp'

            let actual = await file.searchFieldDataForDate(date, field, path, isLocal);
        
            expect(actual).toBe(null);
        });
        
        test('returns null if no matching measurements found', async () => {
            const path = S3_PATH;
            const date = new Date('2016-11-03T03:00');
            const isLocal = false;
            const field = 'garbage'
        
            let actual = await file.searchFieldDataForDate(date, field, path, isLocal);
        
            expect(actual).toBe(null);
        });
    });

});

