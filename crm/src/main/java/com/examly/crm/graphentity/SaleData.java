package com.examly.crm.graphentity;

public class SaleData {
    private String x;
    private double y;

    public SaleData() {
        super();
    }

    public SaleData(String x, double y) {
        this.x = x;
        this.y = y;
    }

    public String getX() {
        return x;
    }

    public void setX(String x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }
}
