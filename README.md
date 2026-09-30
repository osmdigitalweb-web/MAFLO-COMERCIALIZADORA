# MAFLO Comercializadora — Sitio web

Landing B2B de una sola página para MAFLO Comercializadora, distribuidor de
insumos de limpieza, químicos, papelería, mobiliario de oficina, protección
personal y equipo de cómputo en Escobedo, N.L.

HTML, CSS y JavaScript planos. Sin framework, sin build, sin dependencias.

---

## Ver el sitio

Abre `index.html` en el navegador. Ya está.

Para que funcione igual que en producción (rutas absolutas, `mailto:`, caché),
conviene servirlo:

```bash
python -m http.server 5178
```

Luego abre `http://127.0.0.1:5178/`.

---

## Estructura

```
index.html                        Página completa
assets/
  css/styles.css                  Sistema de estilos, 22 bloques numerados
  js/main.js                      Interacciones, sin dependencias
  img/
    maflo-logo.svg                Lockup horizontal (texto en tinta)
    maflo-logo-blanco.svg         Lockup para fondo oscuro
    maflo-isotipo.svg             Solo los tres anillos
    favicon.svg                   Isotipo sobre cuadro navy
    hero-almacen.jpg              Foto del hero
    oficina-compras.jpg           Foto de la sección Soluciones
    logistica-entrega.jpg         Foto de la sección Logística
    pasillo-almacen.jpg           Alternativa vertical, sin usar
design-system/MASTER.md           Tokens, componentes y antipatrones
docs/
  HANDOFF.md                      Especificación técnica y casos borde
  ACCESIBILIDAD.md                Auditoría WCAG 2.1 AA medida
  CONTENIDO.md                    De dónde sale cada dato y cada palabra
  CRITICA.md                      Revisión de diseño y prioridades
```

---

## El logotipo

Está reconstruido en SVG, no recortado de una imagen.

- Los **tres anillos** se midieron píxel a píxel del logotipo original: colores
  `#2FB3D2`, `#F0D178` y `#C63F66`, diámetro y traslape regularizados a un
  triángulo equilátero perfecto (lado = 0.5 × radio), grosor de trazo 8 % del
  radio, y el orden de pintado correcto — dorado atrás, cian en medio, rosa al
  frente, igual que en el original.
- La **palabra MAFLO** son trazados vectoriales dibujados a mano, no texto con
  una fuente. Eso significa que se ve idéntica en cualquier equipo, no se rompe
  si falla Google Fonts y escala sin pixelarse a cualquier tamaño.

Tres archivos listos: `maflo-logo.svg` (fondo claro), `maflo-logo-blanco.svg`
(fondo oscuro) y `maflo-isotipo.svg` (solo la marca). Sirven igual para
papelería, firmas de correo o redes.

---

## Antes de publicar

- [ ] Cambiar el dominio en `<link rel="canonical">` y en el JSON-LD de
      `index.html` (hoy dice `maflocomercializadora.com`).
- [ ] Sustituir las tres fotos de banco por fotos reales del almacén, la unidad
      y el equipo. Reescribir los `alt` describiendo la escena nueva.
- [ ] Convertir las imágenes a WebP o AVIF y añadir `srcset` (800/1200/1600 px).
      Es lo único pesado de la página: 1.4 MB.
- [ ] Conectar el formulario a un endpoint real. Hoy compone un `mailto:`.
      Instrucciones en `docs/HANDOFF.md` §5.2.
- [ ] Confirmar las cifras de la sección de métricas. Ver `docs/CONTENIDO.md` §3.
- [ ] Añadir horario de atención — no aparece en el folleto y es de lo primero
      que se pregunta.

---

## Estado verificado

Medido sobre la página renderizada, en 1440×900 y 390×844:

| | |
|---|---|
| Errores de consola | 0 |
| Peticiones fallidas | 0 |
| Fallos de contraste (WCAG AA) | 0 |
| Scroll horizontal | Ninguno |
| Encabezados | 1 `<h1>`, jerarquía sin saltos |
| Campos sin etiqueta | 0 |
| Imágenes sin `alt` | 0 |
| Teclado | Menú, desplegables y formulario verificados |

Detalle completo en `docs/ACCESIBILIDAD.md`.

---

## Contacto de la empresa

Allende #200, Col. Miravista, C.P. 66050, Escobedo, N.L.
811 799 3345 · 812 520 3088
alejandracortesp91@gmail.com · saul.0490@hotmail.com

---

## Créditos de imagen

Las tres fotografías provienen de [Unsplash](https://unsplash.com) (licencia
libre, uso comercial permitido, atribución no obligatoria). Se recomienda
sustituirlas por material propio.
