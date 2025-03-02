const originalLog = console.log;
const originalError = console.error;
const originalWarn = console.warn;

// 🔹 Función para obtener timestamp en formato local (dd/mm/aaaa hh:mm:ss)
const getTimestamp = () => {
  return new Date().toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

// 🔹 Sobrescribimos console.log, console.error y console.warn
const logWithTimestamp = (originalFn, type, ...args) => {
  const message = args.join(" ");
  
  // Si el mensaje ya tiene timestamp, no agregamos otro
  if (/^\[\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}\]/.test(message)) {
    originalFn(...args);
  } else {
    originalFn(`[${getTimestamp()}] ${type ? type + ":" : ""}`, ...args);
  }
};

console.log = (...args) => logWithTimestamp(originalLog, "", ...args);
console.error = (...args) => logWithTimestamp(originalError, "ERROR", ...args);
console.warn = (...args) => logWithTimestamp(originalWarn, "WARNING", ...args);

// 🔹 Capturar logs internos de Next.js evitando duplicados
const originalStdoutWrite = process.stdout.write;

process.stdout.write = function (chunk, encoding, callback) {
  const chunkStr = chunk.toString();

  // Si ya tiene un timestamp, no lo agregamos de nuevo
  if (/^\[\d{2}\/\d{2}\/\d{4}, \d{2}:\d{2}:\d{2}\]/.test(chunkStr)) {
    return originalStdoutWrite.call(process.stdout, chunk, encoding, callback);
  }

  return originalStdoutWrite.call(process.stdout, `[${getTimestamp()}] ${chunkStr}`, encoding, callback);
};
