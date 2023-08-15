package com.examly.crm.controller;

import java.util.List;
import java.util.Map;

// import com.examly.crm.graphentity.SaleGraph;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.crm.model.Sale;
import com.examly.crm.service.SaleService;

@RestController
@CrossOrigin("http://localhost:3000")
public class SaleController {

	@Autowired
	private SaleService saleService;


	//Sales= Post,Get,Put,Delete

//	public ResponseEntity<Boolean> createSale(@PathVariable Long id,@RequestBody Sale sale){
//        try{
//             this.saleService.addSale(id,sale);
//             return ResponseEntity.status(HttpStatus.OK).body(true);
//        }catch(Exception e){
//           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
//       }
//    }
	//Post- Adding sales
@PostMapping("/customer/{id1}/opportunity/{id2}/sale")
public ResponseEntity<Boolean> createSale(@PathVariable("id1") Long customerid,@PathVariable("id2") Long opportunityid, @RequestBody Sale sale){
    try {
        this.saleService.addSale(customerid,opportunityid, sale);
        return ResponseEntity.status(HttpStatus.OK).body(true);
    } catch(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
    }
}



	//GET-Displaying sales
	@GetMapping("/sale")
    public ResponseEntity<List<Sale>> getSaleId(){

        return ResponseEntity.ok(this.saleService.getSale());
    }

  //GET-one sale based on ID
	 @GetMapping("/sale/{id}")
    public ResponseEntity<Sale> getSaleById(@PathVariable("id") Long id){
        if((this.saleService.getSaleById(id))!=null){
            return ResponseEntity.ok(this.saleService.getSaleById(id));
        }else {
            return ResponseEntity.notFound().build();
        }
    }


    //PUT-updating sale details
	 @PutMapping("/sale/{id}")
    public ResponseEntity<Void> updateSale(@PathVariable Long id, @RequestBody Sale sale){
        this.saleService.updateSale(id,sale);
        return ResponseEntity.ok().build();
    }

    //DELETE - removes specific sale

	 @DeleteMapping("/sale/{id}")
    public ResponseEntity<Void> deleteSale(@PathVariable Long id){
        this.saleService.deleteSale(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/sale/graphs")
    public List<Map<String, Object>> getResponseData(){
        return this.saleService.getSalesGraph();
    }

}
