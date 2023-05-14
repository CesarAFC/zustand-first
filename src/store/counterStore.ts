import {create} from "zustand";

interface Post {
    id: number
    title: string
    body: string
}

interface CounterState {
    count: number
    title: string
    increment: (value: number) => void
    posts: Post[]
    getPosts: () => Promise<void>
    multiply: (value: number) => void
}

// La documentacion usa useStore
// Esto retorna los datos que queremos compartir en toda la app
// debemos pasarle el set para actualiar el estado. The set function merges state.
export const useCounterStore = create<CounterState>( (set, get) => ({
    count: 10,
    title: 'My Counter',
    posts: [],
    // Podemos crear las acciones aqui
    increment: (value: number) => set(state => ({
        ...state,
        //returnamos un objeto porque el estado es un objeto
        count: state.count + value
    })),
    getPosts: async () => {
        // const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        // const posts = await res.json()
        const posts = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json()
        set( state => ({
            ...state,
            posts: posts
        }))
    },
    multiply: (value: number) => {
        const {count} = get()
        set({count: count * value})
    }
}))

// 1. Boiler plate o codigo inicial es mucho mas sencillo 