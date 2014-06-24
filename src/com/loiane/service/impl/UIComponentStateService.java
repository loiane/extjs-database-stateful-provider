package com.loiane.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.loiane.dao.IUIComponentStateDAO;
import com.loiane.model.ui.UIComponentState;
import com.loiane.service.IUIComponentStateService;

@Service
@Transactional
public class UIComponentStateService implements IUIComponentStateService {
	
	private IUIComponentStateDAO uIComponentStateDAO;

	@Autowired
	public void setuIComponentStateDAO(IUIComponentStateDAO uIComponentStateDAO) {
		this.uIComponentStateDAO = uIComponentStateDAO;
	}

	@Override
	@Transactional
	public void doSave(UIComponentState state) {
		
		UIComponentState s = uIComponentStateDAO.doGetByName(state.getUserId(), state.getName());
		
		if (s != null){
			s.setValue(state.getValue());
			
			uIComponentStateDAO.saveOrUpdate(s);
		} else {
			uIComponentStateDAO.doSave(state);
		}
	}

	@Override
	@Transactional
	public void saveOrUpdate(UIComponentState state) {
		uIComponentStateDAO.saveOrUpdate(state);
	}

	@Override
	@Transactional(readOnly=true)
	public List<UIComponentState> doGet(String userId) {
		return uIComponentStateDAO.doGet(userId);
	}

}
