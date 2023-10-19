 import { walk, animateStep } from './walking.js';
 import { hero } from './hero.js';

 export default function Game (container) {

    //Canvas initialization
    const canvas = document.getElementById(container);
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
    const ctx = canvas.getContext("2d");

    //User input controls
    const pressedKeys = new Map();
    document.addEventListener('keydown', (e) => ALLOWED_KEYS.includes(e.key) && pressedKeys.set(e.key, true));
    document.addEventListener('keyup', (e) => pressedKeys.delete(e.key));   

    let currentTile = '';
    let mousePressed = false;
    const BOARD_SIZE = [18, 10];
    const screen = document.getElementById('container');
    screen.addEventListener('mousedown', ()=> mousePressed = true);    
    screen.addEventListener('mouseup', ()=> mousePressed = false);
    screen.addEventListener('mouseleave', ()=> mousePressed = false);
    for (let x = 0; x < BOARD_SIZE[0]; x++) {
        for (let y = 0; y < BOARD_SIZE[1]; y++) {
            const tile = document.createElement('div');
            screen.appendChild(tile);
            tile.setAttribute('data-id', [x, y])
            tile.addEventListener('mouseover', ()=>{
                if (mousePressed) tile.style.backgroundPosition = currentTile;
            });
            tile.addEventListener('mousedown', ()=>{                
                tile.style.backgroundPosition = currentTile;                
            });
        }
    }

    const TILES_MAP_SIZE = [16, 12];
    const tiles = document.getElementById('tiles');
    for (let x = 0; x < TILES_MAP_SIZE[0]; x++) {
        for (let y = 0; y < TILES_MAP_SIZE[1]; y++) {
            const tile = document.createElement('li');
            const position = `-${x*48}px -${y*48}px`;
            tiles.appendChild(tile);
            tile.setAttribute('data-position', position);
            tile.style.backgroundPosition = position;
            tile.addEventListener('click', ()=>{
                currentTile = tile.dataset['position'];                
            });            
        }
    }
    
    (async () => {

        const result = await fetch('./hero.png');
        const blob = await result.blob();
        hero.skinMapImage = await createImageBitmap(blob);
        
        setInterval(loop, 1000 / GAME_FPS);
        setInterval(() => animateStep(pressedKeys, hero), 200);
            
    })();
  
    const loop = () => {

        

        // Hero walking 
        walk(pressedKeys, hero);
        
        ctx.reset();
        ctx.drawImage(hero.skinMapImage, hero.skinX, hero.skinY, HERO_WIDTH, HERO_HEIGHT, hero.x, hero.y, HERO_WIDTH, HERO_HEIGHT);        
    }
    
    const selectHero = (num) => {
        hero.currentHero = num;
        hero.skin = hero.currentHero * HERO_WIDTH * 3;
    }

    return { selectHero };
}