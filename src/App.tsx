import { useEffect } from 'react';
import { useCounterStore } from './store/counterStore';
import {shallow} from 'zustand/shallow';

function App() {

  // Accedemos a valores atomicos. 
  // const count = useCounterStore((state) => state.count)
  // const title = useCounterStore((state) => state.title)

  // Asi llamamos dos valores al mismo tiempo
  // Aunque aqui solo importamos un solo dato (el objeto)
  // Cuando zustand hace la comparcion para ver que dato cambia, pero en este caso compararia un objeto con otro ( {} === {} )
  // Para esto le pasamos la funcion llamada 'shallow'
  const {title, count, posts } = useCounterStore((state) => ({
    count: state.count,
    title: state.title,
    posts: state.posts,
  }), shallow)

  // const increment = useCounterStore( state => state.increment);
  const { increment, getPosts, multiply } = useCounterStore();

  useEffect( () => {
    getPosts()
  }, [])

  return (
    <div>
      <h1>{title}: {count}</h1>
      <button onClick={ () => {increment(10)} }>Increment by 10</button>
      <button onClick={ () => {multiply(2)} }>Multiply by 2</button>
      <hr />
      {JSON.stringify(posts)}
    </div>
  )
}

export default App