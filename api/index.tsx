import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'
import type { Address } from 'viem'
import { arbitrumNova } from 'viem/chains'; // Ensure this import is correct
import { abi } from '../abi.js'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

const arbitrumChain = {
  id: 421614,
  name: 'Arbitrum Sepolia',
  network: 'arbitrum',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: 'https://sepolia-rollup.arbitrum.io/rpc',
  },
  blockExplorers: {
    etherscan: { name: 'Arbiscan', url: 'https://sepolia.arbiscan.io' },
    default: { name: 'Arbiscan', url: 'https://sepolia.arbiscan.io' },
  },
  testnet: true,
};


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
  specials: 3,
  tinkererbombactive: 0,
  hasGem: 0,
  metStranger: 0,
  death: 0,
 
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
  deathFrame: '/page17',
  
};



type FarcasterID = string;
type CurrentFrame = string;
type DeathtFrame = string;
type TimerWatch = number;
let farcasterid: FarcasterID = '20359';
let currentframe: CurrentFrame = 'page2';
let deathFrame: DeathtFrame = '/page17';
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


//QmZzxxKUsyo3WwueRwqLb5D6obMHyTjQ7umS3iZWoTkPgz


app.frame('/', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/QmPGfb1SDvz5qM9ibXt6sr2UpvCK5yKduVoqq6Yfc4hPYq';
        intents = [
           
           <Button action="/page1">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});



app.frame('/page1', async (c) => {
  let image;
  let intents;
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
    image: 'https://gateway.pinata.cloud/ipfs/QmTuEMMDWRkCvGGRr74quvjnZH3vGfZhkUg1HbHpcEujqs',
    intents: [
      //<Button action={enemy1.name}>Continue</Button>, // example of how to pass a variable to the button
      <Button action={`/${progressMarker.previousFrame}`}>Continue</Button>,
    ],
  });
});


