Ext.define('App.Application', {
    name: 'App',

    extend: 'Ext.app.Application',

    views: [
        // TODO: add views here
    ],

    controllers: [
        'HybridStorageProvider',
        'Login'
    ],

    stores: [
        // TODO: add stores here
    ],

    launch: function(){
        Ext.tip.QuickTipManager.init();

        // setup the state provider - localStorage
        

        Ext.create('App.view.Login');
    }
});
