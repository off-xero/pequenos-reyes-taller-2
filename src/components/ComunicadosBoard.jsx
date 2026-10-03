import { useMemo } from 'react'
import ComunicadoCard from './ComunicadoCard.jsx'
import { ordenarComunicados } from '../services/comunicados.js'
import '../App.css'

function ComunicadosBoard({ comunicados = [] }) {
  const ordenados = useMemo(() => ordenarComunicados(comunicados), [comunicados])

  return (
    <section className="muro" aria-labelledby="muro-titulo">
      <h2 id="muro-titulo" className="muro__titulo">
        Comunicados oficiales
      </h2>

      {ordenados.length === 0 ? (
        <p className="muro__vacio" role="status">
          Por ahora no hay comunicados publicados. Cuando el jardín envíe uno,
          lo verá aquí.
        </p>
      ) : (
        <div className="muro__lista">
          {ordenados.map((comunicado) => (
            <ComunicadoCard
              key={comunicado.id}
              titulo={comunicado.titulo}
              cuerpo={comunicado.cuerpo}
              fecha={comunicado.fecha}
              emisor={comunicado.emisor}
              alcance={comunicado.alcance}
              categoria={comunicado.categoria}
              esUrgente={comunicado.esUrgente === true}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default ComunicadosBoard
