package squadron.manager.turbine.billet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.metric.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(AuthorizedBilletController.URI)
public class AuthorizedBilletController {
    public static final String URI = "/api/billets";
    private AuthorizedBilletRepository authorizedBilletRepository;
    private MetricService metricService;

    @Autowired
    public void ConstructorBasedInjection(AuthorizedBilletRepository authorizedBilletRepository) {
        this.authorizedBilletRepository = authorizedBilletRepository;
    }

    @Autowired
    public void ConstructorBasedInjection(MetricService metricService) {
        this.metricService = metricService;
    }

    @CrossOrigin
    @GetMapping
    public @ResponseBody
    Iterable<AuthorizedBillet> getAllBillets() {
        return this.authorizedBilletRepository.findAll();
    }

    @CrossOrigin
    @Transactional
    @PostMapping(path = "/save")
    public Iterable<ImportBilletsChangeLog> saveBillets(@Valid @RequestBody Iterable<AuthorizedBilletJSON> json) {
        Date date = new Date();
        json.forEach((newImport -> {
            if(newImport.getPosNr() != null) {
                System.out.println(newImport);
                findExistingOrSaveNew(date, newImport);
            }


        }));
        return metricService.getAllBilletsByImportDateTime(date);
    }

    @CrossOrigin
    @PostMapping(path = "/update")
    public @ResponseBody
    void updatePosition(@Valid @RequestBody AuthorizedBilletJSON newAuthorizedBillet) {
        AuthorizedBillet oldData = authorizedBilletRepository.findByPosNrAndPasCode(newAuthorizedBillet.getPosNr(),newAuthorizedBillet.getPasCode());
        Date date = new Date();
        AuthorizedBillet newData = new AuthorizedBillet(
                newAuthorizedBillet.getPasCode(),
                newAuthorizedBillet.getOrgnStructId(),
                newAuthorizedBillet.getPosNr(),
                newAuthorizedBillet.getAfscAuth(),
                newAuthorizedBillet.getGrdAuth(),
                newAuthorizedBillet.getCurrQtr(),
                newAuthorizedBillet.getProjQtr1(),
                newAuthorizedBillet.getProjQtr2(),
                newAuthorizedBillet.getProjQtr3(),
                newAuthorizedBillet.getProjQtr4(),
                newAuthorizedBillet.getMbrAssigned(),
                date
        );
        oldData.setPasCode(newData.getPasCode());
        oldData.setOrgnStructId(newData.getOrgnStructId());
        oldData.setPosNr(newData.getPosNr());
        oldData.setAfscAuth(newData.getAfscAuth());
        oldData.setGrdAuth(newData.getGrdAuth());
        oldData.setCurrQtr(newData.getCurrQtr());
        oldData.setProjQtr1(newData.getProjQtr1());
        oldData.setProjQtr2(newData.getProjQtr2());
        oldData.setProjQtr3(newData.getProjQtr3());
        oldData.setProjQtr4(newData.getProjQtr4());
        oldData.setMbrAssigned(newData.getMbrAssigned());
        oldData.setLastUpdate(newData.getLastUpdate());
        authorizedBilletRepository.save(oldData);
    }

    private void findExistingOrSaveNew(Date date, AuthorizedBilletJSON newImport) {
        if (newImport.getPosNr() != null) {
            AuthorizedBillet existingAuthorizedBillet = authorizedBilletRepository.findByPosNrAndPasCode(
                    newImport.getPosNr(),
                    newImport.getPasCode()
            );


            AuthorizedBillet importingAuthorizedBillet = new AuthorizedBillet(
                    newImport.getPasCode(),
                    newImport.getOrgnStructId(),
                    newImport.getPosNr(),
                    newImport.getAfscAuth(),
                    newImport.getGrdAuth(),
                    newImport.getCurrQtr(),
                    newImport.getProjQtr1(),
                    newImport.getProjQtr2(),
                    newImport.getProjQtr3(),
                    newImport.getProjQtr4(),
                    newImport.getMbrAssigned(),
                    date
            );

            if (existingAuthorizedBillet != null) {
                logAndSaveChanges(date, importingAuthorizedBillet, existingAuthorizedBillet);
            } else {
                this.metricService.logNewImportedBillets(new NewBilletsLogModel(newImport.getPasCode(), newImport.getPosNr(), date));
                if (importingAuthorizedBillet.getPosNr() != null) {
                    this.authorizedBilletRepository.save(importingAuthorizedBillet);
                }
            }
        }
    }

    private void logAndSaveChanges(Date date, AuthorizedBillet importingAuthorizedBillet, AuthorizedBillet existingAuthorizedBillet) {
        List<ImportBilletsChangeLog> importAuthorizedBilletChanges = new ArrayList();
        boolean changed = false;
        for (String field : existingAuthorizedBillet.compare(importingAuthorizedBillet)) {
            if (field.length() > 0) changed = true;
            importAuthorizedBilletChanges.add(
                    new ImportBilletsChangeLog(
                            date,
                            importingAuthorizedBillet,
                            existingAuthorizedBillet,
                            field
                    ));
        }

        if (changed) {
            this.metricService.logBilletsFieldChange(importAuthorizedBilletChanges);
            this.authorizedBilletRepository.save(updateExistingAuthorizedBilletData(importingAuthorizedBillet, existingAuthorizedBillet));
        }
    }

    private AuthorizedBillet updateExistingAuthorizedBilletData(AuthorizedBillet importingAuthorizedBillet, AuthorizedBillet existingAuthorizedBillet) {
        existingAuthorizedBillet.setPasCode(importingAuthorizedBillet.getPasCode());
        existingAuthorizedBillet.setOrgnStructId(importingAuthorizedBillet.getOrgnStructId());
        existingAuthorizedBillet.setPosNr(importingAuthorizedBillet.getPosNr());
        existingAuthorizedBillet.setAfscAuth(importingAuthorizedBillet.getAfscAuth());
        existingAuthorizedBillet.setGrdAuth(importingAuthorizedBillet.getGrdAuth());
        existingAuthorizedBillet.setCurrQtr(importingAuthorizedBillet.getCurrQtr());
        existingAuthorizedBillet.setProjQtr1(importingAuthorizedBillet.getProjQtr1());
        existingAuthorizedBillet.setProjQtr2(importingAuthorizedBillet.getProjQtr2());
        existingAuthorizedBillet.setProjQtr3(importingAuthorizedBillet.getProjQtr3());
        existingAuthorizedBillet.setProjQtr4(importingAuthorizedBillet.getProjQtr4());
        existingAuthorizedBillet.setMbrAssigned(importingAuthorizedBillet.getMbrAssigned());
        existingAuthorizedBillet.setLastUpdate(new Date());
        return existingAuthorizedBillet;
    }
}
