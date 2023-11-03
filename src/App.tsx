import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {AutomergeUrl} from '@automerge/automerge-repo'
import { create } from 'zustand'


const store = create<{
  counter1: number
  counter2: number,
  increment: (counter: 'counter1' | 'counter2') => void
}>((set) => ({
  counter1: 0,
  counter2: 0,
  increment: (counter: 'counter1' | 'counter2') => set((state) => ({[counter]: state[counter] + 1}))
}))


const Counter1 = ({docUrl}: {docUrl: AutomergeUrl}) => {
  const increment = store((state) => state.increment)
  const counter1 = store((state) => state.counter1)

  // I really want to get a slice of this doc, but I can't figure out how to do
  // it.
  
  // Would be analogous to:
  // useSelector((state) => state.counter1.value)
  // from react-redux

  console.log(`Rendering Counter1 with docUrl=${docUrl} and doc=${JSON.stringify({ counter1 })}`)
  return (
    <button onClick={() => increment('counter1')}>
      count is {counter1}
    </button>
  )
}

const Counter2 = ({docUrl}: {docUrl: AutomergeUrl}) => {
  const increment = store((state) => state.increment)
  const counter2 = store((state) => state.counter2)  

  console.log(`Rendering Counter2 with docUrl=${docUrl} and doc=${JSON.stringify({ counter2})}`)
  return (
    <button onClick={() => increment('counter2')}>
      count is { counter2 } 
    </button>
  )
}


function App({docUrl}: {docUrl: AutomergeUrl}) {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Counter1 docUrl={docUrl} />
        <Counter2 docUrl={docUrl} /> 
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
