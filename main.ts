namespace SpriteKind {
    export const Monkey = SpriteKind.create()
    export const Egg = SpriteKind.create()
}
function createLevel () {
    if (Level == 0) {
        scene.setBackgroundColor(9)
        tiles.setTilemap(tilemap`level`)
        createPlayer()
        createMonkeys()
        maxMonkeys = sprites.allOfKind(SpriteKind.Monkey).length
    }
}
function createMonkeys () {
    for (let value of tiles.getTilesByType(myTiles.tile2)) {
        aMonkey = sprites.create(img`
            . . . . f f f f f . . . . . . . 
            . . . f e e e e e f . . . . . . 
            . . f d d d d e e e f . . . . . 
            . c d f d d f d e e f f . . . . 
            . c d f d d f d e e d d f . . . 
            c d e e d d d d e e b d c . . . 
            c d d d d c d d e e b d c . . . 
            c c c c c d d e e e f c . . . . 
            . f d d d d e e e f f . . . . . 
            . . f f f f f e e e e f . . . . 
            . . . . f f e e e e e e f . f f 
            . . . f e e f e e f e e f . e f 
            . . f e e f e e f e e e f . e f 
            . f b d f d b f b b f e f f e f 
            . f d d f d d f d d b e f f f f 
            . . f f f f f f f f f f f f f . 
            `, SpriteKind.Monkey)
        tiles.placeOnTile(aMonkey, value)
        tiles.setTileAt(value, myTiles.transparency16)
        aMonkey.setFlag(SpriteFlag.BounceOnWall, true)
        aMonkey.vx = -10
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Monkey, function (sprite, otherSprite) {
    // Falling on top of Monkey
    if (sprite.y < otherSprite.y && sprite.vy > 0) {
        info.changeScoreBy(5)
        // rebotar
        sprite.vy = -80
        music.baDing.play()
    } else {
        scene.cameraShake(3, 200)
        info.changeLifeBy(-1)
    }
    otherSprite.destroy(effects.disintegrate, 200)
})
function newEgg () {
    if (sprites.allOfKind(SpriteKind.Monkey).length < maxMonkeys) {
        anEgg = sprites.create(img`
            . . . . . . b d d 1 . . . . . . 
            . . . . . b d d d d 1 . . . . . 
            . . . . b d d d d d d 1 . . . . 
            . . . b d d d d d d d d 1 . . . 
            . . . b d d d d d d d d 1 . . . 
            . . b d d d d d d d d d d 1 . . 
            . . b d d d d d d d d d d 1 . . 
            . . b d d d d d d d d d d 1 . . 
            . . b d d d d d d d d d d 1 . . 
            . . b d d d d d d d d d d 1 . . 
            . . b d d d d d d d d d d 1 . . 
            . . b d d d d d d d d d d 1 . . 
            . . b d d d d d d d d d d 1 . . 
            . . b b d d d d d d d d d 1 . . 
            . . . b b d d d d d d 1 1 . . . 
            . . . . b b d d d d 1 1 . . . . 
            `, SpriteKind.Egg)
        tiles.placeOnRandomTile(anEgg, myTiles.tile3)
        anEgg.setFlag(SpriteFlag.BounceOnWall, true)
        anEgg.vy = -150
        anEgg.ay = 150
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.vy == 0 && !(mySprite.tileKindAt(TileDirection.Center, myTiles.tile5))) {
        mySprite.vy = -150
    }
})
function createPlayer () {
    mySprite = sprites.create(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `, SpriteKind.Player)
    scene.cameraFollowSprite(mySprite)
    tiles.placeOnRandomTile(mySprite, myTiles.tile1)
    for (let value2 of tiles.getTilesByType(myTiles.tile1)) {
        tiles.setTileAt(value2, myTiles.transparency16)
    }
    controller.moveSprite(mySprite, 100, 0)
    mySprite.ay = 300
}
let mySprite: Sprite = null
let anEgg: Sprite = null
let aMonkey: Sprite = null
let maxMonkeys = 0
let Level = 0
Level = 0
info.setScore(0)
info.setLife(4)
createLevel()
// Monkey logic
game.onUpdate(function () {
    for (let value3 of sprites.allOfKind(SpriteKind.Monkey)) {
        if (Math.round(value3.x % 2) == 1) {
            value3.setImage(img`
                . . . . f f f f f . . . . . . . 
                . . . f e e e e e f . . . . . . 
                . . f d d d d e e e f . . . . . 
                . c d f d d f d e e f f . . . . 
                . c d f d d f d e e d d f . . . 
                c d e e d d d d e e b d c . . . 
                c d d d d c d d e e b d c . . . 
                c c c c c d d e e e f c . . . . 
                . f d d d d e e e f f . . . . . 
                . . f f f f f e e e e f . . . . 
                . . . . f f e e e e e e f . f f 
                . . . f e e f e e f e e f . e f 
                . . f e e f e e f e e e f . e f 
                . f b d f d b f b b f e f f e f 
                . f d d f d d f d d b e f f f f 
                . . f f f f f f f f f f f f f . 
                `)
        } else {
            value3.setImage(img`
                . . . . f f f f f . . . . . . . 
                . . . f e e e e e f . . . . . . 
                . . f d d d d e e e f f . . . . 
                . c d d d d d d e e d d f . . . 
                . c d f d d f d e e b d c . . . 
                c d d f d d f d e e b d c . f f 
                c d e e d d d d e e f c . f e f 
                c d d d d c d e e e f . . f e f 
                . f c c c d e e e f f . . f e f 
                . . f f f f f e e e e f . f e f 
                . . . . f e e e e e e e f f f . 
                . . f f e f e e f e e e e f . . 
                . f e f f e e f f f e e e f . . 
                f d d b d d c f f f f f f b f . 
                f d d c d d d f . . f c d d f . 
                . f f f f f f f . . . f f f . . 
                `)
        }
        if (value3.vx > 0) {
            value3.image.flipX()
        }
        if (value3.tileKindAt(TileDirection.Bottom, myTiles.transparency16) || value3.tileKindAt(TileDirection.Bottom, myTiles.tile8)) {
            value3.vx = 0 - value3.vx
        }
    }
})
