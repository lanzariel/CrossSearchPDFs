// Read from filesPath a list of files
// Read from wordsPath a list of words
// Wiite to outputPath a csv file that counts the occurrences of words in files.

function main(filesPath, wordsPath, outputPath){
    console.log("Beginning\n");
    const fs = require("fs");
    var fileText = fs.readFileSync(filesPath).toString('utf-8');
    var fileLst = fileText.split("\n");
    var worldText = fs.readFileSync(wordsPath).toString('utf-8');
    var wordLst = worldText.split("\n");
    console.log("Received Words and Paths");
    while(fileLst.length>0){
        if(fileLst[fileLst.length-1].length==0){
            fileLst.pop();
        }else{
            break;
        }
    }
    while(wordLst.length>0){
        if(wordLst[wordLst.length-1].length==0){
            wordLst.pop();
        }else{
            break;
        }
    }

    var finalLst = ["File"];
    for(const element of wordLst){
        finalLst.push(element);
    }
    finalLst = [finalLst];
    const pdf = require('pdf-parse');
    for(const filePath of fileLst){
        console.log(filePath)
        let dataBuffer = fs.readFileSync(filePath);
        var tempans = pdf(dataBuffer).then(function(data) {
            var name = ("/"+filePath).match(/\/([^\.\/]+)\./g).pop();
            name = name.substring(1,name.length-1);
            name = name.split(',').join('');
            ans = [name];
            for(const element of wordLst){
                if (typeof data.text === 'string' || data.text instanceof String){
                    var count = data.text.split(element).length-1;
                    ans.push(String(count));
                }else{
                    ans.push('-1')
                }
            }
            return ans;
        }).catch(function () {
            console.log("Early Promise Rejected");
       });
        finalLst.push(tempans);
    };
    console.log("table generated");
    text = finalLst[0].join(", ") + "\n";
    Promise.all(finalLst.slice(1)).then(function(value){
        for(const row of value){
            console.log(row[0]);
            text += row.join(", ") + "\n";
        }
        fs.writeFile(outputPath, text, function (err) {
        if (err) return console.log(err);
        console.log('\nWritten to ', outputPath);
        });
    }).catch(function () {
        console.log("Promise Rejected");
   });
}

main("files.txt", "words.txt", "output.csv")