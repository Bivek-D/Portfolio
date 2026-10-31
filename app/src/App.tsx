import { Routes, Route } from 'react-router'
import Home from './pages/Home'

/* One page per dimension (/, /nether, /end) so each can be indexed and shared on its own. */
export default function App() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
