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
    default: 'https://endpoints.omniatech.io/v1/arbitrum/sepolia/public',
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
  imageAspectRatio:'1:1'
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
  finalDecision: 0,
  framesLoaded: 0, 
  enemiesKilled: 0,
};

let enemy1 = {
  name: 'enemy1',
  life: 50, 
};

let enemy2 = {
  name: 'enemy2',
  life: 75, 
};

let enemy3 = {
  name: 'enemy3',
  life: 70, 
};

let enemy4 = {
  name: 'enemy4',
  life: 60, 
};

let enemy5 = {
  name: 'enemy5',
  life: 60, 
};


let expirationTimeRem = new Date(Date.now() + 60000);


let progressMarker = {
  previousFrame: '/page6',
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
type FinalDecision = number;
let farcasterid: FarcasterID = '1';
let currentframe: CurrentFrame = 'page6';
let deathFrame: DeathtFrame = '/page17';
let timerWatch: TimerWatch = 1717262784622;
let finalDecision: FinalDecision = 0

interface DataItem {
  fid: string;
  lastknownframe: string;
  deathpos: string;
  health: number; // Assuming 'health' is a number, adjust type if necessary
  stopWatch: number;
  finalDecision: number;
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




async function updateData(farcasterid: FarcasterID, currentframe: CurrentFrame, deathFrame: DeathtFrame, timerWatch: TimerWatch, finalDecision: FinalDecision) {
  // Construct the URL using template literals
  const url = `https://gpzytjchmkcglwzkxcrc.supabase.co/rest/v1/warpcastertest?fid=eq.${farcasterid}`;
   console.log(url);
  const data = {
    //fid : farcasterid,
    lastknownframe: currentframe,
    deathpos: deathFrame,
    stopWatch: timerWatch,
    finalDecision: player.finalDecision,
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

    player.framesLoaded += 1;
    


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmX3WZpXhPUr5froKqaqqVG5MkV7xyrQTkoXgriM4mZCHi';
        intents = [
           
           <Button action="/firstframe">Play</Button>,
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});

app.frame('/firstframe', (c) => {
    let image;
    let intents;

    player = { ...player, life: 100 };
    player = { ...player, hasGem: 0 };
    player = { ...player, metStranger: 0 };
    player = { ...player, framesLoaded: 0 };
    player = { ...player, specials: 3 };
    player = { ...player, enemiesKilled: 0 };



    player.framesLoaded += 1;
    


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmd9qKBwAMbXGXsqQMvfsYw7qP8FvJDLqva3wyywFG2Vd2';
        intents = [
           
           <Button action="/startframe">Continue</Button>,
           <Button.Link href="https://paragraph.xyz/@oexcess.eth/preview/oLuj50fHUK6FeqFePlqd">Guide</Button.Link>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/startframe', (c) => {
    let image;
    let intents;




    player.framesLoaded += 1;
    


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmf5ZotjRTKSVFc53fWQtJEzU66x9qJg3xEkoPcdxUFd44';
        intents = [
           
           <Button action="/page1">Continue</Button>,

        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/looponce', (c) => {
    let image;
    let intents;



        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQpXGHswj4ik6LMJxMyWGBqvENmavL5uurRPpSJFNnbQQ';
        intents = [
           
           <Button action="/page3">Continue</Button>,
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

  player.framesLoaded += 1;
  const { fid } = frameData || {};
  farcasterid = fid !== undefined ? String(fid) : farcasterid;// Use existing farcasterid if fid is undefined
  console.log('real id is:', farcasterid);
  console.log('frames loaded is :', player.framesLoaded);

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
    image: 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbbVUFjEpD6ScZtr398ko33aBP5UX99vXMBYtMNcGMiji',
    intents: [
      //<Button action={enemy1.name}>Continue</Button>, // example of how to pass a variable to the button
      //<Button action={`/${progressMarker.previousFrame}`}>Continue</Button>,
      <Button action="/page6">Continue</Button>,
    ],
  });
});


app.frame('/page2', (c) => {
    let image;
    let intents;

    enemy1 = { ...enemy1, life: 50 };
    enemy2 = { ...enemy2, life: 60 };
    enemy3 = { ...enemy3, life: 70 };
    enemy4 = { ...enemy4, life: 60 };
    enemy5 = { ...enemy5, life: 60 };

    player.framesLoaded += 1;
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPHukU9yW92rHXzaCK7rzaCpNezn2bHMv8PRqPKwbgWzk';
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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmTAAhhrrLT8G3MoP5JtoTyeeHEySEi1mZ6DEt6K24L9CA';
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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmeysSoLVdEGaTN3GtibY5aMinxAQZyJgNaFb72zxHdNPf';
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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmW7c9DAWLQswZ4LWeWgPFMtNfQPNNsYq1YnYAu7tU41Pt';
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
    player.framesLoaded += 1;

    enemy1 = { ...enemy1, life: 50 };
    enemy2 = { ...enemy2, life: 60 };
    enemy3 = { ...enemy3, life: 70 };
    enemy4 = { ...enemy4, life: 60 };
    enemy5 = { ...enemy5, life: 60 };


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZD1aqVQsnXGBGCaNzRkNbdW6dX562xNujTxgERgwaEqh';
        intents = [
           
           <Button action="/page8">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page7', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPrQqVnFjTtgD5nWKW8aTbsiveThiTMJqLLCi4FnhS9Nf';
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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmYcYgNWiehoikEz6XyUHJ9d5JetoSycFMMdHb3cN1kye2';
        intents = [
           
           <Button action="/page8a">Threaten</Button>,
           <Button action="/page8b">Persuade</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page8a', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmdq7fVjT8t636EhxkBXaoqv6Tt9Ec8tD61iMfiVJccAWK';
        intents = [
           
           <Button action="/page8af">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page8b', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmaVGrrrauaVXYi3GfH5NUayZ8hPn469D9g9pZZVWCfBw8';
        intents = [
           
           <Button action="/page8bf">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page8bf', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVrDD6JGsujXVYhr5cUqpmBTLnMoR4hB8GKwuCriW2QML';
        intents = [
           
           <Button action="/page8c">Continue</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});




app.frame('/page8af', (c) => {
    let image;
    let intents;
    const threatNum = Math.floor(Math.random() * 4);
    player.framesLoaded += 1;



    if (threatNum < 2) {
      //successfull threat

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbFScwi7qEHWYx2smkHXp68q23XtFoX9yGWdo5YRQH8Mi';
          intents = [<Button action="/page8c">Continue</Button>];

        
    } else {

      //failed threat
         // player.specials -=1;
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZ7p7x2TL9tH45ADj9s1C7yusfJwC87KFX6fzZuyR5JVV';
          intents = [<Button action="/page8c">Continue</Button>];

    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/page8c', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSkz5gU4PJXirzRQXrEAuUuyqMFF7Ndooma8f4X4Hp4aT';
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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSNpvEfsc9rWeYzXzdZ1xG2mE57zsogmDhCKRMAEAjLh3';
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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPrQqVnFjTtgD5nWKW8aTbsiveThiTMJqLLCi4FnhS9Nf';
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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmaQA4GQahF4VXszj11y2iFxhQmUkJGBk4wTnftxMQmpdz';
        intents = [
           
           <Button action="/page11-2">Check Inventory</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});

app.frame('/page11-2', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSjUKbGvdNASh3U4Mr3yE1TCBg4ss5p5LQn4rC8GrTEww';
        intents = [
           
           <Button action="/page11-3">Equip Torch</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});

app.frame('/page11-3', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmRrzNbeYnMi4u9qKhAvG94xzKx4pUbp2tZAnBkPUEDQun';
        intents = [
           
           <Button action="/page12">Explore</Button>,
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/page12', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPJvFALzqetRVs3Gyk51GAoVvD5SYLrB7EHNfVj18A43c';
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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQkaj4s2Wtt7NpRWX5kfnuatTtdUfdtuH2vPv8dHNDUQr';
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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmeVqL4jvqBu3ujUPL8ggo9Q85m5xRLQ2nstF9kSV9Bykv';
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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmdkzbG5LgNSKhpjqtsqt4mgQ23TLxQFfJPiwAhgBsHb6d';
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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbR7ufDR1WYx8fJh6dt4vN46QD7kJ8H7jYxwJLXuYdVcX';
        intents = [
           
           <Button action="/page17">Run!!!</Button>,
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
    player.framesLoaded += 1;

    /*updateData(farcasterid, currentframe, deathFrame, timerWatch)
    .then(() => {
      console.log('Data updated successfully');
      console.log(farcasterid)
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });*/

    if (player.specials === 3) {

            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmWjdWGvpxkGtUnsdPUxwFw8t3qQamLo3aazhNtMjFr6FT';
            intents = [
               
               <Button action="/battle1">Fight</Button>,
               <Button action="/trap1">Flee</Button>,
            ];

    } else {

            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmWjdWGvpxkGtUnsdPUxwFw8t3qQamLo3aazhNtMjFr6FT';
            intents = [
               
               <Button action="/battle1">Fight</Button>,
               <Button action="/trap1">Flee</Button>,
            ];



    }


    return c.res({
       
        image: image,
        intents: intents
    });
});




app.frame('/showPlayerStatus', (c) => {
    let image;
    let intents;
    let healthColour;
    let healthPos;
    player.framesLoaded += 1;

    if (player.life > 30) {

      healthColour = 'green';

    } else {

      healthColour = 'red';

    }

    if (player.life > 99) {

      healthPos = 'translate(-210%, 10%)';

    } else if (player.life < 10) {

      healthPos = 'translate(-480%, 10%)';

    } else {

      healthPos = 'translate(-280%, 10%)';

    }

    console.log(healthColour)


    if (player.specials === 3) {

      if (player.hasGem === 1) {

          // has gem
            image = (
                  <div
                      style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100vh',
                          background: 'black',
                          flexDirection: 'column'  // Arrange images in a column

                      }}
                  >
                      <img
                          src="https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmbhuda1Nhrx6bMkqvVzgRQnZVJxZYqZhjMNoBtrg3yvft"
                          alt="First Image"
                          style={{
                              width: '650px',
                              height: '650px',
                              margin: '10px'
                          }}
                      />

                      <p
                        style={{
                          fontSize: '70px',
                          color: healthColour,
                          fontWeight: 'bold',
                          position: 'absolute',  // Position the text absolutely
                          top: '50%',            // Adjust as needed to center the text vertically
                          left: '50%',           // Adjust as needed to center the text horizontally
                          transform: healthPos,  // Center the text using transform
                          margin: '0',
                        }}
                      >
                        {player.life}
                      </p>
                  

                  </div>
              );

      } else {
        // doesnt have gem

            

             image = (
                  <div
                      style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100vh',
                          background: 'black',
                          flexDirection: 'column'  // Arrange images in a column

                      }}
                  >
                      <img
                          src="https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZiHYjFFqu6HWsyQ7TuZsYFmUUw9tuQG9x5HYagaKrdad"
                          alt="First Image"
                          style={{
                              width: '650px',
                              height: '650px',
                              margin: '10px'
                          }}
                      />

                      <p
                        style={{
                          fontSize: '70px',
                          color: healthColour,
                          fontWeight: 'bold',
                          position: 'absolute',  // Position the text absolutely
                          top: '50%',            // Adjust as needed to center the text vertically
                          left: '50%',           // Adjust as needed to center the text horizontally
                          transform: healthPos,  // Center the text using transform
                          margin: '0',
                        }}
                      >
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
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100vh',
                          background: 'black',
                          flexDirection: 'column'  // Arrange images in a column

                      }}
                  >
                      <img
                          src="https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmagXm1fsyKfSA8fwBHvQBsCYfjvkSHMdgQaoe5Tv1kzQ6"
                          alt="First Image"
                          style={{
                              width: '650px',
                              height: '650px',
                              margin: '10px'
                          }}
                      />

                      <p
                        style={{
                          fontSize: '70px',
                          color: healthColour,
                          fontWeight: 'bold',
                          position: 'absolute',  // Position the text absolutely
                          top: '50%',            // Adjust as needed to center the text vertically
                          left: '50%',           // Adjust as needed to center the text horizontally
                          transform: healthPos,  // Center the text using transform
                          margin: '0',
                        }}
                      >
                        {player.life}
                      </p>
                  

                  </div>
              );

      } else {
        // doesnt have gem
             

             image = (
                  <div
                      style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100vh',
                          background: 'black',
                          flexDirection: 'column'  // Arrange images in a column

                      }}
                  >
                      <img
                          src="https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQEfeeKHt6VE4TgCLpYn1e4VSU9wucDNYEYatvWzpysYG"
                          alt="First Image"
                          style={{
                              width: '650px',
                              height: '650px',
                              margin: '10px'
                          }}
                      />

                      <p
                        style={{
                          fontSize: '70px',
                          color: healthColour,
                          fontWeight: 'bold',
                          position: 'absolute',  // Position the text absolutely
                          top: '50%',            // Adjust as needed to center the text vertically
                          left: '50%',           // Adjust as needed to center the text horizontally
                          transform: healthPos,  // Center the text using transform
                          margin: '0',
                        }}
                      >
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
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100vh',
                          background: 'black',
                          flexDirection: 'column'  // Arrange images in a column

                      }}
                  >
                      <img
                          src="https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPL96L57iAd7NnpCbYNcAJavzaBLwFgsYrSKLtcUS2sY6"
                          alt="First Image"
                          style={{
                              width: '650px',
                              height: '650px',
                              margin: '10px'
                          }}
                      />

                      <p
                        style={{
                          fontSize: '70px',
                          color: healthColour,
                          fontWeight: 'bold',
                          position: 'absolute',  // Position the text absolutely
                          top: '50%',            // Adjust as needed to center the text vertically
                          left: '50%',           // Adjust as needed to center the text horizontally
                          transform: healthPos,  // Center the text using transform
                          margin: '0',
                        }}
                      >
                        {player.life}
                      </p>
                  

                  </div>
              );

      } else {
        // doesnt have gem

             image = (
                  <div
                      style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100vh',
                          background: 'black',
                          flexDirection: 'column'  // Arrange images in a column

                      }}
                  >
                      <img
                          src="https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSLZAqbzhzhRFQu6m821C95DRF33FeGReUc9B8Z381wHe"
                          alt="First Image"
                          style={{
                              width: '650px',
                              height: '650px',
                              margin: '10px'
                          }}
                      />

                      <p
                        style={{
                          fontSize: '70px',
                          color: healthColour,
                          fontWeight: 'bold',
                          position: 'absolute',  // Position the text absolutely
                          top: '50%',            // Adjust as needed to center the text vertically
                          left: '50%',           // Adjust as needed to center the text horizontally
                          transform: healthPos,  // Center the text using transform
                          margin: '0',
                        }}
                      >
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
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100vh',
                          background: 'black',
                          flexDirection: 'column'  // Arrange images in a column

                      }}
                  >
                      <img
                          src="https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmdVtgpFmTtbNAB5NTGUxn5YZWxiMPaWwvgMFV12ZyyHmX"
                          alt="First Image"
                          style={{
                              width: '650px',
                              height: '650px',
                              margin: '10px'
                          }}
                      />

                      <p
                        style={{
                          fontSize: '70px',
                          color: healthColour,
                          fontWeight: 'bold',
                          position: 'absolute',  // Position the text absolutely
                          top: '50%',            // Adjust as needed to center the text vertically
                          left: '50%',           // Adjust as needed to center the text horizontally
                          transform: healthPos,  // Center the text using transform
                          margin: '0',
                        }}
                      >
                        {player.life}
                      </p>
                  

                  </div>
              );

      } else {
        // doesnt have gem


             image = (
                  <div
                      style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100vh',
                          background: 'black',
                          flexDirection: 'column'  // Arrange images in a column

                      }}
                  >
                      <img
                          src="https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmajvLf3TaxVoUYDp7oRbNtKUVBkX6hQRUrNsoHww2y5Bb"
                          alt="First Image"
                          style={{
                              width: '650px',
                              height: '650px',
                              margin: '10px'
                          }}
                      />

                      <p
                        style={{
                          fontSize: '70px',
                          color: healthColour,
                          fontWeight: 'bold',
                          position: 'absolute',  // Position the text absolutely
                          top: '50%',            // Adjust as needed to center the text vertically
                          left: '50%',           // Adjust as needed to center the text horizontally
                          transform: healthPos,  // Center the text using transform
                          margin: '0',
                        }}
                      >
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
        imageAspectRatio: '1:1',
        image: image,
        intents: intents
    });
});






