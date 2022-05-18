const { Customer } = require("../models");
const db = require("../models");
const Cusomer = db.Customer;

exports.addCustomer = async (customer) => {
    let data = await Cusomer.create(customer);

    return data
}

exports.updateCustomer = async (customer,id) => {
    let data = await Cusomer.update(customer, {
        where: {
            id: id
        }
    })

    return data;
}

exports.getAllCustomer = async () =>{
    let {rows:data, count} = await Customer.findAndCountAll({ distinct: true, where: {}})

    return {
        data,count
    }
}

exports.getCustomerById = async (id) => {
    let data = await Cusomer.findByPk(id);

    return data
}

exports.getCustomerByOption = async (option) => {
    let {rows: data, count} = await Cusomer.findAndCountAll(option);

    return {data, count}
}