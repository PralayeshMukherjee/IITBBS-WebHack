package com.example.space.Repository;

import com.example.space.Entity.UserObjectHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface UserObjectHistoryRepository extends JpaRepository<UserObjectHistory, Long> {

    // Find all objects searched by a specific user
    List<UserObjectHistory> findByUserEmail(String email);
}
