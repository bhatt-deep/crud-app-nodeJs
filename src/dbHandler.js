import { promises as fs } from 'fs'
import path from 'path'
import {NotFoundError} from './util/errors.js'


// private function for the module
const write = async (data, file) => {
    await fs.writeFile(file, JSON.stringify(data))
}

const add = async (data, dataPath) => {
    try {
        let content = await getAll(dataPath)
        content.push(data)
        await write(content, dataPath)
        console.log("file written")
    } catch (err) {
        console.error(err)
        throw err
    }

}

const getAll = async (dataPath) => {
    try {
        let content = await fs.readFile(dataPath, "utf8")
        //console.log(Array.isArray( Array.from(content)))
        return JSON.parse(content)
    } catch (err) {
        console.error("module error", err)
        throw err
    }
}

const getid = async (id,dataPath) => {
    let content = await getAll(dataPath)
    if (!Array.isArray(content)) {
        throw new Error("No data found")
    }
    const itemLocation = content.findIndex(item => item.id=== id)
    //console.log(content[itemLocation])
    if (itemLocation != -1) {
        return content[itemLocation]
    } else {
        throw new NotFoundError(`ID: ${id} not found`)
    }

}

const update = async (id, data, dataPath) => {
    let content = await getAll(dataPath)
    if (!Array.isArray(content)) {
        throw new Error("No data found")
    }

    const itemLocation = content.findIndex(item => item.id=== id)
    console.log(id)
    if (itemLocation != -1) {
        content[itemLocation] = data
    } else {
        throw new NotFoundError(`ID: ${id} not found`)
    }

    // let's write it back to the file now
    await write(content, dataPath)
}

export {
    add,
    getAll,
    update,
    getid
}
