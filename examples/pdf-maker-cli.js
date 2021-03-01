const inputFolder = process.argv.slice(2,3);
const outputFolder = process.argv.slice(3);
var fonts = {
	Roboto: {
		normal: 'fonts/Roboto-Regular.ttf',
		bold: 'fonts/Roboto-Medium.ttf',
		italics: 'fonts/Roboto-Italic.ttf',
		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
	}
};

var PdfPrinter = require('../src/printer');
var printer = new PdfPrinter(fonts);
var fs = require('fs');
var i = 0;
fs.readdir(inputFolder[0], (err, files) => {
	var i = 0;
  if (err)
    console.log(err);
  else {
    files.forEach(file => {
			var name = file.split('.json')[0];
      fs.readFile(inputFolder[0]+'/'+file, "utf8", (err, jsonString) => {
				if (err) {
					console.log("File read failed:", err);
					return;
				}
				var docDefinition = JSON.parse(jsonString);
				var pdfDoc = printer.createPdfKitDocument(docDefinition);
				pdfDoc.pipe(fs.createWriteStream(outputFolder[0]+'/'+name+'.pdf'));
				i = i+1;
				pdfDoc.end();
    })
	})
  }
})


// var docDefinition = {
// 	content: [
// 		'Hello First paragraph',
// 		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
// 	]
// };

// var pdfDoc = printer.createPdfKitDocument(docDefinition);
// pdfDoc.pipe(fs.createWriteStream('pdfs/basics.pdf'));
// pdfDoc.end();

