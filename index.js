import http from "http";
import { readFile } from "fs/promises";
import pkg from "pg";
import { parse } from "querystring";
const { Pool } = pkg;

// PostgreSQL connection pool
const pool = new Pool({
  user: "postgres", // Your PostgreSQL username
  host: "localhost", // Change if your DB is remote
  database: "form_data", // Your database name
  password: "gccprog.c", // Your PostgreSQL password
  port: 5432, // PostgreSQL default port
});

async function serveFile(res, filePath, contentType) {
  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (err) {
    console.error(`Error loading ${filePath}:`, err);
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("File not found");
  }
}

/**
 * Handles form submission and inserts data into PostgreSQL.
 *
 * @param {http.IncomingMessage} req - The HTTP request object.
 * @param {http.ServerResponse} res - The HTTP response object.
 */
async function handleFormSubmission(req, res) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    console.log("\n Received Form Submission:");
    console.log(body);

    const formData = parse(body);
    console.log("\n Parsed Form Data:");
    console.log(formData);

    try {
      console.log("\n Inserting into database");
      const result = await pool.query(
        `INSERT INTO activities (
                    name, number, type, objective, brief_descriptor, pre_conditions,
                    activity_descriptor, limits, during_activity, post_activity_conditions,
                    immediate_results, results_conclusion, other_key_information
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING activity_id`,
        [
          formData["activity-name"],
          formData["activity-number"],
          formData["activity-type"],
          formData["objective"],
          formData["activity-descriptor"], // brief descriptor
          formData["pre-conditions"],
          formData["activity-descriptor"], // Duplicate field? // activity descriptor
          formData["limits"],
          formData["during-activity"],
          formData["post-activity-cond"],
          formData["immediate-results"],
          formData["res-ccl"],
          formData["other-key-info"],
        ]
      );

      console.log(
        "\n Successfully Inserted! Activity ID:",
        result.rows[0].activity_id
      );

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        `Activity saved successfully Activity ID: ${result.rows[0].activity_id} <br><a href="/">Go Back</a>`
      );
    } catch (err) {
      console.error("\n ERROR SAVING DATA:", err.message, err.stack);
      res.end(`An error occurred: ${err.message}`);
    }
  });
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    serveFile(res, "index.html", "text/html");
  } else if (req.method === "GET" && req.url === "/style.css") {
    serveFile(res, "style.css", "text/css");
  } else if (req.method === "POST" && req.url === "/submit") {
    handleFormSubmission(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
