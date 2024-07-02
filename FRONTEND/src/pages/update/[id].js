import { Box, Flex, Input, FormControl, FormLabel, Button, Text } from "@chakra-ui/react";
import Navbar from "@/components/navbar";
import styles from '../../styles/Home.module.css';
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Edit = () => {
    const router = useRouter();
    const { id } = router.query;
    const [title, setTitle] = useState('');
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchTodoById(id);
        }
    }, [id]);

    const fetchTodoById = async (todoId) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/todo/${todoId}`);
            const todo = response.data;
            setTitle(todo.title);
            setUserId(todo.user_id);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching todo by id:', err);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/api/todo/update/${id}`, {
                title,
                user_id: userId,
            });

            if (response.status === 201) {
                alert('Todo updated successfully');
                router.push(`/`);
            } else {
                alert('Failed to update todo');
            }
        } catch (err) {
            console.error('Error updating todo:', err);
            alert('An error occurred while updating the todo');
        }
    };

    return (
        <>
            <Navbar />
            <Flex w='100%' h='80vh' alignItems='center' justify='center' direction='column'>
                <Text fontSize='xxx-large' bgGradient='linear(to-r, #F97300, #C7B7A3, #524C42)' bgClip='text' className={styles['rowdies-regular']}>Edit</Text>
                <Box w='50%' h='50vh' rounded='xl' bgGradient='linear(to-r, #E88D67, #E6B9A6, #006989)'>
                    <Flex justify='center'>
                        {loading? (<Text>Loading</Text>):(
                        <form onSubmit={handleSubmit}>
                            <div>
                                <FormControl my='40px'>
                                    <FormLabel className={styles['poppins-regular']}>Title</FormLabel>
                                    <Input type='text' w='130%' value={title} onChange={(e) => setTitle(e.target.value)} />
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
                        )}
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}

export default Edit;
