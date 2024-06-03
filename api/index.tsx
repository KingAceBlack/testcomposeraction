import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'
import type { Address } from 'viem'
import { arbitrum } from 'viem/chains'; // Ensure this import is correct
import { abi } from '../abi.js'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})



let player = {
  name: 'player',
  life: 100,
  timegated: 1,
  forgednumber: 0,
  timeremaining: "9000",
  specials: 1,
  tinkererbombactive: 0,
 
};

let enemy1 = {
  name: 'ENEMY1',
  life: 50, 
};

let enemy2 = {
  name: 'ENEMY2',
  life: 50, 
};

let enemy3 = {
  name: 'ENEMY3',
  life: 50, 
};

let enemy4 = {
  name: 'ENEMY4',
  life: 50, 
};

let enemy5 = {
  name: 'ENEMY5',
  life: 50, 
};


let expirationTimeRem = new Date(Date.now() + 60000);


let progressMarker = {
  previousFrame: '/page2',
  backButton:1,
  inventorySlot1: 0,
  inventorySlot2: 0,
  inventorySlot3: 0,
  deathFrame: '/page12',
  
};



type FarcasterID = string;
type CurrentFrame = string;
type DeathtFrame = string;
type TimerWatch = number;
let farcasterid: FarcasterID = '20359';
let currentframe: CurrentFrame = 'page2';
let deathFrame: DeathtFrame = '/page12';
let timerWatch: TimerWatch = 17172627846293;

interface DataItem {
  fid: string;
  lastknownframe: string;
  deathpos: string;
  health: number; // Assuming 'health' is a number, adjust type if necessary
  stopWatch: number;
  // Add other properties if there are any
}

async function addData(farcasterid: FarcasterID, currentframe: CurrentFrame) {
  const url = 'https://gpzytjchmkcglwzkxcrc.supabase.co/rest/v1/warpcastertest'; // Ensure this is the correct endpoint

  const data = {
    fid: farcasterid,
    lastknownframe: currentframe,

  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA', // Replace 'your_api_key_here' with your actual API key
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA' // Replace 'your_token_here' with your actual token
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update data');
    }

    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : null;

    console.log('Data updated successfully:', responseData);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating data:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}


// Function to fetch data
async function fetchData(): Promise<DataItem[]> {
  const url = 'https://gpzytjchmkcglwzkxcrc.supabase.co/rest/v1/warpcastertest'; // Ensure this is the correct endpoint

  const response = await fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA', // Replace 'your_api_key_here' with your actual API key
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA' // Replace 'your_token_here' with your actual token
      },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return await response.json();
}




