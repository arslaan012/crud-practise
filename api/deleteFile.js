const fs = require('fs')

const deleteObj = (filePath, obj) => {
    try{
        const dataFile = fs.readFileSync(filePath, 'utf8')
      
        const data = JSON.parse(dataFile)
    
        if(!data[obj])return {error: "Object not found"}
    
        delete data[obj]
    
        fs.writeFileSync(filePath, JSON.stringify(data), 'utf8')
    
        console.log("Deleted object ", obj)
    
        return {message: "Deleted Successfully"}
    }
    catch(err){
        console.error("Error creating object:", err.message);
        return { error: "Failed to create object", details: err.message };

    }

}

module.exports = {
    deleteObj
}