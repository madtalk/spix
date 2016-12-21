/**
 *
 */

'use strict';

import Entity from './entity';

class Avatar extends Entity {

    constructor(id, entityModel) {
        super(id);
        this._entityModel = entityModel;

        this._kind = 'player';
        this._chunkRenderDistance = 8;
        this._entityRenderDistance = 3*16;
        this._role = 0;
    }

    // Returns -1: admin, 0: OP, 1: registered, 2: guest.
    get role()                                  { return this._role; }
    get chunkRenderDistance()                   { return this._chunkRenderDistance; }
    get entityRenderDistance()                  { return this._entityRenderDistance; }
    get entityModel()                           { return this._entityModel; }

    set role(role)                              { this._role = role; }
    set chunkRenderDistance(renderDistance)     { this._chunkRenderDistance = renderDistance; }
    set entityRenderDistance(renderDistance)    { this._entityRenderDistance = renderDistance; }
}

export default Avatar;
