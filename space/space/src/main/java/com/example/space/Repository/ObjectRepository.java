package com.example.space.Repository;

import com.example.space.Entity.ObjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;

public interface ObjectRepository extends JpaRepository<ObjectEntity, String> {
    List<ObjectEntity> findByDateBetween(Date startDate, Date endDate);
}

