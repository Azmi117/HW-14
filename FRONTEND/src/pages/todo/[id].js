import Navbar from "@/components/navbar";
import axios from "axios";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from '../../styles/Home.module.css';
import Link from "next/link";
const TodoDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [todo, setTodos] = useState(null);
    const [user, setUsers] = useState(null);

    useEffect(() => {
        if (id) {
            fetchTodoById(id);
        }
    }, [id]);

    useEffect(() => {
        if (todo && todo.user_id) {
            fetchUserById(todo.user_id);
        }
    }, [todo]);

    const fetchTodoById = async (todoId) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/todo/${todoId}`);
            setTodos(response.data);
        } catch (err) {
            console.error(`Error fetching todo by id:`, err);
        }
    };

    const fetchUserById = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:3001/user/${userId}`);
            setUsers(response.data);
        } catch (err) {
            console.error(`Error fetching user by id:`, err);
        }
    };


    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/todo/delete/${id}`);
            if (response.status === 204) {
                alert('Todo deleted successfully');
                router.push('/'); // Redirect to homepage or any other page
            } else {
                alert('Failed to delete todo');
            }
        } catch (err) {
            console.error('Error deleting todo:', err);
            alert('An error occurred while deleting the todo');
        }
    };

    if (!todo) {
        return <div>Loading....</div>;
    }

    return (
        <>
            <Navbar />
            <Flex w='100%' h='100vh' alignItems='center' justifyContent='center' direction='column'>
                <Text bgGradient='linear(to-r, #F97300, #948979, #524C42)' bgClip='text' className={styles['rowdies-light']} fontSize='xx-large'>
                    User Detail
                </Text>
                <Box w='400px' h='200px' bgColor='#FFBF9B' border='7px' borderStyle='solid' borderColor='#E8947E' rounded='xl'>
                    <Flex justify='center' mt='15px'>
                        <div>
                            <Text ms='15px'>{todo.title}</Text>
                            <p>Activity By: {user ? user.username : "Loading..."}</p>
                        </div>
                    </Flex>
                    <Flex justify='center' mt='50px'>
                        <div>
                            <Button onClick={handleDelete} bgColor='#C80036' textColor='whitesmoke' _hover={{ bgColor: '#FF204E' }}>
                                Delete
                            </Button>
                            <Button bgColor='#116D6E' textColor='whitesmoke' _hover={{ bgColor: '#22A699' }} mx='2'>
                                <Link href={`/update/${todo.id}`}>Update</Link>
                            </Button>
                        </div>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}

export default TodoDetail;
