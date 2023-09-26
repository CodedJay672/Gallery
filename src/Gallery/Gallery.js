import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Loading from '../Loading/Loading';

export default function Gallery({ id, src, alt }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    zIndex: 1,
    margin: '0.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    aspectRatio: '1/.7',
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className='d-flex flex-wrap justify-content-center align-items-center'>
      <LazyLoadImage
        src={src}
        width="300"
        alt={alt}
        effect="blur"
        placeholderSrc={Loading}
      />
    </div>
  )
}
