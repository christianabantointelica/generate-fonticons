const fs = require('fs');
const path = require('path');

const sourceDir = './src/incontrol-icons/source';
const codepointsPath = './src/incontrol-icons/codepoints.json';
const deprecatedPath = './src/incontrol-icons/codepoints-deprecated.json';

// Cargar codepoints actuales
let codepoints = fs.existsSync(codepointsPath)
  ? JSON.parse(fs.readFileSync(codepointsPath, 'utf8'))
  : {};

// Cargar íconos deprecated
let deprecated = fs.existsSync(deprecatedPath)
  ? JSON.parse(fs.readFileSync(deprecatedPath, 'utf8'))
  : {};

// Íconos SVG actuales en la carpeta
const currentSvgIcons = fs.readdirSync(sourceDir)
  .filter(file => file.endsWith('.svg'))
  .map(file => path.basename(file, '.svg'));

// Obtener el último valor usado (entre ambos archivos)
const allUsedValues = Object.values({ ...codepoints, ...deprecated });
let lastCode = allUsedValues.length > 0 ? Math.max(...allUsedValues) : 0xf100;

// Reconstruir el nuevo set de codepoints
const newCodepoints = { ...codepoints };

// 🔄 Recuperar íconos reintroducidos desde deprecated
for (const icon of currentSvgIcons) {
  if (!newCodepoints[icon]) {
    if (deprecated[icon]) {
      newCodepoints[icon] = deprecated[icon]; // Recuperar antiguo codepoint
      console.log(`🔁 Recuperado: ${icon} → ${deprecated[icon].toString(16)}`);
      delete deprecated[icon]; // Eliminar del archivo deprecado
    } else {
      lastCode += 1;
      newCodepoints[icon] = lastCode;
      console.log(`🆕 Añadido nuevo: ${icon} → ${lastCode.toString(16)}`);
    }
  }
}

// 📦 Detectar eliminados y pasarlos a deprecated
const removedIcons = Object.keys(newCodepoints).filter(icon => !currentSvgIcons.includes(icon));
for (const icon of removedIcons) {
  deprecated[icon] = newCodepoints[icon];
  delete newCodepoints[icon];
  console.log(`❌ Eliminado: ${icon} → movido a deprecated`);
}

// Guardar los archivos actualizados
fs.writeFileSync(codepointsPath, JSON.stringify(newCodepoints, null, 2), 'utf8');
fs.writeFileSync(deprecatedPath, JSON.stringify(deprecated, null, 2), 'utf8');

console.log('✅ Finalizado: codepoints actualizados y deprecated gestionado.');