const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.resolve(__dirname, './src/incontrol-icons/source');
const CODEPOINTS_FILE = path.resolve(__dirname, './src/incontrol-icons/codepoints.json');
const DEPRECATED_FILE = path.resolve(__dirname, './src/incontrol-icons/codepoints-deprecated.json');

const START_CODEPOINT = 0xf101; // punto de inicio típico de icon fonts

// Leer archivos SVG actuales del directorio
const getSvgIcons = () =>
  fs
    .readdirSync(SOURCE_DIR)
    .filter(file => file.endsWith('.svg'))
    .map(file => path.basename(file, '.svg'));

// Cargar JSON si existe, o retornar objeto vacío
const loadJson = file => {
  if (!fs.existsSync(file)) return {};
  const content = fs.readFileSync(file, 'utf8').trim();
  return content ? JSON.parse(content) : {};
};

const main = () => {
  const currentIcons = getSvgIcons();
  const existingCodepoints = loadJson(CODEPOINTS_FILE);
  const deprecated = loadJson(DEPRECATED_FILE);

  const updatedCodepoints = {};
  const newlyDeprecated = {};
  let nextCodepoint = Math.max(
    ...Object.values(existingCodepoints),
    START_CODEPOINT - 1
  ) + 1;

  // Asignar codepoints: mantener existentes o asignar nuevos
  currentIcons.forEach(icon => {
    if (existingCodepoints[icon]) {
      updatedCodepoints[icon] = existingCodepoints[icon];
    } else {
      updatedCodepoints[icon] = nextCodepoint++;
    }
  });

  // Detectar íconos eliminados
  Object.keys(existingCodepoints).forEach(icon => {
    if (!currentIcons.includes(icon)) {
      newlyDeprecated[icon] = existingCodepoints[icon];
    }
  });

  // Guardar archivos
  fs.writeFileSync(
    CODEPOINTS_FILE,
    JSON.stringify(updatedCodepoints, null, 2),
    'utf8'
  );

  const mergedDeprecated = { ...deprecated, ...newlyDeprecated };
  fs.writeFileSync(
    DEPRECATED_FILE,
    JSON.stringify(mergedDeprecated, null, 2),
    'utf8'
  );

  console.log(`✔️  Codepoints actualizados.`);
  if (Object.keys(newlyDeprecated).length > 0) {
    console.log(`⚠️  Se movieron a deprecated.json:`);
    console.log(Object.keys(newlyDeprecated).join(', '));
  } else {
    console.log('✅ No se detectaron íconos eliminados.');
  }
};

main();