/**
 * Utility class encapsulating player management.
 */

'use strict';

import CollectionUtils from '../../engine/math/collections';

/**
 * Note: every time a user joins a given game, it is given a new Player instance.
 * So all Player instances which belong to a game must be cleaned at the moment this game is cleaned.
 */
class PlayerManager {

    constructor() {
        this._players = [];
        this._handleAddPlayer = null;
        this._handleRemovePlayer = null;
    }

    get nbPlayers() { return this._players.length; }

    addPlayer(player) {
        this._players.push(player);
        if (this._handleAddPlayer) this._handleAddPlayer(player);
    }

    getPlayerFromId(playerId) {
        let players = this._players;
        for (let p = 0, l = players.length; p < l; ++p) {
            let player = players[p];
            if (player.avatar && player.avatar.id === playerId) return player;
        }
        return false;
    }

    removePlayer(player) {
        CollectionUtils.removeFromArray(this._players, player);
        if (this._handleRemovePlayer) this._handleRemovePlayer(player);
        player.avatar.die();
        delete player.avatar;
        player.destroy(); // Clean references from player
    }

    removeAllPlayers() {
        if (this._handleRemovePlayer) this._players.forEach(p => this._handleRemovePlayer(p));
        this._players.forEach(p => p.destroy()); // Clean references from all players
        this._players = [];
    }

    setAddPlayerBehaviour(f) {
        this._handleAddPlayer = f;
    }

    setRemovePlayerBehaviour(f) {
        this._handleRemovePlayer = f;
    }

    // Iterator on players.
    forEach(callback) {
        return this._players.forEach(p => callback(p));
    }

    // Clean all references.
    destroy() {
        this.removeAllPlayers();
        delete this._players;
        delete this._handleAddPlayer;
        delete this._handleRemovePlayer;
    }

}

export default PlayerManager;
