package squadron.manager.turbine.tasks;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.gaining.GainingRepository;
import squadron.manager.turbine.member.Member;
import squadron.manager.turbine.squadron.Squadron;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(SquadronTaskController.URI)
public class SquadronTaskController {

    public static final String URI = "api/sqTask";
    private SquadronTaskRepository squadronTaskRepository;

    @Autowired
    public void ConstructorBasedInjection(SquadronTaskRepository squadronTaskRepository) {
        this.squadronTaskRepository = squadronTaskRepository;
    }

    @CrossOrigin
    @GetMapping
    public @ResponseBody
    Iterable<SquadronTask> getTasks() {
        return squadronTaskRepository.findAll();
    }


    @CrossOrigin
    @PostMapping(path = "/save")
    public Iterable<SquadronTask> saveMbrTask(@Valid @RequestBody SquadronTaskJSON json) {
        SquadronTask squadronTask = new SquadronTask(json.getMbrId(), json.getTaskType(),json.getStatus(), json.getDueDate());
        squadronTaskRepository.save(squadronTask);
        return squadronTaskRepository.findAll();
    }

    @CrossOrigin
    @PostMapping(path = "/delete")
    public Iterable<SquadronTask> deleteMbrTask(@Valid @RequestBody Long taskId) {
        squadronTaskRepository.deleteById(taskId);
        return squadronTaskRepository.findAll();
    }

    @CrossOrigin
    @Transactional
    @PostMapping(path = "/update")
    public List<SquadronTask> updateMbrTask(@Valid @RequestBody SquadronTaskJSON task) {
        SquadronTask squadronTask = squadronTaskRepository.getOne(task.getId());
        SquadronTask newSquadronTask = new SquadronTask(
                task.getMbrId(),
                task.getTaskType(),
                task.getStatus(),
                task.getDueDate()
        );
        squadronTask.setMbrId(newSquadronTask.getMbrId());
        squadronTask.setTaskType(newSquadronTask.getTaskType());
        squadronTask.setStatus(newSquadronTask.getStatus());
        squadronTask.setDueDate(newSquadronTask.getDueDate());

        squadronTaskRepository.save(squadronTask);
        return squadronTaskRepository.findAll();
    }

}