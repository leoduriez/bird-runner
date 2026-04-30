import { GAME_CONFIG } from '../constants';

export interface Hitbox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Entity {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Get the hitbox for an entity with reduced size for fairer collisions
 */
export const getHitbox = (entity: Entity): Hitbox => {
  const reduction = GAME_CONFIG.HITBOX_REDUCTION;
  return {
    x: entity.x + reduction,
    y: entity.y + reduction,
    width: entity.width - reduction * 2,
    height: entity.height - reduction * 2,
  };
};

/**
 * AABB (Axis-Aligned Bounding Box) collision detection
 * Returns true if two rectangles overlap
 */
export const checkCollision = (entity1: Entity, entity2: Entity): boolean => {
  const box1 = getHitbox(entity1);
  const box2 = getHitbox(entity2);

  return (
    box1.x < box2.x + box2.width &&
    box1.x + box1.width > box2.x &&
    box1.y < box2.y + box2.height &&
    box1.y + box1.height > box2.y
  );
};

/**
 * Check if an entity is off screen (for cleanup)
 */
export const isOffScreen = (entity: Entity): boolean => {
  return entity.y > GAME_CONFIG.SCREEN_HEIGHT + entity.height;
};

/**
 * Get lane center X position
 */
export const getLaneX = (lane: number): number => {
  const laneWidth = GAME_CONFIG.SCREEN_WIDTH / GAME_CONFIG.LANES;
  return laneWidth * lane + laneWidth / 2;
};

/**
 * Get random lane (0, 1, or 2)
 */
export const getRandomLane = (): number => {
  return Math.floor(Math.random() * GAME_CONFIG.LANES);
};
