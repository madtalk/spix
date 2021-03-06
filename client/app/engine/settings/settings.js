/**
 *
 */

'use strict';

App.Engine.Settings = function(app) {
    this.app = app;

    this.listeners = [];
};

extend(App.Engine.Settings.prototype, {

    run: function() {
        var app = this.app;

        this.controlsEngine =   app.engine.controls;
        this.stateManager =     app.state;

        this.graphicsSettings = app.engine.graphics.settings;
        this.controlsSettings = app.engine.controls.settings;
        this.audioSettings =    app.engine.audio.settings;

        // Add content, then fade in and add listeners.
        $("#announce").addClass('settings').append(this.getHomeHTML()).center().fadeIn();
        this.listenHome();

        $(document).keydown(function(event) {
            if (!event.keyCode) { return; }
            if (event.keyCode === this.controlsEngine.keyControls.escape) {
                // Remove listeners and get away from the bike.
                $(document).off('keydown');
                this.unlistenHome();
                this.stateManager.setState('ingame');
            }
        }.bind(this));
    },

    stop: function() {
        // Fade out settings menu.
        return new Promise(function(resolve) {
            var settings = $("#announce");
            settings.fadeOut(200, function() {
                settings.empty().removeClass('settings');
                resolve();
            });
        });
    },

    unlisten: function() {
        this.listeners.forEach(function(listener) {
            var element = $('#'+listener);
            element.off('click');
            element.off('keydown');
        });

        this.listeners = [];
    }

});
