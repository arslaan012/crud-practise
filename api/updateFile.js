const fs = require('fs')

const update = (filePath, params) => {
    try{
        const {obj, name, age} = params
    
        const dataFile = fs.readFileSync(filePath, 'utf8')
    
        const data = JSON.parse(dataFile)
    
        if(!data[obj])return {error: "Object not found"}
    
        if(name !== undefined)data[obj].name = name
        if(age !== undefined)data[obj].age = age
    
        fs.writeFileSync(filePath, JSON.stringify(data), 'utf8')
    
        return {message: "File created successfully", data: data[obj]}
    }
    catch(err){
        console.error("Error creating object:", err.message);
        return { error: "Failed to create object", details: err.message };

    }
}


module.exports = {
    update
}