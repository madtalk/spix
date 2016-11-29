/**
 *
 */

'use strict';

App.Model.Server.EntityModel = function(app) {
    this.app = app;

    // Model component
    this.entityStates = new Map();
    this.entityPushes = new Map();
    this.entityLoads = new Set();

    // Graphical component
    this.needsUpdate = false;
};

App.Model.Server.EntityModel.prototype.init = function() {};

App.Model.Server.EntityModel.prototype.updateEntity = function(currentEntity, updatedEntity, graphics, entities) {
    // Update positions and rotation
    var p = currentEntity.position;
    var up = updatedEntity._position;
    var animate = p.x !== up[0] || p.y !== up[1];
    p.x = up[0];
    p.y = up[1];
    p.z = up[2];
    currentEntity.rotation.y = Math.PI + updatedEntity._rotation[0];

    // Update animation
    if (animate) graphics.updateAnimation(updatedEntity._id);

    // Update current "live" entities.
    entities.set(updatedEntity._id, currentEntity);
};

App.Model.Server.EntityModel.prototype.refresh = function() {
    if (!this.needsUpdate) return;
    var graphics = this.app.engine.graphics;

    var entities = this.entityStates;
    var pushes = this.entityPushes;
    pushes.forEach(function(updatedEntity) {
        var id = updatedEntity._id;
        if (this.entityLoads.has(id)) return;

        var currentEntity = entities.get(id);

        if (!currentEntity || currentEntity === undefined) {
            this.entityLoads.add(id);
            graphics.createFox(id, function(createdEntity) {
                createdEntity._id = id;
                graphics.scene.add(createdEntity);
                this.updateEntity(createdEntity, updatedEntity, graphics, entities);
                this.entityLoads.delete(id);
            }.bind(this));

        } else {
            this.updateEntity(currentEntity, updatedEntity, graphics, entities);
        }

    }.bind(this));

    // Flush double buffer.
    this.entityPushes = new Map();

    // Unset dirty flag.
    this.needsUpdate = false;
};

App.Model.Server.EntityModel.prototype.updateEntities = function(entities) {
    if (entities === undefined || entities === null) return;
    var pushes = this.entityPushes;
    entities.forEach(function(currentEntity) {
        pushes.set(currentEntity._id, currentEntity);
    });

    // Set dirty flag.
    this.needsUpdate = true;
};