const { Box, Link, Image } = require("@chakra-ui/react")
import styles from '../styles/Home.module.css';

const Navbar = ( {children} ) => {
    return(
        <Box w='100%' h='8vh' bgGradient='linear(to-l, #365E32, #81A263, #E7D37F)' display='flex' alignItems='center' justifyContent='space-between'>
            <Image src='https://www.svgrepo.com/show/414759/animal-bear-fur.svg' w='50px' ms='5'></Image>
            <div>
                <Link href='/' className={ styles['poppins-regular'] } mx='10px' _hover={{ textDecoration: 'none' }} textColor='whitesmoke'>TodoList</Link>
                <Link href='/create' className={ styles['poppins-regular'] } ms='15px' me='25px' _hover={{ textDecoration: 'none' }} textColor='whitesmoke'>Create</Link>
                <Link href='/login' className={ styles['poppins-regular'] } me='35px' _hover={{ textDecoration: 'none' }} textColor='whitesmoke'>Login</Link>
            </div>
            {children}
        </Box>
    )
}

export default Navbar;