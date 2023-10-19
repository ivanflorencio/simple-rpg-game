export const walk = (keys, hero) => {

    if (hero.y + HERO_HEIGHT < 0) hero.y = SCREEN_HEIGHT;
    if (hero.y > SCREEN_HEIGHT) hero.y = 0 - HERO_HEIGHT;

    if (hero.x < 0 - HERO_WIDTH) hero.x = SCREEN_WIDTH - HERO_WIDTH / 2;
    if (hero.x > SCREEN_WIDTH - HERO_WIDTH / 2) hero.x = 0 - HERO_WIDTH;
    
    if (keys.has('ArrowUp')) move('U', hero);
    if (keys.has('ArrowDown')) move('D', hero);
    if (keys.has('ArrowLeft')) move('L', hero);
    if (keys.has('ArrowRight')) move('R', hero);
}

const move = (direction, hero) => {
    hero.skinX = hero.skin + HERO_STEP_FRAMES[hero.currentStepFrame] * HERO_HEIGHT;
    switch (direction) {
        case 'U':
            hero.y -= WALKING_SPEED;
            hero.skinY = HERO_HEIGHT * 3;
            break;

        case 'D':
            hero.y += WALKING_SPEED;
            hero.skinY = HERO_HEIGHT * 0;
            break;

        case 'L':
            hero.x -= WALKING_SPEED;
            hero.skinY = HERO_HEIGHT * 1;
            break;

        case 'R':
            hero.x += WALKING_SPEED;
            hero.skinY = HERO_HEIGHT * 2;
            break;
    
        default:
            hero.skinY = HERO_HEIGHT * 0;
            break;
    }
}

export const animateStep = (keys, hero) => {
    if (!keys.size) {
        hero.skinX = hero.skin + HERO_HEIGHT * 1;
        hero.skinY = HERO_HEIGHT * 0;
        return;
    }
    hero.currentStepFrame++;
    if (hero.currentStepFrame > 1) hero.currentStepFrame = 0;        
}