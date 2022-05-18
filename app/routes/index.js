module.exports = app => {
    app.use('/api/stock', require("./stock.routes"));
    app.use('/api/mainCategory', require("./mainCategory.routes"));
    app.use('/api/products', require("./product.routes"));
    app.use('/api/categorys', require("./category.routes"));
    app.use('/api/variant/', require("./variant.routes"));
    app.use('/api/option', require("./option.routes"));
    app.use('/api/optionValue', require("./optionValue.routes"));
    app.use('/api/users', require("./user.routes"));
    app.use('/api/auth', require("./auth.routes"))
    app.use('/api/images', require("./image.routes"))
    app.use('/api/customer', require("./customer.routes"))
}