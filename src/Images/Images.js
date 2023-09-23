import React, { useState, useEffect } from 'react';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import Gallery from '../Gallery/Gallery';
import { SortableContext, rectSwappingStrategy, arrayMove } from '@dnd-kit/sortable';

export default function Images() {
  const [images, setImages] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const response = await fetch('https://api.pexels.com/v1/curated', {
          headers: {
            Accept: 'application/json',
            Authorization: "7fQk0TG3hoyDmB691bLA045LeFQYs8E1styCrV3rTcDJsg5VGozmBlzz"
          }
        })
        const { photos } = await response.json();
        setImages(photos);
      } catch (error) {
        console.log("Error fetching photos");
      }
    }
    getPhotos();
  }, []);
  

  function handleDragEnd(event) {
    if (event.over && event.active.id !== event.over.id) {
      const overIndex = images.findIndex(({ id }) => id === event.over.id);
      const activeIndex = images.findIndex(({ id }) => id === event.active.id);
      return setImages((images) => arrayMove(images, activeIndex, overIndex));
    }
    setActiveId(null);
  }

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  return (
    <div className="container d-flex flex-wrap justify-content-around align-items-center">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <SortableContext items={images} strategy={rectSwappingStrategy}>
          {images.map((image) => (
            <Gallery key={image.id} id={image.id} src={image.src.landscape} alt={image.alt} />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <Gallery id={activeId} src={images.find(({ id }) => id === activeId).src.landscape} alt={images.find(({ id }) => id === activeId).alt}/>
           ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}