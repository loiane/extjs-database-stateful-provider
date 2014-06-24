package com.loiane.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;

@Controller
public class BasicController {

	/**
	 * Generates modelMap to return in the modelAndView
	 * @param data
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public Map<String,Object> getMap(List data){
		
		Map<String,Object> modelMap = new HashMap<String,Object>(3);
		
		if (data != null){
			modelMap.put("total", data.size());
			if(data.size() == 1)
				modelMap.put("data", data.get(0));
			else
				modelMap.put("data", data);
		}
		
		modelMap.put("success", true);
		
		return modelMap;
	}
	
	@SuppressWarnings("rawtypes")
	public Map<String,Object> getMap(List data, long total){
		
		Map<String,Object> modelMap = new HashMap<String,Object>(3);
		modelMap.put("total", total);
		modelMap.put("data", data);
		modelMap.put("success", true);
		
		return modelMap;
	}
	
	/**
	 * Generates modelMap to return in the modelAndView in case
	 * of exception
	 * @param msg message
	 * @return
	 */
	public Map<String,Object> getModelMapError(String msg){

		Map<String,Object> modelMap = new HashMap<String,Object>(2);
		modelMap.put("message", msg);
		modelMap.put("success", false);

		return modelMap;
	} 
}
