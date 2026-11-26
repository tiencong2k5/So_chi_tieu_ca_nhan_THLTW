import { useContext } from 'react'
import { ThemeContext } from './theme'

export default function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme phải được dùng bên trong ThemeProvider.')
  return context
}
