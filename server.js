const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.static('public'));

const projects = JSON.parse(fs.readFileSync('./data/projects.json', 'utf8'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/solutions/projects', (req, res) => {
  const { sector } = req.query;
  if (sector) {
    const filtered = projects.filter(p => p.sector === sector);
    res.json(filtered);
  } else {
    res.json(projects);
  }
});

app.get('/solutions/projects/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const project = projects.find(p => p.id === id);
  if (project) res.json(project);
  else res.status(404).send({ error: "Project not found" });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
