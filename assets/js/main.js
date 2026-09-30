/* ===================================================================
   MAFLO Comercializadora — Interacciones
   Progresivo: la página funciona completa sin JavaScript.
   =================================================================== */
(function () {
  'use strict';

  var mobileQuery  = window.matchMedia('(max-width: 900px)');

  /* ---------------- Año dinámico en el pie ---------------- */
  var yearSlot = document.querySelector('[data-year]');
  if (yearSlot) yearSlot.textContent = String(new Date().getFullYear());

  /* ---------------- Sombra del header al hacer scroll ---------------- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var syncStuck = function () {
      header.dataset.stuck = window.scrollY > 8 ? 'true' : 'false';
    };
    syncStuck();
    window.addEventListener('scroll', syncStuck, { passive: true });
  }

  /* ---------------- Menú móvil ---------------- */
  var burger = document.querySelector('[data-burger]');
  var nav    = document.querySelector('[data-nav]');

  if (burger && nav) {
    var setMenu = function (open) {
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
      if (open) { nav.removeAttribute('hidden'); }
      else { nav.setAttribute('hidden', ''); }
    };

    // Estado inicial acorde al ancho de pantalla.
    var syncViewport = function () {
      if (mobileQuery.matches) setMenu(false);
      else { nav.removeAttribute('hidden'); burger.setAttribute('aria-expanded', 'false'); }
    };
    syncViewport();
    mobileQuery.addEventListener('change', syncViewport);

    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a') && mobileQuery.matches) setMenu(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        burger.focus();
      }
    });
  }

  /* ---------------- Tarjetas de categoría desplegables ----------------
     El botón sigue siendo el control real (teclado y lector de pantalla),
     pero toda la tarjeta acciona el clic: la tarjeta ya se ve pulsable por
     su estado hover, así que ese es el blanco que la gente intenta. */
  Array.prototype.forEach.call(document.querySelectorAll('[data-toggle]'), function (button) {
    var panel = document.getElementById(button.getAttribute('aria-controls'));
    var label = button.querySelector('[data-toggle-label]');
    if (!panel || !label) return;

    var closedText = label.textContent;
    var card = button.closest('.card');

    var toggle = function () {
      var open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      label.textContent = open ? closedText : 'Ocultar productos';
      // El estado vive en la tarjeta para que el CSS pueda animar la altura
      // del panel; `hidden` no es animable porque quita el elemento del flujo.
      if (card) card.setAttribute('data-open', String(!open));
    };

    button.addEventListener('click', function (event) {
      event.stopPropagation();
      toggle();
    });

    if (!card) return;
    card.classList.add('is-clickable');
    card.addEventListener('click', function (event) {
      // No secuestrar otros controles ni impedir que se seleccione texto.
      if (event.target.closest('a, button, input, textarea, select')) return;
      var selection = window.getSelection();
      if (selection && String(selection).length) return;
      toggle();
    });
  });

  /* ---------------- Enlace activo en la navegación ---------------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.header__links a[href^="#"]'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var active = link.getAttribute('href') === '#' + entry.target.id;
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ---------------- Aparición al hacer scroll: no hay ----------------
     Deliberado. Antes esta página revelaba 27 bloques con exactamente la
     misma subida y desvanecido, en cada sección. Eso no explicaba nada:
     solo retrasaba la lectura y arriesgaba dejar contenido invisible si el
     listener no corría. La energía de movimiento vive ahora en la entrada
     del hero (una vez, en CSS) y en la respuesta al tacto de cada control. */

  /* ---------------- Formulario de cotización ---------------- */
  var form = document.querySelector('[data-form]');
  if (!form) return;

  var status  = form.querySelector('[data-status]');
  var DESTINO = 'alejandracortesp91@gmail.com';
  var COPIA   = 'saul.0490@hotmail.com';

  var rules = {
    empresa: function (value) { return value.trim().length >= 2 ? '' : 'Escribe el nombre de tu empresa.'; },
    nombre:  function (value) { return value.trim().length >= 2 ? '' : 'Escribe tu nombre de contacto.'; },
    correo:  function (value) {
      if (!value.trim()) return 'Escribe tu correo para poder responderte.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? '' : 'Revisa el formato del correo. Ejemplo: compras@empresa.com';
    },
    mensaje: function (value) { return value.trim().length >= 10 ? '' : 'Describe qué productos necesitas, aunque sea de forma aproximada.'; }
  };

  var showError = function (field, message) {
    var slot = document.getElementById(field.id + '-error');
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      if (slot) { slot.textContent = message; slot.removeAttribute('hidden'); }
    } else {
      field.removeAttribute('aria-invalid');
      if (slot) { slot.textContent = ''; slot.setAttribute('hidden', ''); }
    }
    return !message;
  };

  Object.keys(rules).forEach(function (name) {
    var field = form.elements[name];
    if (!field) return;
    field.addEventListener('blur', function () { showError(field, rules[name](field.value)); });
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') === 'true') showError(field, rules[name](field.value));
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      if (!field) return;
      var ok = showError(field, rules[name](field.value));
      if (!ok && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      if (status) status.textContent = '';
      firstInvalid.focus();
      return;
    }

    var categorias = Array.prototype.slice
      .call(form.querySelectorAll('input[name="categoria"]:checked'))
      .map(function (input) { return input.value; });

    var lineas = [
      'Empresa: ' + form.elements.empresa.value.trim(),
      'Contacto: ' + form.elements.nombre.value.trim(),
      'Correo: ' + form.elements.correo.value.trim(),
      'Teléfono: ' + (form.elements.telefono.value.trim() || 'No proporcionado'),
      'Categorías: ' + (categorias.length ? categorias.join(', ') : 'Por definir'),
      '',
      'Requerimiento:',
      form.elements.mensaje.value.trim(),
      '',
      'Enviado desde el sitio de MAFLO Comercializadora'
    ];

    var asunto = 'Solicitud de cotización: ' + form.elements.empresa.value.trim();
    var url = 'mailto:' + DESTINO +
      '?cc=' + encodeURIComponent(COPIA) +
      '&subject=' + encodeURIComponent(asunto) +
      '&body=' + encodeURIComponent(lineas.join('\n'));

    if (status) {
      status.textContent = 'Abrimos tu cliente de correo con la solicitud lista para enviar. Si no se abre, escríbenos a ' + DESTINO + '.';
    }
    window.location.href = url;
  });
})();
