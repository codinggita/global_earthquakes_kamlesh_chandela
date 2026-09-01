const mongoose = require('mongoose');
const Earthquake = require('../models/Earthquake.model');

class EarthquakeService {
  static async getAllEarthquakes(filter, options) {
    const { page, limit, sort } = options;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Earthquake.find(filter).sort(sort).skip(skip).limit(limit),
      Earthquake.countDocuments(filter)
    ]);
    return {
      data, total,
      pagination: {
        page, limit, total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    };
  }

  static async getEarthquakeById(id) {
    if (mongoose.isValidObjectId(id)) {
      const eq = await Earthquake.findById(id);
      if (eq) return eq;
    }
    return await Earthquake.findOne({ id: id });
  }

  static async getEarthquakeByUsgsId(usgsId) {
    return await Earthquake.findOne({ id: usgsId });
  }

  static async createEarthquake(data) {
    return await Earthquake.create(data);
  }

  static async updateEarthquake(id, data) {
    if (mongoose.isValidObjectId(id)) {
      const eq = await Earthquake.findByIdAndUpdate(id, data, { new: true, runValidators: true });
      if (eq) return eq;
    }
    return await Earthquake.findOneAndUpdate({ id: id }, data, { new: true, runValidators: true });
  }

  static async deleteEarthquake(id) {
    if (mongoose.isValidObjectId(id)) {
      const eq = await Earthquake.findByIdAndDelete(id);
      if (eq) return eq;
    }
    return await Earthquake.findOneAndDelete({ id: id });
  }

  static async checkExists(id) {
    if (mongoose.isValidObjectId(id)) {
      const exists = await Earthquake.exists({ _id: id });
      if (exists) return exists;
    }
    return await Earthquake.exists({ id: id });
  }

  static async bulkCreate(earthquakes) {
    return await Earthquake.insertMany(earthquakes, { ordered: false });
  }

  static async bulkUpdate(filter, update) {
    return await Earthquake.updateMany(filter, update);
  }

  static async bulkDelete(ids) {
    return await Earthquake.deleteMany({ _id: { $in: ids } });
  }

  static async getByPlace(place) {
    return await Earthquake.find({ place: { $regex: place, $options: 'i' } }).sort({ time: -1 });
  }

  static async getByCountry(country, pagination) {
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Earthquake.find({ country: { $regex: country, $options: 'i' }, isDeleted: { $ne: true } }).sort({ time: -1 }).skip(skip).limit(limit),
      Earthquake.countDocuments({ country: { $regex: country, $options: 'i' }, isDeleted: { $ne: true } })
    ]);
    return { data, total, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  static async getByType(type) {
    return await Earthquake.find({ type }).sort({ time: -1 });
  }

  static async getByStatus(status) {
    return await Earthquake.find({ status }).sort({ time: -1 });
  }

  static async getByMagType(magType) {
    return await Earthquake.find({ magType }).sort({ mag: -1 });
  }

  static async getByNetwork(net) {
    return await Earthquake.find({ net }).sort({ time: -1 });
  }

  static async getHighMagnitude(minMag, pagination) {
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Earthquake.find({ mag: { $gte: minMag }, isDeleted: { $ne: true } }).sort({ mag: -1 }).skip(skip).limit(limit),
      Earthquake.countDocuments({ mag: { $gte: minMag }, isDeleted: { $ne: true } })
    ]);
    return { data, total, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  static async getDeepEarthquakes(minDepth, pagination) {
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Earthquake.find({ depth: { $gte: minDepth }, isDeleted: { $ne: true } }).sort({ depth: -1 }).skip(skip).limit(limit),
      Earthquake.countDocuments({ depth: { $gte: minDepth }, isDeleted: { $ne: true } })
    ]);
    return { data, total, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  static async getShallowEarthquakes(maxDepth, pagination) {
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Earthquake.find({ depth: { $lte: maxDepth }, isDeleted: { $ne: true } }).sort({ depth: 1 }).skip(skip).limit(limit),
      Earthquake.countDocuments({ depth: { $lte: maxDepth }, isDeleted: { $ne: true } })
    ]);
    return { data, total, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  static async getRecentEarthquakes(days, pagination) {
    const date = new Date();
    date.setDate(date.getDate() - days);
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Earthquake.find({ time: { $gte: date }, isDeleted: { $ne: true } }).sort({ time: -1 }).skip(skip).limit(limit),
      Earthquake.countDocuments({ time: { $gte: date }, isDeleted: { $ne: true } })
    ]);
    return { data, total, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  static async getCriticalEarthquakes() {
    return await Earthquake.find({
      isDeleted: { $ne: true },
      $or: [
        { mag: { $gte: 6.5 } },
        { depth: { $lte: 10 }, mag: { $gte: 5.5 } },
        { country: { $in: ['Japan', 'Indonesia', 'Chile', 'New Zealand'] }, mag: { $gte: 6 } }
      ]
    }).sort({ mag: -1 });
  }

  static async getCount(filter) {
    return await Earthquake.countDocuments(filter);
  }
}

module.exports = EarthquakeService;
