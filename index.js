import express from 'express';
import { createCanvas } from 'canvas';


const app = express();


const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d');

app.get('/', (req, res) => {
    res.send('visit /avatar/:name');
})

//random color genratrr
const genrateRandomColor = () => {
    //ref: https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript
    let color = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
    return color;

}


//genrate Circle nested wala
const genratecircle = () => {
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(200, 200, 150 - (i * 30), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 - (i * 0.15)})`;
        ctx.fill();
    }

}
app.get('/avatar/:name', (req, res) => {
    const name = req.params.name;
    const randomColor = genrateRandomColor();

    //canvas



    const gradient = ctx.createRadialGradient(200, 200, 50, 200, 200, 400);
    gradient.addColorStop(0, randomColor);
    gradient.addColorStop(1, '#222222');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    genratecircle();




    //shadwo
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;


    ctx.beginPath();
    ctx.arc(200, 200, 100, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    //text pos
    ctx.fillStyle = '#333333';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';


    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.fillText(name, canvas.width / 2, canvas.height / 2);


    const imageData = canvas.toBuffer('image/png');


    res.setHeader('Content-Type', 'image/png');
    res.send(imageData);
});

app.get('/json', (req, res) => {
    const name = req.query.name || 'Name';
    const serverUrl = req.protocol + '://' + req.get('host');

    res.json({
        message: 'Here is your image',
        imageUrl: `${serverUrl}/avatar/${encodeURIComponent(name)}`
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
    