Ext.define('App.util.DatabaseStorageProvider', {
    extend : 'Ext.state.Provider',
    alias : 'state.databaseprovider',
 
    config: {
        userId : null,
       //url: "uistate", //In case of REST
        api: {
            read: 'uistate/view.action',
            create: 'uistate/create.action',
            update: 'uistate/update.action',
            destroy: 'uistate/delete.action'
        },
       timeout: 30000
    },
 
    constructor : function(config) {
        this.initConfig(config);
        var me = this;

        me.store = Ext.create('Ext.data.Store',{
            fields: [
                {name: 'rowId', type: 'int'},
                {name: 'userId', type: 'string'},
                {name: 'name',  type: 'string'},
                {name: 'value'}
            ],
            proxy: {
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
            }
        });
 
        me.restoreState();
        me.callParent(arguments);
    },
    set : function(name, value) {
        var me = this;
 
        if( typeof value == "undefined" || value === null) {
            me.clear(name);
            return;
        }
        me.persist(name, value);
        me.callParent(arguments);
    },
    // private
    restoreState : function() {
        var me = this;

        me.store.load({
            params: { 
                userId: me.getUserId()
            },
            callback : function(records, options, success) {
                Ext.Array.each(records, function(record, index) {
                    me.state[record.get('name')] = me.decodeValue(record.get('value'));
                });
            }
        });
    },
    // private
    clear : function(name) {
        this.clearKey(name);
        this.callParent(arguments);
    },
    // private
    persist : function(name, value) {
        var me = this, 
        index, record;

        index = me.store.find('name', name, 0, false, true, true);

        if (index > -1){ 

            console.log('existing');

            record = me.store.getAt(index);

            if (record.get('value') !== me.encodeValue(value)){
                record.set({
                    'value': me.encodeValue(value)
                });
            }

        } else {

            console.log('new');

            me.store.add({
                userId: me.getUserId(),
                name: name,
                value: me.encodeValue(value)
            });
        }

        me.store.sync();
    },
    // private
    clearKey : function(name) {
        
        var index = me.record.findExact('name', name);
        if (index > -1){
            me.record.remove(me.store.getAt(index));
        }

        me.store.sync();
    }
});