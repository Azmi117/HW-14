import Navbar from "@/components/navbar";
import { Box, 
    Flex, 
    Input, 
    FormControl, 
    FormLabel, 
    Button, 
    Link, 
    Text} 
from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css"

const Login = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`http://localhost:3001/login`, {username, password});
            localStorage.setItem('token', response.data.token);
            router.push('/');
        }catch(err){
            console.error(err);
        }
    };

    return(
        <>
            <Navbar/>
            <Flex w='100%' h='80vh' alignItems='center' justify='center' direction='column'>
                <Text className={styles['playball-regular']} fontSize='xx-large' bgGradient='linear(to-r, #453F78, #795458, #4793AF)' bgClip='text'>Login</Text>
                <Box w='50%' h='50vh' rounded='xl' bgGradient='linear(to-r, #E88D67, #E6B9A6, #006989)'>
                    <Flex justify='center'>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <FormControl my='40px'>
                                    <FormLabel className={styles['poppins-regular']}>Username</FormLabel>
                                    <Input type='text' w='130%' value={username} onChange={(e) => setUserName(e.target.value)}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel className={styles['poppins-regular']}>Password</FormLabel>
                                    <Input type='password' w='130%' value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </FormControl>
                                <Flex justify='space-between' alignItems='center' mt='8'>
                                    <Button bgColor='#667BC6' type="submit">Submit</Button>
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

export default Login;