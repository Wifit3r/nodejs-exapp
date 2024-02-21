const userModel = require('../models/user.model');

async function create(user) {
    const { _id } = await userModel.create(user);
    return _id;
}

async function find({ searchString = '', page = 1, perPage = 20 }) {
    const filter = {
        firstName: { $regex: `^${searchString}`, $options: 'gi' },
    };

    return {
        items: await userModel.find(filter, { password: 0, __v: 0 }).skip((page - 1) * perPage).limit(Number(perPage)),
        count: await userModel.countDocuments(filter),
    }
}

async function findById(id) {
    return userModel.findById(id, { password: 0, __v: 0 });
}

async function findByIdAndUpdate(id, update) {
    return userModel.findByIdAndUpdate(id, update, { upsert: false, new: true });
};

async function findByIdAndDelete(id) {
    return userModel.findByIdAndDelete(id);
};

async function findOne(filter, projection = { password: 0, __v: 0 }) {
    return userModel.findOne(filter, projection);
}

module.exports = {
    create,
    find,
    findById,
    findByIdAndUpdate,
    findByIdAndDelete,
    findOne,
};