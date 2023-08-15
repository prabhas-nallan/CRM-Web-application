package com.examly.crm.service;

import java.util.List;
import java.util.Map;

// import com.examly.crm.graphentity.SaleGraph;
import com.examly.crm.model.Sale;


public interface SaleService {
	public Sale addSale(Long customerid,Long opportunityid,Sale sale);
	 public List<Sale> getSale();
	 public Sale getSaleById(Long id);
	 public Sale updateSale(Long id,Sale sale);
	 public void deleteSale(Long id);


	List<Map<String, Object>> getSalesGraph();
}
