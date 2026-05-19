class FilterBuilder {
  constructor() {
    this.filter = {};
  }

  addExact(field, value) {
    if (value !== undefined && value !== null && value !== '') {
      this.filter[field] = value;
    }
    return this;
  }

  addRange(field, min, max) {
    if ((min !== undefined && min !== null && min !== '') ||
        (max !== undefined && max !== null && max !== '')) {
      this.filter[field] = {};
      if (min) this.filter[field].$gte = parseFloat(min);
      if (max) this.filter[field].$lte = parseFloat(max);
    }
    return this;
  }

  addRegex(field, value) {
    if (value) {
      this.filter[field] = { $regex: value, $options: 'i' };
    }
    return this;
  }

  addIn(field, values) {
    if (values && values.length > 0) {
      this.filter[field] = { $in: values };
    }
    return this;
  }

  build() {
    return this.filter;
  }
}

module.exports = FilterBuilder;
