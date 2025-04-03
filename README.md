# AJUSTES SVG ANTES DE GENERAR FONT
Los svg deben tener un tamaño de 1024x1024.
Los svg deben estar expanded ( no con stroke ) y en lo posible desagrupados.
Puede realizar esos ajuste en Figma, y luego exportarlos, aun asi darle revisada su code svg y borrar lo que fuera necesario.

# GENERAR FONT ICONS
comando para generar font de incontrol-icons: 

> npm run generate-incontrol-icons

dirigete a la carpeta 'src/incontrol-icons'
encontrarás la fuente (.eot, .ttf, .woff, .svg) y el archivo .css

# VISTA PREVIA
dentro de la carpeta 'src/incontrol-icons'
existe un archivo generado llamado "incontrol-icons.html"
