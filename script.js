const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable / Enable Button 
function toggleButton(){
    button.disabled = !button.disabled;
}

// Passing our Joke to VicesRSS API
function tellMe(joke){
    console.log('tell me:', joke);
    VoiceRSS.speech({
        key: 'dfb4f4571c234b8aaeb4caaf9bfec3cd',
        src: `${joke}`,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//  Get Jokes from Joke API
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist,sexist';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        } else{
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch(error){
        // Catch Errors Here
        console.log('WHOOPSIE_DAISY', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);