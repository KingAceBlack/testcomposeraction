import { Frog, TextInput } from 'frog'
 
export const app = new Frog({ title: 'Frog Frame' })
 
app.composerAction(
  '/',
  (c) => {
    return c.res({
      title: 'Mycoolaction',
      url: 'https://composing-lorecast.vercel.app' 
    })
  },
  {
    /* Name of the action – 14 characters max. */
    name: 'coolaction',
    /* Description of the action – 20 characters max. */
    description: 'Cool Composer Action',
    icon: 'image',
    imageUrl: 'https://frog.fm/logo-light.svg',
  }
)

import { postComposerCreateCastActionMessage } from 'frog/next'
 
function App() {
  return (
    <button onClick={() => postComposerCreateCastActionMessage({/**/})}>
      Button
    </button>
  )
}
