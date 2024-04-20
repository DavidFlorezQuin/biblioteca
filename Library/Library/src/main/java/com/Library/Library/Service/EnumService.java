package com.Library.Library.Service;


import com.Library.Library.IService.IEnumService;
import com.Library.Library.Utils.Enums.Memberships;
import org.springframework.stereotype.Service;

@Service
public class EnumService implements IEnumService {

    @Override
    public Memberships[] getMemberships() {
        return Memberships.values();
    }
}
