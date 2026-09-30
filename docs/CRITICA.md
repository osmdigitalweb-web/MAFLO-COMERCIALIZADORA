# Crítica de diseño — Landing MAFLO (implementada)

Revisión del sitio construido contra el mockup aprobado. Etapa: **pulido final**,
así que el nivel de detalle es alto y la mayoría de lo que sigue son ajustes,
no replanteos.

---

## Impresión general

La página cumple lo que el mockup prometía: en dos segundos se entiende que es
un distribuidor B2B y que la acción es pedir cotización. El mayor riesgo que
queda no es visual sino de contenido — el sitio se apoya en fotos de banco y en
un compromiso de servicio en lugar de prueba social real, y eso se nota en la
mitad inferior.

---

## Jerarquía visual

- **Qué atrae primero:** el titular del hero, correcto. El peso 300 a 68 px con
  interlineado 1.04 hace el trabajo sin gritar.
- **Segundo:** la fotografía del almacén, que contextualiza en un golpe de vista.
- **Tercero:** el botón verde. Está bien que sea tercero: primero se entiende
  qué venden, luego se decide.
- **Recorrido:** antetítulo → titular → párrafo → CTA → foto → barra de
  confianza. La barra de confianza funciona como bisagra: responde las tres
  objeciones inmediatas (¿garantizan?, ¿cuánto tardan?, ¿cómo pago?) antes de
  entrar al catálogo.
- **Sección oscura:** el corte a `--ink-800` en Beneficios parte la página en dos
  mitades y evita la fatiga de seis secciones claras seguidas. Buena decisión
  heredada del mockup.

---

## Usabilidad

| Hallazgo | Severidad | Recomendación |
|---|---|---|
| ~~Las tarjetas de categoría parecen clicables pero solo el disparador inferior lo es~~ | ✅ **Corregido** | Se confirmó con uso real: la primera persona que lo probó le picó a la tarjeta y no pasó nada. Ahora toda la tarjeta dispara el desplegable, y el disparador pasó de un renglón de 13 px a una fila completa de 44 px con filete y chevron. El `<button>` sigue siendo el control accesible. |
| El formulario abre el cliente de correo del equipo en lugar de enviar | 🟡 Moderado | Es la limitación de un sitio estático. Está avisado en el propio formulario y resuelto en `docs/HANDOFF.md` §5.2 con un `fetch()` de una línea. |
| No hay horario de atención en ningún lado | 🟡 Moderado | Es la segunda pregunta de cualquiera que va a llamar. Falta el dato del cliente. |
| Cuatro categorías en el sitio contra cinco líneas en el folleto | 🟢 Menor | Agrupación del mockup, conservada. Los 47 productos siguen ahí, dentro de los desplegables. |
| El botón flotante de WhatsApp tapa el borde derecho en pantallas chicas | 🟢 Menor | Respeta `env(safe-area-inset-*)` y no cubre texto ni controles. Aceptable. |

---

## Consistencia

Revisión contra `design-system/MASTER.md`:

- **Color:** sin hex sueltos en el markup; todo sale de tokens. Los tres colores
  de marca aparecen **solo** dentro del logotipo, que es lo que los mantiene
  como identidad.
- **Espaciado:** un único ritmo de sección (`--sec-y`) y dos radios (12 y 8 px).
- **Tipografía:** dos familias, seis pesos. El logotipo no usa ninguna de las
  dos — va en trazados propios, así que no se rompe si falla Google Fonts.
- **Iconografía:** 24 iconos, todos con la misma retícula de 24×24 y trazo de
  1.7–2 px. Ninguno es emoji.
- **Hover:** todos los estados cambian color, borde o sombra. Ninguno usa
  `transform: scale()`, que desplazaría el layout.

Inconsistencia detectada y corregida durante la revisión: el panel de las
tarjetas no se cerraba porque `display: grid` del autor ganaba al atributo
`hidden` del navegador. Quedó registrada como regla obligatoria en el sistema.

---

## Accesibilidad

Medida, no estimada — detalle completo en `docs/ACCESIBILIDAD.md`.

- **Contraste:** 0 fallos en 1440 px y en 390 px.
- **Objetivos táctiles:** botones y campos ≥ 44 px; los enlaces apilados de
  contacto se ampliaron a ≈ 36 px durante esta revisión.
- **Legibilidad:** 17 px de cuerpo (16 en móvil), interlineado 1.65, párrafos
  limitados a 56 caracteres de ancho.
- **Teclado:** recorrido completo verificado, incluido Escape en el menú móvil.

---

## Lo que funciona bien

1. **La barra de confianza justo debajo del hero.** Responde objeciones antes de
   que se conviertan en abandono, y usa datos reales del folleto.
2. **Los desplegables de categoría con conteo real.** «Ver los 18 productos» es
   una promesa verificable; al abrirlo están los 18. Eso construye más confianza
   que cualquier adjetivo.
3. **El bloque de compromiso en lugar de un testimonio falso.** Ocupa el mismo
   espacio visual, dice algo que la empresa sí firma, y deja el hueco listo para
   un testimonio real.
4. **El logotipo vectorizado a mano.** Anillos medidos del original y palabra en
   trazados: escala a cualquier tamaño, no depende de fuentes y funciona igual
   sobre claro y sobre oscuro.
5. **La red de seguridad del revelado.** Ningún bloque puede quedarse invisible
   por una animación que no se dispara.

---

## Prioridades

1. **Sustituir las tres fotos de banco por fotos del almacén, la unidad y el
   equipo reales.** Es el cambio de mayor impacto en credibilidad y no cuesta
   nada más que una tarde con un teléfono. Un cliente que ve la bodega real
   decide distinto.
2. **Conseguir un testimonio con nombre y empresa.** El bloque `.quote` ya está
   dimensionado; solo hay que cambiar el texto y el pie.
3. **Conectar el formulario a un endpoint real** (Formspree o similar) y dejar
   de depender del `mailto:`. Diez minutos de trabajo, y evita perder solicitudes
   de quien no tiene cliente de correo configurado.
4. **Confirmar las cifras** de `docs/CONTENIDO.md` §3 y §5. Si MAFLO lleva 15
   años operando, decirlo vale más que «47 productos».
5. **Convertir las imágenes a WebP con `srcset`.** 1.4 MB de fotos es lo único
   pesado de la página.
