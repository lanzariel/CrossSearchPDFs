# CrossSearchPDFs

Javascript code to count occurrences of words inside a list of pdf files.
The long term goal is to make a Zotero (https://www.zotero.org/) plugin out of this code.

## Usage

The program is launced via 
```
npm start
```

The relevant input files are 
 - `files.txt`, that contains a list of relative paths to pdf files.
 - `words.txt`, that contains the list of the words we want to count.
In both files, entries are separated by a newline.

The output is generated in `output.csv`. It is a standard csv file. Each row represents a pdf file, each column is a word we want to count. Entries are the number of appearences of the given word in the given document. 

## Dependencies

In order to search a pdf, the library `pdf-parse` (https://www.npmjs.com/package/pdf-parse) was installed.