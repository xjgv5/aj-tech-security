// Imágenes de stock temporales (loremflickr). Reemplázalas por tus fotos en /public/img
const img = (kw, n) => `https://picsum.photos/seed/${kw.split(',')[0]}${n}/800/1000`

export const soluciones = [
  {
    icon: 'fa-fingerprint', title: 'Control de acceso biométrico', img: img('fingerprint,scanner', 1),
    desc: 'Huella, rostro o tarjeta: solo entra quien tiene permiso, y cada ingreso queda registrado.',
    casos: ['Oficinas', 'Bodegas', 'Control de asistencia'],
  },
  {
    icon: 'fa-video', title: 'CCTV y videovigilancia', img: img('cctv,camera', 2),
    desc: 'Cámaras HD con visión nocturna y grabación en la nube o en sitio. Revisa todo desde tu celular.',
    casos: ['Negocios', 'Estacionamientos', 'Hogares'],
  },
  {
    icon: 'fa-house-lock', title: 'Acceso a residenciales', img: img('gate,residential', 3),
    desc: 'Control de visitas, residentes y proveedores en fraccionamientos y condominios, con acceso por app o tag.',
    casos: ['Fraccionamientos', 'Condominios', 'Privadas'],
  },
  {
    icon: 'fa-car-side', title: 'Control vehicular', img: img('barrier,parking', 4),
    desc: 'Plumas, lectura de placas y tags para ordenar la entrada y salida de vehículos.',
    casos: ['Estacionamientos', 'Industria', 'Plazas'],
  },
  {
    icon: 'fa-bell', title: 'Alarmas e intrusión', img: img('alarm,security', 5),
    desc: 'Sensores y sirenas con monitoreo. Recibes una alerta en tu teléfono al instante.',
    casos: ['Casas', 'Comercios', 'Almacenes'],
  },
  {
    icon: 'fa-network-wired', title: 'Redes e infraestructura IT', img: img('server,network', 6),
    desc: 'Cableado estructurado, WiFi y servidores para que tu seguridad y tu operación funcionen sin cortes.',
    casos: ['Empresas', 'Edificios', 'Escuelas'],
  },
]
