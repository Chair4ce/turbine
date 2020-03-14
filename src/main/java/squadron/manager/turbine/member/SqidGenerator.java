package squadron.manager.turbine.member;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SqidGenerator {

    private String firstName;
    private String middleInitial;
    private String lastName;
    private String sqid;


    public SqidGenerator(String fullName, String rawSqid) {
        String regexp = "([A-Za-z]+),\\s+([A-Za-z]+)";

        fullName = fullName.replaceAll("\'","").replaceAll("-","");

        fullName = fullName.substring( 0, fullName.indexOf(",")).replaceAll("\\s", "") + fullName.substring(fullName.indexOf(",")) ;
        System.out.println(fullName);
        Pattern pattern = Pattern.compile(regexp);
        Matcher matcher = pattern.matcher(fullName);
        matcher.find();

//        System.out.println("Fullname  : " + fullName);
//        System.out.println("Lastname  : " + matcher.group(1));
//        System.out.println("Firstname : " + matcher.group(2));
//        System.out.println("Middlename: " + matcher.group(3));

        this.firstName = matcher.group(2);
        //throwing out the middle name for now
//        this.middleInitial = matcher.group(3);
        this.lastName = matcher.group(1);

        this.sqid = rawSqid + "." + this.lastName.toUpperCase() + "." + this.firstName.toUpperCase();

    }
}
