const ehub = require('./ehub')

const LOCAL_PATH = '/tmp/ehub_data';

describe('ehub.js', () => {

    describe('when searching for measurement at given time', () => {

        test('returns most recent measurement for specified field', async () => {
            const path = LOCAL_PATH;
            const date = new Date('2016-11-02T03:00');
            const field = 'ambientTemp'
            const isLocal = true;
            
            let expected = 79;
            let actual = await ehub.getFieldData(date, field, path, isLocal);
        
            expect(actual).toBe(expected);
        });

        describe('if no measurement found for given date', () => {

            test('will check previous day for measurement', async () => {
                const path = LOCAL_PATH;
                const date = new Date('2016-11-01T03:00');
                const field = 'ambientTemp'
                const isLocal = true;
    
                console.log = jest.fn();
                
                let expected = 76;
                let actual = await ehub.getFieldData(date, field, path, isLocal);
            
                expect(actual).toBe(expected);
                expect(console.log).toHaveBeenCalledWith('Checking previous day...');
            });
        });

        describe('if no measurement found for given date within previous three days', () => {
            
            test('will throw Error', async () => {
                const path = LOCAL_PATH;
                const date = new Date('2017-11-01T03:00');
                const field = 'ambientTemp'
                const isLocal = true;
    
                await expect(ehub.getFieldData(date, field, path, isLocal)).rejects.toThrow();
            });
        });
    });
});