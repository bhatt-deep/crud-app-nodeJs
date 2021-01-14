import knex from 'knex'
import config from '../knexfile.js'
const provider = knex(config)


const getAll = async (tablename) => await provider(tablename).select('*')

const getid = async (id,tablename) => await provider(tablename).select('*').where('id', id)

const getOne = async (email,tablename) => await provider(tablename).select('*').where('email', email)

const add = async (data, tablename) => await provider(tablename).insert(data)

const update = async(id, data, tablename) => await provider(tablename).where('id', id).update(data)


export {
    add,
    getAll,
    getOne,
    update,
    getid
}
