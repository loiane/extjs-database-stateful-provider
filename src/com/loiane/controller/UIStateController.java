package com.loiane.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.loiane.model.ui.UIComponentState;
import com.loiane.model.ui.UIComponentStateWrapper;
import com.loiane.service.IUIComponentStateService;

@Controller
@RequestMapping(value="/uistate")
public class UIStateController extends BasicController {

	private IUIComponentStateService uIComponentStateService;

	@Autowired
	public void setuIComponentStateService(
			IUIComponentStateService uIComponentStateService) {
		this.uIComponentStateService = uIComponentStateService;
	}
	

	@RequestMapping(value="view.action")
	public @ResponseBody Map<String,? extends Object> view(@RequestParam String userId) throws Exception {

		try{

			System.out.println("view.action");
			
			List<UIComponentState> list = uIComponentStateService.doGet(userId);

			return getMap(list);

		} catch (Exception e) {

			e.printStackTrace(System.out);
			return getModelMapError("Error retrieving Component State from database.");
		}
	}

	@RequestMapping(value="create.action")
	public @ResponseBody Map<String,? extends Object> create(@RequestBody UIComponentStateWrapper data) throws Exception {

		try{

			System.out.println("create.action");
			
			List<UIComponentState> list = new ArrayList<UIComponentState>();

			if (data != null && data.getData() != null && data.getData().size() > 0){
				list = data.getData();
				for (UIComponentState state : list){
					this.uIComponentStateService.doSave(state);
				}
			}
			
			return getMap(list);

		} catch (Exception e) {

			e.printStackTrace(System.out);
			return getModelMapError("Error retrieving Component State from database.");
		}
	}

	@RequestMapping(value="update.action")
	public @ResponseBody Map<String,? extends Object> update(@RequestBody UIComponentStateWrapper data) throws Exception {

		try{
			
			System.out.println("update.action");

			List<UIComponentState> list = new ArrayList<UIComponentState>();

			if (data != null && data.getData() != null && data.getData().size() > 0){
				list = data.getData();
				for (UIComponentState state : list){
					this.uIComponentStateService.saveOrUpdate(state);
				}
			}
			
			return getMap(list);

		} catch (Exception e) {

			e.printStackTrace(System.out);
			return getModelMapError("Error retrieving Component State from database.");
		}
	}

	@RequestMapping(value="delete.action")
	public @ResponseBody Map<String,? extends Object> delete(@RequestBody UIComponentStateWrapper data) throws Exception {

		try{

			System.out.println("delete.action");
			
			//this method will not be used
			
		} catch (Exception e) {

			e.printStackTrace(System.out);
			return getModelMapError("Error retrieving Component State from database.");
		}

		return null;
	}
}
