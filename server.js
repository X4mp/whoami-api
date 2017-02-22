var http = require('http');
var url = require('url')
var fs = require('fs')
var reqip = require('request-ip');
var useragent = require('ua-parser-js')

var server = http.createServer(function(req, res) {
    //parse incoming request for date time parameter endpoint
    var path = url.parse(req.url, true).pathname;
    console.log('path: ' + path);
    //if path is / serve html
    if(path == '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var fileStream = fs.createReadStream('index.html');
        fileStream.pipe(res);
    } else {
        var json = {}
        console.log(req.headers);
        var agent = useragent(req.headers['user-agent']);
        json.ipaddress = reqip.getClientIp(req);
        json.language = req.headers['accept-language'].split(',')[0]
        json.software = agent.os.name + ' ' + agent.os.version
        res.write(JSON.stringify(json))
        res.end()
    }
})

var port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log('Example app listening on port 3000')
})
