Ext.define('App.controller.Login', {
    extend: 'Ext.app.Controller',

    onButtonClickCancel: function(button, e, options) {
        button.up('login').down('form').getForm().reset();
    },

    onButtonClickSubmit: function(button, e, options) {

        var login = button.up('login'),
            formPanel = login.down('form'),
            user = formPanel.down('textfield[name=user]').getValue(),
            pass = formPanel.down('textfield[name=password]').getValue(),
            form = formPanel.getForm();

        if (form.isValid()) {   

            Ext.state.Manager.setProvider(
            //Ext.create('Ext.state.LocalStorageProvider')
                Ext.create('App.util.DatabaseStorageProvider',{
                    userId: 'loiane'
                })
            );   

            Ext.create('App.view.Viewport');

            login.close();

            //this.getController('HybridStorageProvider').loadAndOverrideValues('App.view.Viewport');
        }
    },


	init: function(application) {
        this.control({
            "login toolbar button#submit": { 
                click: this.onButtonClickSubmit 
            },
            "login toolbar button#cancel": { 
                click: this.onButtonClickCancel 
            }
        });
    }
});