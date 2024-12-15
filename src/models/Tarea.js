class Tarea {
  constructor(id, titulo, descripcion, fechaLimite, completado) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fechaLimite = fechaLimite;
    this.completado = completado;
  }

  get diasRestantes() {
    return Number(
      Math.round(
        (Date.parse(this.fechaLimite) - Date.now()) / (1000 * 60 * 60 * 24)
      )
    );
  }
}

export default Tarea;
