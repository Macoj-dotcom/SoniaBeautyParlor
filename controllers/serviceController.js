const Service = require("../models/serviceModel");
const createService = async (req, res) => {
    const service = await Service.create(req.body);
    res.status(201).json(service);
};
const getServices = async (req, res) => {
    const services = await Service.find();
    res.json(services);
};
const gerService = async (req, res) => {
    const service = await Service.findById(req.params.id);
    res.json(service);
};
module.exports = {
    createService,
    getServices,
    getService,
};