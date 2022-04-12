import type { Handler } from 'vite-plugin-mix'
import UNDO from './src/composables/useActions'
export const handler: Handler = (req, res, next) => {
  if (req.path === '/serveapi') {
    const undo = UNDO
    return res.end( undo )
  }
  next()
}