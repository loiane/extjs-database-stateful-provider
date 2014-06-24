package com.loiane.service;

import java.util.List;

import com.loiane.model.ui.UIComponentState;

public interface IUIComponentStateService {

	void doSave(UIComponentState state);

	void saveOrUpdate(UIComponentState state);
	
	public List<UIComponentState> doGet(String userId);
}
