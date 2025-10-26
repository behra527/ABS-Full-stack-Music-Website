import React from 'react';
import PlayListsdata from '../Components/PlayListsdata';

import Arti from '../Components/Arti';
import RadioData from '../Components/RadioData';
import Album from '../Components/Album'; 


function Home() {
  return (
    <div className='border rounded-3xl min-h-screen '>
    
      <Arti />
      <Album/>
      <PlayListsdata />
      <RadioData />
     
    </div>
  );
}

export default Home;
