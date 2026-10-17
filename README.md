# Portal de Investigación UNMSM — HU-01 como especificación ejecutable

Laboratorio 6.1 — Entornos Metodológicos de Desarrollo de Software (Maestría, FISI-UNMSM).

Este proyecto convierte los criterios de aceptación (Given/When/Then) de la historia
más crítica del backlog en pruebas automatizadas con **Cucumber**.

**HU-01 — Pre-verificación del criterio de publicación**
> Como docente investigador de la UNMSM, quiero saber al instante si un artículo que
> registro cumple los requisitos, para corregir a tiempo lo que falte antes de que el
> decano lo revise.

Las reglas fueron acordadas con el Product Owner para el caso del Portal de Investigación.
Los supuestos del equipo están documentados en `src/domain/reglaPublicacion.js`.

## Requisitos

- Node.js 22 o 24 (versiones LTS). Cucumber 13 no funciona con Node 20 ni con versiones impares como 23.

## Ejecutar

```bash
npm install
npm test                 # todos los escenarios
npm run test:critica     # solo los etiquetados @critica
npm run test:limites     # solo los límites de la ventana de 3 años
npm run docs             # mapa paso -> step definition (sin ejecutar)
```

Resultado esperado: `13 scenarios (13 passed)` y `83 steps (83 passed)`.

Reportes generados en `reports/`:

- `cucumber-report.html` — documentación viva (abrir en el navegador)
- `cucumber-junit.xml` — para el servidor de CI
- `cucumber-messages.ndjson` — salida estándar de mensajes Cucumber

## Estructura

```
features/
  hu01_preverificacion_publicacion.feature   <- especificación en Gherkin (español)
  step_definitions/preverificacion.steps.js  <- enlace paso -> código
  support/world.js                           <- estado aislado por escenario
src/domain/
  reglaPublicacion.js                        <- reglas de negocio de HU-01
  preverificador.js                          <- caso de uso de pre-verificación
.github/workflows/bdd.yml                    <- pipeline de CI
```

## Demostración: un cambio de regla rompe la especificación

Quitar `'SciELO'` de `basesAdmitidas` en `src/domain/reglaPublicacion.js` y ejecutar
`npm test`: fallan exactamente los 2 escenarios que usan SciELO (13 escenarios: 11 pasan, 2 fallan).
