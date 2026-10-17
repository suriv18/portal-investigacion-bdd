# language: es
@HU-01 @critica
Característica: Pre-verificación de requisitos para la bonificación
  Como docente investigador de la UNMSM
  Quiero saber al instante si un artículo que registro cumple los requisitos
  Para corregir a tiempo lo que falte antes de que el decano lo revise

  # Reglas acordadas con el Product Owner para el Portal de Investigación.
  # El portal NO aprueba: pre-verifica y explica el resultado. La aprobación la da el decano.

  Antecedentes:
    Dado que la fecha de corte de la convocatoria es "2026-01-30"
    Y la docente "Ana Quispe Huamán" ha iniciado sesión en el portal

  Regla: Solo cuentan artículos indexados en SciELO, Scopus o Web of Science

    @requisitos
    Esquema del escenario: Artículo que cumple todas las condiciones en una base admitida
      Dado que la docente registró un artículo indexado en "<base>" que cumple las demás condiciones
      Cuando solicita la pre-verificación del artículo
      Entonces el resultado de la pre-verificación es "CUMPLE"

      Ejemplos:
        | base           |
        | Scopus         |
        | Web of Science |
        | SciELO         |

    @requisitos
    Escenario: Artículo indexado en una base no admitida
      Dado que la docente registró un artículo indexado en "Latindex" que cumple las demás condiciones
      Cuando solicita la pre-verificación del artículo
      Entonces el resultado de la pre-verificación es "NO CUMPLE"
      Y se informa el motivo "La base de indexación 'Latindex' no está admitida"

  Regla: El artículo debe tener filiación UNMSM y la docente debe ser investigadora principal o asociada

    @requisitos
    Escenario: Artículo sin filiación UNMSM
      Dado que la docente registró un artículo indexado en "Scopus" que cumple las demás condiciones
      Pero el artículo declara la filiación "Otra universidad"
      Cuando solicita la pre-verificación del artículo
      Entonces el resultado de la pre-verificación es "NO CUMPLE"
      Y se informa el motivo "El artículo no declara filiación UNMSM"

    @requisitos
    Escenario: La docente no figura como investigadora principal ni asociada
      Dado que la docente registró un artículo indexado en "Scopus" que cumple las demás condiciones
      Pero la docente figura en el artículo con el rol "otro"
      Cuando solicita la pre-verificación del artículo
      Entonces el resultado de la pre-verificación es "NO CUMPLE"
      Y se informa el motivo "La docente no figura como investigadora principal ni asociada"

  Regla: El artículo debe haberse publicado en los últimos tres años respecto de la fecha de corte

    @requisitos @limites
    Esquema del escenario: Límites de la ventana de tres años
      Dado que la docente registró un artículo indexado en "Scopus" que cumple las demás condiciones
      Pero la fecha de publicación del artículo es "<fecha>"
      Cuando solicita la pre-verificación del artículo
      Entonces el resultado de la pre-verificación es "<resultado>"

      Ejemplos:
        | fecha      | resultado |
        | 2023-01-30 | CUMPLE    |
        | 2023-01-29 | NO CUMPLE |
        | 2026-01-30 | CUMPLE    |
        | 2026-02-15 | NO CUMPLE |

  Regla: La falta de registro en el repositorio institucional es subsanable

    @requisitos
    Escenario: Artículo no registrado en el repositorio institucional
      Dado que la docente registró un artículo indexado en "SciELO" que cumple las demás condiciones
      Pero el artículo no está registrado en el repositorio institucional
      Cuando solicita la pre-verificación del artículo
      Entonces el resultado de la pre-verificación es "OBSERVADO"
      Y se le indica la acción "Registrar el artículo en el repositorio institucional"

    @requisitos
    Escenario: Una observación subsanable no oculta un incumplimiento
      Dado que la docente registró un artículo indexado en "Scopus" que cumple las demás condiciones
      Pero el artículo no está registrado en el repositorio institucional
      Y la fecha de publicación del artículo es "2022-05-10"
      Cuando solicita la pre-verificación del artículo
      Entonces el resultado de la pre-verificación es "NO CUMPLE"
      Y se informa el motivo "La fecha de publicación está fuera de la ventana de 3 años"
      Y se informa el motivo "El artículo no está registrado en el repositorio institucional"

  Regla: Un artículo retractado no cuenta y se alerta al Vicerrectorado

    @retractacion
    Escenario: Artículo retractado
      Dado que la docente registró un artículo indexado en "Web of Science" que cumple las demás condiciones
      Pero el artículo figura como retractado
      Cuando solicita la pre-verificación del artículo
      Entonces el resultado de la pre-verificación es "NO CUMPLE"
      Y se informa el motivo "El artículo figura como retractado"
      Y se genera una alerta para el Vicerrectorado de Investigación