async function updateData(farcasterid: FarcasterID, currentframe: CurrentFrame, deathFrame: DeathtFrame, timerWatch: TimerWatch) {
  // Construct the URL using template literals
  const url = `https://gpzytjchmkcglwzkxcrc.supabase.co/rest/v1/warpcastertest?fid=eq.${farcasterid}`;
   console.log(url);
  const data = {
    //fid : farcasterid,
    lastknownframe: currentframe,
    deathpos: deathFrame,
    stopWatch: timerWatch,
  };

  try {
    const response = await fetch(url, {
      method: 'PATCH', // Use PATCH method for updating
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA', // Replace with your actual API key
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdwenl0amNobWtjZ2x3emt4Y3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc5NDEyNzMsImV4cCI6MjAyMzUxNzI3M30.pX9wyf_-ctCHCk0cz-gpsEg9HP-mer9A3_1m-DjSOvA' // Replace with your actual token
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Failed to update data');
    }

    // Check if the response body is empty before attempting to parse it as JSON
    const responseText = await response.text();
    const responseData = responseText ? JSON.parse(responseText) : null;

    console.log('Data updated successfully:', responseData);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error updating data:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}



/*updateData(farcasterid, currentframe, deathFrame, timerWatch)
      .then(() => {
        console.log('Data updated successfully');
        
      })
      .catch((error) => {
        console.error('Error updating data:', error.message);
      });*/





app.frame('/', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/QmR64JNRBrsTVUrs5X6yBuLpki24T3cczZm9BuH7bYzmoh';
        intents = [
           
           <Button action="/page1">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});



app.frame('/page1', async (c) => {

  const { buttonValue, inputText, status, frameData, verified } = c;


  const { fid } = frameData || {};
  farcasterid = fid !== undefined ? String(fid) : farcasterid;// Use existing farcasterid if fid is undefined
  console.log('real id is:', farcasterid);

  try {
    const data: DataItem[] = await fetchData();
    const firstItem = data[0];
    

    const item = data.find((item: DataItem) => item.fid === farcasterid);

    if (item) {
      // Update Health with the score of the found item
      //let Health = item.health;
      //console.log('Farcaster health:', Health);

      let lastFrame = item.lastknownframe;
      let lastdeathpos = item.deathpos;
      timerWatch = item.stopWatch;
      progressMarker = { ...progressMarker, previousFrame: lastFrame };
      progressMarker = { ...progressMarker, deathFrame: lastdeathpos };


    } else {
      console.log('Item not found for the specified farcasterid');
      await addData(farcasterid, currentframe);
      console.log('Data added successfully');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
  
  return c.res({
    image: 'https://gateway.pinata.cloud/ipfs/QmamtUacznG4DtgZ6ZgddBXnKsHwKUi8SNTFAGpiGXfB4S',
    intents: [
      //<Button action={enemy1.name}>Continue</Button>, // example of how to pass a variable to the button
      <Button action={`/${progressMarker.previousFrame}`}>Continue</Button>,
    ],
  });
});


app.frame('/page2', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/QmbErT6exboPQCKGBmGQJEj4mhVvLcaeTWAJvXyPphHAap';
        intents = [
           
           <Button action="/page3">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page3', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/QmaELoQWJHoaRCLWJbE8goucGCD42quW48wBvSV37YvZmm';
        intents = [
           
           <Button action="/page4">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page4', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/QmWNY7uf9c6UQmv5umMGjZXfiRMZJrooMmm93rMdFL62Ki';
        intents = [
           
           <Button action="/page5">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page5', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/QmP6spNzah7NmDyXhNoJeD9brJ7AbJs4VTFt5kMn5WcBCT';
        intents = [
           
           <Button action="/page6">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page6', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/Qmekn6SchHFwGQKSru4zaADkKfXg74UGb9Xvqu72zCdVEj';
        intents = [
           
           <Button action="/page7">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page7', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/QmaXtQRhdxSTQnjHnSGTHW4LmZod2XZAwfUV3a7K6hkcQe';
        intents = [
           
           <Button action="/page8">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page8', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/QmfGagmvfELCgQ2XjsKFLYmH9MvvjikpkwV7MWHBMEzEXX';
        intents = [
           
           <Button action="/page9">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page9', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/QmbYH9fW2h3gtbqYSLhoHvk2rZALHoVYrBkXqJymPsjM9c';
        intents = [
           
           <Button action="/page10">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page10', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/Qmbgk5Hx1ix6NCDtbitpnkXuCyQNo9sgtVeQR4UdUzCcYy';
        intents = [
           
           <Button action="/page11">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page11', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/QmRjfi7vdiPspvf98GPjLqy5qELqcqrujWiAGVNBvoUAYC';
        intents = [
           
           <Button action="/page12">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page12', (c) => {
    let image;
    let intents;
    currentframe = "level12";

    updateData(farcasterid, currentframe, deathFrame, timerWatch)
    .then(() => {
      console.log('Data updated successfully');
      console.log(farcasterid)
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });

        image = 'https://gateway.pinata.cloud/ipfs/QmcatkS7Lw31jW8a2GBqGRBUResWMyryjTrLpXEvzrS641';
        intents = [
           
           <Button action="/battle1">Fight</Button>,
           <Button action="/trap1">Flee</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});



app.frame('/showPlayerStatus', (c) => {
    let image: string;
    let intents: JSX.Element[] = [];

    // Check the different combinations of inventory slots
    if (progressMarker.inventorySlot1 === 1 && progressMarker.inventorySlot2 === 1 && progressMarker.inventorySlot3 === 1) {
        image = 'https://gateway.pinata.cloud/ipfs/QmfNerwFzgrmxy6VijLGamzpdKubNaK42npPUaNxHSZurW';
    } else if (progressMarker.inventorySlot1 === 1 && progressMarker.inventorySlot2 === 0 && progressMarker.inventorySlot3 === 1) {
        image = 'https://gateway.pinata.cloud/ipfs/QmfSd5kndQoHDqGnzSocHAen1jbWy2d6W1M9PoFCFpVWsM';
    } else if (progressMarker.inventorySlot1 === 0 && progressMarker.inventorySlot2 === 1 && progressMarker.inventorySlot3 === 1) {
        image = 'https://gateway.pinata.cloud/ipfs/QmZn57vyWprfyEK9nbkbgAWUmsYyFT3JeTMsGG2RoRfP6Q';
    } else if (progressMarker.inventorySlot1 === 1 && progressMarker.inventorySlot2 === 1 && progressMarker.inventorySlot3 === 0) {
        image = 'https://gateway.pinata.cloud/ipfs/QmViozrZ1YHyNfMpPGCJQ5dus2wXrA8oxwJiFyYMGsdvTn';
    } else if (progressMarker.inventorySlot1 === 1 && progressMarker.inventorySlot2 === 0 && progressMarker.inventorySlot3 === 0) {
        image = 'https://gateway.pinata.cloud/ipfs/QmXMyuj3Nc6RYEbaHHwDtmFNmFCw4Rid6tunBGxjzyp9mx';
    } else if (progressMarker.inventorySlot1 === 0 && progressMarker.inventorySlot2 === 1 && progressMarker.inventorySlot3 === 0) {
        image = 'https://gateway.pinata.cloud/ipfs/QmWWiJuyKX2q7QopT3Ug8NtgRQdkvKZT3MvsrFPkmtuJM4';
    } else if (progressMarker.inventorySlot1 === 0 && progressMarker.inventorySlot2 === 0 && progressMarker.inventorySlot3 === 1) {
        image = 'https://gateway.pinata.cloud/ipfs/QmQEqpEiKjakiro1xudf6FwDxoWsf1z7SmiMeU25G36AuX';
    } else {
        // Default case where all inventory slots are 0 or any unexpected combination
        image = 'https://gateway.pinata.cloud/ipfs/QmatyUPpccdoYX9eELzF1ApFPNpkHoH4Dp8NAdCT7rfdjQ';
    }

    // Add buttons based on inventory slots
    if (progressMarker.inventorySlot1 === 1) {
        intents.push(<Button action="/mysticpotionused">Mystic Potion</Button>);
    }
    if (progressMarker.inventorySlot2 === 1) {
        intents.push(<Button action="/medickitused">Medic Kit</Button>);
    }
    if (progressMarker.inventorySlot3 === 1) {
        intents.push(<Button action="/tinkererbombused">Tinkerers Bomb</Button>);
    }
    if (progressMarker.backButton === 1) {
        intents.push(<Button action={progressMarker.previousFrame}>Close</Button>);
    }

    return c.res({
        image: (
            <div
                style={{
                    position: 'relative',  // Set the container to relative positioning
                    height: '100vh',
                    background: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    src={image}
                    alt="Status Image"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',  // Ensure the image covers the entire container
                    }}
                />
                <p style={{ fontSize: '38px', margin: '0', marginTop: '-514px', color: 'green', textAlign: 'right', marginRight: '-892px', fontWeight: 'bold' }}>
                    {player.life}
                </p>
            </div>
        ),
        intents: intents
    });
});










app.frame('/fleedeath', (c) => {
  //UPDATE SERVER WITH TIMEGATE AND OTHER STATS
  expirationTimeRem = new Date(Date.now() + 69);
  
  timerWatch = expirationTimeRem.setMinutes(expirationTimeRem.getMinutes() + 2);;

  updateData(farcasterid, currentframe, deathFrame, timerWatch)
    .then(() => {
      console.log('Data updated successfully');
      
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });

  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmXLyWwoj4ubmoaMkUnfJPi7h8EyFKTFBxuNXbPY3mkXf1',
  
    
    intents: [
     
      <Button action="/timegate">Continue</Button>,
     
    ],
  }) 

});





//////////////////////////////////////////////////////////////
//batle system

app.frame('/battle1', (c) => {
    let image;
    let intents;


   progressMarker = { ...progressMarker, previousFrame: '/battle1' };


    if (player.specials === 0) {
      
        image = 'https://gateway.pinata.cloud/ipfs/QmYxN6UJJER3U24RrEUQuKCpyWP4c3uo2ikEN3zCHErBM3';
        intents = [<Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmYxN6UJJER3U24RrEUQuKCpyWP4c3uo2ikEN3zCHErBM3';
        intents = [<Button action="/SwiftAttack">SwiftAtk</Button>,<Button action="/HeavyAttack">PowerAtk</Button>,<Button action="/specialAttack">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/fight2', (c) => {
    let image;
    let intents;
    const fightRandomImage = Math.floor(Math.random() * 3);

   progressMarker = { ...progressMarker, previousFrame: '/fight2' };


    if (player.specials === 0) {
      //player has no special attack

        if (fightRandomImage < 1) {

          image = 'https://gateway.pinata.cloud/ipfs/QmR8kC4gUEWHxAKwvMJxsz6km43vNyNFaq7rT7edktbGxL';
          intents = [<Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage === 1) {
          image = 'https://gateway.pinata.cloud/ipfs/Qmeej7fcEzjimVYuvLLaNkqKJw8LE4G4P29THcFKkFfWyj';
          intents = [<Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://gateway.pinata.cloud/ipfs/QmRVPUNzsD7nMPNNFR3zVsc3x4KhtpeyJxzBfbNZ1zK4d4';
          intents = [<Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
        
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmRVPUNzsD7nMPNNFR3zVsc3x4KhtpeyJxzBfbNZ1zK4d4';
        intents = [<Button action="/SwiftAttack">SwiftAtk</Button>,<Button action="/HeavyAttack">PowerAtk</Button>,<Button action="/specialAttack">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


    }

    return c.res({
        image: image,
        intents: intents
    });
});



app.frame('/SwiftAttack', (c) => {
    let image;
    let intents;

    const swiftRandomNum = Math.floor(Math.random() * 8);
    const swiftRandomMiss = Math.floor(Math.random() * 3);


    if (swiftRandomNum < 3) {
        // glancing blow
        enemy1.life -= 7

        if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmSLsUjxkrjqSsqNKrmPaaiEu4qygSR8MtrehgLHcdbfbc';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative2">Continue</Button>];


        }
        


    } else if (swiftRandomNum === 3) {
      // attack missed
      if (swiftRandomMiss < 1) {
        image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
        intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

      } else {

        image = 'https://gateway.pinata.cloud/ipfs/QmV5oZgViyiw6cihQtwP2ZFyD8WJRqFkjL1TgsYxN1gQdp';
        intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

      }



    } else if (swiftRandomNum === 4) {
      //critical hit
      enemy1.life -= 28

      if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQpk4VqwCCgoMN9P5RSW2jaLDtyTrR7C2q3gE5p5vNMNj';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative2">Continue</Button>];


        }
      

    } else {
        // normal attack
        enemy1.life -= 14

        if (enemy1.life > 0) {
          //enemy is still alive

            if (swiftRandomMiss < 1) {
              image = 'https://gateway.pinata.cloud/ipfs/QmViDE4Th6MB5REsZA144cKgJWmhAMfkAehh89UHEiVVog';
              intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

            }else if (swiftRandomMiss === 1) {

              image = 'https://gateway.pinata.cloud/ipfs/QmQZ8zgwBEZCyBWvbXo7JUWPzLu5wGPzU4f9kauxgmjAje';
              intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

            } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmcTZnXczFqYX14rdrfnj3aZ54ULBB9sRUkopsQe4kSeNB';
              intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

            }

          

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative2">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});




app.frame('/HeavyAttack', (c) => {
    let image;
    let intents;


    const heavyRandomNum = Math.floor(Math.random() * 10);
    const heavyRandomMiss = Math.floor(Math.random() * 2);


    if (heavyRandomNum < 4) {
        // glancing blow
        enemy1.life -= 10

        if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmSLsUjxkrjqSsqNKrmPaaiEu4qygSR8MtrehgLHcdbfbc';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative2">Continue</Button>];


        }
        


    } else if (heavyRandomNum === 4) {
        // attack missed
        // attack missed
        if (heavyRandomMiss < 1) {
          image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {

          image = 'https://gateway.pinata.cloud/ipfs/QmV5oZgViyiw6cihQtwP2ZFyD8WJRqFkjL1TgsYxN1gQdp';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        }

    } else if (heavyRandomNum === 5) {
          // attack missed
          if (heavyRandomMiss < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
            intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

          } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmV5oZgViyiw6cihQtwP2ZFyD8WJRqFkjL1TgsYxN1gQdp';
            intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

          }


    } else if (heavyRandomNum === 6) {
      //critical hit
      enemy1.life -= 40

      if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQpk4VqwCCgoMN9P5RSW2jaLDtyTrR7C2q3gE5p5vNMNj';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative2">Continue</Button>];


        }      

    } else {
        // normal attack
        enemy1.life -= 20

        if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQh9GBmb654DzCciGBDCN2L5doaMJxs7npuWJMkHZt8Zp';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative2">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/specialAttack', (c) => {
    let image;
    let intents;
    player.specials -=1
   
    const specialRandomNum = Math.floor(Math.random() * 8);

    const specialRandomMiss = Math.floor(Math.random() * 2);
    //progressMarker = { ...progressMarker, previousFrame: '/specialAttack' };


    if (specialRandomNum < 3) {
        //unsuccessful special attack 

        if (specialRandomMiss < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmV4Mvd7Vx8mHrYsxJkuhYNxohC5x9ZPo2Bib5Dx5AokEQ';
            intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmVT2zFLdm7WXYqnhZ63UmtadikPYJ9viYS2YqiWxpGk5G';
            intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        }
              

    } else {
        // successful special attack
        enemy1.life -= 25

        if (enemy1.life > 0) {
          //enemy is still alive

          if (specialRandomMiss < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmWzb6y1NoNRts5H776dshNVkrmFJcYVtvaxAQ7U7A7jsB';
            intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

          } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmdEHVWZsR9XDbuoYnKdU2qkFTPA9iyVHDBFv6r5E237Kq';
              intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

          }


        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative2">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});






app.frame('/dodgeResult', (c) => {
    let image;
    let intents;

    //progressMarker = { ...progressMarker, previousFrame: '/dodgeResult' };
    const dodgeRandomNum = Math.floor(Math.random() * 10);


    if (dodgeRandomNum < 6) {
        // player dodged
        image = 'https://gateway.pinata.cloud/ipfs/QmWfFCDtRMe6wPv9K7gkDtHSNt9GpAvkw247pxPoeJELvt';
        intents = [<Button action="/fight2">Continue</Button>];

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmRnjewER2GNLSwyrZcqDrd4AzMSkhRddJBDCeAnZS6mac';
          intents = [<Button action="/fight2">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/page12' };
          deathFrame = "/page12";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmQXehPigXANi1MQHTXVsWi5PL4oBA9mC2jtmA6sk2WPQM';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/counterResult', (c) => {
    let image;
    let intents;

   
    const counterRandomNum = Math.floor(Math.random() * 10);


    if (counterRandomNum < 4) {
        // succesful counter
        enemy1.life -= 10
        
        if (enemy1.life > 0) {
          //show counter frame

          image = 'https://gateway.pinata.cloud/ipfs/QmPKbeqxXhFTWA6YFfSetPYjRzqEtTbSFL7rnqw5qUjnpp';
          intents = [<Button action="/fight2">Continue</Button>];

        } else {
          // enemy is dead
          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative2">Continue</Button>];

        }
        

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmRnjewER2GNLSwyrZcqDrd4AzMSkhRddJBDCeAnZS6mac';
          intents = [<Button action="/fight2">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/page12' };
          deathFrame = "/page12";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmQXehPigXANi1MQHTXVsWi5PL4oBA9mC2jtmA6sk2WPQM';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});





  /////////////////////////////////////////////////////////////////////////////////////////////////////
  //trap system

app.frame('/trap1', (c) => {
    let image;
    let intents;
    progressMarker = { ...progressMarker, previousFrame: '/trap1' };


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`trap1, Crossbow Attack`} </p>
              
            </div>
        );
        intents = [
           
           <Button action="/dodgeCrossbow">Dodge</Button>,
           <Button action="/fleeCrossbow">Flee</Button>,
           <Button action="/showPlayerStatus">Status</Button>,
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});




app.frame('/dodgeCrossbow', (c) => {

  let image;
  let intents;
  let dodgeBowNum;


  dodgeBowNum = Math.floor(Math.random() * 10);  // Assign value without redeclaring


  if (dodgeBowNum < 5) {
    //fail
    player.life -= 10
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Failed Trap`} </p>
              
            </div>
        );

          if (player.life > 1) {
            //player is stil alive after failing
            intents = [<Button action="/narrative1">Continue</Button>];

          } else {
            //player is dead
            progressMarker = { ...progressMarker, deathFrame: '/page12' };
            deathFrame = "/page12";
            currentframe = "checktime";
            intents = [<Button action="/trapwounded">Continue</Button>];
          }
    
  } else {
    //victory
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Succeded against Trap`} </p>
              
            </div>
        );
    intents = [<Button action="/narrative1">Continue</Button>];

  }

  return c.res({
    image: image,
    intents: intents
  });

});


app.frame('/fleeCrossbow', (c) => {

  let image;
  let intents;
  let fleeBowNum;


  fleeBowNum = Math.floor(Math.random() * 10);  // Assign value without redeclaring


  if (fleeBowNum < 5) {
    //fail
    player.life -= 10
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Failed fleeing`} </p>
              
            </div>
        );

          if (player.life > 1) {
            //player is stil alive after failing
            intents = [<Button action="/narrative1">Continue</Button>];

          } else {
            //player is dead
            progressMarker = { ...progressMarker, deathFrame: '/page12' };
            deathFrame = "/page12";
            currentframe = "checktime";
            intents = [<Button action="/trapwounded">Continue</Button>];
          }
    

  } else {
    //victory
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Succeded fleeing`} </p>
              
            </div>
        );
    intents = [<Button action="/narrative1">Continue</Button>];

  }

  return c.res({
    image: image,
    intents: intents
  });

});













app.frame('/trapwounded', (c) => {
    let image;
    let intents;

    //UPDATE SERVER WITH TIMEGATE AND OTHER STATS
    expirationTimeRem = new Date(Date.now() + 69);
    
    timerWatch = expirationTimeRem.setMinutes(expirationTimeRem.getMinutes() + 2);

      updateData(farcasterid, currentframe, deathFrame, timerWatch)
      .then(() => {
        console.log('Data updated successfully');
        
      })
      .catch((error) => {
        console.error('Error updating data:', error.message);
      });

        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Badly wounded from trap`} </p>
              
            </div>
        );
        intents = [
           
           <Button action="/timegate">Continue</Button>,

           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});







  //////////////////////////////////////////////////////////////////////////////////////





  app.frame('/narrative1', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Narrative 1`} </p>
              
            </div>
        );
        intents = [
           
           <Button action="/narrative2">Left Path</Button>,
           <Button action="/narrative3">Right path</Button>,
           
        ];


        return c.res({
           
            image: image,
            intents: intents
        });
    });


  ////////////////////////////////////////////////////////////////////////////
  //narrative 3 entire line



app.frame('/narrative3', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Narrative 3`} </p>
              
            </div>
        );
        intents = [
           
           <Button action="/battle3">Continue</Button>,
           
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});



//////////////////////////////////////////////////////////////
//batle3 system

app.frame('/battle3', (c) => {
    let image;
    let intents;


   progressMarker = { ...progressMarker, previousFrame: '/battle3' };


    if (player.specials === 0) {
      
        image = 'https://gateway.pinata.cloud/ipfs/QmYxN6UJJER3U24RrEUQuKCpyWP4c3uo2ikEN3zCHErBM3';
        intents = [<Button action="/SwiftAttack3">Swift Attack</Button>,<Button action="/HeavyAttack3">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmYxN6UJJER3U24RrEUQuKCpyWP4c3uo2ikEN3zCHErBM3';
        intents = [<Button action="/SwiftAttack3">SwiftAtk</Button>,<Button action="/HeavyAttack3">PowerAtk</Button>,<Button action="/specialAttack3">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/fight2-3', (c) => {
    let image;
    let intents;
    const fightRandomImage3 = Math.floor(Math.random() * 3);

   progressMarker = { ...progressMarker, previousFrame: '/fight2-3' };


    if (player.specials === 0) {
      //player has no special attack

        if (fightRandomImage3 < 1) {

          image = 'https://gateway.pinata.cloud/ipfs/QmR8kC4gUEWHxAKwvMJxsz6km43vNyNFaq7rT7edktbGxL';
          intents = [<Button action="/SwiftAttack3">Swift Attack</Button>,<Button action="/HeavyAttack3">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage3 === 1) {
          image = 'https://gateway.pinata.cloud/ipfs/Qmeej7fcEzjimVYuvLLaNkqKJw8LE4G4P29THcFKkFfWyj';
          intents = [<Button action="/SwiftAttack3">Swift Attack</Button>,<Button action="/HeavyAttack3">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://gateway.pinata.cloud/ipfs/QmRVPUNzsD7nMPNNFR3zVsc3x4KhtpeyJxzBfbNZ1zK4d4';
          intents = [<Button action="/SwiftAttack3">Swift Attack</Button>,<Button action="/HeavyAttack3">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
        
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmRVPUNzsD7nMPNNFR3zVsc3x4KhtpeyJxzBfbNZ1zK4d4';
        intents = [<Button action="/SwiftAttack3">SwiftAtk</Button>,<Button action="/HeavyAttack3">PowerAtk</Button>,<Button action="/specialAttack3">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


    }

    return c.res({
        image: image,
        intents: intents
    });
});



app.frame('/SwiftAttack3', (c) => {
    let image;
    let intents;

    const swiftRandomNum3 = Math.floor(Math.random() * 8);
    const swiftRandomMiss3 = Math.floor(Math.random() * 3);


    if (swiftRandomNum3 < 3) {
        // glancing blow
        enemy3.life -= 7

        if (enemy3.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmSLsUjxkrjqSsqNKrmPaaiEu4qygSR8MtrehgLHcdbfbc';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative5">Continue</Button>];


        }
        


    } else if (swiftRandomNum3 === 3) {
      // attack missed
      if (swiftRandomMiss3 < 1) {
        image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
        intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

      } else {

        image = 'https://gateway.pinata.cloud/ipfs/QmV5oZgViyiw6cihQtwP2ZFyD8WJRqFkjL1TgsYxN1gQdp';
        intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

      }



    } else if (swiftRandomNum3 === 4) {
      //critical hit
      enemy3.life -= 28

      if (enemy3.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQpk4VqwCCgoMN9P5RSW2jaLDtyTrR7C2q3gE5p5vNMNj';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative5">Continue</Button>];


        }
      

    } else {
        // normal attack
        enemy3.life -= 14

        if (enemy3.life > 0) {
          //enemy is still alive

            if (swiftRandomMiss3 < 1) {
              image = 'https://gateway.pinata.cloud/ipfs/QmViDE4Th6MB5REsZA144cKgJWmhAMfkAehh89UHEiVVog';
              intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

            }else if (swiftRandomMiss3 === 1) {

              image = 'https://gateway.pinata.cloud/ipfs/QmQZ8zgwBEZCyBWvbXo7JUWPzLu5wGPzU4f9kauxgmjAje';
              intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

            } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmcTZnXczFqYX14rdrfnj3aZ54ULBB9sRUkopsQe4kSeNB';
              intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

            }

          

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative5">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});




app.frame('/HeavyAttack3', (c) => {
    let image;
    let intents;


    const heavyRandomNum3 = Math.floor(Math.random() * 10);
    const heavyRandomMiss3 = Math.floor(Math.random() * 2);


    if (heavyRandomNum3 < 4) {
        // glancing blow
        enemy3.life -= 10

        if (enemy3.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmSLsUjxkrjqSsqNKrmPaaiEu4qygSR8MtrehgLHcdbfbc';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative5">Continue</Button>];


        }
        


    } else if (heavyRandomNum3 === 4) {
        // attack missed
        if (heavyRandomMiss3 < 1) {
          image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {

          image = 'https://gateway.pinata.cloud/ipfs/QmV5oZgViyiw6cihQtwP2ZFyD8WJRqFkjL1TgsYxN1gQdp';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        }

    } else if (heavyRandomNum3 === 5) {
          // attack missed
          if (heavyRandomMiss3 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
            intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

          } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmV5oZgViyiw6cihQtwP2ZFyD8WJRqFkjL1TgsYxN1gQdp';
            intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

          }


    } else if (heavyRandomNum3 === 6) {
      //critical hit
      enemy3.life -= 40

      if (enemy3.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQpk4VqwCCgoMN9P5RSW2jaLDtyTrR7C2q3gE5p5vNMNj';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative5">Continue</Button>];


        }      

    } else {
        // normal attack
        enemy3.life -= 20

        if (enemy3.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQh9GBmb654DzCciGBDCN2L5doaMJxs7npuWJMkHZt8Zp';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative5">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/specialAttack3', (c) => {
    let image;
    let intents;
    player.specials -=1
   
    const specialRandomNum3 = Math.floor(Math.random() * 8);

    const specialRandomMiss3 = Math.floor(Math.random() * 2);
    //progressMarker = { ...progressMarker, previousFrame: '/specialAttack' };


    if (specialRandomNum3 < 3) {
        //unsuccessful special attack 

        if (specialRandomMiss3 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmV4Mvd7Vx8mHrYsxJkuhYNxohC5x9ZPo2Bib5Dx5AokEQ';
            intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmVT2zFLdm7WXYqnhZ63UmtadikPYJ9viYS2YqiWxpGk5G';
            intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        }
              

    } else {
        // successful special attack
        enemy3.life -= 25

        if (enemy3.life > 0) {
          //enemy is still alive

          if (specialRandomMiss3 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmWzb6y1NoNRts5H776dshNVkrmFJcYVtvaxAQ7U7A7jsB';
            intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

          } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmdEHVWZsR9XDbuoYnKdU2qkFTPA9iyVHDBFv6r5E237Kq';
              intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

          }


        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative5">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});






app.frame('/dodgeResult3', (c) => {
    let image;
    let intents;

    //progressMarker = { ...progressMarker, previousFrame: '/dodgeResult' };
    const dodgeRandomNum3 = Math.floor(Math.random() * 10);


    if (dodgeRandomNum3 < 6) {
        // player dodged
        image = 'https://gateway.pinata.cloud/ipfs/QmWfFCDtRMe6wPv9K7gkDtHSNt9GpAvkw247pxPoeJELvt';
        intents = [<Button action="/fight2-3">Continue</Button>];

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmRnjewER2GNLSwyrZcqDrd4AzMSkhRddJBDCeAnZS6mac';
          intents = [<Button action="/fight2-3">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/page12' };
          deathFrame = "/narrative3";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmQXehPigXANi1MQHTXVsWi5PL4oBA9mC2jtmA6sk2WPQM';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/counterResult3', (c) => {
    let image;
    let intents;

   
    const counterRandomNum3 = Math.floor(Math.random() * 10);


    if (counterRandomNum3 < 4) {
        // succesful counter
        enemy3.life -= 10
        

        if (enemy3.life > 0) {
          //show counter frame

          image = 'https://gateway.pinata.cloud/ipfs/QmPKbeqxXhFTWA6YFfSetPYjRzqEtTbSFL7rnqw5qUjnpp';
          intents = [<Button action="/fight2-3">Continue</Button>];

        } else {
          // enemy is dead
          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative5">Continue</Button>];

        }
        

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmRnjewER2GNLSwyrZcqDrd4AzMSkhRddJBDCeAnZS6mac';
          intents = [<Button action="/fight2-3">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/page12' };
          deathFrame = "/narrative3";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmQXehPigXANi1MQHTXVsWi5PL4oBA9mC2jtmA6sk2WPQM';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});



  /////////////////////////////////////////////////////////////////////////////////////////////////////


app.frame('/narrative5', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Narrative 5`} </p>
              
            </div>
        );
        intents = [
           
           <Button action="/battle5">Fight</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});





//////////////////////////////////////////////////////////////
//batle5 system

app.frame('/battle5', (c) => {
    let image;
    let intents;


   progressMarker = { ...progressMarker, previousFrame: '/battle5' };


    if (player.specials === 0) {
      
        image = 'https://gateway.pinata.cloud/ipfs/QmYxN6UJJER3U24RrEUQuKCpyWP4c3uo2ikEN3zCHErBM3';
        intents = [<Button action="/SwiftAttack5">Swift Attack</Button>,<Button action="/HeavyAttack5">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmYxN6UJJER3U24RrEUQuKCpyWP4c3uo2ikEN3zCHErBM3';
        intents = [<Button action="/SwiftAttack5">SwiftAtk</Button>,<Button action="/HeavyAttack5">PowerAtk</Button>,<Button action="/specialAttack5">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/fight2-5', (c) => {
    let image;
    let intents;
    const fightRandomImage5 = Math.floor(Math.random() * 3);

   progressMarker = { ...progressMarker, previousFrame: '/fight2-5' };


    if (player.specials === 0) {
      //player has no special attack

        if (fightRandomImage5 < 1) {

          image = 'https://gateway.pinata.cloud/ipfs/QmR8kC4gUEWHxAKwvMJxsz6km43vNyNFaq7rT7edktbGxL';
          intents = [<Button action="/SwiftAttack5">Swift Attack</Button>,<Button action="/HeavyAttack5">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage5 === 1) {
          image = 'https://gateway.pinata.cloud/ipfs/Qmeej7fcEzjimVYuvLLaNkqKJw8LE4G4P29THcFKkFfWyj';
          intents = [<Button action="/SwiftAttack5">Swift Attack</Button>,<Button action="/HeavyAttack5">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://gateway.pinata.cloud/ipfs/QmRVPUNzsD7nMPNNFR3zVsc3x4KhtpeyJxzBfbNZ1zK4d4';
          intents = [<Button action="/SwiftAttack5">Swift Attack</Button>,<Button action="/HeavyAttack5">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
        
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmRVPUNzsD7nMPNNFR3zVsc3x4KhtpeyJxzBfbNZ1zK4d4';
        intents = [<Button action="/SwiftAttack5">SwiftAtk</Button>,<Button action="/HeavyAttack5">PowerAtk</Button>,<Button action="/specialAttack5">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


    }

    return c.res({
        image: image,
        intents: intents
    });
});



app.frame('/SwiftAttack5', (c) => {
    let image;
    let intents;

    const swiftRandomNum5 = Math.floor(Math.random() * 8);
    const swiftRandomMiss5 = Math.floor(Math.random() * 3);


    if (swiftRandomNum5 < 3) {
        // glancing blow
        enemy5.life -= 7

        if (enemy5.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmSLsUjxkrjqSsqNKrmPaaiEu4qygSR8MtrehgLHcdbfbc';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative6">Continue</Button>];


        }
        


    } else if (swiftRandomNum5 === 3) {
      // attack missed
      if (swiftRandomMiss5 < 1) {
        image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
        intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

      } else {

        image = 'https://gateway.pinata.cloud/ipfs/QmV5oZgViyiw6cihQtwP2ZFyD8WJRqFkjL1TgsYxN1gQdp';
        intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

      }



    } else if (swiftRandomNum5 === 4) {
      //critical hit
      enemy5.life -= 28

      if (enemy5.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQpk4VqwCCgoMN9P5RSW2jaLDtyTrR7C2q3gE5p5vNMNj';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative6">Continue</Button>];


        }
      

    } else {
        // normal attack
        enemy5.life -= 14

        if (enemy5.life > 0) {
          //enemy is still alive

            if (swiftRandomMiss5 < 1) {
              image = 'https://gateway.pinata.cloud/ipfs/QmViDE4Th6MB5REsZA144cKgJWmhAMfkAehh89UHEiVVog';
              intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

            }else if (swiftRandomMiss5 === 1) {

              image = 'https://gateway.pinata.cloud/ipfs/QmQZ8zgwBEZCyBWvbXo7JUWPzLu5wGPzU4f9kauxgmjAje';
              intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

            } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmcTZnXczFqYX14rdrfnj3aZ54ULBB9sRUkopsQe4kSeNB';
              intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

            }

          

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative6">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});




app.frame('/HeavyAttack5', (c) => {
    let image;
    let intents;


    const heavyRandomNum5 = Math.floor(Math.random() * 10);
    const heavyRandomMiss5 = Math.floor(Math.random() * 2);


    if (heavyRandomNum5 < 4) {
        // glancing blow
        enemy5.life -= 10

        if (enemy5.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmSLsUjxkrjqSsqNKrmPaaiEu4qygSR8MtrehgLHcdbfbc';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative6">Continue</Button>];


        }
        


    } else if (heavyRandomNum5 === 4) {
        // attack missed
        if (heavyRandomMiss5 < 1) {
          image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {

          image = 'https://gateway.pinata.cloud/ipfs/QmV5oZgViyiw6cihQtwP2ZFyD8WJRqFkjL1TgsYxN1gQdp';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        }

    } else if (heavyRandomNum5 === 5) {
          // attack missed
          if (heavyRandomMiss5 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
            intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

          } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmV5oZgViyiw6cihQtwP2ZFyD8WJRqFkjL1TgsYxN1gQdp';
            intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

          }


    } else if (heavyRandomNum5 === 6) {
      //critical hit
      enemy5.life -= 40

      if (enemy5.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQpk4VqwCCgoMN9P5RSW2jaLDtyTrR7C2q3gE5p5vNMNj';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative6">Continue</Button>];


        }      

    } else {
        // normal attack
        enemy5.life -= 20

        if (enemy5.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQh9GBmb654DzCciGBDCN2L5doaMJxs7npuWJMkHZt8Zp';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative6">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/specialAttack5', (c) => {
    let image;
    let intents;
    player.specials -=1
   
    const specialRandomNum5 = Math.floor(Math.random() * 8);

    const specialRandomMiss5 = Math.floor(Math.random() * 2);
    //progressMarker = { ...progressMarker, previousFrame: '/specialAttack' };


    if (specialRandomNum5 < 3) {
        //unsuccessful special attack 

        if (specialRandomMiss5 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmV4Mvd7Vx8mHrYsxJkuhYNxohC5x9ZPo2Bib5Dx5AokEQ';
            intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmVT2zFLdm7WXYqnhZ63UmtadikPYJ9viYS2YqiWxpGk5G';
            intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        }
              

    } else {
        // successful special attack
        enemy5.life -= 25

        if (enemy5.life > 0) {
          //enemy is still alive

          if (specialRandomMiss5 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmWzb6y1NoNRts5H776dshNVkrmFJcYVtvaxAQ7U7A7jsB';
            intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

          } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmdEHVWZsR9XDbuoYnKdU2qkFTPA9iyVHDBFv6r5E237Kq';
              intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

          }


        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative6">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});






app.frame('/dodgeResult5', (c) => {
    let image;
    let intents;

    //progressMarker = { ...progressMarker, previousFrame: '/dodgeResult' };
    const dodgeRandomNum5 = Math.floor(Math.random() * 10);


    if (dodgeRandomNum5 < 6) {
        // player dodged
        image = 'https://gateway.pinata.cloud/ipfs/QmWfFCDtRMe6wPv9K7gkDtHSNt9GpAvkw247pxPoeJELvt';
        intents = [<Button action="/fight2-5">Continue</Button>];

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmRnjewER2GNLSwyrZcqDrd4AzMSkhRddJBDCeAnZS6mac';
          intents = [<Button action="/fight2-5">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative5' };
          deathFrame = "/narrative5";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmQXehPigXANi1MQHTXVsWi5PL4oBA9mC2jtmA6sk2WPQM';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/counterResult5', (c) => {
    let image;
    let intents;

   
    const counterRandomNum5 = Math.floor(Math.random() * 10);


    if (counterRandomNum5 < 4) {
        // succesful counter
        enemy5.life -= 10
        
        if (enemy5.life > 0) {
          //show counter frame

          image = 'https://gateway.pinata.cloud/ipfs/QmPKbeqxXhFTWA6YFfSetPYjRzqEtTbSFL7rnqw5qUjnpp';
          intents = [<Button action="/fight2-5">Continue</Button>];

        } else {
          // enemy is dead
          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative6">Continue</Button>];

        }
        

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmRnjewER2GNLSwyrZcqDrd4AzMSkhRddJBDCeAnZS6mac';
          intents = [<Button action="/fight2-5">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative5' };
          deathFrame = "/narrative5";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmQXehPigXANi1MQHTXVsWi5PL4oBA9mC2jtmA6sk2WPQM';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});



  /////////////////////////////////////////////////////////////////////////////////////////////////////
























  ////////////////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  //narrative2 entire line




app.frame('/narrative2', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Narrative 2`} </p>
              
            </div>
        );
        intents = [
           
           <Button action="/trap2">Option1</Button>,
           <Button action="/battle2">Option2</Button>,
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});



/////////////////////////////////////////////////////////////////////////////////////////////////////
//trap system 2

app.frame('/trap2', (c) => {
    let image;
    let intents;
    progressMarker = { ...progressMarker, previousFrame: '/trap2' };

        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`trap2, Currently unkown`} </p>
              
            </div>
        );
        intents = [
           
           <Button action="/option1">Dodge</Button>,
           <Button action="/option2">Flee</Button>,
           <Button action="/showPlayerStatus">Status</Button>,
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});




app.frame('/option1', (c) => {

  let image;
  let intents;
  let trap2opt1Num;


  trap2opt1Num = Math.floor(Math.random() * 10);  // Assign value without redeclaring


  if (trap2opt1Num < 5) {
    //fail
    player.life -= 10
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Failed Trap`} </p>
              
            </div>
        );

          if (player.life > 1) {
            //player is stil alive after failing
            intents = [<Button action="/trap3">Continue</Button>];

          } else {
            //player is dead
            progressMarker = { ...progressMarker, deathFrame: '/narrative2' };
            deathFrame = "/narrative2";
            currentframe = "checktime";
            intents = [<Button action="/trapwounded">Continue</Button>];
          }
    
  } else {
    //victory
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Succeded against Trap`} </p>
              
            </div>
        );
    intents = [<Button action="/trap3">Continue</Button>];

  }

  return c.res({
    image: image,
    intents: intents
  });

});


app.frame('/option2', (c) => {

  let image;
  let intents;
  let trap2option2Num;


  trap2option2Num = Math.floor(Math.random() * 10);  // Assign value without redeclaring


  if (trap2option2Num < 5) {
    //fail
    player.life -= 10
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Failed fleeing`} </p>
              
            </div>
        );

          if (player.life > 1) {
            //player is stil alive after failing
            intents = [<Button action="/narrative4">Continue</Button>];

          } else {
            //player is dead
            progressMarker = { ...progressMarker, deathFrame: '/narrative2' };
            deathFrame = "/narrative2";
            currentframe = "checktime";
            intents = [<Button action="/trapwounded">Continue</Button>];
          }
    

  } else {
    //victory
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Succeded fleeing`} </p>
              
            </div>
        );
    intents = [<Button action="/narrative4">Continue</Button>];

  }

  return c.res({
    image: image,
    intents: intents
  });

});

////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
//trap system 3

app.frame('/trap3', (c) => {
    let image;
    let intents;
    progressMarker = { ...progressMarker, previousFrame: '/trap3' };

        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Trap3, Also Currently unkown`} </p>
              
            </div>
        );
        intents = [
           
           <Button action="/trap3Option">Dodge</Button>,
           <Button action="/showPlayerStatus">Status</Button>,
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});




app.frame('/trap3Option', (c) => {

  let image;
  let intents;
  let trap3num;


  trap3num = Math.floor(Math.random() * 10);  // Assign value without redeclaring


  if (trap3num < 5) {
    //fail
    player.life -= 10
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Failed Trap 3`} </p>
              
            </div>
        );

          if (player.life > 1) {
            //player is stil alive after failing
            intents = [<Button action="/battle4">Continue</Button>];

          } else {
            //player is dead
            progressMarker = { ...progressMarker, deathFrame: '/trap2' };
            deathFrame = "/trap2";
            currentframe = "checktime";
            intents = [<Button action="/trapwounded">Continue</Button>];
          }
    
  } else {
    //victory
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Succeded against Trap 3`} </p>
              
            </div>
        );
    intents = [<Button action="/battle4">Continue</Button>];

  }

  return c.res({
    image: image,
    intents: intents
  });

});





///////////////////////////////////////////////////////////////////////////////////////////////

app.frame('/narrative4', (c) => {
    let image;
    let intents;
    progressMarker = { ...progressMarker, previousFrame: '/narrative4' };

        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Narrative 4`} </p>
              
            </div>
        );
        intents = [
           
           <Button action="/battle4">choice1</Button>,
           <Button action="/battle5">choice2</Button>,
           <Button action="/showPlayerStatus">Status</Button>,
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});




//////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
//battle2 system

app.frame('/battle2', (c) => {
    let image;
    let intents;


   progressMarker = { ...progressMarker, previousFrame: '/battle2' };


    if (player.specials === 0) {
      
        image = 'https://gateway.pinata.cloud/ipfs/QmYxN6UJJER3U24RrEUQuKCpyWP4c3uo2ikEN3zCHErBM3';
        intents = [<Button action="/SwiftAttack2">Swift Attack</Button>,<Button action="/HeavyAttack2">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmYxN6UJJER3U24RrEUQuKCpyWP4c3uo2ikEN3zCHErBM3';
        intents = [<Button action="/SwiftAttack2">SwiftAtk</Button>,<Button action="/HeavyAttack2">PowerAtk</Button>,<Button action="/specialAttack2">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/fight2-2', (c) => {
    let image;
    let intents;
    const fightRandomImage2 = Math.floor(Math.random() * 3);

   progressMarker = { ...progressMarker, previousFrame: '/fight2-2' };


    if (player.specials === 0) {
      //player has no special attack

        if (fightRandomImage2 < 1) {

          image = 'https://gateway.pinata.cloud/ipfs/QmR8kC4gUEWHxAKwvMJxsz6km43vNyNFaq7rT7edktbGxL';
          intents = [<Button action="/SwiftAttack2">Swift Attack</Button>,<Button action="/HeavyAttack2">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage2 === 1) {
          image = 'https://gateway.pinata.cloud/ipfs/Qmeej7fcEzjimVYuvLLaNkqKJw8LE4G4P29THcFKkFfWyj';
          intents = [<Button action="/SwiftAttack2">Swift Attack</Button>,<Button action="/HeavyAttack2">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://gateway.pinata.cloud/ipfs/QmRVPUNzsD7nMPNNFR3zVsc3x4KhtpeyJxzBfbNZ1zK4d4';
          intents = [<Button action="/SwiftAttack2">Swift Attack</Button>,<Button action="/HeavyAttack2">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
        
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmRVPUNzsD7nMPNNFR3zVsc3x4KhtpeyJxzBfbNZ1zK4d4';
        intents = [<Button action="/SwiftAttack2">SwiftAtk</Button>,<Button action="/HeavyAttack2">PowerAtk</Button>,<Button action="/specialAttack2">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


    }

    return c.res({
        image: image,
        intents: intents
    });
});



app.frame('/SwiftAttack2', (c) => {
    let image;
    let intents;

    const swiftRandomNum2 = Math.floor(Math.random() * 8);
    const swiftRandomMiss2 = Math.floor(Math.random() * 3);


    if (swiftRandomNum2 < 3) {
        // glancing blow
        enemy2.life -= 7

        if (enemy2.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmSLsUjxkrjqSsqNKrmPaaiEu4qygSR8MtrehgLHcdbfbc';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative5">Continue</Button>];


        }
        


    } else if (swiftRandomNum2 === 3) {
      // attack missed
      if (swiftRandomMiss2 < 1) {
        image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
        intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

      } else {

        image = 'https://gateway.pinata.cloud/ipfs/QmV5oZgViyiw6cihQtwP2ZFyD8WJRqFkjL1TgsYxN1gQdp';
        intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

      }



    } else if (swiftRandomNum2 === 4) {
      //critical hit
      enemy2.life -= 28

      if (enemy2.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQpk4VqwCCgoMN9P5RSW2jaLDtyTrR7C2q3gE5p5vNMNj';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative5">Continue</Button>];


        }
      

    } else {
        // normal attack
        enemy2.life -= 14

        if (enemy2.life > 0) {
          //enemy is still alive

            if (swiftRandomMiss2 < 1) {
              image = 'https://gateway.pinata.cloud/ipfs/QmViDE4Th6MB5REsZA144cKgJWmhAMfkAehh89UHEiVVog';
              intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

            }else if (swiftRandomMiss2 === 1) {

              image = 'https://gateway.pinata.cloud/ipfs/QmQZ8zgwBEZCyBWvbXo7JUWPzLu5wGPzU4f9kauxgmjAje';
              intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

            } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmcTZnXczFqYX14rdrfnj3aZ54ULBB9sRUkopsQe4kSeNB';
              intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

            }

          

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative5">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});




app.frame('/HeavyAttack2', (c) => {
    let image;
    let intents;


    const heavyRandomNum2 = Math.floor(Math.random() * 10);
    const heavyRandomMiss2 = Math.floor(Math.random() * 2);


    if (heavyRandomNum2 < 4) {
        // glancing blow
        enemy2.life -= 10

        if (enemy2.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmSLsUjxkrjqSsqNKrmPaaiEu4qygSR8MtrehgLHcdbfbc';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative5">Continue</Button>];


        }
        


    } else if (heavyRandomNum2 === 4) {
        // attack missed
        if (heavyRandomMiss2 < 1) {
          image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {

          image = 'https://gateway.pinata.cloud/ipfs/QmV5oZgViyiw6cihQtwP2ZFyD8WJRqFkjL1TgsYxN1gQdp';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        }

    } else if (heavyRandomNum2 === 5) {
          // attack missed
          if (heavyRandomMiss2 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
            intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

          } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmV5oZgViyiw6cihQtwP2ZFyD8WJRqFkjL1TgsYxN1gQdp';
            intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

          }


    } else if (heavyRandomNum2 === 6) {
      //critical hit
      enemy2.life -= 40

      if (enemy2.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQpk4VqwCCgoMN9P5RSW2jaLDtyTrR7C2q3gE5p5vNMNj';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative5">Continue</Button>];


        }      

    } else {
        // normal attack
        enemy2.life -= 20

        if (enemy2.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQh9GBmb654DzCciGBDCN2L5doaMJxs7npuWJMkHZt8Zp';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative5">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/specialAttack2', (c) => {
    let image;
    let intents;
    player.specials -=1
   
    const specialRandomNum2 = Math.floor(Math.random() * 8);

    const specialRandomMiss2 = Math.floor(Math.random() * 2);
    //progressMarker = { ...progressMarker, previousFrame: '/specialAttack' };


    if (specialRandomNum2 < 3) {
        //unsuccessful special attack 

        if (specialRandomMiss2 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmV4Mvd7Vx8mHrYsxJkuhYNxohC5x9ZPo2Bib5Dx5AokEQ';
            intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmVT2zFLdm7WXYqnhZ63UmtadikPYJ9viYS2YqiWxpGk5G';
            intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        }
              

    } else {
        // successful special attack
        enemy2.life -= 25

        if (enemy2.life > 0) {
          //enemy is still alive

          if (specialRandomMiss2 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmWzb6y1NoNRts5H776dshNVkrmFJcYVtvaxAQ7U7A7jsB';
            intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

          } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmdEHVWZsR9XDbuoYnKdU2qkFTPA9iyVHDBFv6r5E237Kq';
              intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

          }


        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative5">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});






app.frame('/dodgeResult2', (c) => {
    let image;
    let intents;

    //progressMarker = { ...progressMarker, previousFrame: '/dodgeResult' };
    const dodgeRandomNum2 = Math.floor(Math.random() * 10);


    if (dodgeRandomNum2 < 6) {
        // player dodged
        image = 'https://gateway.pinata.cloud/ipfs/QmWfFCDtRMe6wPv9K7gkDtHSNt9GpAvkw247pxPoeJELvt';
        intents = [<Button action="/fight2-2">Continue</Button>];

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmRnjewER2GNLSwyrZcqDrd4AzMSkhRddJBDCeAnZS6mac';
          intents = [<Button action="/fight2-2">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative2' };
          deathFrame = "/narrative2";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmQXehPigXANi1MQHTXVsWi5PL4oBA9mC2jtmA6sk2WPQM';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/counterResult2', (c) => {
    let image;
    let intents;

   
    const counterRandomNum2 = Math.floor(Math.random() * 10);


    if (counterRandomNum2 < 4) {
        // succesful counter
        enemy2.life -= 10
        
        if (enemy2.life > 0) {
          //show counter frame

          image = 'https://gateway.pinata.cloud/ipfs/QmPKbeqxXhFTWA6YFfSetPYjRzqEtTbSFL7rnqw5qUjnpp';
          intents = [<Button action="/fight2-2">Continue</Button>];

        } else {
          // enemy is dead
          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative5">Continue</Button>];

        }
        

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmRnjewER2GNLSwyrZcqDrd4AzMSkhRddJBDCeAnZS6mac';
          intents = [<Button action="/fight2-2">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative2' };
          deathFrame = "/narrative2";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmQXehPigXANi1MQHTXVsWi5PL4oBA9mC2jtmA6sk2WPQM';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});



  /////////////////////////////////////////////////////////////////////////////////////////////////////


//battle4 system

app.frame('/battle4', (c) => {
    let image;
    let intents;


   progressMarker = { ...progressMarker, previousFrame: '/battle4' };


    if (player.specials === 0) {
      
        image = 'https://gateway.pinata.cloud/ipfs/QmYxN6UJJER3U24RrEUQuKCpyWP4c3uo2ikEN3zCHErBM3';
        intents = [<Button action="/SwiftAttack4">Swift Attack</Button>,<Button action="/HeavyAttack4">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmYxN6UJJER3U24RrEUQuKCpyWP4c3uo2ikEN3zCHErBM3';
        intents = [<Button action="/SwiftAttack4">SwiftAtk</Button>,<Button action="/HeavyAttack4">PowerAtk</Button>,<Button action="/specialAttack4">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/fight2-4', (c) => {
    let image;
    let intents;
    const fightRandomImage4 = Math.floor(Math.random() * 3);

   progressMarker = { ...progressMarker, previousFrame: '/fight2-4' };


    if (player.specials === 0) {
      //player has no special attack

        if (fightRandomImage4 < 1) {

          image = 'https://gateway.pinata.cloud/ipfs/QmR8kC4gUEWHxAKwvMJxsz6km43vNyNFaq7rT7edktbGxL';
          intents = [<Button action="/SwiftAttack4">Swift Attack</Button>,<Button action="/HeavyAttack4">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage4 === 1) {
          image = 'https://gateway.pinata.cloud/ipfs/Qmeej7fcEzjimVYuvLLaNkqKJw8LE4G4P29THcFKkFfWyj';
          intents = [<Button action="/SwiftAttack4">Swift Attack</Button>,<Button action="/HeavyAttack4">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://gateway.pinata.cloud/ipfs/QmRVPUNzsD7nMPNNFR3zVsc3x4KhtpeyJxzBfbNZ1zK4d4';
          intents = [<Button action="/SwiftAttack4">Swift Attack</Button>,<Button action="/HeavyAttack4">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
        
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmRVPUNzsD7nMPNNFR3zVsc3x4KhtpeyJxzBfbNZ1zK4d4';
        intents = [<Button action="/SwiftAttack4">SwiftAtk</Button>,<Button action="/HeavyAttack4">PowerAtk</Button>,<Button action="/specialAttack4">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


    }

    return c.res({
        image: image,
        intents: intents
    });
});



app.frame('/SwiftAttack4', (c) => {
    let image;
    let intents;

    const swiftRandomNum4 = Math.floor(Math.random() * 8);
    const swiftRandomMiss4 = Math.floor(Math.random() * 3);


    if (swiftRandomNum4 < 3) {
        // glancing blow
        enemy4.life -= 7

        if (enemy4.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmSLsUjxkrjqSsqNKrmPaaiEu4qygSR8MtrehgLHcdbfbc';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative6">Continue</Button>];


        }
        


    } else if (swiftRandomNum4 === 3) {
      // attack missed
      if (swiftRandomMiss4 < 1) {
        image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
        intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

      } else {

        image = 'https://gateway.pinata.cloud/ipfs/QmV5oZgViyiw6cihQtwP2ZFyD8WJRqFkjL1TgsYxN1gQdp';
        intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

      }



    } else if (swiftRandomNum4 === 4) {
      //critical hit
      enemy4.life -= 28

      if (enemy4.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQpk4VqwCCgoMN9P5RSW2jaLDtyTrR7C2q3gE5p5vNMNj';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative6">Continue</Button>];


        }
      

    } else {
        // normal attack
        enemy4.life -= 14

        if (enemy4.life > 0) {
          //enemy is still alive

            if (swiftRandomMiss4 < 1) {
              image = 'https://gateway.pinata.cloud/ipfs/QmViDE4Th6MB5REsZA144cKgJWmhAMfkAehh89UHEiVVog';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

            }else if (swiftRandomMiss4 === 1) {

              image = 'https://gateway.pinata.cloud/ipfs/QmQZ8zgwBEZCyBWvbXo7JUWPzLu5wGPzU4f9kauxgmjAje';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

            } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmcTZnXczFqYX14rdrfnj3aZ54ULBB9sRUkopsQe4kSeNB';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

            }

          

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative6">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});




app.frame('/HeavyAttack4', (c) => {
    let image;
    let intents;


    const heavyRandomNum4 = Math.floor(Math.random() * 10);
    const heavyRandomMiss4 = Math.floor(Math.random() * 2);


    if (heavyRandomNum4 < 4) {
        // glancing blow
        enemy4.life -= 10

        if (enemy4.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmSLsUjxkrjqSsqNKrmPaaiEu4qygSR8MtrehgLHcdbfbc';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative6">Continue</Button>];


        }
        


    } else if (heavyRandomNum4 === 4) {
        // attack missed
        if (heavyRandomMiss4 < 1) {
          image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {

          image = 'https://gateway.pinata.cloud/ipfs/QmV5oZgViyiw6cihQtwP2ZFyD8WJRqFkjL1TgsYxN1gQdp';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        }

    } else if (heavyRandomNum4 === 5) {
          // attack missed
          if (heavyRandomMiss4 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmbZ964voi8yRCcyzaBWgVqxKYNrYUbzLCyoPPSWzaw2J7';
            intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

          } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmV5oZgViyiw6cihQtwP2ZFyD8WJRqFkjL1TgsYxN1gQdp';
            intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

          }


    } else if (heavyRandomNum4 === 6) {
      //critical hit
      enemy4.life -= 40

      if (enemy4.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQpk4VqwCCgoMN9P5RSW2jaLDtyTrR7C2q3gE5p5vNMNj';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative6">Continue</Button>];


        }      

    } else {
        // normal attack
        enemy4.life -= 20

        if (enemy4.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQh9GBmb654DzCciGBDCN2L5doaMJxs7npuWJMkHZt8Zp';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative6">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/specialAttack4', (c) => {
    let image;
    let intents;
    player.specials -=1
   
    const specialRandomNum4 = Math.floor(Math.random() * 8);

    const specialRandomMiss4 = Math.floor(Math.random() * 2);
    //progressMarker = { ...progressMarker, previousFrame: '/specialAttack' };


    if (specialRandomNum4 < 3) {
        //unsuccessful special attack 

        if (specialRandomMiss4 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmV4Mvd7Vx8mHrYsxJkuhYNxohC5x9ZPo2Bib5Dx5AokEQ';
            intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmVT2zFLdm7WXYqnhZ63UmtadikPYJ9viYS2YqiWxpGk5G';
            intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        }
              

    } else {
        // successful special attack
        enemy4.life -= 25

        if (enemy4.life > 0) {
          //enemy is still alive

          if (specialRandomMiss4 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmWzb6y1NoNRts5H776dshNVkrmFJcYVtvaxAQ7U7A7jsB';
            intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

          } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmdEHVWZsR9XDbuoYnKdU2qkFTPA9iyVHDBFv6r5E237Kq';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

          }


        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative6">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});






app.frame('/dodgeResult4', (c) => {
    let image;
    let intents;

    //progressMarker = { ...progressMarker, previousFrame: '/dodgeResult' };
    const dodgeRandomNum4 = Math.floor(Math.random() * 10);


    if (dodgeRandomNum4 < 6) {
        // player dodged
        image = 'https://gateway.pinata.cloud/ipfs/QmWfFCDtRMe6wPv9K7gkDtHSNt9GpAvkw247pxPoeJELvt';
        intents = [<Button action="/fight2-4">Continue</Button>];

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmRnjewER2GNLSwyrZcqDrd4AzMSkhRddJBDCeAnZS6mac';
          intents = [<Button action="/fight2-4">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative4' };
          deathFrame = "/narrative4";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmQXehPigXANi1MQHTXVsWi5PL4oBA9mC2jtmA6sk2WPQM';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/counterResult4', (c) => {
    let image;
    let intents;

   
    const counterRandomNum4 = Math.floor(Math.random() * 10);


    if (counterRandomNum4 < 4) {
        // succesful counter
        enemy4.life -= 10
        
        if (enemy4.life > 0) {
          //show counter frame

          image = 'https://gateway.pinata.cloud/ipfs/QmPKbeqxXhFTWA6YFfSetPYjRzqEtTbSFL7rnqw5qUjnpp';
          intents = [<Button action="/fight2-4">Continue</Button>];

        } else {
          // enemy is dead
          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative6">Continue</Button>];

        }
        

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmRnjewER2GNLSwyrZcqDrd4AzMSkhRddJBDCeAnZS6mac';
          intents = [<Button action="/fight2-4">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative4' };
          deathFrame = "/narrative4";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmQXehPigXANi1MQHTXVsWi5PL4oBA9mC2jtmA6sk2WPQM';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});



  /////////////////////////////////////////////////////////////////////////////////////////////////////



























////////////////////////////////////////////////////////////
//TIME GATING SYSTEM

app.frame('/timegate', (c) => {
    // Update player object to indicate that time has been gated
    
    player.timegated += 1

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the time when the gate will expire (e.g., add 1 minute)
    const expirationTime = new Date(currentDate.getTime() + 600000); // 60000 milliseconds = 1 minute

        // Extract hour, minute, and second components from the expiration time
    const expirationHour = expirationTime.getHours();
    const expirationMinute = expirationTime.getMinutes();
    const expirationSecond = expirationTime.getSeconds();

    const expirationTimeString = `${expirationHour}:${expirationMinute}:${expirationSecond}`;

    expirationTimeRem = new Date(Date.now() + 69);
    expirationTimeRem.setMinutes(expirationTimeRem.getMinutes() + 1); // Add one hour
    



    player = { ...player, timeremaining: expirationTimeString };

    // Return a response with the updated player object and expiration time
    return c.res({
        image: 'https://gateway.pinata.cloud/ipfs/QmNkJ6EzaPvVu33x8rQiJR1DmBJLAPfxS9mmrHW1DCUQi8',
        intents: [
            <Button action="/checktime">Continue</Button>,
        ],
        //player: updatedPlayer,
        //expirationTime: expirationTime.toISOString() // Store expiration time as a string
    });
});



//this function countdowns
app.frame('/checktime', (c) => {
    let image;
    let intents;

    const timeDifference = timerWatch - Date.now();

      if (timeDifference > 0) {

              // Calculate the remaining time by subtracting the current time from the expiration time
              console.log('Time remaining is from table is :',expirationTimeRem.getTime());
              

              console.log('Time subtracted is :',timeDifference);

              // Convert the time difference to hours, minutes, and seconds
              const hoursRemaining = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
              const minutesRemaining = Math.floor((timeDifference / 1000 / 60) % 60);
              const secondsRemaining = Math.floor((timeDifference / 1000) % 60);

              // Format the remaining time as a string
              const expirationTimeString = `${hoursRemaining.toString().padStart(2, '0')}:${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;

                  // Show remaining time
                  image = (
                      <div
                          style={{
                              alignItems: 'center',
                              backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/Qmeh4wiW53885vpLds3znH6W5sXs8c6E9KEDbGJBmrKRC8)',
                              backgroundSize: '100% 100%',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              display: 'flex',
                              flexDirection: 'column',
                              flexWrap: 'nowrap',
                              height: '100%',
                              justifyContent: 'center',
                              textAlign: 'center',
                              width: '100%',
                              color: '#E1A411',
                              fontStyle: 'normal',
                              letterSpacing: '-0.025em',
                              lineHeight: 1.4,
                              marginTop: 0,
                              padding: '0 120px',
                              whiteSpace: 'pre-wrap',
                          }}
                      >
                          <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Player should be fully rested in ${expirationTimeString}`} </p>
                        
                      </div>
                  );

                  intents = [
                      <Button action="/checktime">Refresh Frame</Button>
                  ];
  

        } else {

          player.timegated -= 1
          player.life += 100
          image = (
                      <div
                          style={{
                              alignItems: 'center',
                              backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/Qmeh4wiW53885vpLds3znH6W5sXs8c6E9KEDbGJBmrKRC8)',
                              backgroundSize: '100% 100%',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              display: 'flex',
                              flexDirection: 'column',
                              flexWrap: 'nowrap',
                              height: '100%',
                              justifyContent: 'center',
                              textAlign: 'center',
                              width: '100%',
                              color: '#E1A411',
                              fontStyle: 'normal',
                              letterSpacing: '-0.025em',
                              lineHeight: 1.4,
                              marginTop: 0,
                              padding: '0 120px',
                              whiteSpace: 'pre-wrap',
                          }}
                      >
                          <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Player is fully rested`} </p>
                        
                      </div>
                  );
          intents = [<Button action={progressMarker.deathFrame}>Proceed</Button>];

        }


    return c.res({
        image: image,
        intents: intents
    });
});



/////////////////////////////////////////////////////////////////////////////





app.frame('/narrative6', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Narrative 6`} </p>
              
            </div>
        );
        intents = [
           
           <Button action="/endscene1">Ending1</Button>,
           <Button action="/endscene2">Ending2</Button>,
           <Button action="/endscene3">Ending3</Button>,
           <Button action="/endscene4">Ending4</Button>,
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});




app.frame('/endscene1', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Endscene 1`} </p>
              
            </div>
        );
        intents = [
           
           <Button action="/endscene1">End</Button>,

           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});




app.frame('/endscene2', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Endscene 2`} </p>
              
            </div>
        );
        intents = [
           
           <Button action="/endscene2">End</Button>,

           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});





app.frame('/endscene3', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
               <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Endscene 3`} </p>
              
            </div>
        );
        intents = [
           
           <Button action="/endscene3">End</Button>,

           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});







app.frame('/endscene4', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcvnPFeYRWkH4qPagsDHiom4p2yUrfistTX7HheBPwawM)',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                    color: '#E1A411',
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 0,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                <p style={{ fontSize : '50px', margin : '0', marginTop : '-500', color: 'red'  }}> {`Endscene 4`} </p>
              
            </div>
        );
        intents = [
           
           <Button action="/endscene4">End</Button>,

           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});

























///////////////////////////////////////////////////////////////////////////
app.frame('/choseitem', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/QmT5c8XxCCqqqEAK7wdgYUhj7mPktAm8ePz53trpm76Mug';
        intents = [
           

           <Button.Transaction key="mint" target="/mint">Medic kit</Button.Transaction>,
           <Button.Transaction key="mint" target="/mint2">Mystic Potion</Button.Transaction>,
        ];


    return c.res({
        action: '/startGame',
        image: image,
        intents: intents
    });
});


app.transaction('/mint', (c) => {
  const address = c.address as Address;

  console.log('address', address);
  //console.log('Button', Button.Transaction key);

  return c.contract({
    abi,
    functionName: 'claim',
    args: [
      address, // _receiver
      1n, // _quantity
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // _currency
      0n, // _pricePerToken
      {
        proof: [], // _allowlistProof.proof
        quantityLimitPerWallet: 100n, // _allowlistProof.quantityLimitPerWallet
        pricePerToken: 0n, // _allowlistProof.pricePerToken
        currency: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // _allowlistProof.currency
      }, // _allowlistProof
      '0x', // _data
    ],
    chainId: `eip155:${arbitrum.id}`,
    to: '0x7C5B213CAaf6ebbcB6F1B24a193307261B1F6e69',
  });
});


app.transaction('/mint2', (c) => {
  const address = c.address as Address;

  console.log('address', address);
  return c.contract({
    abi,
    functionName: 'claim',
    args: [
      address, // _receiver
      1n, // _quantity
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // _currency
      0n, // _pricePerToken
      {
        proof: [], // _allowlistProof.proof
        quantityLimitPerWallet: 100n, // _allowlistProof.quantityLimitPerWallet
        pricePerToken: 0n, // _allowlistProof.pricePerToken
        currency: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // _allowlistProof.currency
      }, // _allowlistProof
      '0x', // _data
    ],
    chainId: `eip155:${arbitrum.id}`,
    to: '0x7C5B213CAaf6ebbcB6F1B24a193307261B1F6e69',
  });
});




app.frame('/startGame', (c) => {
   //progressMarker = { ...progressMarker, inventorySlot2: 0 };





  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmXvqsvx2copXefucXBbkA3Z1yMYcTvobBc9ScbhemEQFJ',
  
    
    intents: [
     
      <Button action="/showPlayerStatus">Continue</Button>,
     
    ],
  }) 

});







// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
