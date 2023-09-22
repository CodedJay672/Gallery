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
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style} className='p-4 mb-3'>
      <LazyLoadImage
        src={src}
        width={300}
        alt={alt}
        effect="opacity"
        placeholder={<Loading />}
        className='image-fluid rounded float-start'
      />
    </div>
  )
}