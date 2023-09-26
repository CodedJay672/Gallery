import React, { useState, useEffect } from 'react';
import {
  NavLink,
  Form,
  useSubmit,
  useLoaderData,
  useNavigation,
  useNavigate,
} from 'react-router-dom';
import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import Gallery from '../Gallery/Gallery';
import { SortableContext, rectSwappingStrategy, arrayMove } from '@dnd-kit/sortable';
import { getPhotos } from '../utils/Utils';

{/** This is a loader function which loads all images for the webpage */}
export async function loader({request}) {
  const url = new URL(request.url);
  const param = url.searchParams.get('topic');
  const photos = await getPhotos(param);
  return { photos, param };
}

export default function App() {
  const { photos, param } = useLoaderData();
  const [ images, setImages ] = useState(photos);
  const [activeId, setActiveId] = useState(null);
  const submit = useSubmit();
  const navigation = useNavigation();
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('topic');
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById("param").value = param;
    if (param) {
      setImages(photos);
    } else {
      navigate("/");
    }
  }, [param])

  
  {/** This function handles the event when the signout option is clicked*/}
  const signout = () => {
    sessionStorage.removeItem("token");
    window.location = '/';
  }

  {/** This function handles the drag event for the images */}
  function handleDragEnd(event) {
    if (event.over && event.active.id !== event.over.id) {
      const overIndex = images.findIndex(({ id }) => id === event.over.id);
      const activeIndex = images.findIndex(({ id }) => id === event.active.id);
      return setImages((images) => arrayMove(images, activeIndex, overIndex));
    }
    setActiveId(null);
  }

  {/* This event handles the event when the drag has just started */}
  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
          <NavLink className='navbar-brand' to='/'>Photo Vallery</NavLink>
          <Form className="d-flex" role='search'>
            <input
              id='param'
              name='topic'
              className={searching ? "loading " : "" + "form-control me-2"}
              type="search"
              placeholder="Search"
              aria-label="Search"
              defaultValue={param}
              onChange={(event) => {
                const isFirstSearch = param == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
          </Form>
          <NavLink className='nav-link' to="/" onClick={signout}>Log Out</NavLink>
        </div>
      </nav>
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
    </>
  )
}
