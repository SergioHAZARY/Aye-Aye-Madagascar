// Silhouette au trait fin de chaque coupe (page Nos modeles).
// Une coupe se represente mieux par sa forme que par une photo d'un seul
// coloris ; trait #2a2a2a, comme les icones de l'en-tete.

const FORMES = {
  'tee-shirt':
    'M52 14 Q60 23 68 14 L80 19 L101 33 L91 50 L83 45 L83 104 L37 104 L37 45 L29 50 L19 33 L40 19 Z',
  'manches-longues':
    'M52 14 Q60 23 68 14 L80 19 Q96 24 100 34 L106 96 L93 98 L85 52 L83 47 L83 104 '
    + 'L37 104 L37 47 L35 52 L27 98 L14 96 L20 34 Q24 24 40 19 Z',
  debardeur:
    'M46 12 L54 12 Q60 27 66 12 L74 12 Q76 31 86 41 L86 104 L34 104 L34 41 Q44 31 46 12 Z',
};

export default function SilhouetteModele({ slug, titre }) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label={titre}>
      <path
        d={FORMES[slug]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
