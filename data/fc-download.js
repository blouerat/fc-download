self.port.on('received', function(id, text) {
  var doc = document.implementation.createHTMLDocument();
  doc.documentElement.innerHTML = text;

  var href = doc.getElementById('player').href;
  var pathDiffusion = doc.getElementsByClassName('path-diffusion').item(0);
  var fileName = (pathDiffusion) ? pathDiffusion.textContent : 'FC_' + id;
  var download = fileName + '.mp3'

  var a = document.createElement('a');
  a.href = href;
  a.textContent = 'Télécharger';
  a.download = download;

  var button = document.getElementById('fetch-' + id);
  button.parentNode.replaceChild(a, button);
});

function fetchUrl(button, id) {
  button.disabled = 'disabled';
  button.textContent = 'Récupération de l\'URL…';
  
  self.port.emit('fetch', id, 'http://www.franceculture.fr/player/reecouter?play=' + id);
}

function downloadDiv(id) {
  var div = document.createElement('div');
  div.setAttribute('class', 'fetch-url');
  var button = document.createElement('button');
  button.textContent = 'Récupérer l\'URL';
  button.id = 'fetch-' + id;
  button.addEventListener('click', function() { fetchUrl(button, id); });
  div.appendChild(button);
  return div;
}

var nodes = document.getElementsByClassName('node-rf_diffusion');
for(i in nodes) {
  var node = nodes[i];
  var nodeId = node.id;
  if(nodeId && !node.lastElementChild.classList.contains('fetch-url')) {
    var diffusionId = nodeId.substring(5);
    var div = downloadDiv(diffusionId);
    node.appendChild(div);
  }
}
