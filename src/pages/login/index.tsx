import { Button, Card, Grid, Input, InputLabel, Typography, useTheme } from '@mui/material'
import styles from './styles.module.scss'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Link from 'next/link'

const LoginPage = () => {
    const theme = useTheme()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            email: yup.string().
                email('email invalido').required('O campo é obrigatório.'),
            password: yup.string().required('O campo é obrigatório.')
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        }
    })

    return (
        <Grid display='flex' justifyContent='center' alignItems='center'>
            <Card className={styles.cardLogin}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid
                        container
                        direction='column'
                        justifyContent='center'
                        alignItems='stretch'
                    >
                        <Grid item marginBottom={3}>
                            <InputLabel htmlFor='email'>Email</InputLabel>
                            <Input
                                id='email'
                                type='text'
                                placeholder='Digite seu email'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                fullWidth
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <Typography color={theme.palette.error.main}>
                                    {formik.errors.email}
                                </Typography>
                            ) : null}
                        </Grid>

                        <Grid item marginBottom={3}>
                            <InputLabel htmlFor='password'>Senha</InputLabel>
                            <Input
                                id='password'
                                type='password'
                                placeholder='Digite sua senha'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                fullWidth
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <Typography color={theme.palette.error.main}>
                                    {formik.errors.password}
                                </Typography>
                            ) : null}
                        </Grid>

                        <Grid item>
                            <Button  type='submit' color='secondary'>Login</Button>
                        </Grid>

                        <Grid item>
                            <Link href='/register'>
                                <Button type='submit' color='secondary'>Registrar</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Card>
        </Grid>
    )
}

export default LoginPage