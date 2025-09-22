class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery; // Product.find()
        this.queryString = queryString; // req.query
    }

    filter() {
        // filtering
        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        const queryStringObj = { ...this.queryString };
        const excludeFields = ['page', 'sort', 'limit', 'fields', 'keyword'];
        excludeFields.forEach((el) => delete queryStringObj[el]);
        // advanced filtering using gte gt lte lt
        let queryString = JSON.stringify(queryStringObj);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryString));
        return this;
    }

    sort() {

        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort('-createdAt');
        }
        return this;  // we do this to make the object of the methods of this classe chainable
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(fields);
        } else {
            this.mongooseQuery = this.mongooseQuery.select('-__v'); // exclude __v field by default where no fields selected
        }
        return this;
    }

    search(modelName) {
        if (this.queryString.keyword) {
            const query = {};
            if (modelName === 'Product') {
                query.$or = [
                    { title: { $regex: this.queryString.keyword, $options: 'i' } },
                    { description: { $regex: this.queryString.keyword, $options: 'i' } },
                ];
            } else {
                query.name = { $regex: this.queryString.keyword, $options: 'i' };
            }
            this.mongooseQuery = this.mongooseQuery.find(query);
        }

        return this;
    }

    paginate(countDocuments) {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 50;
        const skip = (page - 1) * limit;
        const endIndex = page * limit; // we are in page two so endIndex is 2*10=20

        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;
        // get total documents in the collection
        pagination.numberOfPages = Math.ceil(countDocuments / limit);

        //next page 
        if (endIndex < countDocuments) {
            pagination.next = page + 1;
        }
        //previous page
        if (skip > 0) {
            pagination.prev = page - 1;
        }

        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        this.paginationResult = pagination;
        return this;
    }

}
module.exports = ApiFeatures;