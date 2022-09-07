const fs = require('fs');
const axios = require('axios');
const argv = process.argv;

function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            console.log(`Error: ${err}`);
            process.exit(1);
        }
        console.log(`file contents: ${data}`);
    })
};



async function webCat(url){
    try{
        const resp = await axios.get(argv[2]);
        console.log(resp.data);
    } catch (err){
        console.log(`Error fetching ${url}:`)
        console.log(`${err}`);
        process.exit(1);
    }       
}

if (argv[2].startsWith('http')){
    webCat(argv[2]);
}else{
    cat(argv[2]);
}
