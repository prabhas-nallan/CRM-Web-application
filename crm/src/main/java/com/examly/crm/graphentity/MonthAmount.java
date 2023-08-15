package com.examly.crm.graphentity;

public class MonthAmount {

    private int month;
    private double totalAmount;

    public MonthAmount(int month, double totalAmount) {
        this.month = month;
        this.totalAmount = totalAmount;
    }

    public MonthAmount() {
        super();
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
}
