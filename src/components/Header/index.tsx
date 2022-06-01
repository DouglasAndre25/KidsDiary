import { Typography } from '@mui/material'
import Link from 'next/link'
import { memo } from 'react'

import styles from './styles.module.scss'

const Header = () => {

    return (
        <header className={styles.header}>
            <Link href='/'>
                <a>
                    <Typography variant='h4'>Kids Diary</Typography>
                </a>
            </Link>
            <Link href='/login'>
                <a>
                    <Typography variant='body1'>Entre ou cadastre-se</Typography>
                </a>
            </Link>
        </header>
    )
}

export default memo(Header)