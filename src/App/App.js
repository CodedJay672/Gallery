import React, {useState, useEffect } from 'react';
import Login from '../Login/Login';
import useToken from '../App/useToken';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import Gallery from '../Gallery/Gallery';
import { SortableContext, rectSwappingStrategy, arrayMove } from '@dnd-kit/sortable';
import { NavLink } from 'react-router-dom';

export default function App() {
  const { token, setToken } = useToken();
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
        throw Error("Error fetching photos");
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

  if (!token) {
    return (
      <>
        <Login setToken={setToken} />
      </>
    )
  }

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
          <NavLink className='navbar-brand' to='/'>Photo Vallery</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <div className='navbar-nav'>
              <NavLink className='nav-link' to='/Login'>Sign Out</NavLink>
            </div>
          </div>
          <form className="d-flex" role='search'>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <div className="container d-flex flex-wrap justify-content-start align-items-center mb-3">
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          <SortableContext items={images} strategy={rectSwappingStrategy}>
            {images.map((image) => (
              <Gallery key={image.id} id={image.id} src={image.src.landscape} alt={image.alt} />
            ))}
          </SortableContext>
          <DragOverlay>
            {activeId ? (
              <Gallery id={activeId} src={images.find(({ id }) => id === activeId).src.landscape} alt={images.find(({ id }) => id === activeId).alt} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  )
}
