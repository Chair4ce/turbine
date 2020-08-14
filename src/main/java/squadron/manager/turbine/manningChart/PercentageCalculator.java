package squadron.manager.turbine.manningChart;

import java.text.NumberFormat;
import java.util.Locale;
import java.util.Scanner;

public class PercentageCalculator {
   public static String calculatePercentage(double obtained, double total) {
        return String.valueOf((int)Math.ceil(obtained * 100 / total)) + '%';
    }
}
