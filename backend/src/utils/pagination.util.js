class PaginationUtil {
  static getPagination(page, limit) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;
    return { page: pageNum, limit: limitNum, skip };
  }

  static getPaginationMeta(total, page, limit) {
    const totalPages = Math.ceil(total / limit);
    return {
      page,
      limit,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };
  }
}

module.exports = PaginationUtil;
