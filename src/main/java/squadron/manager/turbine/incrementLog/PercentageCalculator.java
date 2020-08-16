package squadron.manager.turbine.incrementLog;

public class PercentageCalculator {
   public static String calculatePercentage(double obtained, double total) {
        return String.valueOf((int)Math.ceil(obtained * 100 / total)) + '%';
    }
}
