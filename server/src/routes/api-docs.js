import express from "express";
const router = express.Router();

router.get("/docs", (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Documentation - The Adventures of Sherlock Holmes</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 800px; margin: 0 auto; }
        h1 { color: #333; }
        h2 { color: #666; }
        .endpoint { background-color: #f4f4f4; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
        .method { font-weight: bold; color: #0066cc; }
        .path { font-family: monospace; }
        .description { margin-top: 10px; }
        .params, .returns { margin-top: 10px; }
        .example { background-color: #e6f3ff; padding: 10px; border-radius: 3px; margin-top: 10px; }
      </style>
    </head>
    <body>
      <h1>API Documentation - The Adventures of Sherlock Holmes</h1>

      <div class="endpoint">
        <h2><span class="method">GET</span> <span class="path">/api/toc</span></h2>
        <div class="description">Retrieve the table of contents</div>
        <div class="params"><strong>Parameters:</strong> None</div>
        <div class="returns">
          <strong>Returns:</strong>
          <ul>
            <li><code>book</code>: string (book title)</li>
            <li><code>chapters</code>: array of strings (chapter titles)</li>
          </ul>
        </div>
      </div>

      <div class="endpoint">
        <h2><span class="method">GET</span> <span class="path">/api/:chapter</span></h2>
        <div class="description">Retrieve the content of a specific chapter</div>
        <div class="params">
          <strong>Parameters:</strong>
          <ul>
            <li><code>chapter</code>: string (chapter title in lowercase, spaces replaced with hyphens)</li>
          </ul>
        </div>
        <div class="returns"><strong>Returns:</strong> string (chapter content)</div>
        <div class="example">
          <strong>Example:</strong> <code>/api/a-scandal-in-bohemia</code>
        </div>
      </div>
    </body>
    </html>
  `;

  res.send(html);
});

export default router;
