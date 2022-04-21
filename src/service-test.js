const Service = require('./service');
const sinon = require('sinon');
const {deepStrictEqual} = require('assert');
//Consuming the Star Wars API - SWAPI 
const BASE_URL_1 = "https://swapi.dev/api/planets/1/";
const BASE_URL_2 = "https://swapi.dev/api/planets/2/";
//Using mocks with JSON files with API return data
const mocks = {
    tatooine: require('./mocks/tatooine.json'),
    alderaan: require('./mocks/alderaan.json'),
};

( async () => {
        /**  This method goes to the Internet and obtaining the API data
             const service = new Service()
             const withoutStub = await service.makeRequest(BASE_URL_2)
             console.log(JSON.stringify(withoutStub))
        */
        //Using stub and sinon to override the default behavior of makeRequest function to handle API dependency using the specifics mocks
        const service = new Service();
        const stub = sinon.stub(service, service.makeRequest.name);

        stub
            .withArgs(BASE_URL_1)
            .resolves(mocks.tatooine)
        stub
            .withArgs(BASE_URL_2)
            .resolves(mocks.alderaan)        

        //Creating the objects with expected API return data
        {
            const expected = {
                name: 'Tatooine',
                surfaceWater: '1',
                appearsIn: 5
            };
            const actual = await service.getPlanet(BASE_URL_1);
            deepStrictEqual(actual, expected);
        }
        {
            const expected = {
                name: 'Alderaan',
                surfaceWater: '40',
                appearsIn: 2
            };
            const actual = await service.getPlanet(BASE_URL_2);
            deepStrictEqual(actual, expected);
        }
})(); 