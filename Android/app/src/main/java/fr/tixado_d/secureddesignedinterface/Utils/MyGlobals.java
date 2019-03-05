package fr.tixado_d.secureddesignedinterface.Utils;

public class MyGlobals {
    private static MyGlobals mInstance= null;

    private String userId;
    private String userToken;
    private String userEmail;
    private String fisrName;
    private String lastName;

    private MyGlobals(){}

    public static synchronized MyGlobals getInstance() {
        if(null == mInstance){
            mInstance = new MyGlobals();
        }
        return mInstance;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserToken() {
        return userToken;
    }

    public void setUserToken(String userToken) {
        this.userToken = userToken;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getFisrName() {
        return fisrName;
    }

    public void setFisrName(String fisrName) {
        this.fisrName = fisrName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}