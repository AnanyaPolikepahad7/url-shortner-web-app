import { Center } from '@mantine/core';
import React from 'react';
import { TextInput } from '@mantine/core';
import { Button } from '@mantine/core';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Service from '../../utils/http';
import { SHORTEN_URL } from '../../utils/urls';
const URLShortener=()=>{
    const [title,setTitle]=useState('');
    const [originalUrl,setOriginalUrl]=useState('');
    const [date,setDate]=useState('');
    const [shortURL,setShortURL]=useState('');
    const service=new Service();
    
    const sendData=()=>{
        const response=service.post(SHORTEN_URL,{
            title:title,
            originalUrl:originalUrl,
            expiresAt:date,
        })
        return response;
    }
    const {mutate}=useMutation({
        mutationFn: sendData,
        onSuccess(data) {
            
            setShortURL(`${service.getBaseURL()}/api/s/${data.shortCode}`);
        }
        })
    return (<Center style={{height:'90vh',flexDirection: 'column'}}>
        <h1 
        style={{fontWeight:'lighter',fontSize:'50px',margin:'20px',textShadow:'2px 2px 4px #000000',color:'blueviolet'}}
        >Shortnen your URL</h1>
        {shortURL}
        <TextInput 
        placeholder="Enter the title"  
        label="Title"
        labelProps={{style:{fontWeight:'bold',color :'pink'}}}
        w={400}
        mb={'lg'}
        onChange={(e)=>setTitle(e.target.value)}
        value={title}
        />
        <TextInput 
        placeholder="Enter the original URL"  
        label="Original URL"
        labelProps={{style:{fontWeight:'bold',color :'pink'}}}
        w={400}
        mb={'lg'}
        onChange={(e)=>setOriginalUrl(e.target.value)}
        value={originalUrl}
        />
        <TextInput 
        placeholder="Enter the Date of Expiry"  
        label="Date of Expiry"
        labelProps={{style:{fontWeight:'bold',color :'pink'}}}
        type='date'
        w={400}
        mb={'lg'}
        onChange={(e)=>setDate(e.target.value)}
        value={date}
        />
        <Button
         w={400}
         variant ="outline"
         onClick={()=>mutate()}
         >Generate your Short URL</Button>
    </Center>)
}
export default URLShortener;