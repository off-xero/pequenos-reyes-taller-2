const FORMATO_FECHA = /^(\d{4})-(\d{2})-(\d{2})$/

export function parseFecha(valor) {
  if (typeof valor !== 'string') return null

  const partes = valor.trim().match(FORMATO_FECHA)
  if (!partes) return null

  const anio = Number(partes[1])
  const mes = Number(partes[2])
  const dia = Number(partes[3])
  const fecha = new Date(anio, mes - 1, dia)

  const esUnaFechaValida =
    fecha.getFullYear() === anio &&
    fecha.getMonth() === mes - 1 &&
    fecha.getDate() === dia

  if (!esUnaFechaValida) return null
  return fecha
}

export function formatearFecha(valor) {
  const fecha = parseFecha(valor)
  if (!fecha) return null

  return new Intl.DateTimeFormat('es-CL', { dateStyle: 'long' }).format(fecha)
}

export function ordenarComunicados(comunicados) {
  if (!Array.isArray(comunicados)) return []

  const comunicadosOrdenados = [...comunicados]

  comunicadosOrdenados.sort((primerComunicado, segundoComunicado) => {
    const fechaPrimerComunicado = parseFecha(primerComunicado?.fecha)
    const fechaSegundoComunicado = parseFecha(segundoComunicado?.fecha)

    if (fechaPrimerComunicado && fechaSegundoComunicado) {
      return fechaSegundoComunicado - fechaPrimerComunicado
    }

    if (fechaPrimerComunicado) return -1
    if (fechaSegundoComunicado) return 1

    return 0
  })

  return comunicadosOrdenados
}
