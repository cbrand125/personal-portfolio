import allProjectData from '../data/projectJSONData.js';

const urlParams = new URLSearchParams(window.location.search);

let project;
if (urlParams.has('project')) {
  project = urlParams.get('project');
}

const projectData = allProjectData[project];

if (projectData) {
  if (projectData.image) {
    document.getElementById('screenshot').src = projectData.image;
  }
  if (projectData.description) {
    document.getElementById('projDesc').innerHTML = projectData.description;
  }
  if (projectData.demoLink) {
    document
      .getElementById('demoBtn')
      .setAttribute('href', projectData.demoLink);
  } else {
    document.getElementById('demoBtn').style = 'display: none;';
  }
  if (projectData.codeLink) {
    document
      .getElementById('codeBtn')
      .setAttribute('href', projectData.codeLink);
  } else {
    document.getElementById('codeBtn').style = 'display: none;';
  }
} else {
  document.getElementById('demoBtn').style = 'display: none;';
  document.getElementById('codeBtn').style = 'display: none;';
}
