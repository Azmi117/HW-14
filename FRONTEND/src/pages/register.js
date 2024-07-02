import Navbar from "@/components/navbar";
import { Box, 
    Flex, 
    Input, 
    FormControl, 
    FormLabel, 
    Button, 
    Link } 
from "@chakra-ui/react";
import styles from "../styles/Home.module.css"

const Register = () => {
    return(
        <>
            <Navbar/>
            <Flex w='100%' h='80vh' alignItems='center' justify='center'>
                <Box w='50%' h='68vh' rounded='xl' bgGradient='linear(to-r, #E88D67, #E6B9A6, #006989)' mt='20'>
                    <Flex justify='center'>
                        <form>
                            <div>
                                <FormControl mt='40px'>
                                    <FormLabel className={styles['poppins-regular']}>Username</FormLabel>
                                    <Input type='email' w='130%'/>
                                </FormControl>
                                <FormControl mt='20px'>
                                    <FormLabel className={styles['poppins-regular']}>Password</FormLabel>
                                    <Input type='password' w='130%' />
                                </FormControl>
                                <FormControl mt='20px'>
                                    <FormLabel className={styles['poppins-regular']}>Age</FormLabel>
                                    <Input type='number' w='130%' />
                                </FormControl>
                                <FormControl mt='20px'>
                                    <FormLabel className={styles['poppins-regular']}>Role</FormLabel>
                                    <Input type='text' w='130%' />
                                </FormControl >
                                <Flex justify='space-between' alignItems='center' mt='8'>
                                    <Button bgColor='#7AB2B2'>Submit</Button>
                                    <Link className={ styles['poppins-regular'] } href="/register" _hover={{ textDecoration: 'none' }}>Register!</Link>
                                </Flex>
                            </div>
                        </form>
                    </Flex>
                </Box>
            </Flex>
        </>
    )
}

export default Register;