app.frame('/fleedeath', (c) => {
  //UPDATE SERVER WITH TIMEGATE AND OTHER STATS
  expirationTimeRem = new Date(Date.now() + 69);
  player.framesLoaded += 1;
  
  timerWatch = expirationTimeRem.setMinutes(expirationTimeRem.getMinutes() + 2);

  /*updateData(farcasterid, currentframe, deathFrame, timerWatch)
    .then(() => {
      console.log('Data updated successfully');
      
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });*/

  return c.res({

    
    image : 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNegDycqdWkx8jPFqeaFdwUuwWp9ng9edUV6cbZk2xT7S',
  
    
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
    player.framesLoaded += 1;


   progressMarker = { ...progressMarker, previousFrame: '/battle1' };


    if (player.specials === 0) {
      
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZdiD67ecZrGc5E737xETYfsuqo4D6hWBuU6J78dMHNNL';
        intents = [<Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];
    } else {
 
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZdiD67ecZrGc5E737xETYfsuqo4D6hWBuU6J78dMHNNL';
        intents = [<Button action="/SwiftAttack">SwiftAtk</Button>,<Button action="/HeavyAttack">PowerAtk</Button>,<Button action="/activatespecialAttack">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


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
    player.framesLoaded += 1;

   progressMarker = { ...progressMarker, previousFrame: '/fight2' };


    if (player.specials === 0) {
      //player has no special attack

        if (fightRandomImage < 1) {

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmXF9tYD6rLdjf7s1GmMi9McuLzsBf8ukgZRQTRMjtP4Ni';
          intents = [<Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage === 1) {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmR41sz25WCyfAVeCZuhwTfFuG7njXbSndenW8m6DVResk';
          intents = [<Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmR41sz25WCyfAVeCZuhwTfFuG7njXbSndenW8m6DVResk';
          intents = [<Button action="/SwiftAttack">Swift Attack</Button>,<Button action="/HeavyAttack">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
        
    } else {
 
       
        
        if (fightRandomImage < 1) {

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmXF9tYD6rLdjf7s1GmMi9McuLzsBf8ukgZRQTRMjtP4Ni';
          intents = [<Button action="/SwiftAttack">SwiftAtk</Button>,<Button action="/HeavyAttack">PowerAtk</Button>,<Button action="/activatespecialAttack">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage === 1) {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmR41sz25WCyfAVeCZuhwTfFuG7njXbSndenW8m6DVResk';
          intents = [<Button action="/SwiftAttack">SwiftAtk</Button>,<Button action="/HeavyAttack">PowerAtk</Button>,<Button action="/activatespecialAttack">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmR41sz25WCyfAVeCZuhwTfFuG7njXbSndenW8m6DVResk';
          intents = [<Button action="/SwiftAttack">SwiftAtk</Button>,<Button action="/HeavyAttack">PowerAtk</Button>,<Button action="/activatespecialAttack">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

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
    player.framesLoaded += 1;

    const swiftRandomNum = Math.floor(Math.random() * 12);
    const swiftRandomMiss = Math.floor(Math.random() * 3);


    if (swiftRandomNum < 3) {
        // glancing blow
        enemy1.life -= 7

        if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQuKSdfjxw2JBJDeDfGbCD8XzkLjjAg2RdvRW69ipeFun';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmeNn79SXXnbz3pw5JoqmbvMQzEzbdPbnDmNpADa3cgHTc';
          intents = [<Button action="/battle1narrative1">Continue</Button>];


        }
        


    } else if (swiftRandomNum === 3) {
      // attack missed
      if (swiftRandomMiss < 1) {
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmXHKZgcWhjGKKkwPiSqEswLsQ2gpGGcQQ2ro8aAdiWnFR';
        intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

      } else {

        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNkS5Bzf18WJeQHqfwCbAk9gB7L6DuDYXP1DCZALGE7cj';
        intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

      }



    } else if (swiftRandomNum === 4) {
      //critical hit
      enemy1.life -= 28

      if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQj5D4mqcLwgxiy4LiQiwSghpswrMamVSuMW4XamVZ6q8';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

      } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmeNn79SXXnbz3pw5JoqmbvMQzEzbdPbnDmNpADa3cgHTc';
          intents = [<Button action="/battle1narrative1">Continue</Button>];


      }
      

    } else {
        // normal attack
        enemy1.life -= 14

        if (enemy1.life > 0) {
          //enemy is still alive

            if (swiftRandomMiss < 1) {
              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPDZSMpBDnGhWzLgULEQKNqVbb665J3otjbogDKfeQkbf';
              intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

            }else if (swiftRandomMiss === 1) {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmcSmgZiFGXeR7X44HvQXtyDW2Ncf1f8JDpTyRUhYpMmXd';
              intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

            } else {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPDZSMpBDnGhWzLgULEQKNqVbb665J3otjbogDKfeQkbf';
              intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

            }

          

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmeNn79SXXnbz3pw5JoqmbvMQzEzbdPbnDmNpADa3cgHTc';
          intents = [<Button action="/battle1narrative1">Continue</Button>];


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
    player.framesLoaded += 1;


    const heavyRandomNum =  Math.floor(Math.random() * 12);
    const heavyRandomMiss = Math.floor(Math.random() * 2);


    if (heavyRandomNum < 4) {
        // glancing blow
        enemy1.life -= 10

        
        if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQuKSdfjxw2JBJDeDfGbCD8XzkLjjAg2RdvRW69ipeFun';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmeNn79SXXnbz3pw5JoqmbvMQzEzbdPbnDmNpADa3cgHTc';
          intents = [<Button action="/battle1narrative1">Continue</Button>];


        }

    } else if (heavyRandomNum === 4) {
        // attack missed
        // attack missed
        if (heavyRandomMiss < 1) {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmXHKZgcWhjGKKkwPiSqEswLsQ2gpGGcQQ2ro8aAdiWnFR';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNkS5Bzf18WJeQHqfwCbAk9gB7L6DuDYXP1DCZALGE7cj';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        }

    } else if (heavyRandomNum === 5) {
          // attack missed
          if (heavyRandomMiss < 1) {
            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmXHKZgcWhjGKKkwPiSqEswLsQ2gpGGcQQ2ro8aAdiWnFR';
            intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

          } else {

            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNkS5Bzf18WJeQHqfwCbAk9gB7L6DuDYXP1DCZALGE7cj';
            intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

          }


    } else if (heavyRandomNum === 6) {
      //critical hit
      enemy1.life -= 40

      if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQj5D4mqcLwgxiy4LiQiwSghpswrMamVSuMW4XamVZ6q8';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

      } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmeNn79SXXnbz3pw5JoqmbvMQzEzbdPbnDmNpADa3cgHTc';
          intents = [<Button action="/battle1narrative1">Continue</Button>];


      }      

    } else {
        // normal attack
        enemy1.life -= 20

        if (enemy1.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmcdZhuCB7rujVAQtFmZzrRyue8CHde1YRdW1enRWQpADS';
          intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmeNn79SXXnbz3pw5JoqmbvMQzEzbdPbnDmNpADa3cgHTc';
          intents = [<Button action="/battle1narrative1">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});

app.frame('/activatespecialAttack', (c) => {
    let image;
    let intents;
    player.specials -=1;
    player.framesLoaded += 1;



    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZ5PVQgCqwRvWRGT2ogky5y9KXgqDyqmVvUsBySd9b6iN';
    intents = [<Button action="/specialAttack">Continue</Button>];


    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/specialAttack', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;
   
    const specialRandomNum = Math.floor(Math.random() * 12);

    const specialRandomMiss = Math.floor(Math.random() * 2);
    //progressMarker = { ...progressMarker, previousFrame: '/specialAttack' };


    if (specialRandomNum < 3) {
        //unsuccessful special attack 

        if (specialRandomMiss < 1) {
            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNkS5Bzf18WJeQHqfwCbAk9gB7L6DuDYXP1DCZALGE7cj';
            intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        } else {

            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNkS5Bzf18WJeQHqfwCbAk9gB7L6DuDYXP1DCZALGE7cj';
            intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

        }
              

    } else {
        // successful special attack
        enemy1.life -= 25

        if (enemy1.life > 0) {
          //enemy is still alive

          if (specialRandomMiss < 1) {
            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmcSmgZiFGXeR7X44HvQXtyDW2Ncf1f8JDpTyRUhYpMmXd';
            intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

          } else {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmcSmgZiFGXeR7X44HvQXtyDW2Ncf1f8JDpTyRUhYpMmXd';
              intents = [<Button action="/dodgeResult">Dodge</Button>,<Button action="/counterResult">Counter</Button>];

          }


        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmeNn79SXXnbz3pw5JoqmbvMQzEzbdPbnDmNpADa3cgHTc';
          intents = [<Button action="/battle1narrative1">Continue</Button>];


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
    player.framesLoaded += 1;

    //progressMarker = { ...progressMarker, previousFrame: '/dodgeResult' };
    const dodgeRandomNum = Math.floor(Math.random() * 10);


    if (dodgeRandomNum < 4) {
        // player dodged
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmdaUAHEH4tqRByTVjUo1ffBj1TYPeDfMUn2ehmt1ngpQy';
        intents = [<Button action="/fight2">Continue</Button>];

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmc4oohVGKdKP8BPtji2jcQgAMViEr2SbBmxnA74mQYzrs';
          intents = [<Button action="/fight2">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/page17' };
          deathFrame = "/page17";
          currentframe = "checktime";
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNnrvqokpzjXG7gwEyeMZFYT1PHqnJRcvqkd26o9yCeGM';
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
    player.framesLoaded += 1;

   
    const counterRandomNum = Math.floor(Math.random() * 10);


    if (counterRandomNum < 6) {
        // succesful counter
        enemy1.life -= 10
        
        if (enemy1.life > 0) {
          //show counter frame

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSFxrvFjwpzCEBVgLhrwjh1CmwwYRNjpQ54jee9zX7VBx';
          intents = [<Button action="/fight2">Continue</Button>];

        } else {
          // enemy is dead
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmeNn79SXXnbz3pw5JoqmbvMQzEzbdPbnDmNpADa3cgHTc';
          intents = [<Button action="/battle1narrative1">Continue</Button>];

        }
        

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmc4oohVGKdKP8BPtji2jcQgAMViEr2SbBmxnA74mQYzrs';
          intents = [<Button action="/fight2">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/page17' };
          deathFrame = "/page17";
          currentframe = "checktime";
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNnrvqokpzjXG7gwEyeMZFYT1PHqnJRcvqkd26o9yCeGM';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  //battle 1 pre narrative

  app.frame('/battle1narrative1', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;
    player.enemiesKilled += 1;
    progressMarker = { ...progressMarker, previousFrame: '/battle1narrative1' };
    currentframe = "battle1narrative1";

    updateData(farcasterid, currentframe, deathFrame, timerWatch, finalDecision)
    .then(() => {
      console.log('Data updated successfully');
      console.log(farcasterid)
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });

    
       image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmRJ4fDthSYXavqiSVZG2ZvxuwXEYeaeJzb4TtgxgdqcEb';
        intents = [
           <Button action="/battle1narrative2">Continue</Button>,
           <Button action="/showPlayerStatus">Status</Button>,

           
        ];


        return c.res({
           
            image: image,
            intents: intents
        });
    });


  app.frame('/battle1narrative2', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;

    progressMarker = { ...progressMarker, previousFrame: '/battle1narrative2' };
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmWoUYJhvAXXvrV7j6oMVZE8CKm5gnxsApLsJBgN6dCqka';
        intents = [
           <Button action="/narrative3">Open Door</Button>,
           <Button action="/showPlayerStatus">Status</Button>,

           
        ];


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
    player.framesLoaded += 1;

        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmX9FSHxxQ1RWZn776reeYsz1NjfeYbzpBPRUM6Nkzf1Sp';
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
  player.framesLoaded += 1;


  dodgeBowNum = Math.floor(Math.random() * 10);  // Assign value without redeclaring


  if (dodgeBowNum < 6) {
    //fail
    player.life -= 10
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSvaVSVuC83z1rxfF49XyJrbYDtKYTYNq1NbHau234BEG';

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
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmXkoV3P8tDyoVBcupxBHhSiHTpZRm3hijWgfCg4p48TQB';
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
  player.framesLoaded += 1;


  fleeBowNum = Math.floor(Math.random() * 10);  // Assign value without redeclaring


  if (fleeBowNum < 3) {
    //fail
    player.life -= 10
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSvaVSVuC83z1rxfF49XyJrbYDtKYTYNq1NbHau234BEG';

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
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmXkoV3P8tDyoVBcupxBHhSiHTpZRm3hijWgfCg4p48TQB';
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
    player.framesLoaded += 1;

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
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNnrvqokpzjXG7gwEyeMZFYT1PHqnJRcvqkd26o9yCeGM';

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
    player.framesLoaded += 1;

    progressMarker = { ...progressMarker, previousFrame: '/narrative1' };

        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmTsS1sYuLx5jf782y5Sc44Hkf9HE33MwiQLjsABY7UQYP';

        intents = [
           <Button action="/narrative1b">Continue</Button>,
           <Button action="/showPlayerStatus">Status</Button>,

           
        ];


        return c.res({
           
            image: image,
            intents: intents
        });
    });

  app.frame('/narrative1b', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;

        progressMarker = { ...progressMarker, previousFrame: '/narrative1b' };

        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPdRua6SAg1eNas4LKBf6U3Cxjcm1dnZaUctHtRH6tLft';

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
    player.framesLoaded += 1;

    progressMarker = { ...progressMarker, previousFrame: '/narrative3' };


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmWxYCky4M58htGzq6RqrW9iNckEB4v5bYxim9AwK1AUDB';
        intents = [
           
          
           <Button action="/narrative3a1">Approach</Button>, 
           <Button action="/narrative3b1">Wait</Button>,
           <Button action="/showPlayerStatus">Status</Button>,
           
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
    player.framesLoaded += 1;

    progressMarker = { ...progressMarker, previousFrame: '/narrative3b1' };


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmV7QsJfk2u7uSr1r3p8fwCGaz2xnHdPQ8BRcWNjuS2jzp';

        intents = [
           
           <Button action="/narrative3a1">Approach</Button>,
           <Button action="/narrative3b2">Stay Hidden</Button>,
            <Button action="/showPlayerStatus">Status</Button>,
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/narrative3b2', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;

    progressMarker = { ...progressMarker, previousFrame: '/narrative3b2' };


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNPAs5zPFtNLczLdYyy6q8osuueb8aSgT5QF48vJjr9V9';

        intents = [
           
           <Button action="/narrative3b3">Follow</Button>,
           <Button action="/narrative3a2">Search the Room</Button>,
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/narrative3b3', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;

    progressMarker = { ...progressMarker, previousFrame: '/narrative3b3' };


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmYzYCPMc8RvFiCU4ZKod2rjpf86Ar5wJ14zJEiTofNkid';

        intents = [
           
           <Button action="/trap3">Continue</Button>,
            <Button action="/showPlayerStatus">Status</Button>,
           
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
    player.framesLoaded += 1;

    progressMarker = { ...progressMarker, previousFrame: '/narrative3a1' };


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmcDFTNKMpwLqTDin8EkXYe9vgWmxkmZdf25TDRhszVokz';

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
    player.framesLoaded += 1;

    progressMarker = { ...progressMarker, previousFrame: '/narrative3a1a' };


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmcpGrNTtCNP9XaCQvpcWTX7WNG2eFvfDeNye8FhBBbY3k';

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
    player.framesLoaded += 1;

    player.metStranger += 1

    progressMarker = { ...progressMarker, previousFrame: '/narrative3a3' };


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmUsmC87PZjMnwNfz9UHfHgWQHYU7nsU9xoSAVWUyxtiek';

        intents = [
           
          
           <Button action="/trap3">Continue</Button>, 
            <Button action="/showPlayerStatus">Status</Button>,
           
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
    player.framesLoaded += 1;

    progressMarker = { ...progressMarker, previousFrame: '/narrative3a1b' };


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmeVnxyk1SRCxVKq8UNJPRWbLYwmWqjBwuSXhsCWRpuz4Q';

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
    player.framesLoaded += 1;


    progressMarker = { ...progressMarker, previousFrame: '/narrative3a2' };


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmciWKRjdcgWxyCv9voDhC8gstaQAq1xyUSqcBu7Y1o18q';

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
    player.framesLoaded += 1;


   progressMarker = { ...progressMarker, previousFrame: '/battle3' };


    if (player.specials === 0) {
      
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbQQiuKfuxXLFqG33iGsD4ZwafT3qfWtJxE3Aat75J3HT';
        intents = [<Button action="/SwiftAttack3">Swift Attack</Button>,<Button action="/HeavyAttack3">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];
    } else {
 
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbQQiuKfuxXLFqG33iGsD4ZwafT3qfWtJxE3Aat75J3HT';
        intents = [<Button action="/SwiftAttack3">SwiftAtk</Button>,<Button action="/HeavyAttack3">PowerAtk</Button>,<Button action="/activatespecialAttack3">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


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
    player.framesLoaded += 1;

   progressMarker = { ...progressMarker, previousFrame: '/fight2-3' };


    if (player.specials === 0) {
      //player has no special attack

        if (fightRandomImage3 < 1) {

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmaveR9CbEUyKEEYfJp2117u7EHqKB9xsJPaXb5E3poh1g';
          intents = [<Button action="/SwiftAttack3">Swift Attack</Button>,<Button action="/HeavyAttack3">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage3 === 1) {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmaveR9CbEUyKEEYfJp2117u7EHqKB9xsJPaXb5E3poh1g';
          intents = [<Button action="/SwiftAttack3">Swift Attack</Button>,<Button action="/HeavyAttack3">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmf88kPqJPm1Fu1FWeVeGUDKXAiQaBRtvk8wRt6z2xYCpY';
          intents = [<Button action="/SwiftAttack3">Swift Attack</Button>,<Button action="/HeavyAttack3">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
        
    } else {


        if (fightRandomImage3 < 1) {

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmaveR9CbEUyKEEYfJp2117u7EHqKB9xsJPaXb5E3poh1g';
          intents = [<Button action="/SwiftAttack3">SwiftAtk</Button>,<Button action="/HeavyAttack3">PowerAtk</Button>,<Button action="/activatespecialAttack3">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage3 === 1) {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmaveR9CbEUyKEEYfJp2117u7EHqKB9xsJPaXb5E3poh1g';
          intents = [<Button action="/SwiftAttack3">SwiftAtk</Button>,<Button action="/HeavyAttack3">PowerAtk</Button>,<Button action="/activatespecialAttack3">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmf88kPqJPm1Fu1FWeVeGUDKXAiQaBRtvk8wRt6z2xYCpY';
          intents = [<Button action="/SwiftAttack3">SwiftAtk</Button>,<Button action="/HeavyAttack3">PowerAtk</Button>,<Button action="/activatespecialAttack3">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

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
    player.framesLoaded += 1;

    const swiftRandomNum3 = Math.floor(Math.random() * 8);
    const swiftRandomMiss3 = Math.floor(Math.random() * 4);


    if (swiftRandomNum3 < 3) {
        // glancing blow
        enemy3.life -= 7

        if (enemy3.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmY6p7QzRS9UXrfz9EQ3DEoSzmg2sTkTKTc59eQVnf38pj';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVP4QhfqgHth29wbh5DmMq4y2CjTXPP6LDhNDEeLdGXSK';
          intents = [<Button action="/battle3transition">Continue</Button>];


        }
        


    } else if (swiftRandomNum3 === 3) {
      // attack missed
      if (swiftRandomMiss3 < 2) {
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmfMFRkmxhb4d33NhRnWwKcDnb8tnHuz1KGKvpZKoxS8CM';
        intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

      } else {

        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmesZRhrTRQUtdU2NY732g3vqmxnA26mdqDXtGEWJHHjwA';
        intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

      }



    } else if (swiftRandomNum3 === 4) {
      //critical hit
      enemy3.life -= 28

      if (enemy3.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmU2ru1vpVhh32YMrRQuREMDwLX8TMm3HQNZDQdiWMo9H1';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVP4QhfqgHth29wbh5DmMq4y2CjTXPP6LDhNDEeLdGXSK';
          intents = [<Button action="/battle3transition">Continue</Button>];


        }
      

    } else {
        // normal attack
        enemy3.life -= 14

        if (enemy3.life > 0) {
          //enemy is still alive

            if (swiftRandomMiss3 < 1) {
              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPzDyj6SrhCjGxhzEYrchyTtEkmUMNSxvidBPgqL447fR';
              intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

            }else if (swiftRandomMiss3 === 1) {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPzDyj6SrhCjGxhzEYrchyTtEkmUMNSxvidBPgqL447fR';
              intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

            } else {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPzDyj6SrhCjGxhzEYrchyTtEkmUMNSxvidBPgqL447fR';
              intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

            }

          

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVP4QhfqgHth29wbh5DmMq4y2CjTXPP6LDhNDEeLdGXSK';
          intents = [<Button action="/battle3transition">Continue</Button>];


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
    player.framesLoaded += 1;


    const heavyRandomNum3 = Math.floor(Math.random() * 12);
    const heavyRandomMiss3 = Math.floor(Math.random() * 2);


    if (heavyRandomNum3 < 4) {
        // glancing blow
        enemy3.life -= 10

        if (enemy3.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmY6p7QzRS9UXrfz9EQ3DEoSzmg2sTkTKTc59eQVnf38pj';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVP4QhfqgHth29wbh5DmMq4y2CjTXPP6LDhNDEeLdGXSK';
          intents = [<Button action="/battle3transition">Continue</Button>];


        }
        


    } else if (heavyRandomNum3 === 4) {
        // attack missed
        if (heavyRandomMiss3 < 1) {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmfMFRkmxhb4d33NhRnWwKcDnb8tnHuz1KGKvpZKoxS8CM';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmesZRhrTRQUtdU2NY732g3vqmxnA26mdqDXtGEWJHHjwA';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        }

    } else if (heavyRandomNum3 === 5) {
          // attack missed
          if (heavyRandomMiss3 < 1) {
            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmfMFRkmxhb4d33NhRnWwKcDnb8tnHuz1KGKvpZKoxS8CM';
            intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

          } else {

            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmesZRhrTRQUtdU2NY732g3vqmxnA26mdqDXtGEWJHHjwA';
            intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

          }


    } else if (heavyRandomNum3 === 6) {
      //critical hit
      enemy3.life -= 40

      if (enemy3.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmU2ru1vpVhh32YMrRQuREMDwLX8TMm3HQNZDQdiWMo9H1';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVP4QhfqgHth29wbh5DmMq4y2CjTXPP6LDhNDEeLdGXSK';
          intents = [<Button action="/battle3transition">Continue</Button>];


        }      

    } else {
        // normal attack
        enemy3.life -= 20

        if (enemy3.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmboEvaGf4qvGgGE2d75QwT5R3ZtwNYRCUcVLs9cQSmoyX';
          intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVP4QhfqgHth29wbh5DmMq4y2CjTXPP6LDhNDEeLdGXSK';
          intents = [<Button action="/battle3transition">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/activatespecialAttack3', (c) => {
    let image;
    let intents;
    player.specials -=1;
    player.framesLoaded += 1;



    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZ5PVQgCqwRvWRGT2ogky5y9KXgqDyqmVvUsBySd9b6iN';
    intents = [<Button action="/specialAttack3">Continue</Button>];


    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/specialAttack3', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;
   
    const specialRandomNum3 = Math.floor(Math.random() * 8);

    const specialRandomMiss3 = Math.floor(Math.random() * 2);
    //progressMarker = { ...progressMarker, previousFrame: '/specialAttack' };


    if (specialRandomNum3 < 3) {
        //unsuccessful special attack 

        if (specialRandomMiss3 < 1) {
            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmesZRhrTRQUtdU2NY732g3vqmxnA26mdqDXtGEWJHHjwA';
            intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        } else {

            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmesZRhrTRQUtdU2NY732g3vqmxnA26mdqDXtGEWJHHjwA';
            intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

        }
              

    } else {
        // successful special attack
        enemy3.life -= 25

        if (enemy3.life > 0) {
          //enemy is still alive

          if (specialRandomMiss3 < 1) {
            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmboEvaGf4qvGgGE2d75QwT5R3ZtwNYRCUcVLs9cQSmoyX';
            intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

          } else {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmboEvaGf4qvGgGE2d75QwT5R3ZtwNYRCUcVLs9cQSmoyX';
              intents = [<Button action="/dodgeResult3">Dodge</Button>,<Button action="/counterResult3">Counter</Button>];

          }


        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVP4QhfqgHth29wbh5DmMq4y2CjTXPP6LDhNDEeLdGXSK';
          intents = [<Button action="/battle3transition">Continue</Button>];


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
    player.framesLoaded += 1;

    //progressMarker = { ...progressMarker, previousFrame: '/dodgeResult' };
    const dodgeRandomNum3 = Math.floor(Math.random() * 10);


    if (dodgeRandomNum3 < 4) {
        // player dodged
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZ4kH9PjGrsbrKkGUkDznxetJ3LkSRqsqGQbkmiS6jVFk';
        intents = [<Button action="/fight2-3">Continue</Button>];

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmUDZS4oKNaTt4zvy3aPhoSWLdyRRL97XWErSq1vBgPutG';
          intents = [<Button action="/fight2-3">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative3' };
          deathFrame = "/narrative3";
          currentframe = "checktime";
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNnrvqokpzjXG7gwEyeMZFYT1PHqnJRcvqkd26o9yCeGM';
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
    player.framesLoaded += 1;

   
    const counterRandomNum3 = Math.floor(Math.random() * 10);


    if (counterRandomNum3 < 7) {
        // succesful counter
        enemy3.life -= 10
        

        if (enemy3.life > 0) {
          //show counter frame

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmcXe9JyZ9hhYvH2ua1AQMiJSHFkoYMF6u4QUUqALQXhqr';
          intents = [<Button action="/fight2-3">Continue</Button>];

        } else {
          // enemy is dead
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVP4QhfqgHth29wbh5DmMq4y2CjTXPP6LDhNDEeLdGXSK';
          intents = [<Button action="/battle3transition">Continue</Button>];

        }
        

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmUDZS4oKNaTt4zvy3aPhoSWLdyRRL97XWErSq1vBgPutG';
          intents = [<Button action="/fight2-3">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative3' };
          deathFrame = "/narrative3";
          currentframe = "checktime";
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNnrvqokpzjXG7gwEyeMZFYT1PHqnJRcvqkd26o9yCeGM';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});





  // battle 3 transition

  app.frame('/battle3transition', (c) => {
      let image;
      let intents;
      player.framesLoaded += 1;
      player.enemiesKilled += 1;
      progressMarker = { ...progressMarker, previousFrame: '/battle3transition' };
      currentframe = "battle3transition";

      updateData(farcasterid, currentframe, deathFrame, timerWatch, finalDecision)
      .then(() => {
        console.log('Data updated successfully');
        console.log(farcasterid)
      })
      .catch((error) => {
        console.error('Error updating data:', error.message);
      });

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmTGxRnfVLAuRMAM1y6PjnQSkTYRZm1mobY8cvT4mTQ8TT';

          intents = [
             
             <Button action="/narrative6">Continue</Button>,
             <Button action="/showPlayerStatus">Status</Button>,

             
          ];


      return c.res({
         
          image: image,
          intents: intents
      });
  });
















  /////////////////////////////////////////////////////////////////////////////////////////////////////


app.frame('/narrative5', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;

        progressMarker = { ...progressMarker, previousFrame: '/narrative5' };
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmWUp7ygZ1L1otEDQny5cBALuYsL9UtnjN6qDrcpkdacJq';

        intents = [
           
           <Button action="/drink">Drink</Button>,
           <Button action="/resist">Resist Urge</Button>,
           <Button action="/showPlayerStatus">Status</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});

app.frame('/resist', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;

        progressMarker = { ...progressMarker, previousFrame: '/resist' };
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVvSR9YKJwZVvBiES7v4aNn7HLwjD4qWgTgcHfMN3axv3';

        intents = [
           
           <Button action="/drink">Drink</Button>,
           <Button action="/resistb">Resist Urge</Button>,
           <Button action="/showPlayerStatus">Status</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/resistb', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;

        progressMarker = { ...progressMarker, previousFrame: '/resistb' };

        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmdBpZD78RzBGZzWdCsj4AwKvVKMETUmBARycuRZFcCvSr';

        intents = [
           
           <Button action="/battle2">Continue</Button>,
           <Button action="/showPlayerStatus">Status</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/drink', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;

        progressMarker = { ...progressMarker, previousFrame: '/drink' };
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmePWvowfgGfo8tF6HhsJnRyQ1aDrsxKDv442ovYhNSLAL';

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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbxX9ZTsjQCZF9eARwfzEmVd3mpBA8f9TKnnFFmzqPZu4';

        intents = [
           
           <Button action="/vision2">Open Your Eyes</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/vision2', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPvg4aKCkJoN9bxXQ7tmacKYkYjtatqkRxqWwFsXqTdcp';

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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSTkwR1TNimLCCAMxnyaUR7Gw3JVrswhgz8sE1RgAqRL8';

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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSV3TSet8oNox4HNnNPgeCwbfyRasTTn2NJv9n6vZto6A';

        intents = [
           
           <Button action="/vision5">Open Your Eyes</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/vision5', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbJeJDi7BLQR3eJWwNf1ptM67Xixeos5FHDg5bXeNBjSv';

        intents = [
           
           <Button action="/vision6">Approach</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});


app.frame('/vision6', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmdoFDksyrPCSqfyqN3RV6i8F4VFKhvBfQGekZWBmA889t';

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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmfHYTuLy2uLZntN4FhNT3qffHhwsaQURnYa3yvWPGiRiL';

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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQAyNkuAviG95CrQ3LyGSbfHnRbtdCqc6yckyGofLvTjM';

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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmTZy9zMM5wg8KWGCSJJQtX1dVFoftu2XpbtHCALEkwNBm';

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
    player.framesLoaded += 1;


        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmUsq3VtqXpV4qQVbv9Hk6av6LWddAA7BHn9NnDNtJHDXL';
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
    player.framesLoaded += 1;



        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmbs6wLadgFGZNvBeBR5DKV5MUtPexkFHqkY1rfjEhajWA';

        intents = [
           
           <Button action="/vision13">Continue</Button>,
          
           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});



app.frame('/vision12', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;



        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmWUp7ygZ1L1otEDQny5cBALuYsL9UtnjN6qDrcpkdacJq';

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
      player.framesLoaded += 1;



        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmV1dK9BwyaVf7VWPYonpL1wK4tgc9FWeCuerPHvVrYfUH';
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
      player.framesLoaded += 1;


   progressMarker = { ...progressMarker, previousFrame: '/battle5' };


    if (player.specials === 0) {
      
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmRpAHjhd2UofrUSE6YGib1CSoeyPvZfUnZ2MSpFgReRPS';
        intents = [<Button action="/SwiftAttack5">Swift Attack</Button>,<Button action="/HeavyAttack5">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];
    } else {
 
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmRpAHjhd2UofrUSE6YGib1CSoeyPvZfUnZ2MSpFgReRPS';
        intents = [<Button action="/SwiftAttack5">SwiftAtk</Button>,<Button action="/HeavyAttack5">PowerAtk</Button>,<Button action="/activatespecialAttack5">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


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
      player.framesLoaded += 1;

   progressMarker = { ...progressMarker, previousFrame: '/fight2-5' };


    if (player.specials === 0) {
      //player has no special attack

        if (fightRandomImage5 < 1) {

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmYRhx4kE6KFEH2wQFsyE77z7eD5w8qKYtB6NrtxqhGmX4';
          intents = [<Button action="/SwiftAttack5">Swift Attack</Button>,<Button action="/HeavyAttack5">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage5 === 1) {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmYRhx4kE6KFEH2wQFsyE77z7eD5w8qKYtB6NrtxqhGmX4';
          intents = [<Button action="/SwiftAttack5">Swift Attack</Button>,<Button action="/HeavyAttack5">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmUCUKh5uqDT29CTkxmoKRPHSaU3hssbrCvVR9cPA8g765';
          intents = [<Button action="/SwiftAttack5">Swift Attack</Button>,<Button action="/HeavyAttack5">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
        
    } else {

        if (fightRandomImage5 < 1) {

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmYRhx4kE6KFEH2wQFsyE77z7eD5w8qKYtB6NrtxqhGmX4';
           intents = [<Button action="/SwiftAttack5">SwiftAtk</Button>,<Button action="/HeavyAttack5">PowerAtk</Button>,<Button action="/activatespecialAttack5">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


        } else if (fightRandomImage5 === 1) {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmYRhx4kE6KFEH2wQFsyE77z7eD5w8qKYtB6NrtxqhGmX4';
           intents = [<Button action="/SwiftAttack5">SwiftAtk</Button>,<Button action="/HeavyAttack5">PowerAtk</Button>,<Button action="/activatespecialAttack5">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


        } else {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmUCUKh5uqDT29CTkxmoKRPHSaU3hssbrCvVR9cPA8g765';
           intents = [<Button action="/SwiftAttack5">SwiftAtk</Button>,<Button action="/HeavyAttack5">PowerAtk</Button>,<Button action="/activatespecialAttack5">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


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
    player.framesLoaded += 1;

    const swiftRandomNum5 =  Math.floor(Math.random() * 10);
    const swiftRandomMiss5 = Math.floor(Math.random() * 3);


    if (swiftRandomNum5 < 3) {
        // glancing blow
        enemy5.life -= 7

        if (enemy5.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmb7MERsrF5PBBtWkmoERNJ4vhCfEco8BMipvftywXVsHH';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbopY8BrvTzdBgKtfDjorAGrSU8H5QQPxqUf99WJc9xPD';
          intents = [<Button action="/scriptedfight">Continue</Button>];


        }
        


    } else if (swiftRandomNum5 === 3) {
      // attack missed
      if (swiftRandomMiss5 < 1) {
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmc3NXBffffq4Br6QfazAgAuDfrL3VLFKWuVu77ARhev7w';
        intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

      } else {

        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmYEVoJUbGoB8D1vUz6wywTpYEF2iF5GGHkTWhHoMfc1BJ';
        intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

      }



    } else if (swiftRandomNum5 === 4) {
      //critical hit
      enemy5.life -= 28

      if (enemy5.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmdDTJ1QbaM8JMSMrgNMe9qUDAY41CkFrWP5RMfMDjuY5m';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbopY8BrvTzdBgKtfDjorAGrSU8H5QQPxqUf99WJc9xPD';
          intents = [<Button action="/scriptedfight">Continue</Button>];


        }
      

    } else {
        // normal attack
        enemy5.life -= 14

        if (enemy5.life > 0) {
          //enemy is still alive

            if (swiftRandomMiss5 < 1) {
              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQiQErQi7K2U1bDXH5bqR7qNcuegmHvDznu3xwoCYew2U';
              intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

            }else if (swiftRandomMiss5 === 1) {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQiQErQi7K2U1bDXH5bqR7qNcuegmHvDznu3xwoCYew2U';
              intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

            } else {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmRv1hfuSYRtUpdfBXUB82cHJtDJ1AzgyGQcW3nG5jQqn8';
              intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

            }

          

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbopY8BrvTzdBgKtfDjorAGrSU8H5QQPxqUf99WJc9xPD';
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

  player.framesLoaded += 1;

    const heavyRandomNum5 = Math.floor(Math.random() * 9);
    const heavyRandomMiss5 = Math.floor(Math.random() * 2);


    if (heavyRandomNum5 < 4) {
        // glancing blow
        enemy5.life -= 10

        if (enemy5.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmb7MERsrF5PBBtWkmoERNJ4vhCfEco8BMipvftywXVsHH';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbopY8BrvTzdBgKtfDjorAGrSU8H5QQPxqUf99WJc9xPD';
          intents = [<Button action="/scriptedfight">Continue</Button>];


        }
        


    } else if (heavyRandomNum5 === 4) {
        // attack missed
        if (heavyRandomMiss5 < 1) {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmc3NXBffffq4Br6QfazAgAuDfrL3VLFKWuVu77ARhev7w';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmYEVoJUbGoB8D1vUz6wywTpYEF2iF5GGHkTWhHoMfc1BJ';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        }

    } else if (heavyRandomNum5 === 5) {
          // attack missed
          if (heavyRandomMiss5 < 1) {
            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmc3NXBffffq4Br6QfazAgAuDfrL3VLFKWuVu77ARhev7w';
            intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

          } else {

            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmYEVoJUbGoB8D1vUz6wywTpYEF2iF5GGHkTWhHoMfc1BJ';
            intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

          }


    } else if (heavyRandomNum5 === 6) {
      //critical hit
      enemy5.life -= 40

      if (enemy5.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmdDTJ1QbaM8JMSMrgNMe9qUDAY41CkFrWP5RMfMDjuY5m';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbopY8BrvTzdBgKtfDjorAGrSU8H5QQPxqUf99WJc9xPD';
          intents = [<Button action="/scriptedfight">Continue</Button>];


        }      

    } else {
        // normal attack
        enemy5.life -= 20

        if (enemy5.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSvrT6fLwcpJckVKwDypQjV58tkLyNkiG6UwxEQD1G3Qd';
          intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbopY8BrvTzdBgKtfDjorAGrSU8H5QQPxqUf99WJc9xPD';
          intents = [<Button action="/scriptedfight">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});

app.frame('/activatespecialAttack5', (c) => {
    let image;
    let intents;
    player.specials -=1;
    player.framesLoaded += 1;



    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZ5PVQgCqwRvWRGT2ogky5y9KXgqDyqmVvUsBySd9b6iN';
    intents = [<Button action="/specialAttack5">Continue</Button>];


    return c.res({
        image: image,
        intents: intents
    });
});

app.frame('/specialAttack5', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;

    const specialRandomNum5 = Math.floor(Math.random() * 8);

    const specialRandomMiss5 = Math.floor(Math.random() * 2);
    //progressMarker = { ...progressMarker, previousFrame: '/specialAttack' };


    if (specialRandomNum5 < 3) {
        //unsuccessful special attack 

        if (specialRandomMiss5 < 1) {
            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmc3NXBffffq4Br6QfazAgAuDfrL3VLFKWuVu77ARhev7w';
            intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        } else {

            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmYEVoJUbGoB8D1vUz6wywTpYEF2iF5GGHkTWhHoMfc1BJ';
            intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

        }
              

    } else {
        // successful special attack
        enemy5.life -= 25

        if (enemy5.life > 0) {
          //enemy is still alive

          if (specialRandomMiss5 < 1) {
            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSvrT6fLwcpJckVKwDypQjV58tkLyNkiG6UwxEQD1G3Qd';
            intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

          } else {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSvrT6fLwcpJckVKwDypQjV58tkLyNkiG6UwxEQD1G3Qd';
              intents = [<Button action="/dodgeResult5">Dodge</Button>,<Button action="/counterResult5">Counter</Button>];

          }


        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbopY8BrvTzdBgKtfDjorAGrSU8H5QQPxqUf99WJc9xPD';
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
      player.framesLoaded += 1;

    //progressMarker = { ...progressMarker, previousFrame: '/dodgeResult' };
    const dodgeRandomNum5 = Math.floor(Math.random() * 10);


    if (dodgeRandomNum5 < 5) {
        // player dodged
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmeUv4mZsDCcg134EabTQaHffEWt9fxiCHbih1mYxa8Dqt';
        intents = [<Button action="/fight2-5">Continue</Button>];

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmY63VD6WvZDbbKus4yiXf3hhZgiEmAxNuZHyqkj3dHm7c';
          intents = [<Button action="/fight2-5">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative8' };
          deathFrame = "/narrative8";
          currentframe = "checktime";
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNnrvqokpzjXG7gwEyeMZFYT1PHqnJRcvqkd26o9yCeGM';
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
    player.framesLoaded += 1;

   
    const counterRandomNum5 = Math.floor(Math.random() * 10);


    if (counterRandomNum5 < 6) {
        // successful counter
        enemy5.life -= 10
        
        if (enemy5.life > 0) {
          //show counter frame

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmUnXRKdDHtEh9yC4AYeqyq3JpgVcM81GjeHZmGACPBve9';
          intents = [<Button action="/fight2-5">Continue</Button>];

        } else {
          // enemy is dead
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbopY8BrvTzdBgKtfDjorAGrSU8H5QQPxqUf99WJc9xPD';
          intents = [<Button action="/scriptedfight">Continue</Button>];

        }
        

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmY63VD6WvZDbbKus4yiXf3hhZgiEmAxNuZHyqkj3dHm7c';
          intents = [<Button action="/fight2-5">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative8' };
          deathFrame = "/narrative8";
          currentframe = "checktime";
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNnrvqokpzjXG7gwEyeMZFYT1PHqnJRcvqkd26o9yCeGM';
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
      player.framesLoaded += 1;
      player.enemiesKilled += 1;


        progressMarker = { ...progressMarker, previousFrame: '/narrative2' };

        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSu74DB7bz9LLGcg5T5HPaPx44Rs8JKXznFPgD5qjBsGL';

        intents = [
           
           <Button action="/narrative4">Continue</Button>,
           <Button action="/showPlayerStatus">Status</Button>,

           
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
  player.framesLoaded += 1;

        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVC4VpzWAdwWuM1DEmPXLZkA4UZSckDvjxakEWTRDy1Px';

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
  player.framesLoaded += 1;


  trap2opt1Num = Math.floor(Math.random() * 10);  // Assign value without redeclaring


  if (trap2opt1Num < 5) {
    //fail
    player.life -= 10
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmfRETdftZq5o9t9wb3L6KSihxGLat5rPjrsCYqmqt6RWh';


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
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmcsGzdscj1rKayjnjD8ThkVkMar46T23F6TVGuBZAUJcv';

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
  player.framesLoaded += 1;


  trap2option2Num = Math.floor(Math.random() * 10);  // Assign value without redeclaring


  if (trap2option2Num < 3) {
    //fail
    player.life -= 10
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmfRETdftZq5o9t9wb3L6KSihxGLat5rPjrsCYqmqt6RWh';


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
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmcsGzdscj1rKayjnjD8ThkVkMar46T23F6TVGuBZAUJcv';

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
        player.framesLoaded += 1;

        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmRPZLbvDDygBstEufpsUPfTrBBdwKiKx9eK1foX7vhZSD';

        intents = [
           
           <Button action="/trap3Option">Walk Slowly</Button>,
           <Button action="/trap3Option2">Walk Quickly</Button>,
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
  player.framesLoaded += 1;


  trap3num = Math.floor(Math.random() * 10);  // Assign value without redeclaring

  if (player.metStranger > 0){
    trap3num = 7
  }


  if (trap3num < 2) {
    //fail
    player.life -= 10
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmew3SnZRsxEYBGsyK83suezirJo5YLRYcvHJMTDsXnfeq';


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
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmXmYYQgALdcf4VEDMoPVSHkX6xLWdfgahHqBjaYB3UVqJ';

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
  player.framesLoaded += 1;

  trap3num = Math.floor(Math.random() * 10);  // Assign value without redeclaring

  if (player.metStranger > 0){
    trap3num = 7
  }


  if (trap3num < 6) {
    //fail
    player.life -= 10
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmew3SnZRsxEYBGsyK83suezirJo5YLRYcvHJMTDsXnfeq';


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
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmXmYYQgALdcf4VEDMoPVSHkX6xLWdfgahHqBjaYB3UVqJ';

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
    player.framesLoaded += 1;
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVjXoWpVnVZ3KiDBymrB7ZAEXkuTGj2aZrYWMaibpYbpA';

        intents = [
           
           <Button action="/narrative4b">Continue</Button>,
           <Button action="/showPlayerStatus">Status</Button>,

           
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
    player.framesLoaded += 1;
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmcGqBRkSgKEns758meQuvPQaNVCceUbCh5EKN7pQrGxJa';
 
        intents = [
           
           <Button action="/battle4">Continue</Button>,
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
    player.framesLoaded += 1;

   progressMarker = { ...progressMarker, previousFrame: '/battle2' };


    if (player.specials === 0) {
      
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmfA3RDZrAPwU5hT6as2M9zLwgzzDfckZ9P3KippYsCiPH';
        intents = [<Button action="/SwiftAttack2">Swift Attack</Button>,<Button action="/HeavyAttack2">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];
    } else {
 
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmfA3RDZrAPwU5hT6as2M9zLwgzzDfckZ9P3KippYsCiPH';
        intents = [<Button action="/SwiftAttack2">SwiftAtk</Button>,<Button action="/HeavyAttack2">PowerAtk</Button>,<Button action="/activatespecialAttack2">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


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
    player.framesLoaded += 1;
   progressMarker = { ...progressMarker, previousFrame: '/fight2-2' };


    if (player.specials === 0) {
      //player has no special attack

        if (fightRandomImage2 < 2) {

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmaGHYraPH7SRscShoDJ5o9L58uKXKCQb8WUGiLWKgZzbU';
          intents = [<Button action="/SwiftAttack2">Swift Attack</Button>,<Button action="/HeavyAttack2">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage2 === 1) {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSxnRxiEtu1KD4ZxM72YYiUmMYGHmXkaQsaAjU9iJKSzz';
          intents = [<Button action="/SwiftAttack2">Swift Attack</Button>,<Button action="/HeavyAttack2">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSxnRxiEtu1KD4ZxM72YYiUmMYGHmXkaQsaAjU9iJKSzz';
          intents = [<Button action="/SwiftAttack2">Swift Attack</Button>,<Button action="/HeavyAttack2">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
        
    } else {

        if (fightRandomImage2 < 2) {

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmaGHYraPH7SRscShoDJ5o9L58uKXKCQb8WUGiLWKgZzbU';
          intents = [<Button action="/SwiftAttack2">SwiftAtk</Button>,<Button action="/HeavyAttack2">PowerAtk</Button>,<Button action="/activatespecialAttack2">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage2 === 1) {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSxnRxiEtu1KD4ZxM72YYiUmMYGHmXkaQsaAjU9iJKSzz';
          intents = [<Button action="/SwiftAttack2">SwiftAtk</Button>,<Button action="/HeavyAttack2">PowerAtk</Button>,<Button action="/activatespecialAttack2">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSxnRxiEtu1KD4ZxM72YYiUmMYGHmXkaQsaAjU9iJKSzz';
          intents = [<Button action="/SwiftAttack2">SwiftAtk</Button>,<Button action="/HeavyAttack2">PowerAtk</Button>,<Button action="/activatespecialAttack2">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

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
    player.framesLoaded += 1;
    const swiftRandomNum2 = Math.floor(Math.random() * 12);
    const swiftRandomMiss2 = Math.floor(Math.random() * 4);


    if (swiftRandomNum2 < 3) {
        // glancing blow
        enemy2.life -= 7

        if (enemy2.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmeMz6t8xZbimNFXA64nPS1LwADT9j3w9SUSiRqhDo4SYi';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPFcu6femE2hn7A9AWgJmNdxdfY8LVRz32UhUMixwzcZ5';
          intents = [<Button action="/battle2transition">Continue</Button>];


        }
        


    } else if (swiftRandomNum2 === 3) {
      // attack missed
      if (swiftRandomMiss2 < 2) {
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmfUaRc9iDxYHqdDVgGYQsH7TGfvgEd3BZXhNnWVTkvsj3';
        intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

      } else {

        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZsU4UkkkSSGiPSeGkxudHtybkonMSdomqFDu5WzhTGoU';
        intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

      }



    } else if (swiftRandomNum2 === 4) {
      //critical hit
      enemy2.life -= 28

      if (enemy2.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQmWq1zLQdp4jt9yGnqaC3kbm851o1C6ppe6HdBK9wNbh';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPFcu6femE2hn7A9AWgJmNdxdfY8LVRz32UhUMixwzcZ5';
          intents = [<Button action="/battle2transition">Continue</Button>];


        }
      

    } else {
        // normal attack
        enemy2.life -= 14

        if (enemy2.life > 0) {
          //enemy is still alive

            if (swiftRandomMiss2 < 1) {
              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVSGHh5mpgf4KbgeiVS4auWGj9i299YC4KD2qz7JdM38L';
              intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

            }else if (swiftRandomMiss2 === 1) {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmdH6ZsUnN5LBuS3z3DBZEH11M6SLh76vLLztY3KdNd4kr';
              intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

            } else {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmdH6ZsUnN5LBuS3z3DBZEH11M6SLh76vLLztY3KdNd4kr';
              intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

            }

          

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPFcu6femE2hn7A9AWgJmNdxdfY8LVRz32UhUMixwzcZ5';
          intents = [<Button action="/battle2transition">Continue</Button>];


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
    player.framesLoaded += 1;

    const heavyRandomNum2 = Math.floor(Math.random() * 8);
    const heavyRandomMiss2 = Math.floor(Math.random() * 4);


    if (heavyRandomNum2 < 4) {
        // glancing blow
        enemy2.life -= 10

        if (enemy2.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmeMz6t8xZbimNFXA64nPS1LwADT9j3w9SUSiRqhDo4SYi';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPFcu6femE2hn7A9AWgJmNdxdfY8LVRz32UhUMixwzcZ5';
          intents = [<Button action="/battle2transition">Continue</Button>];


        }
        


    } else if (heavyRandomNum2 === 4) {
        // attack missed
        if (heavyRandomMiss2 < 2) {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmfUaRc9iDxYHqdDVgGYQsH7TGfvgEd3BZXhNnWVTkvsj3';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZsU4UkkkSSGiPSeGkxudHtybkonMSdomqFDu5WzhTGoU';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        }

    } else if (heavyRandomNum2 === 5) {
          // attack missed
          if (heavyRandomMiss2 < 2) {
            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmfUaRc9iDxYHqdDVgGYQsH7TGfvgEd3BZXhNnWVTkvsj3';
            intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

          } else {

            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZsU4UkkkSSGiPSeGkxudHtybkonMSdomqFDu5WzhTGoU';
            intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

          }


    } else if (heavyRandomNum2 === 6) {
      //critical hit
      enemy2.life -= 32

      if (enemy2.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQmWq1zLQdp4jt9yGnqaC3kbm851o1C6ppe6HdBK9wNbh';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPFcu6femE2hn7A9AWgJmNdxdfY8LVRz32UhUMixwzcZ5';
          intents = [<Button action="/battle2transition">Continue</Button>];


        }      

    } else {
        // normal attack
        enemy2.life -= 20

        if (enemy2.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQ1NQZ8VxkJDPnAe4G71xnrKCNwmju1BeYPqipyRvo6eF';
          intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPFcu6femE2hn7A9AWgJmNdxdfY8LVRz32UhUMixwzcZ5';
          intents = [<Button action="/battle2transition">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});

app.frame('/activatespecialAttack2', (c) => {
    let image;
    let intents;
    player.specials -=1;
    player.framesLoaded += 1;



    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZ5PVQgCqwRvWRGT2ogky5y9KXgqDyqmVvUsBySd9b6iN';
    intents = [<Button action="/specialAttack2">Continue</Button>];


    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/specialAttack2', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;
    const specialRandomNum2 = Math.floor(Math.random() * 10);

    const specialRandomMiss2 = Math.floor(Math.random() * 2);
    //progressMarker = { ...progressMarker, previousFrame: '/specialAttack' };


    if (specialRandomNum2 < 3) {
        //unsuccessful special attack 

        if (specialRandomMiss2 < 1) {
            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZsU4UkkkSSGiPSeGkxudHtybkonMSdomqFDu5WzhTGoU';
            intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        } else {

            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZsU4UkkkSSGiPSeGkxudHtybkonMSdomqFDu5WzhTGoU';
            intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

        }
              

    } else {
        // successful special attack
        enemy2.life -= 25

        if (enemy2.life > 0) {
          //enemy is still alive

          if (specialRandomMiss2 < 1) {
            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmdH6ZsUnN5LBuS3z3DBZEH11M6SLh76vLLztY3KdNd4kr';
            intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

          } else {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmdH6ZsUnN5LBuS3z3DBZEH11M6SLh76vLLztY3KdNd4kr';
              intents = [<Button action="/dodgeResult2">Dodge</Button>,<Button action="/counterResult2">Counter</Button>];

          }


        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPFcu6femE2hn7A9AWgJmNdxdfY8LVRz32UhUMixwzcZ5';
          intents = [<Button action="/battle2transition">Continue</Button>];


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
    player.framesLoaded += 1;
    //progressMarker = { ...progressMarker, previousFrame: '/dodgeResult' };
    const dodgeRandomNum2 = Math.floor(Math.random() * 10);


    if (dodgeRandomNum2 < 6) {
        // player dodged
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNR3VhcJZemLxQAgCkCighmfR9hAsZJ5VynEDYy3EQkfY';
        intents = [<Button action="/fight2-2">Continue</Button>];

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPoWKouxdNaVmTAUcLY1MUTLfC2Zend4zviUC6eLGqcWZ';
          intents = [<Button action="/fight2-2">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative6' };
          deathFrame = "/narrative6";
          currentframe = "checktime";
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNnrvqokpzjXG7gwEyeMZFYT1PHqnJRcvqkd26o9yCeGM';
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
    player.framesLoaded += 1;
   
    const counterRandomNum2 = Math.floor(Math.random() * 10);


    if (counterRandomNum2 < 4) {
        // succesful counter
        enemy2.life -= 10
        
        if (enemy2.life > 0) {
          //show counter frame

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmfVgdCH1ZFd3kZxcia2w7BZ7XFHSBddboRQV6Wty7rjmW';
          intents = [<Button action="/fight2-2">Continue</Button>];

        } else {
          // enemy is dead
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPFcu6femE2hn7A9AWgJmNdxdfY8LVRz32UhUMixwzcZ5';
          intents = [<Button action="/battle2transition">Continue</Button>];

        }
        

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPoWKouxdNaVmTAUcLY1MUTLfC2Zend4zviUC6eLGqcWZ';
          intents = [<Button action="/fight2-2">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative6' };
          deathFrame = "/narrative6";
          currentframe = "checktime";
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNnrvqokpzjXG7gwEyeMZFYT1PHqnJRcvqkd26o9yCeGM';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});



  //battle 2 transition


  app.frame('/battle2transition', (c) => {
      let image;
      let intents;
      progressMarker = { ...progressMarker, previousFrame: '/battle2transition' };
      player.framesLoaded += 1;
      player.enemiesKilled += 1;

      currentframe = "battle2transition";

      updateData(farcasterid, currentframe, deathFrame, timerWatch, finalDecision)
      .then(() => {
        console.log('Data updated successfully');
        console.log(farcasterid)
      })
      .catch((error) => {
        console.error('Error updating data:', error.message);
      });

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmetu9BauybkB2cpmhF3XVaXF1sbpeUKzwxumZG5J1P3uF';

          intents = [
             
             <Button action="/narrative7">Continue</Button>,
             <Button action="/showPlayerStatus">Status</Button>,

             
          ];


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
      player.framesLoaded += 1;

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmXnxx4KGBihrWpskHA6RsMGm1FxVYq7dNmb9KCkiwUM2J';

          intents = [
             
             <Button action="/narrative7b">Collect</Button>,
             <Button action="/showPlayerStatus">Status</Button>,

             
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
      player.framesLoaded += 1;
      image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQWukFi2mxifxUWwNzBVqsshVnAPdN924ysWyRWGoznXo';
          
          intents = [
             
             <Button action="/narrative8">Continue</Button>,
             <Button action="/showPlayerStatus">Status</Button>,

             
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
      player.framesLoaded += 1;

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZfDBSfVn44QBKT2hE5mA5rBw8CVEpTRMExw1bYD18of3';
          intents = [
             
             <Button action="/battle5">Fight</Button>,
             <Button action="/showPlayerStatus">Status</Button>,
             

             
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
    player.framesLoaded += 1;

   progressMarker = { ...progressMarker, previousFrame: '/battle4' };


    if (player.specials === 0) {
      
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQuS8TNPSdQsZuTogSJyqycH4qFwTBcoVhacPqhpDNnT9';
        intents = [<Button action="/SwiftAttack4">Swift Attack</Button>,<Button action="/HeavyAttack4">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];
    } else {
 
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQuS8TNPSdQsZuTogSJyqycH4qFwTBcoVhacPqhpDNnT9';
        intents = [<Button action="/SwiftAttack4">SwiftAtk</Button>,<Button action="/HeavyAttack4">PowerAtk</Button>,<Button action="/activatespecialAttack4">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];


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
    player.framesLoaded += 1;
   progressMarker = { ...progressMarker, previousFrame: '/fight2-4' };


    if (player.specials === 0) {
      //player has no special attack

        if (fightRandomImage4 < 1) {

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmaxiXAZ4aha5nkWebQLpoCLDjd8vpSwLMksxN5XLs73gU';
          intents = [<Button action="/SwiftAttack4">Swift Attack</Button>,<Button action="/HeavyAttack4">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage4 === 1) {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmX9VsGi4SS2arZJXXEo3Zd8R9arpz9dyMUmtgxJd7P46W';
          intents = [<Button action="/SwiftAttack4">Swift Attack</Button>,<Button action="/HeavyAttack4">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmX9VsGi4SS2arZJXXEo3Zd8R9arpz9dyMUmtgxJd7P46W';
          intents = [<Button action="/SwiftAttack4">Swift Attack</Button>,<Button action="/HeavyAttack4">Power Attack</Button>,<Button action="/showPlayerStatus">Status</Button>];

        }
        
    } else {

      if (fightRandomImage4 < 1) {

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmaxiXAZ4aha5nkWebQLpoCLDjd8vpSwLMksxN5XLs73gU';
          intents = [<Button action="/SwiftAttack4">SwiftAtk</Button>,<Button action="/HeavyAttack4">PowerAtk</Button>,<Button action="/activatespecialAttack4">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else if (fightRandomImage4 === 1) {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmX9VsGi4SS2arZJXXEo3Zd8R9arpz9dyMUmtgxJd7P46W';
          intents = [<Button action="/SwiftAttack4">SwiftAtk</Button>,<Button action="/HeavyAttack4">PowerAtk</Button>,<Button action="/activatespecialAttack4">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

        } else {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmX9VsGi4SS2arZJXXEo3Zd8R9arpz9dyMUmtgxJd7P46W';
          intents = [<Button action="/SwiftAttack4">SwiftAtk</Button>,<Button action="/HeavyAttack4">PowerAtk</Button>,<Button action="/activatespecialAttack4">SpecialAtk</Button>,<Button action="/showPlayerStatus">Status</Button>];

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

    const swiftRandomNum4 = Math.floor(Math.random() * 12);
    const swiftRandomMiss4 = Math.floor(Math.random() * 4);
    player.framesLoaded += 1;

    if (swiftRandomNum4 < 3) {
        // glancing blow
        enemy4.life -= 7

        if (enemy4.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSRHgPQmt3fNnTrwLWEQANMJczitPeuGvGjK7Yb6VPiYn';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNURTJQGT7QhKXnE66PG5NeDXK5KAdppbtiB7disK7xtY';
          intents = [<Button action="/battle4transition">Continue</Button>];


        }
        


    } else if (swiftRandomNum4 === 3) {
      // attack missed
      if (swiftRandomMiss4 < 2) {
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQyxQAJfF1kA2ZEKaKnCvELrSdaXVskeXq4gtJsUqQGua';
        intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

      } else {

        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmURFVxaxvsyD2uswpjXymqwRQ9vUCnburCwkdxCfdtDmR';
        intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

      }



    } else if (swiftRandomNum4 === 4) {
      //critical hit
      enemy4.life -= 28

      if (enemy4.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmTW3YiYXMJhXV9wcrKaA2GVCXHNRLeGTy64WnvzKRr7sU';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNURTJQGT7QhKXnE66PG5NeDXK5KAdppbtiB7disK7xtY';
          intents = [<Button action="/battle4transition">Continue</Button>];


        }
      

    } else {
        // normal attack
        enemy4.life -= 14

        if (enemy4.life > 0) {
          //enemy is still alive

            if (swiftRandomMiss4 < 1) {
              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmT8Yb7rci4w6E9SgzkEJ85hynLAYXKa1VT2FfU8mEvGPj';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

            }else if (swiftRandomMiss4 === 1) {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmT8Yb7rci4w6E9SgzkEJ85hynLAYXKa1VT2FfU8mEvGPj';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

            } else {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVXUup96TCF6RwDowpNhALigEXGU51UdLgwcUtyJmbDWK';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

            }

          

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNURTJQGT7QhKXnE66PG5NeDXK5KAdppbtiB7disK7xtY';
          intents = [<Button action="/battle4transition">Continue</Button>];


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
    player.framesLoaded += 1;

    const heavyRandomNum4 = Math.floor(Math.random() * 8);
    const heavyRandomMiss4 = Math.floor(Math.random() * 4);


    if (heavyRandomNum4 < 4) {
        // glancing blow
        enemy4.life -= 10

        if (enemy4.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSRHgPQmt3fNnTrwLWEQANMJczitPeuGvGjK7Yb6VPiYn';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNURTJQGT7QhKXnE66PG5NeDXK5KAdppbtiB7disK7xtY';
          intents = [<Button action="/battle4transition">Continue</Button>];


        }
        


    } else if (heavyRandomNum4 === 4) {
        // attack missed
      if (heavyRandomMiss4 < 2) {
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQyxQAJfF1kA2ZEKaKnCvELrSdaXVskeXq4gtJsUqQGua';
        intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

      } else {

        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmURFVxaxvsyD2uswpjXymqwRQ9vUCnburCwkdxCfdtDmR';
        intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

      }

    } else if (heavyRandomNum4 === 5) {
          // attack missed
        if (heavyRandomMiss4 < 2) {
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQyxQAJfF1kA2ZEKaKnCvELrSdaXVskeXq4gtJsUqQGua';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmURFVxaxvsyD2uswpjXymqwRQ9vUCnburCwkdxCfdtDmR';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        }


    } else if (heavyRandomNum4 === 6) {
      //critical hit
      enemy4.life -= 35

      if (enemy4.life > 0) {
          //enemy is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmTW3YiYXMJhXV9wcrKaA2GVCXHNRLeGTy64WnvzKRr7sU';
          intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNURTJQGT7QhKXnE66PG5NeDXK5KAdppbtiB7disK7xtY';
          intents = [<Button action="/battle4transition">Continue</Button>];


        }      

    } else {
        // normal attack
        enemy4.life -= 20

        if (enemy4.life > 0) {
          //enemy is still alive

           if (heavyRandomMiss4 < 1) {
              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSubjtLaSNNKnmkMyFZR8XCiKLEw1WkwF6WNEqTHuW4cR';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

            }else if (heavyRandomMiss4 === 1) {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVXUup96TCF6RwDowpNhALigEXGU51UdLgwcUtyJmbDWK';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

            } else {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmSubjtLaSNNKnmkMyFZR8XCiKLEw1WkwF6WNEqTHuW4cR';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

            }


        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNURTJQGT7QhKXnE66PG5NeDXK5KAdppbtiB7disK7xtY';
          intents = [<Button action="/battle4transition">Continue</Button>];


        }

        
    }

    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/activatespecialAttack4', (c) => {
    let image;
    let intents;
    player.specials -=1;
    player.framesLoaded += 1;



    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZ5PVQgCqwRvWRGT2ogky5y9KXgqDyqmVvUsBySd9b6iN';
    intents = [<Button action="/specialAttack4">Continue</Button>];


    return c.res({
        image: image,
        intents: intents
    });
});


app.frame('/specialAttack4', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;
    const specialRandomNum4 = Math.floor(Math.random() * 8);

    const specialRandomMiss4 = Math.floor(Math.random() * 2);
    //progressMarker = { ...progressMarker, previousFrame: '/specialAttack' };


    if (specialRandomNum4 < 3) {
        //unsuccessful special attack 

        if (specialRandomMiss4 < 1) {
            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQyxQAJfF1kA2ZEKaKnCvELrSdaXVskeXq4gtJsUqQGua';
            intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        } else {

            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQyxQAJfF1kA2ZEKaKnCvELrSdaXVskeXq4gtJsUqQGua';
            intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

        }
              

    } else {
        // successful special attack
        enemy4.life -= 25

        if (enemy4.life > 0) {
          //enemy is still alive

          if (specialRandomMiss4 < 1) {
            image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVXUup96TCF6RwDowpNhALigEXGU51UdLgwcUtyJmbDWK';
            intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

          } else {

              image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVXUup96TCF6RwDowpNhALigEXGU51UdLgwcUtyJmbDWK';
              intents = [<Button action="/dodgeResult4">Dodge</Button>,<Button action="/counterResult4">Counter</Button>];

          }


        } else {
          // enemy is dead

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNURTJQGT7QhKXnE66PG5NeDXK5KAdppbtiB7disK7xtY';
          intents = [<Button action="/battle4transition">Continue</Button>];


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
    player.framesLoaded += 1;
    //progressMarker = { ...progressMarker, previousFrame: '/dodgeResult' };
    const dodgeRandomNum4 = Math.floor(Math.random() * 10);


    if (dodgeRandomNum4 < 5) {
        // player dodged
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmXzr72e5Rsd2D1WJgd3gzmM9nZ6GVLZpFVZ4RNYXDoS6m';
        intents = [<Button action="/fight2-4">Continue</Button>];

    } else {
        // player is hit
        player.life -= 10
        if (player.life > 0) {
          //player is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmWmxXEdj33HcGQQwZBTEFUUdFYHRLWGde8TR49Es486qP';
          intents = [<Button action="/fight2-4">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative4' };
          deathFrame = "/narrative4";
          currentframe = "checktime";
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNnrvqokpzjXG7gwEyeMZFYT1PHqnJRcvqkd26o9yCeGM';
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
    player.framesLoaded += 1;
   
    const counterRandomNum4 = Math.floor(Math.random() * 10);


    if (counterRandomNum4 < 7) {
        // succesful counter
        enemy4.life -= 10
        
        if (enemy4.life > 0) {
          //show counter frame

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmagMVGuzmoHFqKiHjQot7CcpaEjbPU2Fmkq5KNFtN7wLB';
          intents = [<Button action="/fight2-4">Continue</Button>];

        } else {
          // enemy is dead
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNURTJQGT7QhKXnE66PG5NeDXK5KAdppbtiB7disK7xtY';
          intents = [<Button action="/battle4transition">Continue</Button>];

        }
        

    } else {
        // player is hit
        player.life -= 15
        if (player.life > 0) {
          //player is still alive

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmWmxXEdj33HcGQQwZBTEFUUdFYHRLWGde8TR49Es486qP';
          intents = [<Button action="/fight2-4">Continue</Button>];

        } else {
          // player is dead
          progressMarker = { ...progressMarker, deathFrame: '/narrative4' };
          deathFrame = "/narrative4";
          currentframe = "checktime";
          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmNnrvqokpzjXG7gwEyeMZFYT1PHqnJRcvqkd26o9yCeGM';
          intents = [<Button action="/fleedeath">Continue</Button>];


        }
    }

    return c.res({
        image: image,
        intents: intents
    });
});



  /////////////////////////////////////////////////////////////////////////////////////////////////////

  // battle 3 transition

  app.frame('/battle4transition', (c) => {
      let image;
      let intents;
      player.framesLoaded += 1;
      player.enemiesKilled += 1;
      progressMarker = { ...progressMarker, previousFrame: '/battle4transition' };

      currentframe = "battle4transition";

      updateData(farcasterid, currentframe, deathFrame, timerWatch, finalDecision)
      .then(() => {
        console.log('Data updated successfully');
      })
      .catch((error) => {
        console.error('Error updating data:', error.message);
      });

          image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmTGxRnfVLAuRMAM1y6PjnQSkTYRZm1mobY8cvT4mTQ8TT';
         
          intents = [
             
             <Button action="/narrative5">Continue</Button>,
             <Button action="/showPlayerStatus">Status</Button>,

             
          ];


      return c.res({
         
          image: image,
          intents: intents
      });
  });






////////////////////////////////////////////////////////////
//TIME GATING SYSTEM

app.frame('/timegate', (c) => {
    // Update player object to indicate that time has been gated
    
    player.timegated += 1
    player.death += 1
    player.framesLoaded += 1;
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
        image: 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVbR7xJACfcjyCwMD4ToB5uwWR1fdZrwcBEx2ATaGm28T',
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
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100vh',
                          background: 'black',
                          flexDirection: 'column'  // Arrange images in a column

                      }}
                  >
                      <img
                          src="https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qme1BNFSwZ3UwAhhM6hX6zoUkQ4XernHeSj5bhXyA2vHS3"
                          alt="First Image"
                          style={{
                              width: '650px',
                              height: '650px',
                              margin: '10px'
                          }}
                      />

                      <p
                        style={{
                          fontSize: '30px',
                          color: 'red',
                          fontWeight: 'bold',
                          position: 'absolute',  // Position the text absolutely
                          top: '50%',            // Adjust as needed to center the text vertically
                          left: '50%',           // Adjust as needed to center the text horizontally
                          transform: 'translate(-50%, -50%)',  // Center the text using transform
                          margin: '0',
                        }}
                      >
                        {`Player should be fully rested in ${expirationTimeString}`}
                      </p>
                  

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
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          height: '100vh',
                          background: 'black',
                          flexDirection: 'column'  // Arrange images in a column

                      }}
                  >
                      <img
                          src="https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qme1BNFSwZ3UwAhhM6hX6zoUkQ4XernHeSj5bhXyA2vHS3"
                          alt="First Image"
                          style={{
                              width: '650px',
                              height: '650px',
                              margin: '10px'
                          }}
                      />

                      <p
                        style={{
                          fontSize: '30px',
                          color: 'red',
                          fontWeight: 'bold',
                          position: 'absolute',  // Position the text absolutely
                          top: '50%',            // Adjust as needed to center the text vertically
                          left: '50%',           // Adjust as needed to center the text horizontally
                          transform: 'translate(-50%, -50%)',  // Center the text using transform
                          margin: '0',
                        }}
                      >
                        {`Player is fully rested`}
                      </p>
                  

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
    player.framesLoaded += 1;
    progressMarker = { ...progressMarker, previousFrame: '/narrative6' };
        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmdrXRE9FgBL9VkGVZXZ7nRAEidBPG3NcV8TrqkBk6371c';

        intents = [
           
           <Button action="/battle2">Dark Path</Button>,
           <Button action="/trap2">Noisy Path</Button>,
           <Button action="/showPlayerStatus">Status</Button>,

           
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
    player.framesLoaded += 1;
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbnUKoEPeHBt5ojit7iSFErDzMbLW6jJFkFxWLkoBYSd1';


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
    player.framesLoaded += 1;
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmbCfyPcPExQD9mHJ2oSm5yRMz7Wkk97mbryQW1Yvi5jpk';


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
    player.framesLoaded += 1;
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZP4UndDGad9GX4zTcvXEvZzfvkJ2222wkwpvjjzeguc3';


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

    player.framesLoaded += 1;
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qme58aHQcsUYXmw7DpsH7BmH7CEyCvwxq8eAq4RSwF4DPM';

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
    player.framesLoaded += 1;
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/Qmbs8rdgxm7Kp8Z3yA3Foervy3VFBehZLM1JYV4pxXERrS';

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
    player.framesLoaded += 1;
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmVNpVEaNTCKWcuyuMx53dm9e84eTH3txGTqVKBcAAomvW';

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
    player.framesLoaded += 1;
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmWHwjFaH8iTxxiQGvYAQokaT3nehkjUd4eefx4MtpzdNo';

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
    player.framesLoaded += 1;
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmPsDPexaTj5FKwPvAmVBDQ4VGjZXiTSFoYucAQaC23PFo';

        intents = [
           
           <Button action="/finalDecision2">Continue</Button>,

           
        ];


    return c.res({
       
        image: image,
        intents: intents
    });
});



app.frame('/finalDecision2', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;
    
    


    if (player.metStranger > 0) {

        image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmagM6C81rzpKwuXg62Xe1vW2kK8DAyjQ8BhBKw9kRfvkk';
        intents = [
           
           <Button action="/blank1">1</Button>,
           <Button action="/blank2">2</Button>,
           <Button action="/blank3">3</Button>,
           <Button action="/blank4">4</Button>,

           
        ];


    } else {

      image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmTU6mmUcbXxmPVAgkcjf6sHHMjV55WwuH3c8seBsiqGf2';
        intents = [
           
           <Button action="/blank1">1</Button>,
           <Button action="/blank2">2</Button>,
           <Button action="/blank3">3</Button>,

           
        ];



    }

    return c.res({
       
        image: image,
        intents: intents
    });
});



app.frame('/blank1', (c) => {
    let image;
    let intents;

    player.framesLoaded += 1;
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmRAa8RFFsBMAg6zBKQqDRTyJfK1nyRP1eqUf2hTdqmk45';

    player.finalDecision = 1;

    updateData(farcasterid, currentframe, deathFrame, timerWatch, finalDecision)
    .then(() => {
      console.log('Data updated successfully');
      console.log(farcasterid)
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });


        intents = [
        <Button action="/finalStats">See Stats</Button>,
        <Button.Transaction target="/mint1">Mint Northern Banner</Button.Transaction>,

           
        ];


    return c.res({
        action: '/finalStats',
        image: image,
        intents: intents
    });
});


app.frame('/blank2', (c) => {
    let image;
    let intents;

    player.framesLoaded += 1;
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmZdmLmaEhw9jJnzYMLF5uzciw2JuxraRAEtvuREJhsN44';

    player.finalDecision = 2;

    updateData(farcasterid, currentframe, deathFrame, timerWatch, finalDecision)
    .then(() => {
      console.log('Data updated successfully');
      console.log(farcasterid)
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });


        intents = [
           <Button action="/finalStats">See Stats</Button>,
           <Button.Transaction target="/mint2">Mint Southern Banner</Button.Transaction>,
           
        ];


    return c.res({
        action: '/finalStats',
        image: image,
        intents: intents
    });
});



app.frame('/blank3', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmQMCtPN621CyNy65ekuypf2WtmPFRGbbBYnKpFyPWwZfY';

    player.finalDecision = 3;

    updateData(farcasterid, currentframe, deathFrame, timerWatch, finalDecision)
    .then(() => {
      console.log('Data updated successfully');
      console.log(farcasterid)
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });



        intents = [
           <Button action="/finalStats">See Stats</Button>,
           <Button.Transaction target="/mint3">Mint Verothi Banner</Button.Transaction>,
           
        ];


    return c.res({
        action: '/finalStats',
        image: image,
        intents: intents
    });
});



app.frame('/blank4', (c) => {
    let image;
    let intents;

    player.framesLoaded += 1;
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmcMpJy9Vi6Wyf36rSSRi6zvch8SNm9QTUxpCn6ndSJ6aj';

    player.finalDecision = 4;

    updateData(farcasterid, currentframe, deathFrame, timerWatch, finalDecision)
    .then(() => {
      console.log('Data updated successfully');
      console.log(farcasterid)
    })
    .catch((error) => {
      console.error('Error updating data:', error.message);
    });


        intents = [
           
           <Button action="/finalStats">See Stats</Button>,
           <Button.Transaction target="/mint4">Mint Enlightenment Banner</Button.Transaction>,
        ];


    return c.res({
        action: '/finalStats',
        image: image,
        intents: intents
    });
});



app.frame('/finalStats', (c) => {
    let image;
    let intents;
    player.framesLoaded += 1;
    image = 'https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmdrXRE9FgBL9VkGVZXZ7nRAEidBPG3NcV8TrqkBk6371c';

        image = (
            <div
                style={{
                    alignItems: 'center',
                    backgroundImage: 'url(https://violet-worldwide-sole-637.mypinata.cloud/ipfs/QmcLTne4zVtLRzjkeBDRmsQ2sQj5dadxAwfuYUH6XCBs4e)',
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
               <p style={{ fontSize : '50px', margin : '0', marginTop : '-200', color: 'red'  }}> {`Health remaining : ${player.life}`} </p>
               <p style={{ fontSize : '50px', margin : '0', marginCenter : '-150', color: 'red'  }}> {`Enemies Defeated : ${player.enemiesKilled}`} </p>
               <p style={{ fontSize : '50px', margin : '0', marginCenter : '-50', color: 'red'  }}> {`Deaths : ${player.death}`} </p>
               <p style={{ fontSize : '50px', margin : '0', marginCenter : '+150', color: 'red'  }}> {`Total Frames Loaded : ${player.framesLoaded}`} </p>
               <p style={{ fontSize : '50px', margin : '0', marginCenter : '+250', color: 'red'  }}> {`End Choice : ${player.finalDecision}`} </p>
    
              
            </div>
        );
        intents = [
         // <Button.Reset>Replay Adventure</Button.Reset>, 
          <Button action="/">Replay Adventure</Button>,
           
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


////////////////////////////////////////////////////////////////////////////////////////////


app.transaction('/mint', async (c, next) => {
  await next();
  const txParams = await c.res.json();
  txParams.attribution = false;
  console.log(txParams);
  c.res = new Response(JSON.stringify(txParams), {
    headers: {
      "Content-Type": "application/json",
    },
  });
},
async (c) => {
  const address = c.address;

  // console.log('address', address);
  //console.log('Button', Button.Transaction key);

  return c.contract({
    abi,
    functionName: 'claim',
    args: [
      address as `0x${string}`, // _receiver address
      0n, // _tokenId as uint256
      1n, // _quantity as uint256
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // _currency address
      0n, // _pricePerToken as uint256
      {
        proof: [], // _allowlistProof.proof as bytes32[]
        quantityLimitPerWallet: 100n, // _allowlistProof.quantityLimitPerWallet as uint256
        pricePerToken: 0n, // _allowlistProof.pricePerToken as uint256
        currency: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' // _allowlistProof.currency address
      },
      '0x' // _data as bytes
    ],
    chainId: `eip155:42161`,
    to: '0x5E3e89838E344e64F783f532d289f4bB2B520459',
  });
});





app.transaction('/mint1', async (c, next) => {
  await next();
  const txParams = await c.res.json();
  txParams.attribution = false;
  console.log(txParams);
  c.res = new Response(JSON.stringify(txParams), {
    headers: {
      "Content-Type": "application/json",
    },
  });
},
async (c) => {
  const address = c.address;

  // console.log('address', address);
  //console.log('Button', Button.Transaction key);

  return c.contract({
    abi,
    functionName: 'claim',
    args: [
      address as `0x${string}`, // _receiver address
      1n, // _tokenId as uint256
      1n, // _quantity as uint256
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // _currency address
      0n, // _pricePerToken as uint256
      {
        proof: [], // _allowlistProof.proof as bytes32[]
        quantityLimitPerWallet: 100n, // _allowlistProof.quantityLimitPerWallet as uint256
        pricePerToken: 0n, // _allowlistProof.pricePerToken as uint256
        currency: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' // _allowlistProof.currency address
      },
      '0x' // _data as bytes
    ],
    chainId: `eip155:42161`,
    to: '0x5E3e89838E344e64F783f532d289f4bB2B520459',
  });
});





app.transaction('/mint2', async (c, next) => {
  await next();
  const txParams = await c.res.json();
  txParams.attribution = false;
  console.log(txParams);
  c.res = new Response(JSON.stringify(txParams), {
    headers: {
      "Content-Type": "application/json",
    },
  });
},
async (c) => {
  const address = c.address;

  // console.log('address', address);
  //console.log('Button', Button.Transaction key);

  return c.contract({
    abi,
    functionName: 'claim',
    args: [
      address as `0x${string}`, // _receiver address
      2n, // _tokenId as uint256
      1n, // _quantity as uint256
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // _currency address
      0n, // _pricePerToken as uint256
      {
        proof: [], // _allowlistProof.proof as bytes32[]
        quantityLimitPerWallet: 100n, // _allowlistProof.quantityLimitPerWallet as uint256
        pricePerToken: 0n, // _allowlistProof.pricePerToken as uint256
        currency: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' // _allowlistProof.currency address
      },
      '0x' // _data as bytes
    ],
    chainId: `eip155:42161`,
    to: '0x5E3e89838E344e64F783f532d289f4bB2B520459',
  });
});



app.transaction('/mint3', async (c, next) => {
  await next();
  const txParams = await c.res.json();
  txParams.attribution = false;
  console.log(txParams);
  c.res = new Response(JSON.stringify(txParams), {
    headers: {
      "Content-Type": "application/json",
    },
  });
},
async (c) => {
  const address = c.address;

  // console.log('address', address);
  //console.log('Button', Button.Transaction key);

  return c.contract({
    abi,
    functionName: 'claim',
    args: [
      address as `0x${string}`, // _receiver address
      3n, // _tokenId as uint256
      1n, // _quantity as uint256
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // _currency address
      0n, // _pricePerToken as uint256
      {
        proof: [], // _allowlistProof.proof as bytes32[]
        quantityLimitPerWallet: 100n, // _allowlistProof.quantityLimitPerWallet as uint256
        pricePerToken: 0n, // _allowlistProof.pricePerToken as uint256
        currency: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' // _allowlistProof.currency address
      },
      '0x' // _data as bytes
    ],
    chainId: `eip155:42161`,
    to: '0x5E3e89838E344e64F783f532d289f4bB2B520459',
  });
});






app.transaction('/mint4', async (c, next) => {
  await next();
  const txParams = await c.res.json();
  txParams.attribution = false;
  console.log(txParams);
  c.res = new Response(JSON.stringify(txParams), {
    headers: {
      "Content-Type": "application/json",
    },
  });
},
async (c) => {
  const address = c.address;

  // console.log('address', address);
  //console.log('Button', Button.Transaction key);

  return c.contract({
    abi,
    functionName: 'claim',
    args: [
      address as `0x${string}`, // _receiver address
      4n, // _tokenId as uint256
      1n, // _quantity as uint256
      '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', // _currency address
      0n, // _pricePerToken as uint256
      {
        proof: [], // _allowlistProof.proof as bytes32[]
        quantityLimitPerWallet: 100n, // _allowlistProof.quantityLimitPerWallet as uint256
        pricePerToken: 0n, // _allowlistProof.pricePerToken as uint256
        currency: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' // _allowlistProof.currency address
      },
      '0x' // _data as bytes
    ],
    chainId: `eip155:42161`,
    to: '0x5E3e89838E344e64F783f532d289f4bB2B520459',
  });
});











/////////////////////////////////////////////////////////////////////////////////////////

app.transaction('/mintdeprecated', (c) => {
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


app.transaction('/mint2deprecated', (c) => {
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
