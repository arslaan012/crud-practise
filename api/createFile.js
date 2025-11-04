const fs = require('fs')

const create = (filePath, logData) => {
    try{
        const {obj, name, age} = logData
    
        const dataFile = fs.readFileSync(filePath, 'utf8')
    
        const data = JSON.parse(dataFile)

        if(data[obj])return {error: "Object already exist"}
    
        data[obj] = {name: name, age: age}
    
        // console.log(data)
    
        fs.writeFileSync(filePath, JSON.stringify(data), 'utf8')
    
        console.log("created entry")

        return {message: "File created successfully", data: data[obj]}
    }
    catch(err){
        console.error("Error creating object:", err.message);
        return { error: "Failed to create object", details: err.message };
    }
}

module.exports = {
    create
}