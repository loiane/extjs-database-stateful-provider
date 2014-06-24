Ext.define('App.store.HybridStorageProvider', {
	extend : 'Ext.data.Store',

    config: {
        userId : null,
        api: {
            read: 'uistate/view.action',
            create: 'uistate/create.action',
            update: 'uistate/update.action',
            destroy: 'uistate/delete.action'
        }
    },

    constructor: function(config) {
        config = Ext.apply({}, config);
        var me = this;

        me.fields = [
            {name: 'rowId', type: 'int'},
            {name: 'userId', type: 'string'},
            {name: 'name',  type: 'string'},
            {name: 'value'}
        ];

        me.proxy = {
            type: 'ajax',
            api: me.getApi(),
            reader: {
                type: 'json',
                root: 'data'
            },
            writer: {
                type: 'json',
                writeAllFields: true,
                encode: false,
                allowSingle: false,
                root: 'data'
            }
        };

        me.callParent([config]);
    }
});