app.frame('/page2', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/QmPHukU9yW92rHXzaCK7rzaCpNezn2bHMv8PRqPKwbgWzk';
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


        image = 'https://gateway.pinata.cloud/ipfs/QmTAAhhrrLT8G3MoP5JtoTyeeHEySEi1mZ6DEt6K24L9CA';
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


        image = 'https://gateway.pinata.cloud/ipfs/QmeysSoLVdEGaTN3GtibY5aMinxAQZyJgNaFb72zxHdNPf';
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


        image = 'https://gateway.pinata.cloud/ipfs/QmW7c9DAWLQswZ4LWeWgPFMtNfQPNNsYq1YnYAu7tU41Pt';
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


        image = 'https://gateway.pinata.cloud/ipfs/Qma86ajf9Ypgz7x9ACud3FK8PpLLzXnb4kLvzWTCmCVfR9';
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


        image = 'https://gateway.pinata.cloud/ipfs/QmPXNPXRDrKep4FvgunvmYPgYqtxTjZGFe8xdmnDA445ax';
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


        image = 'https://gateway.pinata.cloud/ipfs/Qmb4gxDGb1i1DE4T1gjcR8hgFvJmUzuGLir6t6vNpPKRru';
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


        image = 'https://gateway.pinata.cloud/ipfs/QmRKDiH5r4wmbrSozVfQDPLGsSi76TnNfmQZJYAmfizLUX';
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


        image = 'https://gateway.pinata.cloud/ipfs/QmUn3xvseCruKD71t6S6WwwqrnUVDf9eGEszF27xF7QhfN';
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


        image = 'https://gateway.pinata.cloud/ipfs/QmbsPZxWgKqtKDLZsC2UbymvgDXeo6rZRcvxhZw8gk2gxE';
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


        image = 'https://gateway.pinata.cloud/ipfs/QmYxdpdWjgNVgzCLv96eLMTHKyDpc3baF8HSBfDh9nK3HR';
        intents = [
           
           <Button action="/page13">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page13', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/Qmah1EN6DLdjhckatDeZFpjmvbADq3U8HVpzNHDXXNkDQS';
        intents = [
           
           <Button action="/page14">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page14', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/QmaisevzgrHs9AephgzsgxZrNeSYVFSuWH7dHQJ6StfZb8';
        intents = [
           
           <Button action="/page15">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page15', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/QmaU4YRpUASHGm7YfCEPwA5Aa2pA66CkyiH4ETHB7naoGu';
        intents = [
           
           <Button.Transaction key="mint" target="/mint">Collect</Button.Transaction>,
           <Button action="/page16">Continue</Button>,
        ];


    return c.res({
        action: '/page16',
        image: image,
        intents: intents
    });
});




app.frame('/page16', (c) => {
    let image;
    let intents;


        image = 'https://gateway.pinata.cloud/ipfs/QmWVvc4fgFDNprYSGB7474zp3rmNSB5Zw9dL2innz2AFmT';
        intents = [
           
           <Button action="/page17">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});







app.frame('/page17', (c) => {
    let image;
    let intents;
    currentframe = "page17";

    /*updateData(farcasterid, currentframe, deathFrame, timerWatch)
    .then(() => {
      console.log('Data updated successfully');
      console.log(farcasterid)
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });*/


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmNck5jritxPS1TJgzWn3oaMNKUTEXV5Y6ToKjb4gijJQk)',
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
                <p style={{ fontSize: '42px', margin: '0', marginTop: '-514px', color: 'green', textAlign: 'right', marginRight: '-892px', fontWeight: 'bold' }}>
                    {player.life}
                </p>
              
            </div>
        );
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
    let image;
    let intents;
    let healthColour;

    if (player.life > 30) {

      healthColour = 'green';

    } else {

      healthColour = 'red';

    }

    console.log(healthColour)


    if (player.specials === 3) {

      if (player.hasGem === 1) {

          // has gem

             image = (
                <div
                    style={{
                        alignItems: 'center',
                        backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmX3xsh5xRREWpciXj2HknNGxyoeUqkNNoKesPMeR1cVUC)',
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

                    <p style={{ fontSize: '70px', margin: '0', marginBottom: '14px', color: healthColour, textAlign: 'right', marginLeft: '-730px', fontWeight: 'bold' }}>
                        {player.life}
                    </p>
                  
                </div>
            );

      } else {
        // doesnt have gem
             image = (
                <div
                    style={{
                        alignItems: 'center',
                        backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmY6r5cvVkPvzUUkstMyawMxRJVzMgDp5KjGZ6oc8oLrXh)',
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
                   <p style={{ fontSize: '70px', margin: '0', marginBottom: '14px', color: healthColour, textAlign: 'right', marginLeft: '-730px', fontWeight: 'bold' }}>
                        {player.life}
                    </p>
                  
                </div>
            );

          }


        intents = [
           
           <Button action={progressMarker.previousFrame}>Continue</Button>,
        ];

    } else if (player.specials === 2) {


         if (player.hasGem === 1) {

          // has gem

             image = (
                <div
                    style={{
                        alignItems: 'center',
                        backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmTJ4FVye2q2rBHUV2rPdFng1VdWBwgw1ABKEif9u3DZhS)',
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

                    <p style={{ fontSize: '70px', margin: '0', marginBottom: '14px', color: healthColour, textAlign: 'right', marginLeft: '-730px', fontWeight: 'bold' }}>
                        {player.life}
                    </p>
                  
                </div>
            );

      } else {
        // doesnt have gem
             image = (
                <div
                    style={{
                        alignItems: 'center',
                        backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmYAZCUfMxRq8r7yHRbtetgeyZMSkTdQ3xLvFNhZfmsAoZ)',
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
                    <p style={{ fontSize: '70px', margin: '0', marginBottom: '14px', color: healthColour, textAlign: 'right', marginLeft: '-730px', fontWeight: 'bold' }}>
                        {player.life}
                    </p>
                  
                </div>
            );

          }

        intents = [
           
           <Button action={progressMarker.previousFrame}>Continue</Button>,
        ];


    } else if (player.specials === 1) {


          if (player.hasGem === 1) {

          // has gem

             image = (
                <div
                    style={{
                        alignItems: 'center',
                        backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/Qmerm3cNCLE7byLN45dEQiEqEtQQPUUKrHq7bUZ7M1t6Zz)',
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

                    <p style={{ fontSize: '70px', margin: '0', marginBottom: '14px', color: healthColour, textAlign: 'right', marginLeft: '-730px', fontWeight: 'bold' }}>
                        {player.life}
                    </p>
                  
                </div>
            );

      } else {
        // doesnt have gem
             image = (
                <div
                    style={{
                        alignItems: 'center',
                        backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmXGMwR8S1jHhbhusJPBj8HrH814y5ZEtXnTEZtd6Fmj3q)',
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
                    <p style={{ fontSize: '70px', margin: '0', marginBottom: '14px', color: healthColour, textAlign: 'right', marginLeft: '-730px', fontWeight: 'bold' }}>
                        {player.life}
                    </p>
                  
                </div>
            );

          }

        intents = [
           
           <Button action={progressMarker.previousFrame}>Continue</Button>,
        ];



    } else {
 
        if (player.hasGem === 1) {

          // has gem

             image = (
                <div
                    style={{
                        alignItems: 'center',
                        backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmeztAkgn6qPDNU4ky7fHZbqx91d74XFyuCGxjqcJC7Dby)',
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

                    <p style={{ fontSize: '70px', margin: '0', marginBottom: '14px', color: healthColour, textAlign: 'right', marginLeft: '-730px', fontWeight: 'bold' }}>
                        {player.life}
                    </p>
                  
                </div>
            );

      } else {
        // doesnt have gem
             image = (
                <div
                    style={{
                        alignItems: 'center',
                        backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcUhfkUouMmGpd8j5z2qVQtvpRZozbiJ9PAof9vaH14eV)',
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
                    <p style={{ fontSize: '70px', margin: '0', marginBottom: '14px', color: healthColour, textAlign: 'right', marginLeft: '-730px', fontWeight: 'bold' }}>
                        {player.life}
                    </p>
                  
                </div>
            );

          }

        intents = [
           
           <Button action={progressMarker.previousFrame}>Continue</Button>,

        ];


    }

    return c.res({
        image: image,
        intents: intents
    });
});













app.frame('/fleedeath', (c) => {
  //UPDATE SERVER WITH TIMEGATE AND OTHER STATS
  expirationTimeRem = new Date(Date.now() + 69);
  
  timerWatch = expirationTimeRem.setMinutes(expirationTimeRem.getMinutes() + 2);

  /*updateData(farcasterid, currentframe, deathFrame, timerWatch)
    .then(() => {
      console.log('Data updated successfully');
      
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });*/

  return c.res({

    
    image : 'https://gateway.pinata.cloud/ipfs/QmPuJUqocdEgbWrrb8B2CG6htYKAbdkdHrwGShSnna1RFz',
  
    
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
      
        image = 'https://gateway.pinata.cloud/ipfs/QmaF6RJPCAimGvc1vRD2i2a8xLPJAwWNHr7N4L7mkW5b3U';
        intents = [<Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmaF6RJPCAimGvc1vRD2i2a8xLPJAwWNHr7N4L7mkW5b3U';
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
    const fightRandomImage = Math.floor(Math.random() * 4);

   progressMarker = { ...progressMarker, previousFrame: '/fight2' };


    if (player.specials === 0) {
      //player has no special attack

        if (fightRandomImage < 1) {

          image = 'https://gateway.pinata.cloud/ipfs/QmdW9mg7ZJT3U2vC4rYjNdFjPvmuGszc2rzsGvAHmEuZjP';
          intents = [<Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage === 1) {
          image = 'https://gateway.pinata.cloud/ipfs/Qmasur9LzzzyuP2ACtM7LuZdDATaATuHCjViLUEungncYp';
          intents = [<Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://gateway.pinata.cloud/ipfs/Qmasur9LzzzyuP2ACtM7LuZdDATaATuHCjViLUEungncYp';
          intents = [<Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
        
    } else {
 
       
        
        if (fightRandomImage < 1) {

          image = 'https://gateway.pinata.cloud/ipfs/QmdW9mg7ZJT3U2vC4rYjNdFjPvmuGszc2rzsGvAHmEuZjP';
          intents = [<Button action="/SwiftAttack">SwiftAtk</Button>,<Button action="/HeavyAttack">PowerAtk</Button>,<Button action="/specialAttack">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage === 1) {
          image = 'https://gateway.pinata.cloud/ipfs/Qmasur9LzzzyuP2ACtM7LuZdDATaATuHCjViLUEungncYp';
          intents = [<Button action="/SwiftAttack">SwiftAtk</Button>,<Button action="/HeavyAttack">PowerAtk</Button>,<Button action="/specialAttack">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://gateway.pinata.cloud/ipfs/Qmasur9LzzzyuP2ACtM7LuZdDATaATuHCjViLUEungncYp';
          intents = [<Button action="/SwiftAttack">SwiftAtk</Button>,<Button action="/HeavyAttack">PowerAtk</Button>,<Button action="/specialAttack">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }

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

          image = 'https://gateway.pinata.cloud/ipfs/QmWftAuEYa3emBjVBpEA4qq8RkRsocxAPBDuCrhtRdKRQe';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmSzG66K5d7RiCLN3LZoMefZi9DrJNbHcsNjmhXh6enbc9';
          intents = [<Button action="/narrative3">Continue</Button>];


        }
        


    } else if (swiftRandomNum === 3) {
      // attack missed
      if (swiftRandomMiss < 1) {
        image = 'https://gateway.pinata.cloud/ipfs/QmS4RuqGL8dTiHNgqhtHGAwe2Mqf4ipkHpLomHsomHyPCP';
        intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

      } else {

        image = 'https://gateway.pinata.cloud/ipfs/QmRcn3BEgxaSBK7mrpPyQoZdEVqWYBqmvdCGj7ubRGcv1Z';
        intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

      }



    } else if (swiftRandomNum === 4) {
      //critical hit
      enemy1.life -= 28

      if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmSr7aYbmg4t6UKjzhizFj1WzsXCu6PehxVb14LKrh7CxM';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

      } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmSzG66K5d7RiCLN3LZoMefZi9DrJNbHcsNjmhXh6enbc9';
          intents = [<Button action="/narrative3">Continue</Button>];


      }
      

    } else {
        // normal attack
        enemy1.life -= 14

        if (enemy1.life > 0) {
          //enemy is still alive

            if (swiftRandomMiss < 1) {
              image = 'https://gateway.pinata.cloud/ipfs/QmVA85GLmm4qMTCyAUGbJoJGYYpv8Bfw8jfr5cqrzgJCFy';
              intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

            }else if (swiftRandomMiss === 1) {

              image = 'https://gateway.pinata.cloud/ipfs/QmYzqr1zm5HNQCEJskbiPbCSjp5Cj7u9BHLyTmuDq8eBso';
              intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

            } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmVA85GLmm4qMTCyAUGbJoJGYYpv8Bfw8jfr5cqrzgJCFy';
              intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

            }

          

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmRnhFP1aAr9FpZaUpDd5mRTtvWDBYC6UE11P7cx368gVy';
          intents = [<Button action="/narrative3">Continue</Button>];


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


    const heavyRandomNum =  Math.floor(Math.random() * 10);
    const heavyRandomMiss = Math.floor(Math.random() * 2);


    if (heavyRandomNum < 4) {
        // glancing blow
        enemy1.life -= 10

        
        if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmWftAuEYa3emBjVBpEA4qq8RkRsocxAPBDuCrhtRdKRQe';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmSzG66K5d7RiCLN3LZoMefZi9DrJNbHcsNjmhXh6enbc9';
          intents = [<Button action="/narrative3">Continue</Button>];


        }

    } else if (heavyRandomNum === 4) {
        // attack missed
        // attack missed
        if (heavyRandomMiss < 1) {
          image = 'https://gateway.pinata.cloud/ipfs/QmS4RuqGL8dTiHNgqhtHGAwe2Mqf4ipkHpLomHsomHyPCP';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {

          image = 'https://gateway.pinata.cloud/ipfs/QmRcn3BEgxaSBK7mrpPyQoZdEVqWYBqmvdCGj7ubRGcv1Z';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        }

    } else if (heavyRandomNum === 5) {
          // attack missed
          if (heavyRandomMiss < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmS4RuqGL8dTiHNgqhtHGAwe2Mqf4ipkHpLomHsomHyPCP';
            intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

          } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmRcn3BEgxaSBK7mrpPyQoZdEVqWYBqmvdCGj7ubRGcv1Z';
            intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

          }


    } else if (heavyRandomNum === 6) {
      //critical hit
      enemy1.life -= 40

      if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmSr7aYbmg4t6UKjzhizFj1WzsXCu6PehxVb14LKrh7CxM';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

      } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmSzG66K5d7RiCLN3LZoMefZi9DrJNbHcsNjmhXh6enbc9';
          intents = [<Button action="/narrative3">Continue</Button>];


      }      

    } else {
        // normal attack
        enemy1.life -= 20

        if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmRFWcqzu3g3GvtwxLQDj2mqh82WEQwoyMFAxZKuKPvaKV';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmSzG66K5d7RiCLN3LZoMefZi9DrJNbHcsNjmhXh6enbc9';
          intents = [<Button action="/narrative3">Continue</Button>];


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
            image = 'https://gateway.pinata.cloud/ipfs/QmS4RuqGL8dTiHNgqhtHGAwe2Mqf4ipkHpLomHsomHyPCP';
            intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmRcn3BEgxaSBK7mrpPyQoZdEVqWYBqmvdCGj7ubRGcv1Z';
            intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        }
              

    } else {
        // successful special attack
        enemy1.life -= 25

        if (enemy1.life > 0) {
          //enemy is still alive

          if (specialRandomMiss < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmR6T1Z1doowM6k5g5J1F8o1cQK772inoBopCdyC4KsyfP';
            intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

          } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmR6T1Z1doowM6k5g5J1F8o1cQK772inoBopCdyC4KsyfP';
              intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

          }


        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmSzG66K5d7RiCLN3LZoMefZi9DrJNbHcsNjmhXh6enbc9';
          intents = [<Button action="/narrative3">Continue</Button>];


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
        image = 'https://gateway.pinata.cloud/ipfs/QmNf4EZfcLG8haCgXXGHCCmFBik9jvNBqrnQpmhqdm8d2n';
        intents = [<Button action="/fight2">Continue</Button>];

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmV2xn7Az2jSr3ndjrfMQd5sXsHQV3TEy8DCTiJAqNkKDw';
          intents = [<Button action="/fight2">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/page17' };
          deathFrame = "/page17";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmX5XwxUQAMRsr49UgqGQVxhJDLcZVqr7DGDRTy7ghUVRd';
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

          image = 'https://gateway.pinata.cloud/ipfs/QmYoHbnQZCeomM2WWBgoMZj7nLrP1r9eP7oDWM2py4VBhb';
          intents = [<Button action="/fight2">Continue</Button>];

        } else {
          // enemy is dead
          image = 'https://gateway.pinata.cloud/ipfs/QmSzG66K5d7RiCLN3LZoMefZi9DrJNbHcsNjmhXh6enbc9';
          intents = [<Button action="/narrative3">Continue</Button>];

        }
        

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmV2xn7Az2jSr3ndjrfMQd5sXsHQV3TEy8DCTiJAqNkKDw';
          intents = [<Button action="/fight2">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/page17' };
          deathFrame = "/page17";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmX5XwxUQAMRsr49UgqGQVxhJDLcZVqr7DGDRTy7ghUVRd';
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
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmdG5e2UNojACV7kpxmSF1sDB27HcVpt29AbPDFMoBhy71)',
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
                
              
            </div>
        );
        intents = [
           
           <Button action="/dodgeCrossbow">Dodge</Button>,
           <Button action="/fleeCrossbow">Flee</Button>,
         
           
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


  dodgeBowNum = 2//Math.floor(Math.random() * 10);  // Assign value without redeclaring


  if (dodgeBowNum < 6) {
    //fail
    player.life -= 100
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmXGVsZeo9JJFFY4JA6HyqVQCtBx1kLWaLeAmWbZCDanUB)',
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
          
              
            </div>
        );

          if (player.life > 1) {
            //player is stil alive after failing
            intents = [<Button action="/narrative1">Continue</Button>];

          } else {
            //player is dead
            progressMarker = { ...progressMarker, deathFrame: '/page17' };
            deathFrame = "/page17";
            currentframe = "checktime";
            intents = [<Button action="/trapwounded">Continue</Button>];
          }
    
  } else {
    //victory
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcdSYonEe1frpwtDVxpkzusMGTyw4oMYRxbvW43SYg1ii)',
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


  if (fleeBowNum < 3) {
    //fail
    player.life -= 10
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmXGVsZeo9JJFFY4JA6HyqVQCtBx1kLWaLeAmWbZCDanUB)',
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
                
              
            </div>
        );

          if (player.life > 1) {
            //player is stil alive after failing
            intents = [<Button action="/narrative1">Continue</Button>];

          } else {
            //player is dead
            progressMarker = { ...progressMarker, deathFrame: '/page17' };
            deathFrame = "/page17";
            currentframe = "checktime";
            intents = [<Button action="/trapwounded">Continue</Button>];
          }
    

  } else {
    //victory
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcdSYonEe1frpwtDVxpkzusMGTyw4oMYRxbvW43SYg1ii)',
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

      /*updateData(farcasterid, currentframe, deathFrame, timerWatch)
      .then(() => {
        console.log('Data updated successfully');
        
      })
      .catch((error) => {
        console.error('Error updating data:', error.message);
      });*/

        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmX5XwxUQAMRsr49UgqGQVxhJDLcZVqr7DGDRTy7ghUVRd)',
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

    progressMarker = { ...progressMarker, previousFrame: '/narrative1' };
        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmQGAodqAWiJoAibRrGgYU5xCzsyUPL8QCeTYc9PRGLNdZ)',
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
               
              
            </div>
        );
        intents = [
           <Button action="/narrative1b">Continue</Button>,
           
           
        ];


        return c.res({
           
            image: image,
            intents: intents
        });
    });

  app.frame('/narrative1b', (c) => {
    let image;
    let intents;

        progressMarker = { ...progressMarker, previousFrame: '/narrative1b' };

        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmR8JwvZ2AKFxGhXMW87ngmFJVJY5JLGRhrYCBgukDWAFN)',
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
               
              
            </div>
        );
        intents = [
           
           

           <Button action="/narrative3">Old Door</Button>,
           <Button action="/narrative2">Abadoned Passage</Button>,
           
           
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

    progressMarker = { ...progressMarker, previousFrame: '/narrative3' };


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmeUkUpZv5Ew5bKTtNvTYV5tXPfZnyAvt8fdPs9AQgwv1T)',
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
              
            </div>
        );
        intents = [
           
          
           <Button action="/narrative3a1">Approach</Button>, 
           <Button action="/narrative3b1">Wait</Button>,
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


////////////////////////////////////////////////////////////
//3b path

app.frame('/narrative3b1', (c) => {
    let image;
    let intents;

    progressMarker = { ...progressMarker, previousFrame: '/narrative3b1' };


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/Qmc6ZRv31T5DiytNFmykyeHEwTREDpFMGzfkMbaNUBDWUt)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/narrative3b2">Stay Hidden</Button>,
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/narrative3b2', (c) => {
    let image;
    let intents;

    progressMarker = { ...progressMarker, previousFrame: '/narrative3b2' };


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmSdApEReFRbmDf1xUECuzRwncuE22usdQejjmVXXebfn3)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/narrative3b3">Follow</Button>,
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/narrative3b3', (c) => {
    let image;
    let intents;

    progressMarker = { ...progressMarker, previousFrame: '/narrative3b3' };


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmX7jesPTb3RsqU5i9cDUzpLy2we8gVey9HxUnM3YJdLso)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/trap3">Continue</Button>,
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


//3b end
/////////////////////

// 3a start

app.frame('/narrative3a1', (c) => {
    let image;
    let intents;

    progressMarker = { ...progressMarker, previousFrame: '/narrative3a1' };


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmT6XJ2nLJCb4gZXS1XEct1Q6i1BXsvgUSJM1AampULnQX)',
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
              
            </div>
        );
        intents = [
           
          
           <Button action="/narrative3a1b">Lie</Button>, 
           <Button action="/narrative3a1a">Tell the truth</Button>,
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});



app.frame('/narrative3a1a', (c) => {
    let image;
    let intents;

    progressMarker = { ...progressMarker, previousFrame: '/narrative3a1a' };


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmQeGTkpfoyLV7bYUzPxCoFiVCn2yb9wfXuVokX5dfK1oL)',
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
              
            </div>
        );
        intents = [
           
          
           <Button action="/narrative3a3">Follow</Button>, 
           <Button action="/narrative3a2">Stay and Search</Button>,
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});





app.frame('/narrative3a3', (c) => {
    let image;
    let intents;

    player.metStranger += 1

    progressMarker = { ...progressMarker, previousFrame: '/narrative3a3' };


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmTN3F4YxSGTrqZC5CHkRgTx3yjiqcFQALoLoJNf6BVZ1W)',
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
              
            </div>
        );
        intents = [
           
          
           <Button action="/trap3">Continue</Button>, 
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});

///

app.frame('/narrative3a1b', (c) => {
    let image;
    let intents;

    progressMarker = { ...progressMarker, previousFrame: '/narrative3a1b' };


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/Qmf4BKfSZ7UJyaac9yaQVxFVoD31WKSuuwAPzsiSWnya25)',
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
              
            </div>
        );
        intents = [
           
          
           <Button action="/narrative3a2">Stay and Search</Button>,
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});




app.frame('/narrative3a2', (c) => {
    let image;
    let intents;


    progressMarker = { ...progressMarker, previousFrame: '/narrative3a2' };


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmevkW6SpYDd32F4X9sYtVS92Ni3NZq6i9su53wVZK26T3)',
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
      
        image = 'https://gateway.pinata.cloud/ipfs/QmYu34gzTF1svqT3sxSZpdSF1UVvsZaYCwzkdi9HP8g7Vs';
        intents = [<Button action="/SwiftAttack3">Swift Attack</Button>,<Button action="/HeavyAttack3">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmYu34gzTF1svqT3sxSZpdSF1UVvsZaYCwzkdi9HP8g7Vs';
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
    const fightRandomImage3 = Math.floor(Math.random() * 4);

   progressMarker = { ...progressMarker, previousFrame: '/fight2-3' };


    if (player.specials === 0) {
      //player has no special attack

        if (fightRandomImage3 < 1) {

          image = 'https://gateway.pinata.cloud/ipfs/QmWgDvPr1Vgf5BFMXGQSucmDWKSFArhLMhMBp7wtaHQK8b';
          intents = [<Button action="/SwiftAttack3">Swift Attack</Button>,<Button action="/HeavyAttack3">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage3 === 1) {
          image = 'https://gateway.pinata.cloud/ipfs/QmWgDvPr1Vgf5BFMXGQSucmDWKSFArhLMhMBp7wtaHQK8b';
          intents = [<Button action="/SwiftAttack3">Swift Attack</Button>,<Button action="/HeavyAttack3">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://gateway.pinata.cloud/ipfs/QmTDCzd3XSv1ggGyKdxs6SxyEGD2fkx5riAkKUnGQJWPPN';
          intents = [<Button action="/SwiftAttack3">Swift Attack</Button>,<Button action="/HeavyAttack3">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
        
    } else {


        if (fightRandomImage3 < 1) {

          image = 'https://gateway.pinata.cloud/ipfs/QmWgDvPr1Vgf5BFMXGQSucmDWKSFArhLMhMBp7wtaHQK8b';
          intents = [<Button action="/SwiftAttack3">SwiftAtk</Button>,<Button action="/HeavyAttack3">PowerAtk</Button>,<Button action="/specialAttack3">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage3 === 1) {
          image = 'https://gateway.pinata.cloud/ipfs/QmWgDvPr1Vgf5BFMXGQSucmDWKSFArhLMhMBp7wtaHQK8b';
          intents = [<Button action="/SwiftAttack3">SwiftAtk</Button>,<Button action="/HeavyAttack3">PowerAtk</Button>,<Button action="/specialAttack3">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://gateway.pinata.cloud/ipfs/QmTDCzd3XSv1ggGyKdxs6SxyEGD2fkx5riAkKUnGQJWPPN';
          intents = [<Button action="/SwiftAttack3">SwiftAtk</Button>,<Button action="/HeavyAttack3">PowerAtk</Button>,<Button action="/specialAttack3">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
         


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
    const swiftRandomMiss3 = Math.floor(Math.random() * 4);


    if (swiftRandomNum3 < 3) {
        // glancing blow
        enemy3.life -= 7

        if (enemy3.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmVwuX45JpHm6FheR7ppsvS2ff7BRAamCSbDuQsQ6UYS6z';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/Qme92iuQNJt3knc8rTqj8mpDS3FUZznaawnUiREY3pZSX4';
          intents = [<Button action="/narrative6">Continue</Button>];


        }
        


    } else if (swiftRandomNum3 === 3) {
      // attack missed
      if (swiftRandomMiss3 < 2) {
        image = 'https://gateway.pinata.cloud/ipfs/Qmd1xz1PUtZUjBKFkqE1tMb5GnEfkVcC3uYwRc1h4dNRLy';
        intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

      } else {

        image = 'https://gateway.pinata.cloud/ipfs/Qmbqb99MrpqaLCusaf9Ard1gfbS9y4UUSKw5cTvAzPT6v7';
        intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

      }



    } else if (swiftRandomNum3 === 4) {
      //critical hit
      enemy3.life -= 28

      if (enemy3.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmSCxgCwWfScCBRr5WowEX8Hi6vQqa2tgGWc4WcKAxvNUS';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/Qme92iuQNJt3knc8rTqj8mpDS3FUZznaawnUiREY3pZSX4';
          intents = [<Button action="/narrative6">Continue</Button>];


        }
      

    } else {
        // normal attack
        enemy3.life -= 14

        if (enemy3.life > 0) {
          //enemy is still alive

            if (swiftRandomMiss3 < 1) {
              image = 'https://gateway.pinata.cloud/ipfs/QmcWF7Bck5aH54Q4jfy8qAWWHS4CEDUiYvrTdH6cU4U8XE';
              intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

            }else if (swiftRandomMiss3 === 1) {

              image = 'https://gateway.pinata.cloud/ipfs/QmcWF7Bck5aH54Q4jfy8qAWWHS4CEDUiYvrTdH6cU4U8XE';
              intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

            } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmeNVDbJ4QqCGx2R3R8cC7V5Vr1oH7igUMR64ow9dow1eW';
              intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

            }

          

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/Qme92iuQNJt3knc8rTqj8mpDS3FUZznaawnUiREY3pZSX4';
          intents = [<Button action="/narrative6">Continue</Button>];


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


    const heavyRandomNum3 = Math.floor(Math.random() * 11);
    const heavyRandomMiss3 = Math.floor(Math.random() * 2);


    if (heavyRandomNum3 < 4) {
        // glancing blow
        enemy3.life -= 10

        if (enemy3.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmVwuX45JpHm6FheR7ppsvS2ff7BRAamCSbDuQsQ6UYS6z';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/Qme92iuQNJt3knc8rTqj8mpDS3FUZznaawnUiREY3pZSX4';
          intents = [<Button action="/narrative6">Continue</Button>];


        }
        


    } else if (heavyRandomNum3 === 4) {
        // attack missed
        if (heavyRandomMiss3 < 1) {
          image = 'https://gateway.pinata.cloud/ipfs/Qmd1xz1PUtZUjBKFkqE1tMb5GnEfkVcC3uYwRc1h4dNRLy';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {

          image = 'https://gateway.pinata.cloud/ipfs/Qmbqb99MrpqaLCusaf9Ard1gfbS9y4UUSKw5cTvAzPT6v7';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        }

    } else if (heavyRandomNum3 === 5) {
          // attack missed
          if (heavyRandomMiss3 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/Qmd1xz1PUtZUjBKFkqE1tMb5GnEfkVcC3uYwRc1h4dNRLy';
            intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

          } else {

            image = 'https://gateway.pinata.cloud/ipfs/Qmbqb99MrpqaLCusaf9Ard1gfbS9y4UUSKw5cTvAzPT6v7';
            intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

          }


    } else if (heavyRandomNum3 === 6) {
      //critical hit
      enemy3.life -= 40

      if (enemy3.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmSCxgCwWfScCBRr5WowEX8Hi6vQqa2tgGWc4WcKAxvNUS';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/Qme92iuQNJt3knc8rTqj8mpDS3FUZznaawnUiREY3pZSX4';
          intents = [<Button action="/narrative6">Continue</Button>];


        }      

    } else {
        // normal attack
        enemy3.life -= 20

        if (enemy3.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmdbMZuEFiDv14efornEaamynboDqbaag48qn5AFGPBPb2';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/Qme92iuQNJt3knc8rTqj8mpDS3FUZznaawnUiREY3pZSX4';
          intents = [<Button action="/narrative6">Continue</Button>];


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
            image = 'https://gateway.pinata.cloud/ipfs/Qmbqb99MrpqaLCusaf9Ard1gfbS9y4UUSKw5cTvAzPT6v7';
            intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {

            image = 'https://gateway.pinata.cloud/ipfs/Qmbqb99MrpqaLCusaf9Ard1gfbS9y4UUSKw5cTvAzPT6v7';
            intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        }
              

    } else {
        // successful special attack
        enemy3.life -= 25

        if (enemy3.life > 0) {
          //enemy is still alive

          if (specialRandomMiss3 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmR6T1Z1doowM6k5g5J1F8o1cQK772inoBopCdyC4KsyfP';
            intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

          } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmR6T1Z1doowM6k5g5J1F8o1cQK772inoBopCdyC4KsyfP';
              intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

          }


        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/Qme92iuQNJt3knc8rTqj8mpDS3FUZznaawnUiREY3pZSX4';
          intents = [<Button action="/narrative6">Continue</Button>];


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
        image = 'https://gateway.pinata.cloud/ipfs/QmZCLzqBKZy1VFYGmAAmdvb47kSzVd3Er3VPo9EuZAGGsp';
        intents = [<Button action="/fight2-3">Continue</Button>];

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmNm79M6aDsZ58NDXDC1xZ1xEsrEdW4vpXM6rWJSLoQKSq';
          intents = [<Button action="/fight2-3">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative3' };
          deathFrame = "/narrative3";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmX5XwxUQAMRsr49UgqGQVxhJDLcZVqr7DGDRTy7ghUVRd';
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

          image = 'https://gateway.pinata.cloud/ipfs/QmdnNeKbLyeVjdJTm1g7BGm7vzcBSkFebWRA398v8ZTZ2C';
          intents = [<Button action="/fight2-3">Continue</Button>];

        } else {
          // enemy is dead
          image = 'https://gateway.pinata.cloud/ipfs/Qme92iuQNJt3knc8rTqj8mpDS3FUZznaawnUiREY3pZSX4';
          intents = [<Button action="/narrative6">Continue</Button>];

        }
        

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmNm79M6aDsZ58NDXDC1xZ1xEsrEdW4vpXM6rWJSLoQKSq';
          intents = [<Button action="/fight2-3">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative3' };
          deathFrame = "/narrative3";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmX5XwxUQAMRsr49UgqGQVxhJDLcZVqr7DGDRTy7ghUVRd';
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

        progressMarker = { ...progressMarker, previousFrame: '/narrative5' };
        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmZvGvuLc8nSDvitjsr586CetHqvroFJp1gEZ6Z2erHFs9)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/drink">Drink</Button>,
           <Button action="/resist">Resist Urge</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});

app.frame('/resist', (c) => {
    let image;
    let intents;

        progressMarker = { ...progressMarker, previousFrame: '/resist' };
        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmNsCg5XkczHG8gw3NYJ7YvvaNB1THbPPXqxjWfhevvD2C)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/drink">Drink</Button>,
           <Button action="/resistb">Resist Urge</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/resistb', (c) => {
    let image;
    let intents;

        progressMarker = { ...progressMarker, previousFrame: '/resistb' };

        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/Qmd6BzdfkTZSGPQy4koaNegXYCCFBQKeciBExoDGFuxdjN)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/battle2">Continue</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/drink', (c) => {
    let image;
    let intents;

        progressMarker = { ...progressMarker, previousFrame: '/drink' };
        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmfBSdaY8MgrwhFWoiJdw5JCMXeDVhGjNi9SWHnuQLyovA)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/vision">Continue</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/vision', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmYtZ5FNWsPnyCKkngsLmm19qVVGKdFLbKqc62xCqUB3PN)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/vision2">Continue</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/vision2', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmVd7EpvYCCzMTxf4n24zZFKtkYsiNmwgQosoDTTUnPQk6)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/vision3">Continue</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/vision3', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmWspG13z1iieYCNsrGWV4a66AeRRwAUULS6a273pKx1ae)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/vision4">Continue</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});



app.frame('/vision4', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmR39aL9cyQrE7wwZTBYGB4R8vJg6zAvSA5V2cLcjSEm7M)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/vision5">Continue</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/vision5', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmbLEKfWTojgNUWcwtgCNKHYGHBcRvnbxjP3wMpZw9nLsm)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/vision6">Continue</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/vision6', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmbMuWQ5pmBXXE11126pD13B8Mab56hHreejHvYzUKp1ij)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/vision7">Continue</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/vision7', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmUCAe9a1Kq2tdbdq45iLHuqgpQN2wktCh5fYR8m9sdpuv)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/vision8">Continue</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/vision8', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmdPEHEaohSqHYkvaYX5VqCG8zTy1Pk13z4cHUhnvwN83g)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/vision9">Continue</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});



app.frame('/vision9', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmQBCnvGMXNLXJRkSnH6fWzKFPr6HoYqxrschMbuAuGshs)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/vision10">Continue</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});




app.frame('/vision10', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmQgddfbxqixWjipo6EWVbHR84AtHWgQnz2bgPGf4EuFUn)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/vision11">Continue</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/vision11', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmZUVL6RhAnTs7qfxaohxV3Dt1SA3AXYFgY6DmyecXiaaD)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/vision12">Continue</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});



app.frame('/vision12', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcMH25boYJQm2U26ny4TADm236naZVxT4kxA1rLowPi92)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/vision13">Continue</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/vision13', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmS1mjc15K2MLAgmsH4Vuhp2jPS1a4AxtEHM1H6vwu11Eb)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/battle2">Continue</Button>,
          
           
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
      
        image = 'https://gateway.pinata.cloud/ipfs/QmZ5xUBres27tMDktKyLsAujeeUrDaWz6SXdBdrewXeJRV';
        intents = [<Button action="/SwiftAttack5">Swift Attack</Button>,<Button action="/HeavyAttack5">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmZ5xUBres27tMDktKyLsAujeeUrDaWz6SXdBdrewXeJRV';
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
    const fightRandomImage5 = Math.floor(Math.random() * 4);

   progressMarker = { ...progressMarker, previousFrame: '/fight2-5' };


    if (player.specials === 0) {
      //player has no special attack

        if (fightRandomImage5 < 1) {

          image = 'https://gateway.pinata.cloud/ipfs/QmNocrw4CUtwF7SqdfWasDBT2pPpHaK4YUxdvkXG7oSMkY';
          intents = [<Button action="/SwiftAttack5">Swift Attack</Button>,<Button action="/HeavyAttack5">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage5 === 1) {
          image = 'https://gateway.pinata.cloud/ipfs/QmNocrw4CUtwF7SqdfWasDBT2pPpHaK4YUxdvkXG7oSMkY';
          intents = [<Button action="/SwiftAttack5">Swift Attack</Button>,<Button action="/HeavyAttack5">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://gateway.pinata.cloud/ipfs/QmRQhGRuGFqhsWuw7RkjxwpfyHWAB8MJ2PunUzRsdKnxDi';
          intents = [<Button action="/SwiftAttack5">Swift Attack</Button>,<Button action="/HeavyAttack5">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
        
    } else {

        if (fightRandomImage5 < 1) {

          image = 'https://gateway.pinata.cloud/ipfs/QmNocrw4CUtwF7SqdfWasDBT2pPpHaK4YUxdvkXG7oSMkY';
           intents = [<Button action="/SwiftAttack5">SwiftAtk</Button>,<Button action="/HeavyAttack5">PowerAtk</Button>,<Button action="/specialAttack5">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


        } else if (fightRandomImage5 === 1) {
          image = 'https://gateway.pinata.cloud/ipfs/QmNocrw4CUtwF7SqdfWasDBT2pPpHaK4YUxdvkXG7oSMkY';
           intents = [<Button action="/SwiftAttack5">SwiftAtk</Button>,<Button action="/HeavyAttack5">PowerAtk</Button>,<Button action="/specialAttack5">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


        } else {
          image = 'https://gateway.pinata.cloud/ipfs/QmRQhGRuGFqhsWuw7RkjxwpfyHWAB8MJ2PunUzRsdKnxDi';
           intents = [<Button action="/SwiftAttack5">SwiftAtk</Button>,<Button action="/HeavyAttack5">PowerAtk</Button>,<Button action="/specialAttack5">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


        }
 

    }

    return c.res({
        image: image,
        intents: intents
    });
});



app.frame('/SwiftAttack5', (c) => {
    let image;
    let intents;

    const swiftRandomNum5 =  Math.floor(Math.random() * 8);
    const swiftRandomMiss5 = Math.floor(Math.random() * 3);


    if (swiftRandomNum5 < 3) {
        // glancing blow
        enemy5.life -= 7

        if (enemy5.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmbwsDLV6EzPBFx44HQx8voDZErUajfgaMQqLTpH69AbDg';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/Qmf885yCN11AHwtvnbjQQ8JpemG4fZgBeUxRy1cmiwboow';
          intents = [<Button action="/scriptedfight">Continue</Button>];


        }
        


    } else if (swiftRandomNum5 === 3) {
      // attack missed
      if (swiftRandomMiss5 < 1) {
        image = 'https://gateway.pinata.cloud/ipfs/QmW2u4m3Q4zJxfVx1dwWn6nfE267bamwB1LEKpS5MDo2fK';
        intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

      } else {

        image = 'https://gateway.pinata.cloud/ipfs/QmUcwYTsriwKafffZQ6nvDDhvW65fyhR5x6iKhh4oe2zVB';
        intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

      }



    } else if (swiftRandomNum5 === 4) {
      //critical hit
      enemy5.life -= 28

      if (enemy5.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmRr6hCrzcFTDAkbhb49so6n9TiXkFJ8Qm4qpc9Dm7o5C6';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/Qmf885yCN11AHwtvnbjQQ8JpemG4fZgBeUxRy1cmiwboow';
          intents = [<Button action="/scriptedfight">Continue</Button>];


        }
      

    } else {
        // normal attack
        enemy5.life -= 14

        if (enemy5.life > 0) {
          //enemy is still alive

            if (swiftRandomMiss5 < 1) {
              image = 'https://gateway.pinata.cloud/ipfs/QmXRUE2j9nvHt65RCxht3x2JCoR6SAmVPtk8LuJM2ydbmt';
              intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

            }else if (swiftRandomMiss5 === 1) {

              image = 'https://gateway.pinata.cloud/ipfs/QmXRUE2j9nvHt65RCxht3x2JCoR6SAmVPtk8LuJM2ydbmt';
              intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

            } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmW4R68D7XHbTbA9RTGayeAeUxeDzHLm5ew4Fhi8HdXVTs';
              intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

            }

          

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/Qmf885yCN11AHwtvnbjQQ8JpemG4fZgBeUxRy1cmiwboow';
          intents = [<Button action="/scriptedfight">Continue</Button>];


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


    const heavyRandomNum5 = Math.floor(Math.random() * 8);
    const heavyRandomMiss5 = Math.floor(Math.random() * 2);


    if (heavyRandomNum5 < 4) {
        // glancing blow
        enemy5.life -= 10

        if (enemy5.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmbwsDLV6EzPBFx44HQx8voDZErUajfgaMQqLTpH69AbDg';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/Qmf885yCN11AHwtvnbjQQ8JpemG4fZgBeUxRy1cmiwboow';
          intents = [<Button action="/scriptedfight">Continue</Button>];


        }
        


    } else if (heavyRandomNum5 === 4) {
        // attack missed
        if (heavyRandomMiss5 < 1) {
          image = 'https://gateway.pinata.cloud/ipfs/QmW2u4m3Q4zJxfVx1dwWn6nfE267bamwB1LEKpS5MDo2fK';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {

          image = 'https://gateway.pinata.cloud/ipfs/QmUcwYTsriwKafffZQ6nvDDhvW65fyhR5x6iKhh4oe2zVB';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        }

    } else if (heavyRandomNum5 === 5) {
          // attack missed
          if (heavyRandomMiss5 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmW2u4m3Q4zJxfVx1dwWn6nfE267bamwB1LEKpS5MDo2fK';
            intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

          } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmUcwYTsriwKafffZQ6nvDDhvW65fyhR5x6iKhh4oe2zVB';
            intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

          }


    } else if (heavyRandomNum5 === 6) {
      //critical hit
      enemy5.life -= 40

      if (enemy5.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmRr6hCrzcFTDAkbhb49so6n9TiXkFJ8Qm4qpc9Dm7o5C6';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/Qmf885yCN11AHwtvnbjQQ8JpemG4fZgBeUxRy1cmiwboow';
          intents = [<Button action="/scriptedfight">Continue</Button>];


        }      

    } else {
        // normal attack
        enemy5.life -= 20

        if (enemy5.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmYTFZMnQhMvoq7SyFY1GpkCU7s4JVV7c3w6jo16ZYjQKP';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/Qmf885yCN11AHwtvnbjQQ8JpemG4fZgBeUxRy1cmiwboow';
          intents = [<Button action="/scriptedfight">Continue</Button>];


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
            image = 'https://gateway.pinata.cloud/ipfs/QmW2u4m3Q4zJxfVx1dwWn6nfE267bamwB1LEKpS5MDo2fK';
            intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmUcwYTsriwKafffZQ6nvDDhvW65fyhR5x6iKhh4oe2zVB';
            intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        }
              

    } else {
        // successful special attack
        enemy5.life -= 25

        if (enemy5.life > 0) {
          //enemy is still alive

          if (specialRandomMiss5 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmR6T1Z1doowM6k5g5J1F8o1cQK772inoBopCdyC4KsyfP';
            intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

          } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmR6T1Z1doowM6k5g5J1F8o1cQK772inoBopCdyC4KsyfP';
              intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

          }


        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/Qmf885yCN11AHwtvnbjQQ8JpemG4fZgBeUxRy1cmiwboow';
          intents = [<Button action="/scriptedfight">Continue</Button>];


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


    if (dodgeRandomNum5 < 4) {
        // player dodged
        image = 'https://gateway.pinata.cloud/ipfs/QmPwoMi4KRCceyVGYEYGjwz9MEmwhzERCSg1HXf3g493cZ';
        intents = [<Button action="/fight2-5">Continue</Button>];

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/Qmcy3ifXZF7NTiZo1cjDkoFx6eoroezFscsTLWHEiqVxh6';
          intents = [<Button action="/fight2-5">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative8' };
          deathFrame = "/narrative8";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmX5XwxUQAMRsr49UgqGQVxhJDLcZVqr7DGDRTy7ghUVRd';
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


    if (counterRandomNum5 < 3) {
        // succesful counter
        enemy5.life -= 10
        
        if (enemy5.life > 0) {
          //show counter frame

          image = 'https://gateway.pinata.cloud/ipfs/QmdAHcrdyqozXScjy4mXMCp1NQGA4uMuC8bLFogWrZ4qJf';
          intents = [<Button action="/fight2-5">Continue</Button>];

        } else {
          // enemy is dead
          image = 'https://gateway.pinata.cloud/ipfs/Qmf885yCN11AHwtvnbjQQ8JpemG4fZgBeUxRy1cmiwboow';
          intents = [<Button action="/scriptedfight">Continue</Button>];

        }
        

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/Qmcy3ifXZF7NTiZo1cjDkoFx6eoroezFscsTLWHEiqVxh6';
          intents = [<Button action="/fight2-5">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative8' };
          deathFrame = "/narrative8";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmX5XwxUQAMRsr49UgqGQVxhJDLcZVqr7DGDRTy7ghUVRd';
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

        progressMarker = { ...progressMarker, previousFrame: '/narrative2' };

        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmNhgkmpviMhH2FmsxFeurxau8S2wYyQ3ofV5xwzKi5dRo)',
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
          
              
            </div>
        );
        intents = [
           
           <Button action="/narrative4">Continue</Button>,

           
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
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmbAm9RXw3tAD9YMthAAdJqTg9tFJXhnrwFzg9a3xhtR2b)',
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
                
              
            </div>
        );
        intents = [
           
           <Button action="/option1">Run</Button>,
           <Button action="/option2">Sneak</Button>,
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


  trap2opt1Num = 2// Math.floor(Math.random() * 10);  // Assign value without redeclaring


  if (trap2opt1Num < 5) {
    //fail
    player.life -= 100
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmRLJcuU5DGBznsafXFzfrzyVXqHssdk5ubti73DGngv4L)',
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
              
              
            </div>
        );

          if (player.life > 1) {
            //player is stil alive after failing
            intents = [<Button action="/narrative8">Continue</Button>];

          } else {
            //player is dead
            progressMarker = { ...progressMarker, deathFrame: '/narrative6' };
            deathFrame = "/narrative6";
            currentframe = "checktime";
            intents = [<Button action="/trapwounded">Continue</Button>];
          }
    
  } else {
    //victory
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmPzBMPxDFsNMmKsMT9aBCFHLekPPCHZqPy3i4pXV3XWUE)',
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
               
              
            </div>
        );
    intents = [<Button action="/narrative8">Continue</Button>];

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


  if (trap2option2Num < 3) {
    //fail
    player.life -= 10
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmRLJcuU5DGBznsafXFzfrzyVXqHssdk5ubti73DGngv4L)',
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
              
              
            </div>
        );

          if (player.life > 1) {
            //player is stil alive after failing
            intents = [<Button action="/narrative8">Continue</Button>];

          } else {
            //player is dead
            progressMarker = { ...progressMarker, deathFrame: '/narrative6' };
            deathFrame = "/narrative6";
            currentframe = "checktime";
            intents = [<Button action="/trapwounded">Continue</Button>];
          }
    

  } else {
    //victory
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmPzBMPxDFsNMmKsMT9aBCFHLekPPCHZqPy3i4pXV3XWUE)',
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
               
              
            </div>
        );
    intents = [<Button action="/narrative8">Continue</Button>];

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
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmPpqWgmSVVLPDsUdLP8bJDVxpE1s6UiLm5RMua4FQywzn)',
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
               
              
            </div>
        );
        intents = [
           
           <Button action="/trap3Option">Carefully</Button>,
           <Button action="/trap3Option2">Swiftly</Button>,
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

  if (player.metStranger > 0){
    trap3num = 7
  }


  if (trap3num < 2) {
    //fail
    player.life -= 10
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/Qmeaf3LrLBjUfwRggvuBiWzoraB7WiyTSQ1ef8ZVtTQw1n)',
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
            
              
            </div>
        );

          if (player.life > 1) {
            //player is stil alive after failing
            intents = [<Button action="/narrative5">Continue</Button>];

          } else {
            //player is dead
            progressMarker = { ...progressMarker, deathFrame: '/narrative3' };
            deathFrame = "/narrative3";
            currentframe = "checktime";
            intents = [<Button action="/trapwounded">Continue</Button>];
          }
    
  } else {
    //victory
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmP1tY4EwcPEBnz3wWNJS6vy5YoDVvBo73JDG6sJhM1jaA)',
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
               
              
            </div>
        );
    intents = [<Button action="/narrative5">Continue</Button>];

  }

  return c.res({
    image: image,
    intents: intents
  });

});






app.frame('/trap3Option2', (c) => {

  let image;
  let intents;
  let trap3num;


  trap3num = Math.floor(Math.random() * 10);  // Assign value without redeclaring

  if (player.metStranger > 0){
    trap3num = 7
  }


  if (trap3num < 6) {
    //fail
    player.life -= 10
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/Qmeaf3LrLBjUfwRggvuBiWzoraB7WiyTSQ1ef8ZVtTQw1n)',
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
            
              
            </div>
        );

          if (player.life > 1) {
            //player is stil alive after failing
            intents = [<Button action="/narrative5">Continue</Button>];

          } else {
            //player is dead
            progressMarker = { ...progressMarker, deathFrame: '/narrative3' };
            deathFrame = "/narrative3";
            currentframe = "checktime";
            intents = [<Button action="/trapwounded">Continue</Button>];
          }
    
  } else {
    //victory
    image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmP1tY4EwcPEBnz3wWNJS6vy5YoDVvBo73JDG6sJhM1jaA)',
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
               
              
            </div>
        );
    intents = [<Button action="/narrative5">Continue</Button>];

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
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmXmi5wkJwpJ7XmcVJhAjcR1PpzFnNpPVzFS1bhLkABYyr)',
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
                
              
            </div>
        );
        intents = [
           
           <Button action="/narrative4b">Continue</Button>,

           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});



app.frame('/narrative4b', (c) => {
    let image;
    let intents;
    progressMarker = { ...progressMarker, previousFrame: '/narrative4b' };

        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmP4WuyRgksARHAT5Fq6UL5epCuhwpwV5Q2KvWTNuLvopz)',
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
                
              
            </div>
        );
        intents = [
           
           <Button action="/battle4">Continue</Button>,

           
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
      
        image = 'https://gateway.pinata.cloud/ipfs/QmcLGp1YAG5kPyHnL3bAAvJi1pYh21RacVkBaPBGMgLrFy';
        intents = [<Button action="/SwiftAttack2">Swift Attack</Button>,<Button action="/HeavyAttack2">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmcLGp1YAG5kPyHnL3bAAvJi1pYh21RacVkBaPBGMgLrFy';
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
    const fightRandomImage2 = Math.floor(Math.random() * 4);

   progressMarker = { ...progressMarker, previousFrame: '/fight2-2' };


    if (player.specials === 0) {
      //player has no special attack

        if (fightRandomImage2 < 2) {

          image = 'https://gateway.pinata.cloud/ipfs/QmUUNBCVTdhhL8Y744Fn2KZk1kzBhYoogQDdZfJibjnanF';
          intents = [<Button action="/SwiftAttack2">Swift Attack</Button>,<Button action="/HeavyAttack2">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage2 === 1) {
          image = 'https://gateway.pinata.cloud/ipfs/QmTsfTyVxZayYa1kAirVTi86FMHozjGoUPAvjKZLUH9Yof';
          intents = [<Button action="/SwiftAttack2">Swift Attack</Button>,<Button action="/HeavyAttack2">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://gateway.pinata.cloud/ipfs/QmTsfTyVxZayYa1kAirVTi86FMHozjGoUPAvjKZLUH9Yof';
          intents = [<Button action="/SwiftAttack2">Swift Attack</Button>,<Button action="/HeavyAttack2">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
        
    } else {

        if (fightRandomImage2 < 2) {

          image = 'https://gateway.pinata.cloud/ipfs/QmUUNBCVTdhhL8Y744Fn2KZk1kzBhYoogQDdZfJibjnanF';
          intents = [<Button action="/SwiftAttack2">SwiftAtk</Button>,<Button action="/HeavyAttack2">PowerAtk</Button>,<Button action="/specialAttack2">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage2 === 1) {
          image = 'https://gateway.pinata.cloud/ipfs/QmTsfTyVxZayYa1kAirVTi86FMHozjGoUPAvjKZLUH9Yof';
          intents = [<Button action="/SwiftAttack2">SwiftAtk</Button>,<Button action="/HeavyAttack2">PowerAtk</Button>,<Button action="/specialAttack2">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://gateway.pinata.cloud/ipfs/QmTsfTyVxZayYa1kAirVTi86FMHozjGoUPAvjKZLUH9Yof';
          intents = [<Button action="/SwiftAttack2">SwiftAtk</Button>,<Button action="/HeavyAttack2">PowerAtk</Button>,<Button action="/specialAttack2">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }        


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
    const swiftRandomMiss2 = Math.floor(Math.random() * 4);


    if (swiftRandomNum2 < 3) {
        // glancing blow
        enemy2.life -= 7

        if (enemy2.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/Qme41TxaoqjhwvkA95XgRBHaJGixshmtqBf6TfAPFxKtW4';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmUqk9oVXtLUArg9o8rzr4ygdzXWCybayiWeHJDCrvp9Kt';
          intents = [<Button action="/narrative7">Continue</Button>];


        }
        


    } else if (swiftRandomNum2 === 3) {
      // attack missed
      if (swiftRandomMiss2 < 2) {
        image = 'https://gateway.pinata.cloud/ipfs/QmbBecCfckVbDF28p6N4xVycKZbeFiEro7THP5rRk9ZV2M';
        intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

      } else {

        image = 'https://gateway.pinata.cloud/ipfs/QmYKjG4kuuausTnpoy6NAxmYzGJWTAJ7axyhsLkBWoWGYk';
        intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

      }



    } else if (swiftRandomNum2 === 4) {
      //critical hit
      enemy2.life -= 28

      if (enemy2.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQ9opFvN4fUaJej7rbpVZca2AcXxAwJvyWrbBsuw3dxvX';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmUqk9oVXtLUArg9o8rzr4ygdzXWCybayiWeHJDCrvp9Kt';
          intents = [<Button action="/narrative7">Continue</Button>];


        }
      

    } else {
        // normal attack
        enemy2.life -= 14

        if (enemy2.life > 0) {
          //enemy is still alive

            if (swiftRandomMiss2 < 1) {
              image = 'https://gateway.pinata.cloud/ipfs/QmV3gD8rjjMaYk2qUUtNxbPi9wDGEkNG9BKbnkXpwj8iDa';
              intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

            }else if (swiftRandomMiss2 === 1) {

              image = 'https://gateway.pinata.cloud/ipfs/QmPjfbP9vvULCpHcC1SC1nYDgTPcN5eW2P1T3gmhJkVFCX';
              intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

            } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmPjfbP9vvULCpHcC1SC1nYDgTPcN5eW2P1T3gmhJkVFCX';
              intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

            }

          

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmUqk9oVXtLUArg9o8rzr4ygdzXWCybayiWeHJDCrvp9Kt';
          intents = [<Button action="/narrative7">Continue</Button>];


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
    const heavyRandomMiss2 = Math.floor(Math.random() * 4);


    if (heavyRandomNum2 < 4) {
        // glancing blow
        enemy2.life -= 10

        if (enemy2.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/Qme41TxaoqjhwvkA95XgRBHaJGixshmtqBf6TfAPFxKtW4';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmUqk9oVXtLUArg9o8rzr4ygdzXWCybayiWeHJDCrvp9Kt';
          intents = [<Button action="/narrative7">Continue</Button>];


        }
        


    } else if (heavyRandomNum2 === 4) {
        // attack missed
        if (heavyRandomMiss2 < 2) {
          image = 'https://gateway.pinata.cloud/ipfs/QmbBecCfckVbDF28p6N4xVycKZbeFiEro7THP5rRk9ZV2M';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {

          image = 'https://gateway.pinata.cloud/ipfs/QmYKjG4kuuausTnpoy6NAxmYzGJWTAJ7axyhsLkBWoWGYk';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        }

    } else if (heavyRandomNum2 === 5) {
          // attack missed
          if (heavyRandomMiss2 < 2) {
            image = 'https://gateway.pinata.cloud/ipfs/QmbBecCfckVbDF28p6N4xVycKZbeFiEro7THP5rRk9ZV2M';
            intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

          } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmYKjG4kuuausTnpoy6NAxmYzGJWTAJ7axyhsLkBWoWGYk';
            intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

          }


    } else if (heavyRandomNum2 === 6) {
      //critical hit
      enemy2.life -= 40

      if (enemy2.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmQ9opFvN4fUaJej7rbpVZca2AcXxAwJvyWrbBsuw3dxvX';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmUqk9oVXtLUArg9o8rzr4ygdzXWCybayiWeHJDCrvp9Kt';
          intents = [<Button action="/narrative7">Continue</Button>];


        }      

    } else {
        // normal attack
        enemy2.life -= 20

        if (enemy2.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmWnZDsfnxJiW3nowVuAzAZhsca5LqbVbGbLCBrGFdJHFG';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmUqk9oVXtLUArg9o8rzr4ygdzXWCybayiWeHJDCrvp9Kt';
          intents = [<Button action="/narrative7">Continue</Button>];


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
            image = 'https://gateway.pinata.cloud/ipfs/QmYKjG4kuuausTnpoy6NAxmYzGJWTAJ7axyhsLkBWoWGYk';
            intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmYKjG4kuuausTnpoy6NAxmYzGJWTAJ7axyhsLkBWoWGYk';
            intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        }
              

    } else {
        // successful special attack
        enemy2.life -= 25

        if (enemy2.life > 0) {
          //enemy is still alive

          if (specialRandomMiss2 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmR6T1Z1doowM6k5g5J1F8o1cQK772inoBopCdyC4KsyfP';
            intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

          } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmR6T1Z1doowM6k5g5J1F8o1cQK772inoBopCdyC4KsyfP';
              intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

          }


        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmUqk9oVXtLUArg9o8rzr4ygdzXWCybayiWeHJDCrvp9Kt';
          intents = [<Button action="/narrative7">Continue</Button>];


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
        image = 'https://gateway.pinata.cloud/ipfs/QmYxj6c2DcTpZLnYWaU8VDDkyJ6uLeQ6t1JGrQD3Fg18bA';
        intents = [<Button action="/fight2-2">Continue</Button>];

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmTf2BDZo9SNPVSM4fmn8n9fxwiq8rqzER5138K4rGAMqg';
          intents = [<Button action="/fight2-2">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative6' };
          deathFrame = "/narrative6";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmX5XwxUQAMRsr49UgqGQVxhJDLcZVqr7DGDRTy7ghUVRd';
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

          image = 'https://gateway.pinata.cloud/ipfs/QmR8w7jqKyVzaNd4FQdfbKSw9r3bErYs1bofA7hZoQeej2';
          intents = [<Button action="/fight2-2">Continue</Button>];

        } else {
          // enemy is dead
          image = 'https://gateway.pinata.cloud/ipfs/QmUqk9oVXtLUArg9o8rzr4ygdzXWCybayiWeHJDCrvp9Kt';
          intents = [<Button action="/narrative7">Continue</Button>];

        }
        

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmTf2BDZo9SNPVSM4fmn8n9fxwiq8rqzER5138K4rGAMqg';
          intents = [<Button action="/fight2-2">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative6' };
          deathFrame = "/narrative6";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmX5XwxUQAMRsr49UgqGQVxhJDLcZVqr7DGDRTy7ghUVRd';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});


  /////////////////////////////////////////////////////////////////////////////////////////////////////
  //narrative 7
  app.frame('/narrative7', (c) => {
      let image;
      let intents;
      progressMarker = { ...progressMarker, previousFrame: '/narrative7' };

          image = (
              <div
                  style={{
                      alignItems: 'center',
                      backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/Qmf23d4fvECsCEj2djT6nSEyBkbTsgEDQgnEZ5dyWgEqQo)',
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
                  
                
              </div>
          );
          intents = [
             
             <Button action="/narrative7b">Collect</Button>,
             <Button action="/showPlayerStatus">status</Button>,

             
          ];


      return c.res({
         
          image: image,
          intents: intents
      });
  });



  app.frame('/narrative7b', (c) => {
      let image;
      let intents;
      progressMarker = { ...progressMarker, previousFrame: '/narrative7b' };
      player.hasGem += 1

          image = (
              <div
                  style={{
                      alignItems: 'center',
                      backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmYyvoVBEm87xCp1P6TbR7LZ8esHr3EyTGu5wA9GRfyycK)',
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
                  
                
              </div>
          );
          intents = [
             
             <Button action="/narrative8">Continue</Button>,
             <Button action="/showPlayerStatus">status</Button>,

             
          ];


      return c.res({
         
          image: image,
          intents: intents
      });
  });



  /////////////////////////////////////////////////////////////////////////////////////////////////////

  app.frame('/narrative8', (c) => {
      let image;
      let intents;
      progressMarker = { ...progressMarker, previousFrame: '/narrative8' };
      

          image = (
              <div
                  style={{
                      alignItems: 'center',
                      backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmPQRepTKoH2ZnwGDRcxK9ehV1nq9smZL8LLceM1MxsHDE)',
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




  /////////////////////////////////////////////////////////////////////////////////////////////////////


//battle4 system

app.frame('/battle4', (c) => {
    let image;
    let intents;


   progressMarker = { ...progressMarker, previousFrame: '/battle4' };


    if (player.specials === 0) {
      
        image = 'https://gateway.pinata.cloud/ipfs/QmUwG7Wm9TToczsiNeuCQQfW92p61wZFVbM1ZFeWHCdaKv';
        intents = [<Button action="/SwiftAttack4">Swift Attack</Button>,<Button action="/HeavyAttack4">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];
    } else {
 
        image = 'https://gateway.pinata.cloud/ipfs/QmUwG7Wm9TToczsiNeuCQQfW92p61wZFVbM1ZFeWHCdaKv';
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

          image = 'https://gateway.pinata.cloud/ipfs/QmVgoX7bJgrspJgvgCCCVrCEsWSSydxELo4GVB6GRZR2BS';
          intents = [<Button action="/SwiftAttack4">Swift Attack</Button>,<Button action="/HeavyAttack4">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage4 === 1) {
          image = 'https://gateway.pinata.cloud/ipfs/QmR42zKyJYunPNXEqiHCoKyzW7oVMdjhVLp1jWECH9ng1V';
          intents = [<Button action="/SwiftAttack4">Swift Attack</Button>,<Button action="/HeavyAttack4">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://gateway.pinata.cloud/ipfs/QmR42zKyJYunPNXEqiHCoKyzW7oVMdjhVLp1jWECH9ng1V';
          intents = [<Button action="/SwiftAttack4">Swift Attack</Button>,<Button action="/HeavyAttack4">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
        
    } else {

      if (fightRandomImage4 < 1) {

          image = 'https://gateway.pinata.cloud/ipfs/QmVgoX7bJgrspJgvgCCCVrCEsWSSydxELo4GVB6GRZR2BS';
          intents = [<Button action="/SwiftAttack4">SwiftAtk</Button>,<Button action="/HeavyAttack4">PowerAtk</Button>,<Button action="/specialAttack4">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage4 === 1) {
          image = 'https://gateway.pinata.cloud/ipfs/QmR42zKyJYunPNXEqiHCoKyzW7oVMdjhVLp1jWECH9ng1V';
          intents = [<Button action="/SwiftAttack4">SwiftAtk</Button>,<Button action="/HeavyAttack4">PowerAtk</Button>,<Button action="/specialAttack4">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://gateway.pinata.cloud/ipfs/QmR42zKyJYunPNXEqiHCoKyzW7oVMdjhVLp1jWECH9ng1V';
          intents = [<Button action="/SwiftAttack4">SwiftAtk</Button>,<Button action="/HeavyAttack4">PowerAtk</Button>,<Button action="/specialAttack4">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
 
        


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
    const swiftRandomMiss4 = Math.floor(Math.random() * 4);


    if (swiftRandomNum4 < 3) {
        // glancing blow
        enemy4.life -= 7

        if (enemy4.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmeHTBf6eb43EYQdxGjXJeGRYVc6RtMEer95inCiBZR7sh';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmT4ue93NYK4rgfzFFrV7LzQ8NuMtuP6f7vEtrAJdhpF7N';
          intents = [<Button action="/narrative5">Continue</Button>];


        }
        


    } else if (swiftRandomNum4 === 3) {
      // attack missed
      if (swiftRandomMiss4 < 2) {
        image = 'https://gateway.pinata.cloud/ipfs/QmWS23WKpQY3ScL8dD3LrgHoshWNReF965PaLq1tWAJFJV';
        intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

      } else {

        image = 'https://gateway.pinata.cloud/ipfs/QmZj5358i7jDw3r9fNiMWnMB5BpjpC8Uh1y4cnWeaXTgMs';
        intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

      }



    } else if (swiftRandomNum4 === 4) {
      //critical hit
      enemy4.life -= 28

      if (enemy4.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmXVBknNHNSYPSRwwwnY6rBR25vTMdNCLLjvxfLcUuuQ7L';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmT4ue93NYK4rgfzFFrV7LzQ8NuMtuP6f7vEtrAJdhpF7N';
          intents = [<Button action="/narrative5">Continue</Button>];


        }
      

    } else {
        // normal attack
        enemy4.life -= 14

        if (enemy4.life > 0) {
          //enemy is still alive

            if (swiftRandomMiss4 < 1) {
              image = 'https://gateway.pinata.cloud/ipfs/QmPA6P6BAiLEuQAawBN3mbtMmEjhPaZM6HBA7zDrADU1VD';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

            }else if (swiftRandomMiss4 === 1) {

              image = 'https://gateway.pinata.cloud/ipfs/QmPA6P6BAiLEuQAawBN3mbtMmEjhPaZM6HBA7zDrADU1VD';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

            } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmXPeF4hpjMQTN49cz7tui8TVJNp86ftpVAsKC3RZDW9nT';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

            }

          

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmT4ue93NYK4rgfzFFrV7LzQ8NuMtuP6f7vEtrAJdhpF7N';
          intents = [<Button action="/narrative5">Continue</Button>];


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
    const heavyRandomMiss4 = Math.floor(Math.random() * 4);


    if (heavyRandomNum4 < 4) {
        // glancing blow
        enemy4.life -= 10

        if (enemy4.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmeHTBf6eb43EYQdxGjXJeGRYVc6RtMEer95inCiBZR7sh';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmT4ue93NYK4rgfzFFrV7LzQ8NuMtuP6f7vEtrAJdhpF7N';
          intents = [<Button action="/narrative5">Continue</Button>];


        }
        


    } else if (heavyRandomNum4 === 4) {
        // attack missed
      if (heavyRandomMiss4 < 2) {
        image = 'https://gateway.pinata.cloud/ipfs/QmWS23WKpQY3ScL8dD3LrgHoshWNReF965PaLq1tWAJFJV';
        intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

      } else {

        image = 'https://gateway.pinata.cloud/ipfs/QmZj5358i7jDw3r9fNiMWnMB5BpjpC8Uh1y4cnWeaXTgMs';
        intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

      }

    } else if (heavyRandomNum4 === 5) {
          // attack missed
        if (heavyRandomMiss4 < 2) {
          image = 'https://gateway.pinata.cloud/ipfs/QmWS23WKpQY3ScL8dD3LrgHoshWNReF965PaLq1tWAJFJV';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {

          image = 'https://gateway.pinata.cloud/ipfs/QmZj5358i7jDw3r9fNiMWnMB5BpjpC8Uh1y4cnWeaXTgMs';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        }


    } else if (heavyRandomNum4 === 6) {
      //critical hit
      enemy4.life -= 40

      if (enemy4.life > 0) {
          //enemy is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmXVBknNHNSYPSRwwwnY6rBR25vTMdNCLLjvxfLcUuuQ7L';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmT4ue93NYK4rgfzFFrV7LzQ8NuMtuP6f7vEtrAJdhpF7N';
          intents = [<Button action="/narrative5">Continue</Button>];


        }      

    } else {
        // normal attack
        enemy4.life -= 20

        if (enemy4.life > 0) {
          //enemy is still alive

           if (heavyRandomMiss4 < 1) {
              image = 'https://gateway.pinata.cloud/ipfs/Qmbv5e57r8GZRF6TAqvGWbaof5VPbAzPpXFvKGW31fw9Vf';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

            }else if (heavyRandomMiss4 === 1) {

              image = 'https://gateway.pinata.cloud/ipfs/QmXPeF4hpjMQTN49cz7tui8TVJNp86ftpVAsKC3RZDW9nT';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

            } else {

              image = 'https://gateway.pinata.cloud/ipfs/Qmbv5e57r8GZRF6TAqvGWbaof5VPbAzPpXFvKGW31fw9Vf';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

            }


        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmT4ue93NYK4rgfzFFrV7LzQ8NuMtuP6f7vEtrAJdhpF7N';
          intents = [<Button action="/narrative5">Continue</Button>];


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
            image = 'https://gateway.pinata.cloud/ipfs/QmWS23WKpQY3ScL8dD3LrgHoshWNReF965PaLq1tWAJFJV';
            intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {

            image = 'https://gateway.pinata.cloud/ipfs/QmWS23WKpQY3ScL8dD3LrgHoshWNReF965PaLq1tWAJFJV';
            intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        }
              

    } else {
        // successful special attack
        enemy4.life -= 25

        if (enemy4.life > 0) {
          //enemy is still alive

          if (specialRandomMiss4 < 1) {
            image = 'https://gateway.pinata.cloud/ipfs/QmR6T1Z1doowM6k5g5J1F8o1cQK772inoBopCdyC4KsyfP';
            intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

          } else {

              image = 'https://gateway.pinata.cloud/ipfs/QmR6T1Z1doowM6k5g5J1F8o1cQK772inoBopCdyC4KsyfP';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

          }


        } else {
          // enemy is dead

          image = 'https://gateway.pinata.cloud/ipfs/QmT4ue93NYK4rgfzFFrV7LzQ8NuMtuP6f7vEtrAJdhpF7N';
          intents = [<Button action="/narrative5">Continue</Button>];


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
        image = 'https://gateway.pinata.cloud/ipfs/QmZpT8GoL476vY7zEwsaC1NChkWbJ3bhp7UdcedAV1QXfq';
        intents = [<Button action="/fight2-4">Continue</Button>];

    } else {
        // player is hit
        player.life -= 10
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmYHr8ur6JumQpK5p1SibiQzgYQiHrXw5hrZSPL7ZRYjWv';
          intents = [<Button action="/fight2-4">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative4' };
          deathFrame = "/narrative4";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmX5XwxUQAMRsr49UgqGQVxhJDLcZVqr7DGDRTy7ghUVRd';
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


    if (counterRandomNum4 < 6) {
        // succesful counter
        enemy4.life -= 10
        
        if (enemy4.life > 0) {
          //show counter frame

          image = 'https://gateway.pinata.cloud/ipfs/QmeL2xkfUC6Y8t5anUZvNMpnqeXCzsj4YKXdW8RRwh2MRg';
          intents = [<Button action="/fight2-4">Continue</Button>];

        } else {
          // enemy is dead
          image = 'https://gateway.pinata.cloud/ipfs/QmT4ue93NYK4rgfzFFrV7LzQ8NuMtuP6f7vEtrAJdhpF7N';
          intents = [<Button action="/narrative5">Continue</Button>];

        }
        

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://gateway.pinata.cloud/ipfs/QmYHr8ur6JumQpK5p1SibiQzgYQiHrXw5hrZSPL7ZRYjWv';
          intents = [<Button action="/fight2-4">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative4' };
          deathFrame = "/narrative4";
          currentframe = "checktime";
          image = 'https://gateway.pinata.cloud/ipfs/QmX5XwxUQAMRsr49UgqGQVxhJDLcZVqr7DGDRTy7ghUVRd';
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
        image: 'https://gateway.pinata.cloud/ipfs/QmVrjY4UY21kTu4zr37etKk7VfQWqFSShLF8WbDTxK89JR',
        intents: [
            <Button action="/checktime">Continue</Button>,
        ],
        
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
                    backgroundImage: 'url(https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVrpuQxaDbz5E5gFoFNyprxVnTfgL9rwAv1jHpVWj84iC)',
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
              
            </div>
        );
        intents = [
           
           <Button action="/battle2">Dark Path</Button>,
           <Button action="/trap2">Noisy Path</Button>,

           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});







///////////////////////////////////////////////////////////////////////////

app.frame('/scriptedfight', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmZ75Cp8DZFU9RoCsFhYCqwT25v4wBJcuGigr8CTGCSovo)',
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
            
              
            </div>
        );
        intents = [
           
           <Button action="/endscene1">Hide !</Button>,

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
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmWHNCgsCVMtdozRAaJ1H2xw4UxTUf2xHj7MYaGLfB1LNw)',
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
               
              
            </div>
        );
        intents = [
           
           <Button action="/endscene2">Continue</Button>,

           
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
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmNe419LChwz6QZcWjT34mJWfFZ85kKs1duE6FMTpguzyk)',
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
               
              
            </div>
        );
        intents = [
           
           <Button action="/endscene3">Continue</Button>,

           
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
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmXo9vuC4g5c3z7KNaCqZMxaKRZ8oSfrspP8k2udr964ZN)',
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
               
            </div>
        );
        intents = [
           
           <Button action="/endscene4">Continue</Button>,

           
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
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmcY6tktxxQvxs4pg2VbnLv5cmuhoNda6QVDo6kP7iSsMy)',
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
               
              
            </div>
        );
        intents = [
           
           <Button action="/endscene5">Continue</Button>,

           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});



app.frame('/endscene5', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmdjJC8xW2tKxhLRTyEWAd8NsaTQzCZyhFHounia4SHJsb)',
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
               
              
            </div>
        );
        intents = [
           
           <Button action="/endscene6">Continue</Button>,

           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});




app.frame('/endscene6', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmZK5r89sNwtWK2rLzuTyPL6MB1LQ9Z9896UE2tgg9hyNw)',
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
               
              
            </div>
        );
        intents = [
           
           <Button action="/finalDecision1">Flee</Button>,

           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});




app.frame('/finalDecision1', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmX5ZPyKzf3XAPTP28DKfQYgiteZ4YbvxPW2XjCEot1gGU)',
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
               
              
            </div>
        );
        intents = [
           
           <Button action="/blank">Flee</Button>,

           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});



app.frame('/finalDecision2', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmSEtYPBHm1f23Nx8DYTbNXP9KUEfn6xYKjEGazwM8HVor)',
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
               
              
            </div>
        );
        intents = [
           
           <Button action="/blank">1</Button>,
           <Button action="/blank">2</Button>,
           <Button action="/blank">3</Button>,

           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/blank', (c) => {
    let image;
    let intents;


        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://gateway.pinata.cloud/ipfs/QmSEtYPBHm1f23Nx8DYTbNXP9KUEfn6xYKjEGazwM8HVor)',
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
               
              
            </div>
        );
        intents = [
           


           
        ];


    return c.res({
       
        image: image,
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
    chainId: `eip155:${arbitrumChain.id}`,
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
    chainId: `eip155:${arbitrumChain.id}`,
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
