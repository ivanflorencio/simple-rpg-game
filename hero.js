//Hero positioning and controls
export const hero = {
    x: SCREEN_WIDTH/2 - HERO_WIDTH/2,
    y: SCREEN_HEIGHT/2 - HERO_HEIGHT/2,
    currentStepFrame: 0,
    skinMapImage: {},
    currentHero: INITIAL_HERO,
    skin: INITIAL_HERO * HERO_WIDTH * 3,
    skinX: INITIAL_HERO * HERO_WIDTH * 3,
    skinY: 0,
}