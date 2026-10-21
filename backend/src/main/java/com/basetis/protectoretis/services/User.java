public class User {
    private final Username name;
    private final Email email;
    private final Password password;


    public User(Username name, Email email, Password password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

 //   public User(String name, String email, String Password) {
 //       this.name = new Username(name);
 //       this.email = new Email(email);
 //       this.password = new Password(password);
 //   }
}