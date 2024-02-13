const userModel = require('../models/user.model');

async function create(user) {
    return userModel.create(user);
}

async function find({ searchString = '', page = 1, perPage = 20 }) {
    const filter = {
        firstName: { $regex: `^${searchString}`, $options: 'gi' },
    };

    return {
        items: await userModel.find(filter).skip((page - 1) * perPage).limit(Number(perPage)),
        count: await userModel.countDocuments(filter),
    }
}

async function findById(id) {
    return userModel.findById(id);
}

async function findByIdAndUpdate(id, update) {
    return userModel.findByIdAndUpdate(id, update, { upsert: false, new: true });
};

async function findByIdAndDelete(id) {
    return userModel.findByIdAndDelete(id);
};

module.exports = {
    create,
    find,
    findById,
    findByIdAndUpdate,
    findByIdAndDelete,
};