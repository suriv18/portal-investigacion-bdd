import { REGLA_PUBLICACION } from './reglaPublicacion.js';

export const Resultado = Object.freeze({
  CUMPLE: 'CUMPLE',
  OBSERVADO: 'OBSERVADO',
  NO_CUMPLE: 'NO CUMPLE',
});

/**
 * Resta años a una fecha ISO (AAAA-MM-DD) sin depender de la zona horaria.
 */
function restarAnios(fechaIso, anios) {
  const [a, m, d] = fechaIso.split('-').map(Number);
  return `${String(a - anios).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

/**
 * Caso de uso: pre-verificar si un artículo cumple el criterio de publicación.
 * No aprueba nada: solo clasifica y explica el resultado. La aprobación
 * la da el decano.
 *
 * @param {object} articulo  { doi, base, filiacion, rol, fechaPublicacion, enRepositorio, retractado }
 * @param {object} contexto  { fechaCorte } en formato AAAA-MM-DD
 * @param {object} regla     regla de negocio vigente (inyectable para pruebas)
 * @returns {{ resultado: string, motivos: string[], acciones: string[], alertaVicerrectorado: boolean }}
 */
export function preverificarArticulo(articulo, { fechaCorte }, regla = REGLA_PUBLICACION) {
  const motivos = [];
  const acciones = [];
  let subsanable = true;
  let alertaVicerrectorado = false;

  if (articulo.retractado) {
    motivos.push('El artículo figura como retractado');
    subsanable = false;
    alertaVicerrectorado = true;
  }

  if (!regla.basesAdmitidas.includes(articulo.base)) {
    motivos.push(`La base de indexación '${articulo.base}' no está admitida`);
    subsanable = false;
  }

  if (articulo.filiacion !== regla.filiacionRequerida) {
    motivos.push(`El artículo no declara filiación ${regla.filiacionRequerida}`);
    subsanable = false;
  }

  if (!regla.rolesAdmitidos.includes(articulo.rol)) {
    motivos.push('La docente no figura como investigadora principal ni asociada');
    subsanable = false;
  }

  const inicioVentana = restarAnios(fechaCorte, regla.aniosVentana);
  if (articulo.fechaPublicacion < inicioVentana || articulo.fechaPublicacion > fechaCorte) {
    motivos.push(`La fecha de publicación está fuera de la ventana de ${regla.aniosVentana} años`);
    subsanable = false;
  }

  if (!articulo.enRepositorio) {
    motivos.push('El artículo no está registrado en el repositorio institucional');
    acciones.push('Registrar el artículo en el repositorio institucional');
  }

  let resultado = Resultado.CUMPLE;
  if (motivos.length > 0) {
    resultado = subsanable ? Resultado.OBSERVADO : Resultado.NO_CUMPLE;
  }

  return { resultado, motivos, acciones, alertaVicerrectorado };
}
