import { setWorldConstructor } from '@cucumber/cucumber';

/**
 * Estado compartido por los pasos de UN escenario.
 * Cucumber crea un World nuevo por escenario: los escenarios quedan aislados
 * (no se filtran datos de uno a otro), lo que sostiene la "I" de INVEST
 * también a nivel de prueba.
 */
class PortalWorld {
  constructor() {
    this.fechaCorte = null;
    this.docente = null;
    this.articulo = null;
    this.respuesta = null;
  }
}

setWorldConstructor(PortalWorld);
