const Earthquake = require('../models/Earthquake.model');

class AnalyticsService {
  static async getHighestMagnitude(year) {
    const filter = { isDeleted: { $ne: true } };
    if (year) filter.year = year;
    return await Earthquake.findOne(filter).sort({ mag: -1 });
  }

  static async getDeepestEarthquakes(limit, year) {
    const filter = { isDeleted: { $ne: true } };
    if (year) filter.year = year;
    return await Earthquake.find(filter).sort({ depth: -1 }).limit(limit);
  }

  static async getRecentActivity(days) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    const pipeline = [
      { $match: { isDeleted: { $ne: true }, time: { $gte: date } } },
      { $group: {
          _id: { year: { $year: '$time' }, month: { $month: '$time' }, day: { $dayOfMonth: '$time' } },
          count: { $sum: 1 }, avgMagnitude: { $avg: '$mag' }, maxMagnitude: { $max: '$mag' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } },
      { $limit: 30 }
    ];
    return await Earthquake.aggregate(pipeline);
  }

  static async getLocationAnalysis() {
    const pipeline = [
      { $group: {
          _id: { lat: { $floor: { $divide: ['$latitude', 10] } }, lon: { $floor: { $divide: ['$longitude', 10] } } },
          count: { $sum: 1 }, avgMagnitude: { $avg: '$mag' }, maxMagnitude: { $max: '$mag' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 50 }
    ];
    return await Earthquake.aggregate(pipeline);
  }

  static async getCountryAnalysis(limit, year) {
    const pipeline = [{ $match: { isDeleted: { $ne: true } } }];
    if (year) pipeline.push({ $match: { year } });
    pipeline.push(
      { $group: {
          _id: '$country', count: { $sum: 1 }, avgMagnitude: { $avg: '$mag' },
          maxMagnitude: { $max: '$mag' }, avgDepth: { $avg: '$depth' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: limit }
    );
    return await Earthquake.aggregate(pipeline);
  }

  static async getMagnitudeAnalysis(year) {
    const pipeline = [{ $match: { isDeleted: { $ne: true } } }];
    if (year) pipeline.push({ $match: { year } });
    pipeline.push(
      { $bucket: {
          groupBy: '$mag', boundaries: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          default: 'Other', output: { count: { $sum: 1 }, avgDepth: { $avg: '$depth' } }
        }
      }
    );
    return await Earthquake.aggregate(pipeline);
  }

  static async getDepthAnalysis(year) {
    const pipeline = [{ $match: { isDeleted: { $ne: true } } }];
    if (year) pipeline.push({ $match: { year } });
    pipeline.push(
      { $bucket: {
          groupBy: '$depth', boundaries: [0, 50, 100, 150, 200, 250, 300, 400, 500, 700],
          default: 'Deepest', output: { count: { $sum: 1 }, avgMagnitude: { $avg: '$mag' } }
        }
      }
    );
    return await Earthquake.aggregate(pipeline);
  }

  static async getMonthlyAnalysis(year) {
    const pipeline = [{ $match: { isDeleted: { $ne: true } } }];
    if (year) pipeline.push({ $match: { year } });
    pipeline.push(
      { $group: { _id: '$month', count: { $sum: 1 }, avgMagnitude: { $avg: '$mag' }, maxMagnitude: { $max: '$mag' } } },
      { $sort: { _id: 1 } }
    );
    return await Earthquake.aggregate(pipeline);
  }

  static async getNetworkAnalysis() {
    const pipeline = [
      { $match: { isDeleted: { $ne: true } } },
      { $group: {
          _id: '$net', count: { $sum: 1 }, avgMagnitude: { $avg: '$mag' },
          reviewedCount: { $sum: { $cond: [{ $eq: ['$status', 'reviewed'] }, 1, 0] } }
        }
      },
      { $sort: { count: -1 } }
    ];
    return await Earthquake.aggregate(pipeline);
  }

  static async getErrorAnalysis() {
    const pipeline = [
      { $match: { isDeleted: { $ne: true } } },
      { $group: {
          _id: null,
          avgRms: { $avg: '$rms' },
          avgHorizontalError: { $avg: '$horizontalError' },
          avgDepthError: { $avg: '$depthError' },
          avgMagError: { $avg: '$magError' }
        }
      }
    ];
    return await Earthquake.aggregate(pipeline);
  }
}

module.exports = AnalyticsService;
