module.exports = function (sequelize, Datatypes) {
    var Todo = sequelize.define("Todo", {
        text: Datatypes.STRING,
        complete: Datatypes.BOOLEAN
    });

    return Todo;
}



