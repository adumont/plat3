namespace SpriteKind {
    export const Monkey = SpriteKind.create()
}
function createLevel () {
    if (Level == 0) {
        scene.setBackgroundColor(9)
        tiles.setTilemap(tilemap`level`)
        createPlayer()
        createMonkeys()
    }
}
function createMonkeys () {
    for (let value of tiles.getTilesByType(myTiles.tile2)) {
        Monkey = sprites.create(img`
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
        tiles.placeOnTile(Monkey, value)
        tiles.setTileAt(value, myTiles.transparency16)
        Monkey.setFlag(SpriteFlag.BounceOnWall, true)
        Monkey.vx = -10
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
let Monkey: Sprite = null
let Level = 0
Level = 0
info.setScore(0)
info.setLife(4)
createLevel()
