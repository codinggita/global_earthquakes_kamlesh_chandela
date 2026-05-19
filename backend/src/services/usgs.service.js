const axios = require('axios');
const Earthquake = require('../models/Earthquake.model');
const logger = require('../utils/logger');

class UsgsService {
  static async syncData(startTime, endTime) {
    try {
      const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startTime}&endtime=${endTime}&minmagnitude=4.5`;
      logger.info(`Fetching data from USGS: ${url}`);
      
      const response = await axios.get(url);
      const features = response.data.features;
      
      logger.info(`Found ${features.length} earthquakes from USGS`);
      
      let syncedCount = 0;
      for (const feature of features) {
        const { properties, geometry, id } = feature;
        const exists = await Earthquake.exists({ id });
        
        if (!exists) {
          const eqData = {
            id,
            time: new Date(properties.time),
            latitude: geometry.coordinates[1],
            longitude: geometry.coordinates[0],
            depth: geometry.coordinates[2],
            mag: properties.mag,
            magType: properties.magType,
            place: properties.place,
            type: properties.type,
            status: properties.status,
            tsunami: properties.tsunami,
            net: properties.net,
            nst: properties.nst,
            dmin: properties.dmin,
            rms: properties.rms,
            gap: properties.gap,
            magError: properties.magError,
            magNst: properties.magNst,
            horizontalError: properties.horizontalError,
            depthError: properties.depthError,
          };
          
          await Earthquake.create(eqData);
          syncedCount++;
        }
      }
      
      return syncedCount;
    } catch (error) {
      logger.error(`USGS Sync Error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = UsgsService;
