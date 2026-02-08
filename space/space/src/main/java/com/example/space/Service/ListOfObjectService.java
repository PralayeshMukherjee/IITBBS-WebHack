package com.example.space.Service;

import com.example.space.Entity.ObjectEntity;
import com.example.space.Repository.ObjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Service
public class ListOfObjectService {
    @Autowired
    private ObjectRepository objectRepository;
    public List<ObjectEntity> findUsingDate(Date start,Date end){

        return objectRepository.findByDateBetween(start,end);
    }
}
