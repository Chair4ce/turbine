package squadron.manager.turbine.tasks;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import squadron.manager.turbine.member.Member;
import squadron.manager.turbine.member.MemberRepository;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping(SquadronTaskController.URI)
public class SquadronTaskController {

    public static final String URI = "api/sqTask";
    private SquadronTaskRepository squadronTaskRepository;
    private MemberRepository memberRepository;

    @Autowired
    public void ConstructorBasedInjection(SquadronTaskRepository squadronTaskRepository) {
        this.squadronTaskRepository = squadronTaskRepository;
    }

    @Autowired
    public void ConstructorBasedInjection(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @CrossOrigin
    @GetMapping
    public @ResponseBody
    List<SquadronTask> getTasks() {
        return squadronTaskRepository.findAll();
    }

    @CrossOrigin
    @GetMapping(path = "/details")
    public @ResponseBody
    List<TaskDetailModel> getDetails() {
        List<SquadronTask> squadronTaskList = squadronTaskRepository.findAll();
        List<TaskDetailModel> DetailTaskList = new ArrayList();
        squadronTaskList.forEach((sqTask -> {
            Member member = memberRepository.findBySqid(sqTask.getMbrId());

            Member supervisor = memberRepository.findBySqid(member.getSupvName());

            DetailTaskList.add(new TaskDetailModel(
                    sqTask.getMbrId(),
                    member.getFullName(),
                    sqTask.getTaskType(),
                    sqTask.getStatus(),
                    sqTask.getDueDate(),
                    member.getRnltd(),
                    supervisor.getFullName() != null ? supervisor.getFullName() : "Not Assigned",
                    supervisor.getSqid() != null ? supervisor.getSqid() : "Not Assigned"
            ));
        }));

        return DetailTaskList;
    }


    @CrossOrigin
    @PostMapping(path = "/save")
    public Iterable<SquadronTask> saveMbrTask(@Valid @RequestBody SquadronTaskJSON json) {
        System.out.println(json.getMbrName());
        SquadronTask squadronTask = new SquadronTask(
                json.getMbrId(),
                json.getMbrName(),
                json.getTaskType(),
                json.getStatus(),
                json.getDueDate());
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
    public List<SquadronTask> updateMbrTask(@Valid @RequestBody SquadronTask task) {
        SquadronTask squadronTask = squadronTaskRepository.findSquadronTaskById(task.getId());
        SquadronTask newSquadronTask = new SquadronTask(
                task.getMbrId(),
                task.getMbrName(),
                task.getTaskType(),
                task.getStatus(),
                task.getDueDate()
        );
        squadronTask.setMbrId(newSquadronTask.getMbrId());
        squadronTask.setMbrName(newSquadronTask.getMbrId());
        squadronTask.setTaskType(newSquadronTask.getTaskType());
        squadronTask.setStatus(newSquadronTask.getStatus());
        squadronTask.setDueDate(newSquadronTask.getDueDate());

        squadronTaskRepository.save(squadronTask);
        return squadronTaskRepository.findAll();
    }

}