var http = require('http');
var formidable = require('formidable');
var sys = require('sys');
var util = require('util');

var server = http.createServer(function(req, res) {
  console.log(req.url);
  switch (req.url) {
    case '/':
      display_form(req, res);
      break;
    case '/upload':
      upload_file(req, res);
      break;
    default:
      show_404(req, res);
      break;
  }
});
server.listen(8000);

function display_form(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(
    '<form action="/upload" method="post" enctype="multipart/form-data">'+
    '<input type="file" name="upload-file">'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
  res.end();
}

function upload_file(req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = "/home/suresh/work/nodejs/uploads";
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
  
}

function show_404(req, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.write('You r doing it rong!');
  res.end();
}
