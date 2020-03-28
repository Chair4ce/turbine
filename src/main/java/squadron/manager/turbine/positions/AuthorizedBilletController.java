package squadron.manager.turbine.positions;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.member.Member;
import squadron.manager.turbine.member.MemberJSON;
import squadron.manager.turbine.member.MemberRepository;
import squadron.manager.turbine.metric.MetricService;
import squadron.manager.turbine.metric.NewMemberLogModel;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping(AuthorizedBilletController.URI)
public class AuthorizedBilletController {
    public static final String URI = "/api/positions";

    private AuthorizedBilletRepository authorizedBilletRepository;
    private MemberRepository memberRepository;
    private MetricService metricService;

    @Autowired
    public void ConstructorBasedInjection(AuthorizedBilletRepository authorizedBilletRepository) {
        this.authorizedBilletRepository = authorizedBilletRepository;
    }

    @Autowired
    public void ConstructorBasedInjection(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Autowired
    public void ConstructorBasedInjection(MetricService metricService) {
        this.metricService = metricService;
    }


    @CrossOrigin
    @GetMapping
    public @ResponseBody
    Iterable<AuthorizedBillet> getPositions() {
        return this.authorizedBilletRepository.findAll();
    }


    @CrossOrigin
    @Transactional
    @PostMapping(path = "/save")
    public Iterable<AuthorizedBillet> saveBillets(@Valid @RequestBody Iterable<AuthorizedBilletJSON> json) {
        Date date = new Date();
        json.forEach((newImport -> {
            findExistingOrSaveNew(date, newImport);
        }));
        return authorizedBilletRepository.findAll();
    }


    @CrossOrigin
    @PostMapping(path = "/update")
    public @ResponseBody
    void updatePosition(@Valid @RequestBody AuthorizedBilletJSON newPosition) {
        AuthorizedBillet oldData = authorizedBilletRepository.findById(newPosition.getId());
        Date date = new Date();
        AuthorizedBillet newData = new AuthorizedBillet(
                newPosition.getSquadronId(),
                newPosition.getPosNr(),
                newPosition.getAfscAuth(),
                newPosition.getGrdAuth(),
                newPosition.getCurrQtr(),
                newPosition.getProjQtr1(),
                newPosition.getProjQtr2(),
                newPosition.getProjQtr3(),
                newPosition.getProjQtr4(),
                date
        );
        oldData.setSquadronId(newData.getSquadronId());
        oldData.setPosNr(newData.getPosNr());
        oldData.setAfscAuth(newData.getAfscAuth());
        oldData.setGrdAuth(newData.getGrdAuth());
        oldData.setCurrQtr(newData.getCurrQtr());
        oldData.setProjQtr1(newData.getProjQtr1());
        oldData.setProjQtr2(newData.getProjQtr2());
        oldData.setProjQtr3(newData.getProjQtr3());
        oldData.setProjQtr4(newData.getProjQtr4());
        oldData.setLastUpdate(newData.getLastUpdate());
        authorizedBilletRepository.save(oldData);
    }


    private void findExistingOrSaveNew(Date date, AuthorizedBilletJSON newImport) {
        Iterable<AuthorizedBillet> billets = authorizedBilletRepository.findAll();
        Member existingBillet = returnBilletIfExists(newImport.getPosNr());

        AuthorizedBillet importingBillet = new AuthorizedBillet(
                newImport.getSquadronId(),
                newImport.getPosNr(),
                newImport.getAfscAuth(),
                newImport.getGrdAuth(),
                newImport.getCurrQtr(),
                newImport.getProjQtr1(),
                newImport.getProjQtr2(),
                newImport.getProjQtr3(),
                newImport.getProjQtr4(),
        date
        );

        if (notNull(existingBillet)) {
            logAndSaveChanges(date, importingBillet, existingBillet);
        } else {
            this.metricService.logNewImportedBillets(new AuthorizedBilletLogModel(existingBillet.getPosNr(), date));
            this.authorizedBilletRepository.save(existingBillet);
        }
    }

    private Member returnBilletIfExists(String importingSqid) {
        return memberRepository.findBySqid(importingSqid);
    }


}
