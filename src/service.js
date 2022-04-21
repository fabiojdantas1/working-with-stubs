const https = require('node:https');
const { url } = require('node:inspector');

class Service {
    async makeRequest(url) {
        return new Promise((resolve, reject) => {
            https.get(url, response => {
                response.on('data', data  => resolve(JSON.parse(data)))
                response.on('error', reject)
            })
        })
    }
    //Mapping JSON object fields to the properties of the class
    async getPlanet(url) {
        const result = await this.makeRequest(url)

        return {
            name: result.name,
            surfaceWater: result.surface_water,
            appearsIn: result.films.length
        }
    }
};

module.exports = Service;
  