# AJUSTES SVG ANTES DE GENERAR FONT
- Los archivos SVG deben tener un tamaño de 1024x1024 píxeles.
- Asegúrate de que los SVG estén en modo expandido (sin trazados, es decir, sin stroke) y, si es posible, desagrupados.
- Puedes realizar estos ajustes en Figma, aplicando la opción "outline-stroke" y luego ajustando el tamaño. Después, exporta el archivo y revisa el código SVG, eliminando cualquier elemento innecesario.

# GENERAR FONT ICONS
Para generar la fuente de los iconos de **incontrol-icons**, utiliza el siguiente comando:

> npm run generate-incontrol-icons

Una vez ejecutado el comando, dirígete a la carpeta "**src/incontrol-icons**", donde encontrarás los archivos de la fuente (**.eot, .ttf, .woff, .svg**) y el archivo .css correspondiente.

# VISTA PREVIA
En la misma carpeta "**src/incontrol-icons**", encontrarás un archivo generado llamado "**incontrol-icons.html**" para visualizar los iconos de la fuente generada.
