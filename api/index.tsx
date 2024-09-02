import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'
import type { Address } from 'viem'
import { arbitrumNova } from 'viem/chains'; // Ensure this import is correct








 
export const app = new Frog({ title: 'Frog Frame' })
 
app.composerAction(
  '/',
  (c) => {
    return c.res({
      title: 'My Composr Action',
      url: 'https://google.com'
    })
  },
  {
    name: 'Some Composer Action',
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




//////////////////////////////////////////////////////////////////////////







// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
