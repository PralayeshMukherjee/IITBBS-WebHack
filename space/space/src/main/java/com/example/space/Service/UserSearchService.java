package com.example.space.Service;

import com.example.space.Entity.UserObjectHistory;
import com.example.space.Repository.UserObjectHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserSearchService {

    private final UserObjectHistoryRepository historyRepository;

    public List<UserObjectHistory> getUserSearchHistory(String userEmail) {
        return historyRepository.findByUserEmail(userEmail);
    }
}

