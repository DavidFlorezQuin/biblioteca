package com.Library.Library.Controller;


import com.Library.Library.Dto.ApiResponseDto;
import com.Library.Library.Dto.LoanDto;
import com.Library.Library.Dto.LoanPersonDto;
import com.Library.Library.Entity.Loan;
import com.Library.Library.IService.ILoanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("v1/api/loan")
public class LoanController extends ABaseController<Loan, ILoanService> {
    /**
     * Constructor for ABaseController.
     *
     * @param service The service for the entity.
     */
    protected LoanController(ILoanService service) {
        super(service, "Loan");
    }

    @GetMapping("/loanPerson")
    public ResponseEntity<ApiResponseDto<List<LoanDto>>> showDocument() {
        try {
            List<LoanDto> entity = service.getLoan();
            return ResponseEntity.ok(new ApiResponseDto<List<LoanDto>>("Registro encontrado", entity, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<List<LoanDto>>(e.getMessage(), null, false));
        }
    }

    @GetMapping("/loanPersons/{id}")
    public ResponseEntity<ApiResponseDto<List<LoanPersonDto>>> showPerson(@PathVariable Long id) {
        try {
            List<LoanPersonDto> entity = service.getLoanPerson(id);
            return ResponseEntity.ok(new ApiResponseDto<List<LoanPersonDto>>("Registro encontrado", entity, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<List<LoanPersonDto>>(e.getMessage(), null, false));
        }
    }
}
