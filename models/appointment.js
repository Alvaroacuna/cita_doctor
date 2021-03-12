const Sequelize = require('sequelize');
module.exports = (sql, type) => {
    return sql.define('appointment', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: type.STRING,
        time: type.STRING,
        patient: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                msg: 'Debe indicar un paciente'
                },
                len: {
                    args: [3],
                    msg: 'El nombre del paciente debe ser de largo al menos 3'
                }
            }
        },
        complain: type.STRING 
    });
}