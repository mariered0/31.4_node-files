const fs = require('fs');
const axios = require('axios');
const argv = process.argv;

function showFetchingError(url, err){
    console.log(`Error fetching ${url}:`)
    console.log(`${err}`);
    process.exit(1);
}

function showCouldntWriteError(path, err){
    console.log(`Couldn't write ${path}`)
    console.log(`${err}`)
}

function showError(err){
    console.log(`Error: ${err}`);
    process.exit(1);
}

function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            showError(err);
        }
        console.log(`file contents: ${data}`);
    })
};

async function webCat(url){
    try{
        const resp = await axios.get(argv[2]);
        console.log(resp.data);
    } catch (err){
        showFetchingError(url, err);
    }       
}

function catWrite(path, filename){
    fs.readFile(filename, 'utf8', function(err, data){
        if (err){
            showError(err);
        }
        fs.appendFile(path, data, 'utf8', err => {
            if (err){
                showCouldntWriteError(path, err)
            }
        })
    })
}

async function webCatWrite(path, url){
    try{
        const resp = await axios.get(url);
        fs.appendFile(path, resp.data, 'utf8', err => {
            if (err){
                showCouldntWriteError(path, err);
            }
        })
    } catch (err){
        showFetchingError(url, err);
    }       
}



if (argv[2].startsWith('--out')){
    if(argv[4].startsWith('http')){
        webCatWrite(argv[3], argv[4]);
    }
    else{
        catWrite(argv[3], argv[4])
    }
}else{
    if(argv[2].startsWith('http')){
        webCat(argv[2]);
    }else{
        cat(argv[2]);
    }
}