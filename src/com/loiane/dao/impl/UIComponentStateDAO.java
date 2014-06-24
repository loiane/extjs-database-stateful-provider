package com.loiane.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.stereotype.Repository;

import com.loiane.dao.IUIComponentStateDAO;
import com.loiane.model.ui.UIComponentState;

@Repository
public class UIComponentStateDAO implements IUIComponentStateDAO {

	private HibernateTemplate hibernateTemplate;

	@Autowired
	public void setSessionFactory(SessionFactory sessionFactory) {
		hibernateTemplate = new HibernateTemplate(sessionFactory);
	}

	@Override
	public void doSave(UIComponentState state) {
		hibernateTemplate.save(state);
	}

	@Override
	public void saveOrUpdate(UIComponentState state) {
		hibernateTemplate.saveOrUpdate(state);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<UIComponentState> doGet(String userId) {

		DetachedCriteria criteria = DetachedCriteria.forClass(UIComponentState.class);
		criteria.add(Restrictions.eq("userId", userId));

		return hibernateTemplate.findByCriteria(criteria);
	}

	@SuppressWarnings("unchecked")
	@Override
	public UIComponentState doGetByName(String userId, String name) {
		
		DetachedCriteria criteria = DetachedCriteria.forClass(UIComponentState.class);
		criteria.add(Restrictions.eq("userId", userId));
		criteria.add(Restrictions.eq("name", name));

		List<UIComponentState> list = hibernateTemplate.findByCriteria(criteria);
		
		if (list != null && list.size() > 0){
			return list.get(0);
		}
		
		return null;
	}

}
