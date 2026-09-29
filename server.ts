import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);
const BACKEND_PORT = Number(process.env.BACKEND_PORT || 8001);

let pythonProcess: any = null;

// Ensure the Python FastAPI backend is running
function ensurePythonBackend(callback?: () => void) {
  const checkReq = http.get(`http://127.0.0.1:${BACKEND_PORT}/api/dashboard/summary`, () => {
    if (callback) callback();
  });

  checkReq.on('error', () => {
    if (pythonProcess && !pythonProcess.killed) {
      try { pythonProcess.kill(); } catch {}
    }
    console.log(`[*] Spawning NAVRAKSH Python FastAPI backend on port ${BACKEND_PORT}...`);
    pythonProcess = spawn('python3', [path.join(__dirname, 'backend', 'run.py')], {
      cwd: path.join(__dirname, 'backend'),
      env: {
        ...process.env,
        PYTHONPATH: path.join(__dirname, 'backend'),
        BACKEND_PORT: String(BACKEND_PORT),
      },
      stdio: 'inherit',
    });

    pythonProcess.on('error', (err: any) => {
      console.error('[!] Failed to spawn Python backend:', err);
    });

    pythonProcess.on('exit', (code: number) => {
      console.log(`[*] Python backend exited with code ${code}.`);
      pythonProcess = null;
    });

    // Allow process to boot
    setTimeout(() => {
      if (callback) callback();
    }, 1200);
  });
}

ensurePythonBackend();

process.on('exit', () => {
  if (pythonProcess) {
    try { pythonProcess.kill(); } catch {}
  }
});

// Proxy handler to Python FastAPI backend
function proxyToPython(req: express.Request, res: express.Response) {
  const options: http.RequestOptions = {
    hostname: '127.0.0.1',
    port: BACKEND_PORT,
    path: req.originalUrl,
    method: req.method,
    headers: {
      ...req.headers,
      host: `127.0.0.1:${BACKEND_PORT}`,
    },
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode || 500, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    ensurePythonBackend();
    res.status(502).json({
      error: 'Backend gateway error: Python service starting or reconnecting',
      details: err.message,
    });
  });

  req.pipe(proxyReq, { end: true });
}

// Forward API, Swagger UI, and OpenAPI routes
app.use('/api', proxyToPython);
app.use('/docs', proxyToPython);
app.use('/openapi.json', proxyToPython);

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[✓] NAVRAKSH Full-Stack server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[!] Failed to start server:', err);
  process.exit(1);
});
