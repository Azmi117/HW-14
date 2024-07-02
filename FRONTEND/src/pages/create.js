import { Box, 
    Flex, 
    Input, 
    FormControl, 
    FormLabel, 
    Button, 
    Link, 
    Text} 
from "@chakra-ui/react";
import styles from "../styles/Home.module.css"
import Navbar from "@/components/navbar";
import axios from "axios";
import { useState } from "react";
const Create = () => {

    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState('');

    const handelSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:3001/api/todo/create', {
                title,
                user_id: userId,
            });

            if(response.status === 201){
                alert('Todo Create Successfully');
                setTitle('');
                setUserId('');
            }else{
                alert('Failed to create todo');
            }
        }catch(err){
            console.error('Error:', err);
            alert('An error occurred while creating the todo');
        }
    };


    return(
        <>
            <Navbar/>
            <Flex w='100%' h='80vh' alignItems='center' justify='center' direction='column'>
                <Text fontSize='xx-large' bgGradient='linear(to-r, #F97300, #C7B7A3, #524C42)' bgClip='text' className={ styles['kaushan-script-regular'] }>CREATE</Text>
                <Box w='50%' h='50vh' rounded='xl' bgGradient='linear(to-r, #E88D67, #E6B9A6, #006989)'>
                    <Flex justify='center'>
                        <form onSubmit={handelSubmit}>
                            <div>
                                <FormControl my='40px'>
                                    <FormLabel className={styles['poppins-regular']}>Title</FormLabel>
                                    <Input type='text' w='130%' value={title} onChange={(e) => setTitle(e.target.value)}/>
                                </FormControl>
                                <FormControl>
                                    <FormLabel className={styles['poppins-regular']}>User Id</FormLabel>
                                    <Input type='number' w='130%' value={userId} onChange={(e) => setUserId(e.target.value)} />
                                </FormControl>
                                <Flex justify='space-between' alignItems='center' mt='8'>
                                    <Button bgColor='#667BC6' type="submit">Submit</Button>
                                </Flex>
                            </div>
                        </form>
                    </Flex>
                </Box>
            </Flex>
        </>
    )
}

export default Create;