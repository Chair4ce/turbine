package squadron.manager.turbine.positions;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping(PositionController.URI)
public class PositionController {
    public static final String URI = "/api/positions";

    private PositionRepository positionRepository;

    @Autowired
    public void ConstructorBasedInjection(PositionRepository positionRepository) {
        this.positionRepository = positionRepository;
    }

    @CrossOrigin
    @GetMapping
    public @ResponseBody
    Iterable<Position> getPositions() {
        return this.positionRepository.findAll();
    }


    @CrossOrigin
    @PostMapping(path = "/update")
    public @ResponseBody
    void updatePosition(@Valid @RequestBody PositionJSON newPosition) {
        Position oldData = positionRepository.findById(newPosition.getId());
        Date date = new Date();
        Position newData = new Position(
        newPosition.getSquadronId(),
                newPosition.getPosId(),
                newPosition.getAfscAuth(),
                newPosition.getGrdAuth(),
                newPosition.getCurrQtr(),
                newPosition.getProjQtr1(),
                newPosition.getProjQtr2(),
                newPosition.getProjQtr3(),
                newPosition.getProjQtr4(),
                newPosition.getMbrAssigned(),
                date
        );
        oldData.setSquadronId(newData.getSquadronId());
        oldData.setPosId(newData.getPosId());
        oldData.setAfscAuth(newData.getAfscAuth());
        oldData.setGrdAuth(newData.getGrdAuth());
        oldData.setCurrQtr(newData.getCurrQtr());
        oldData.setProjQtr1(newData.getProjQtr1());
        oldData.setProjQtr2(newData.getProjQtr2());
        oldData.setProjQtr3(newData.getProjQtr3());
        oldData.setProjQtr4(newData.getProjQtr4());
        oldData.setMbrAssigned(newData.getMbrAssigned());
        oldData.setLastUpdate(newData.getLastUpdate());
        positionRepository.save(oldData);
    }


}
