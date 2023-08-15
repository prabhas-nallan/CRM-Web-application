package com.examly.crm.graphentity;

// import com.examly.crm.model.Sale;

import java.util.List;

public class SaleGraph {
    private String id;
    private String color;

    private List<SaleData> saleData;

    public SaleGraph(String id, String color, List<SaleData> saleData) {

        this.id = id;
        this.color = color;
        this.saleData = saleData;
    }

    public SaleGraph() {
        super();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public List<SaleData> getSaleData() {
        return saleData;
    }

    public void setSaleData(List<SaleData> saleData) {
        this.saleData = saleData;
    }
}
