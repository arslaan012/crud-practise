const { read } = require('../api/readFile')
const { create } = require('../api/createFile')
const { update } = require('../api/updateFile')
const { deleteObj } = require('../api/deleteFile')
const { readProfile } = require('../api/readProfile')

const statusCodes = require('../constants/httpStatusCodes.json')


const createData = async(req, res) => {
    console.log("create block")

    const { obj, name, age } = req.body

    if(!obj || !name || !age)return res.status(statusCodes.BAD_REQUEST.code).json({error: statusCodes.BAD_REQUEST.message, details: "Some data is not found", })

    const result = await create({obj, name, age})

    // console.log(result)

    if(result.error)return res.status(statusCodes.NOT_FOUND.code).json({error: statusCodes.NOT_FOUND.message, details: result.error})

    return res.status(statusCodes.CREATED.code).json({message: result.message, data: result.data})

}


const readData = async(req, res) => {
    console.log("read block")
    try{
        const { obj } = req.query

        console.log(req.user)
        
        if(!obj)return res.status(statusCodes.BAD_REQUEST.code).json({error: statusCodes.BAD_REQUEST.message, details: "Object is required", })
        
        const result = await read( obj )

        if(result.error)return res.status(statusCodes.NOT_FOUND.code).json({error: statusCodes.NOT_FOUND.message, details: result.error})
        
        return res.status(200).json({message: result.message, data: result.data})
    }
    catch(err){
        console.log(err)
        return res.status(statusCodes.INTERNAL_SERVER_ERROR.code).json({error: statusCodes.INTERNAL_SERVER_ERROR.message, details: err.message})
    }
    
}

const profileData = async(req, res) => {
    console.log("read block")
    try{        
        console.log(req.user)
        
        const result = await readProfile( req.user.email )

        if(result.error)return res.status(statusCodes.NOT_FOUND.code).json({error: statusCodes.NOT_FOUND.message, details: result.error})
        
        return res.status(200).json({message: result.message, data: result.data})
    }
    catch(err){
        console.log(err)
        return res.status(statusCodes.INTERNAL_SERVER_ERROR.code).json({error: statusCodes.INTERNAL_SERVER_ERROR.message, details: err.message})
    }
    
}

const updateData = async(req, res) => {
    console.log("update block")
    
    const { obj, name, age } = req.body

    if(!obj || !name || !age)return res.status(statusCodes.BAD_REQUEST.code).json({error: statusCodes.BAD_REQUEST.message, details: "Some data is not found", })
    
    const result = await update({obj, name, age})

    if(result.error)return res.status(statusCodes.NOT_FOUND.code).json({error: statusCodes.NOT_FOUND.message, details: result.error})

    return res.status(statusCodes.OK.code).json({message: statusCodes.OK.message, details: "File data updated for: ", obj})

}


const deleteData = async(req, res) => {
    console.log("delete block")
    const { obj } = req.query

    if(!obj)return res.status(statusCodes.BAD_REQUEST.code).json({error: statusCodes.BAD_REQUEST.message, details: "Object is required", })
        
    const result = await deleteObj( obj)

    if(result.error)return res.status(statusCodes.NOT_FOUND.code).json({error: statusCodes.NOT_FOUND.message, details: result.error})

    return res.status(201).json({message: result.message, data: result.data})

}



module.exports = {
    deleteData,
    updateData,
    createData,
    readData,
    profileData,
}