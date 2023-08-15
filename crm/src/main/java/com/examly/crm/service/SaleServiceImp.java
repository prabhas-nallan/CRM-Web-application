package com.examly.crm.service;

import java.util.*;


// import com.examly.crm.graphentity.MonthAmount;
// import com.examly.crm.graphentity.SaleGraph;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.crm.model.Customer;
import com.examly.crm.model.Opportunity;
import com.examly.crm.model.Sale;
import com.examly.crm.repository.CustomerRepository;
import com.examly.crm.repository.OpportunityRepository;
import com.examly.crm.repository.SaleRepository;
import java.time.*;

@Service
public  class SaleServiceImp implements SaleService{


	@Autowired
	private SaleRepository saleRepository;
	@Autowired
    private CustomerRepository customerRepository;
	@Autowired
	private OpportunityRepository opportunityRepository;


	//@Override
	@Override
	public Sale addSale(Long customerid,Long opportunityid, Sale sale) {
		Customer customer = this.customerRepository.findById(customerid).orElseThrow(()->new RuntimeException("Customer not found"));
		Opportunity opportunity = this.opportunityRepository.findById(opportunityid).orElseThrow(()->new RuntimeException("opportunity not found"));
		Sale newsale=new Sale();
		newsale.setAmount(sale.getAmount());
		newsale.setName(sale.getName());
		newsale.setDate(sale.getDate());
		newsale.setNotes(sale.getNotes());
		newsale.setCustomer_id(customer.getId());
		System.out.println(customer.getId());
		newsale.setOpportunity_id(opportunity.getId());
		System.out.println(opportunity.getId());
		return this.saleRepository.save(newsale);
	}

	@Override
	public List<Sale> getSale() {
		return this.saleRepository.findAll();
	}

	@Override
	public Sale getSaleById(Long id) {
		return this.saleRepository.findById(id).orElseThrow(()->new RuntimeException("Sale not found"));

	}

	@Override
	public Sale updateSale(Long id, Sale sale) {
		Sale updatedSale=saleRepository.findById(id).orElseThrow(()->new RuntimeException("Sale not found"));
        updatedSale.setName(sale.getName());
        updatedSale.setAmount(sale.getAmount());
        updatedSale.setNotes(sale.getNotes());
        updatedSale.setDate(sale.getDate());
        return this.saleRepository.save(updatedSale);
	}

	@Override
	public void deleteSale(Long id) {
		Sale deleteSale=saleRepository.findById(id).orElseThrow(()->new RuntimeException("Sale not found"));
        this.saleRepository.delete(deleteSale);

	}

	@Override
	public List<Map<String, Object>> getSalesGraph() {
		List<Map<String, Object>> responseData = new ArrayList<>();
		Year thisyear = Year.now();

		// Fetch data from the repository
		List<Map<String, Object>> databaseDataFurniture = this.saleRepository.getDetails(thisyear,"Furniture");
		List<Map<String, Object>> databaseDataclothing = this.saleRepository.getDetails(thisyear,"clothing");
		List<Map<String, Object>> databaseDataElectronics = this.saleRepository.getDetails(thisyear,"Electronics");
		List<Map<String, Object>> databaseDataHealthProducts = this.saleRepository.getDetails(thisyear,"HealthProducts");


		// Create the response format
		Map<String, Object> furnitureData = new HashMap<>();
		furnitureData.put("id", "Furniture");
		furnitureData.put("color", "hsl(335, 70%, 50%)");
		furnitureData.put("data", new ArrayList<>());

		Map<String, Object> clothingData = new HashMap<>();
		clothingData.put("id", "clothing");
		clothingData.put("color", "hsl(335, 70%, 50%)");
		clothingData.put("data", new ArrayList<>());

		Map<String, Object> electronicsData = new HashMap<>();
		electronicsData.put("id", "Electronics");
		electronicsData.put("color", "hsl(335, 70%, 50%)");
		electronicsData.put("data", new ArrayList<>());

		Map<String, Object> healthProductsData = new HashMap<>();
		healthProductsData.put("id", "HealthProducts");
		healthProductsData.put("color", "hsl(335, 70%, 50%)");
		healthProductsData.put("data", new ArrayList<>());

		// Populate data for each month
		for (int i = 1; i <= 12; i++) {
			Map<String, Object> furnitureMonthData = new HashMap<>();
			furnitureMonthData.put("x", getMonthName(i));
			furnitureMonthData.put("y", getTotalAmountForMonth(databaseDataFurniture, "Furniture", i));
			((List<Map<String, Object>>) furnitureData.get("data")).add(furnitureMonthData);

			Map<String, Object> clothingMonthData = new HashMap<>();
			clothingMonthData.put("x", getMonthName(i));
			clothingMonthData.put("y", getTotalAmountForMonth(databaseDataclothing, "clothing", i));
			((List<Map<String, Object>>) clothingData.get("data")).add(clothingMonthData);

			Map<String, Object> electronicsMonthData = new HashMap<>();
			electronicsMonthData.put("x", getMonthName(i));
			electronicsMonthData.put("y", getTotalAmountForMonth(databaseDataElectronics, "Electronics", i));
			((List<Map<String, Object>>) electronicsData.get("data")).add(electronicsMonthData);

			Map<String, Object> healthProductsMonthData = new HashMap<>();
			healthProductsMonthData.put("x", getMonthName(i));
			healthProductsMonthData.put("y", getTotalAmountForMonth(databaseDataHealthProducts, "HealthProducts", i));
			((List<Map<String, Object>>) healthProductsData.get("data")).add(healthProductsMonthData);
		}

		// Add the category data to the response
		responseData.add(furnitureData);
		responseData.add(clothingData);
		responseData.add(electronicsData);
		responseData.add(healthProductsData);

		return responseData;
	}

	private String getMonthName(int month) {
		// Convert the month integer to the corresponding month name
		String[] monthNames = {
				"Jan", "Feb", "Mar", "Apr", "May", "Jun",
				"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
		};
		return monthNames[month - 1];
	}

	private double getTotalAmountForMonth(List<Map<String, Object>> databaseData, String category, int month) {
		double totalAmount = 0.0;
		for (Map<String, Object> data : databaseData) {
			int dataMonth = (int) data.get("month");
			Double amountObj = (Double) data.get("total_amount");

			if (amountObj != null && dataMonth == month && category.equalsIgnoreCase(category)) {
				totalAmount += amountObj;
			}
		}
		return totalAmount;
	}




}
