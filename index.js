var data = require('sdk/self').data;
var pageMod = require('sdk/page-mod');
var Request = require('sdk/request').Request;

pageMod.PageMod({
  include: '*.franceculture.fr',
  contentScriptFile: data.url('fc-download.js'),
  onAttach: function(worker) {
    worker.port.on('fetch', function(id, url) {
      Request({
        url: url,
        onComplete: function(response) {
          worker.port.emit('received', id, response.text);
        }
      }).get();
    });
  }
});
