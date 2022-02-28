import React,{ useState } from 'react';
import {
    Flex,FormControl,
    FormLabel,
    Input,
    Textarea,
    Stack
  } from "@mui/material";

const CreateEditForm = () => {
  return (
    <Flex>
        <FormControl>
            <FormLabel htmlFor='name'>Hall</FormLabel>
            <Input id='name' type='name' variant='flushed' />
            <FormLabel htmlFor='address'>Address</FormLabel>
            <Textarea id='address'
            placeholder='Here is a sample placeholder'
            size='sm'
            />
            <FormLabel htmlFor='timeslot'>Time Availble</FormLabel>
             <Stack direction={'row'}>
                <Input id='timeslot' type='name' variant='flushed' />
                <Input id='timeslot' type='name' variant='flushed' />
             </Stack>
             <FormLabel htmlFor='capacity'>No of Seats Available</FormLabel>
             <Input id='capacity' type='number' variant='flushed' />
        </FormControl>
    </Flex>
  )
}

export default CreateEditForm;

  
