import { createTheme } from '@mui/material'
import colors from '../../styles/utils/colors.module.scss'

const customTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: colors.primary,
            contrastText: colors['primary-contrast']
        },
        secondary: {
            main: colors.secondary,
            contrastText: colors['secondary-contrast']
        },
        success: {
            main: colors.success,
            contrastText: colors['success-contrast']
        },
        error: {
            main: colors.error,
            contrastText: colors['error-contrast']
        }
    }
})

export default customTheme