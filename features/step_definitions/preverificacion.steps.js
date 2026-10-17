import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'node:assert/strict';
import { preverificarArticulo } from '../../src/domain/preverificador.js';

/*
 * Step Definitions de la HU-01.
 * Cucumber enlaza cada paso del .feature con UNA función mediante
 * Cucumber Expressions: el texto debe coincidir y {string} captura
 * el valor entre comillas como argumento.
 *
 * La palabra clave (Dado / Cuando / Entonces / Y / Pero) no interviene
 * en el enlace: solo importa el texto del paso. Por convención se usa
 * Given para contexto, When para la acción y Then para las verificaciones.
 *
 * Los pasos hablan con el caso de uso del dominio (preverificarArticulo),
 * no con la interfaz gráfica: si la pantalla cambia, la especificación sigue válida.
 */

// ---------- GIVEN: contexto (estado inicial) ----------

Given('que la fecha de corte de la convocatoria es {string}', function (fecha) {
  this.fechaCorte = fecha;
});

Given('la docente {string} ha iniciado sesión en el portal', function (nombre) {
  this.docente = { nombre };
});

Given(
  'que la docente registró un artículo indexado en {string} que cumple las demás condiciones',
  function (base) {
    // Artículo base que cumple todo; cada escenario altera UNA condición con "Pero".
    this.articulo = {
      doi: '10.0000/ejemplo.2025.001',
      base,
      filiacion: 'UNMSM',
      rol: 'principal',
      fechaPublicacion: '2025-06-15',
      enRepositorio: true,
      retractado: false,
    };
  },
);

Given('el artículo declara la filiación {string}', function (filiacion) {
  this.articulo.filiacion = filiacion;
});

Given('la docente figura en el artículo con el rol {string}', function (rol) {
  this.articulo.rol = rol;
});

Given('la fecha de publicación del artículo es {string}', function (fecha) {
  this.articulo.fechaPublicacion = fecha;
});

Given('el artículo no está registrado en el repositorio institucional', function () {
  this.articulo.enRepositorio = false;
});

Given('el artículo figura como retractado', function () {
  this.articulo.retractado = true;
});

// ---------- WHEN: la acción que se prueba ----------

When('solicita la pre-verificación del artículo', function () {
  this.respuesta = preverificarArticulo(this.articulo, { fechaCorte: this.fechaCorte });
});

// ---------- THEN: resultados observables (aserciones) ----------

Then('el resultado de la pre-verificación es {string}', function (esperado) {
  assert.equal(this.respuesta.resultado, esperado);
});

Then('se informa el motivo {string}', function (motivo) {
  assert.ok(
    this.respuesta.motivos.includes(motivo),
    `Motivo esperado: "${motivo}". Motivos obtenidos: ${JSON.stringify(this.respuesta.motivos)}`,
  );
});

Then('se le indica la acción {string}', function (accion) {
  assert.ok(
    this.respuesta.acciones.includes(accion),
    `Acción esperada: "${accion}". Acciones obtenidas: ${JSON.stringify(this.respuesta.acciones)}`,
  );
});

Then('se genera una alerta para el Vicerrectorado de Investigación', function () {
  assert.equal(this.respuesta.alertaVicerrectorado, true);
});
