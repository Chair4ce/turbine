package squadron.manager.turbine.rank;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(RankController.URI)
public class RankController {
    public static final String URI = "/api/ranks";

    private RankService rankService;

    public RankController(RankService rankService) {
        this.rankService = rankService;
    }

    @GetMapping
    public List<Rank> index() {
        return rankService.getAllRanks();
    }
}
