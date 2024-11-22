CREATE TABLE `noticias` (
  `id_noticia` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` text NOT NULL,
  `copete` text NOT NULL,
  `cuerpo` text NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `categoria` varchar(30) NOT NULL,
  PRIMARY KEY (id_noticia)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `noticias` (`id_noticia`, `titulo`, `copete`, `cuerpo`, `imagen`, `fecha`, `categoria`) VALUES
(1, 'Descubrimiento de Nuevas Especies', 'Cientificos han encontrado nuevas especies en la selva.', 'Un equipo de biologos ha descubierto varias especies nunca antes vistas en la selva amazonica. Estos hallazgos podrian tener un impacto significativo en la biodiversidad.', 'imagen1.jpg', '2024-11-01', 'CIENCIA'),
(2, 'Avances en Tecnologia', 'Una nueva tecnologia promete revolucionar la comunicacion.', 'La ultima invencion en el campo de la tecnologia esta creando olas en el mundo de las comunicaciones. Expertos predicen que cambiara la forma en que interactuamos.', 'imagen2.jpg', '2024-11-02', 'CIENCIA'),
(3, 'Eventos Culturales del Mes', 'Un resumen de los eventos culturales en la ciudad.', 'Este mes, nuestra ciudad acogera varios eventos culturales, desde exposiciones de arte hasta conciertos. Aqui te contamos lo que no te puedes perder.', 'imagen3.jpg', '2024-11-03', 'EFEMERIDES'),
(4, 'Impacto del Cambio Climatico', 'El cambio climatico afecta a las comunidades costeras.', 'Un nuevo informe revela que las comunidades costeras estan enfrentando desafios sin precedentes debido al cambio climatico, incluyendo el aumento del nivel del mar.', 'imagen4.jpg', '2024-11-04', 'CIENCIA'),
(5, 'Tendencias en Moda', 'Las ultimas tendencias en moda para el invierno.', 'Con la llegada del invierno, es hora de actualizar tu guardarropa. Aqui te mostramos las tendencias que dominara esta temporada.', 'imagen5.jpg', '2024-11-05', 'OTROS');
