import allProjectData from './projectJSONData.js';

const urlParams = new URLSearchParams(window.location.search);

let project;
if (urlParams.has('project')) {
  project = urlParams.get('project');
}

const projectData = allProjectData[project];

if (projectData) {
  document.getElementById('screenshot').src = projectData.image;
  document.getElementById('projDesc').innerHTML = projectData.description;
  document.getElementById('demoBtn').setAttribute('href', projectData.demoLink);
  document.getElementById('codeBtn').setAttribute('href', projectData.codeLink);
} else {
  document.getElementById('demoBtn').style = 'display: none;';
  document.getElementById('codeBtn').style = 'display: none;';
}
