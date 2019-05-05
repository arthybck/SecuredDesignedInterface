package fr.tixado_d.secureddesignedinterface.Models;

public class Users {
    private String username;
    private String email;
    private String userId;
    private String age;
    private String firstName;
    private String lastName;
    private String city;

    public Users(String username, String email, String userId) {
        this.username = username;
        this.email = email;
        this.userId = userId;
    }

    public Users(String username, String email, String userId, String age, String city) {
        this.username = username;
        this.email = email;
        this.userId = userId;
        this.age = age;
        this.city = city;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
