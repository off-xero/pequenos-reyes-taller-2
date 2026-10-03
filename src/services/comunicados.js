const FECHA_ISO = /^(\d{4})-(\d{2})-(\d{2})$/

/**
 * Convierte "AAAA-MM-DD" en una Date local (sin desfase por zona horaria).
 * Devuelve null si el valor falta, no es texto ISO o no es un día real.
 */
export function parseFecha(valor) {
  if (typeof valor !== 'string') return null
  const m = FECHA_ISO.exec(valor.trim())
  if (!m) return null
  const [anio, mes, dia] = [Number(m[1]), Number(m[2]), Number(m[3])]
  const fecha = new Date(anio, mes - 1, dia)
  const coincide =
    fecha.getFullYear() === anio &&
    fecha.getMonth() === mes - 1 &&
    fecha.getDate() === dia
  return coincide ? fecha : null
}

/** Fecha legible en español o null si es inválida. */
export function formatearFecha(valor) {
  const fecha = parseFecha(valor)
  if (!fecha) return null
  return new Intl.DateTimeFormat('es-CL', { dateStyle: 'long' }).format(fecha)
}

/**
 * Ordena de más reciente a más antiguo SIN mutar el arreglo original.
 * Los comunicados con fecha inválida van al final, en su orden original.
 */
export function ordenarComunicados(comunicados) {
  if (!Array.isArray(comunicados)) return []
  return [...comunicados].sort((a, b) => {
    const fa = parseFecha(a?.fecha)
    const fb = parseFecha(b?.fecha)
    if (fa && fb) return fb - fa
    if (fa) return -1
    if (fb) return 1
    return 0
  })
}
