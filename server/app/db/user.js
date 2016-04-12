/**
 * DB user.
 */

'use strict';

import Player from '../engine/model/player'

class User {

    constructor(socket, nick, id) {
        //
        this._socket = socket;
        this._nick = nick;
        this._id = id;

        // Game
        this._ingame = false;
        this._player = undefined;
    }

    // Util
    get socket() {
        return this._socket;
    }

    get nick() {
        return this._nick;
    }

    get id() {
        return this._id;
    }

    get ingame() {
        return this._ingame;
    }

    set ingame(value) {
        if (value) this._ingame = value;
    }

    /**
     * Join a specific game.
     * @param game
     */
    join(game) {
        this._ingame = true;
        var player = new Player(this, game);
        game.spawn(player);
    }

    /**
     * Leave all games (current game).
     */
    leave() {
        var player = this._player;
        if (player) player.leave();
    }
}

export default User;
