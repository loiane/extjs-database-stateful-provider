Ext.define('App.view.Login', { 
	extend: 	'Ext.window.Window', 
	alias: 		'widget.login', 

	title:'Login',
	autoShow: 	true, 
	width: 440,
	height: 328,
	layout: {
		type: 	'border' 
	},
	closeAction: 'hide', 
	closable: 	false,
	resizable: false,
	draggable: false,
	cls: 'loginwindow',
	items: [{
		xtype: 'form', 
		region: 'center',
		frame: false, 
		bodyPadding: 15, 
		defaults: { 
			xtype: 'textfield', 
			anchor: '100%', 
			labelWidth: 60, 
			allowBlank: false, 
			minLength: 3, 
			msgTarget: 'under' 
		},
		items: [
			{
				value: 'lg37010',
				//value: 'bd85670',
				name: 'user',
				itemId:'userId',
				fieldLabel: 'User Name',
				vtype: 'alphanum', 
				maxLength: 25
			},
			{
				value: '123456',
				inputType: 'password', 
				name: 'password',
				fieldLabel: 'Password',
				maxLength: 15,
				enableKeyEvents: true,
				id: 'password'
			}
		]
	}],

	dockedItems: [{
		xtype: 'toolbar',
		dock: 'bottom',
		items: [
			{
				xtype: 'button', 
				itemId: 'cancel',
				iconCls: 'cancel',
				text: 'Cancel'
			},
			{
				xtype: 'button', 
				itemId: 'submit',
				formBind: true, 
				iconCls: 'icon-check-circle icon-large blue-icon',
				text: 'Submit'
			}
		]
	}]
});