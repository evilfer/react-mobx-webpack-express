const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

function loadSettings() {
  return {
    port: optionalEnvInt('PORT', 3000),
    host: optionalEnvString('HOST') || '127.0.0.1',
    publicUrl: requireEnvString('PUBLIC_URL').replace(/\/$/, ''),
    sessionSecret: optionalEnvString('SESSION_SECRET') || 'session-secret',
    frontendStaticFiles: loadFrontendStaticFiles()
  }
}

function loadFrontendStaticFiles() {
  const frontendVar = requireEnvString('FRONTEND_STATIC_FILES');
  const basePath = optionalEnvString('PWD');

  return basePath && !frontendVar.match(/^\//) ? path.join(basePath, frontendVar) : frontendVar;
}

function optionalEnvString(key) {
  return process.env[key] || null;
}

function requireEnvString(key) {
  if (!process.env[key]) {
    throw new Error(`Missing env variable '${key}"`);
  }

  return process.env[key];
}

function optionalEnvInt(key, defaultValue) {
  return process.env[key] ? parseInt(process.env[key], 10) : defaultValue;
}

module.exports = loadSettings;
