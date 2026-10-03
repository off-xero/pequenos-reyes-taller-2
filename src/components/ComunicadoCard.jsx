import { formatearFecha } from '../services/comunicados.js'

function ComunicadoCard({
  titulo,
  cuerpo,
  fecha,
  emisor,
  alcance,
  categoria,
  esUrgente = false,
}) {
  const fechaFormateada = formatearFecha(fecha)
  const claseComunicado = esUrgente
    ? 'comunicado comunicado--urgente'
    : 'comunicado'

  return (
    <article className={claseComunicado}>
      <header className="comunicado__cabecera">
        {esUrgente && <span className="comunicado__etiqueta">Urgente</span>}
        {categoria && <span className="comunicado__categoria">{categoria}</span>}
      </header>

      <h3 className="comunicado__titulo">{titulo}</h3>
      <p className="comunicado__cuerpo">{cuerpo}</p>

      <footer className="comunicado__pie">
        {fechaFormateada ? (
          <time dateTime={fecha}>{fechaFormateada}</time>
        ) : (
          <span>Fecha no disponible</span>
        )}
        {emisor && <span>{emisor}</span>}
        {alcance && <span>{alcance}</span>}
      </footer>
    </article>
  )
}

export default ComunicadoCard
