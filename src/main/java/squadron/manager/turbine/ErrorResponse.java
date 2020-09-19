package squadron.manager.turbine;

import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
public class ErrorResponse {
    private List<Map<String, String>> errors = new ArrayList<>();

    public ErrorResponse addError(String field, String message) {
        HashMap<String, String> error = new HashMap<>();

        error.put("field", field);
        error.put("defaultMessage", message);

        this.errors.add(error);
        return this;
    }
}
