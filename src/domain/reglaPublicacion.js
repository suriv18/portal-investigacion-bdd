/**
 * Reglas de negocio de HU-01: requisitos que debe cumplir un artículo
 * para la bonificación del docente investigador.
 *
 * Reglas acordadas con el Product Owner para el caso del Portal de
 * Investigación UNMSM: artículo indexado en SciELO, Scopus o Web of Science,
 * publicado en los últimos tres años, con filiación UNMSM, con el docente
 * como autor principal o asociado y registrado en el repositorio
 * institucional. Un artículo retractado no cuenta.
 *
 * SUPUESTOS DEL EQUIPO (a confirmar con el Vicerrectorado):
 *  - La ventana de "últimos tres años" se cuenta hacia atrás desde la fecha
 *    de corte de la convocatoria, ambos extremos inclusive.
 *  - Un artículo publicado después de la fecha de corte no se considera.
 *  - Una base de indexación no admitida, la falta de filiación, un rol no
 *    admitido o la retractación NO son subsanables; la falta de registro en
 *    el repositorio institucional SÍ es subsanable (estado OBSERVADO).
 */
export const REGLA_PUBLICACION = Object.freeze({
  basesAdmitidas: Object.freeze(['Scopus', 'Web of Science']),
  filiacionRequerida: 'UNMSM',
  rolesAdmitidos: Object.freeze(['principal', 'asociado']),
  aniosVentana: 3,
});
