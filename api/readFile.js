const fs = require('fs')

const read = ( filePath, obj ) => {
    try{
        const dataFile = fs.readFileSync(filePath, 'utf8')
    
        const jsonData = JSON.parse(dataFile)
    
        if(!jsonData[obj])return {error: "Object not found"}
    
        console.log(jsonData[obj])
    
        return jsonData[obj]
    }
    catch(err){
        console.error("Error creating object:", err.message);
        return { error: "Failed to create object", details: err.message };

    }

}


module.exports = {
    read
}