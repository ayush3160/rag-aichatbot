import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(join(__dirname, '../dist')));

// Route to serve the widget script
app.get('/widget', async (req, res) => {
  const jsScript = await fs.readFile(join(__dirname, '../dist/index.js'));

  const widgetScript = `
  ${jsScript.toString()}
  
  // Initialize the widget
  window.mountJeemagent({
    projectId: 'YOUR_PROJECT_ID'
  });
      `;

  res.send(widgetScript);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});