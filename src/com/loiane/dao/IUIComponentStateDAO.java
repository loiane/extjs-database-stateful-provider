package com.loiane.dao;

import java.util.List;

import com.loiane.model.ui.UIComponentState;

public interface IUIComponentStateDAO {

	void doSave(UIComponentState state);

	void saveOrUpdate(UIComponentState state);
	
	public List<UIComponentState> doGet(String userId);
	
	public UIComponentState doGetByName(String userId, String name);
}
