package squadron.manager.turbine.rank;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RankService {
    private RankRepository rankRepository;

    public RankService(RankRepository rankRepository) {
        this.rankRepository = rankRepository;
    }

    public List<Rank> getAllRanks() {
        return this.rankRepository.findAll();
    }
}
