Ext.define('App.controller.HybridStorageProvider', {
    extend: 'Ext.app.Controller',

    stores: ['HybridStorageProvider'],

    //put all stateId from stateful componenets here
    stateIds: [
    	'test',
    	'form'
    ],

    userId: 'loiane',

    init: function(application) {
        this.control({
            "button[itemId=saveState]": { // change selector according to app needs
                click: this.onSaveServerProvider
            }/*,
            "viewport": { // change selector according to app needs
                beforerender: this.loadAndOverrideValues
            }*/
        });
    },

    //do not change this code
    onSaveServerProvider: function() {

    	var me = this,
    		local = localStorage,
    		store = me.getHybridStorageProviderStore(),
    		id, value, index, record;
  
    	me.stateIds.forEach(function(stateId){

    		id = 'ext-'+stateId;
    		value = local.getItem(id);
    		
    		index = store.find('name', id, 0, false, true, true);

    		if (index > -1){ 

    			record = store.getAt(index);
    			record.set({
    				'value': value
    			});

    		} else {

    			record = {
    				'userId': me.userId,
    				'name': id,
    				'value': value
    			}

    			store.add(record);
    		}
    	});

    	store.sync();
    },

    loadAndOverrideValues: function(viewportName){

    	var me = this,
    		local = localStorage,
    		store = me.getHybridStorageProviderStore(),
    		id, value, index, record;

    	store.load({
    		params: { 
                userId: me.userId
            },
    		callback : function(records, options, success) {

    			Ext.Array.each(records, function(record) {

    				local.setItem(record.get('name'),record.get('value'));
    				console.log(record.get('value'));
    			});

                var task = new Ext.util.DelayedTask(function() {

                    Ext.create(viewportName);
                });

                task.delay(5000);    

                //Ext.create(viewportName);
    		}
    	});
    }
});
