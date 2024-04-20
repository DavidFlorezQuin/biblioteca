package com.Library.Library.Controller;


import com.Library.Library.IService.IEnumService;
import com.Library.Library.Utils.Enums.Memberships;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/enum")
public class EnumController {

    @Autowired
    private IEnumService service;

    @GetMapping("/memberships")
    public Memberships[] getMemberships(){
        return service.getMemberships();
    }
}
