// Images are served from the /public/gallery/ folder as static assets.
// This avoids Vite bundling/hashing issues and works reliably on Vercel.
export const galleryPhotos = [
  { src: '/gallery/photo1.jpg', alt: 'Together', span: 'tall' },
  { src: '/gallery/photo2.jpg', alt: 'Garden walk', span: 'wide' },
  { src: '/gallery/photo3.jpg', alt: 'Laughing', span: 'tall' },
  { src: '/gallery/photo4.jpg', alt: 'Sunset', span: 'wide' },
  { src: '/gallery/photo5.jpg', alt: 'Flowers', span: 'square' },
  { src: '/gallery/photo6.jpg', alt: 'Temple', span: 'tall' },
];