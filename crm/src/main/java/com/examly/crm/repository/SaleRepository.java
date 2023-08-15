package com.examly.crm.repository;

// import com.examly.crm.graphentity.MonthAmount;
import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.crm.model.Sale;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Year;
import java.util.List;
import java.util.Map;

public interface SaleRepository extends JpaRepository<Sale,Long>{

    @Query(value = "SELECT MONTH(date) AS month, SUM(amount) AS total_amount FROM sale WHERE YEAR(date) = :thisyear " +
            "AND name = :eachObj GROUP BY MONTH(date) ORDER BY MONTH(date)",
            nativeQuery = true)
    List<Map<String, Object>> getDetails(@Param("thisyear") Year thisyear, @Param("eachObj") String eachObj);

}
