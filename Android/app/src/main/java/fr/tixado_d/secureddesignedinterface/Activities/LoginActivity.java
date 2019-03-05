package fr.tixado_d.secureddesignedinterface.Activities;

import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.concurrent.ExecutionException;

import fr.tixado_d.secureddesignedinterface.MainActivity;
import fr.tixado_d.secureddesignedinterface.R;
import fr.tixado_d.secureddesignedinterface.Utils.MyGlobals;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class LoginActivity extends AppCompatActivity {

    private EditText EmailAddress;
    private EditText Password;
    private TextView AlreadyRegister;
    private Button SignIn;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        EmailAddress = findViewById(R.id.userEmail);
        Password = findViewById(R.id.userPassword);
        SignIn = findViewById(R.id.signInBtn);
        AlreadyRegister = findViewById(R.id.alreadyreg);

        SignIn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                SignIn(view);
            }
        });

    }

    public void OnClickRegister(View v) {
        Intent i = new Intent(v.getContext(), RegisterActivity.class);
        startActivity(i);

    }

    public static boolean isValidEmail(CharSequence target) {
        if (TextUtils.isEmpty(target)) {
            return false;
        } else {
            return android.util.Patterns.EMAIL_ADDRESS.matcher(target).matches();
        }
    }

    public void SignIn(View view) {
//        if (isValidEmail(EmailAddress.getText()) && Password.length() > 7) {
//            Log.e("isvalidEmail = ", "oui");
//            //faire appel API
//            Intent i = new Intent(this, MainActivity.class);
//            startActivity(i);
//
//        } else {
//            Log.e("invalid email password", "oui");
//        }

        String body = null;
        try {
            body = "username=" + URLEncoder.encode(EmailAddress.getText().toString(), "utf-8")  + "&password=" + URLEncoder.encode(Password.getText().toString(), "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        Log.e("body -> ", body);
        LoginActivity.RequestPostLogin loginRequest = new RequestPostLogin();
        try {
            if (loginRequest.execute("http://10.0.2.2:3080/login", body).get() == "Error") {
                Log.e("error loginrequest", "Error");
            }
            else {
                Intent i = new Intent(this, MainActivity.class);
                startActivity(i);
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }

    private class RequestPostLogin extends AsyncTask<String, String, String> {

        StringBuilder sb = new StringBuilder();

        protected String doInBackground(String... params) {

            HttpURLConnection connection = null;

            try {
                URL url = new URL(params[0]);
                connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("POST");
                connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

                DataOutputStream write = new DataOutputStream(connection.getOutputStream());
                write.writeBytes(params[1]);
                write.flush();
                write.close();
                connection.setReadTimeout(5000);
                connection.setConnectTimeout(5000);
                connection.connect();
                int status = connection.getResponseCode();
                String responseMessage = connection.getResponseMessage();

                if (status == 200) {
                    Log.e("Status", "Status 200 OK");

                } else {
                    Log.e("Status", "Status KO" + status + " " + responseMessage);
                    return "Error";
                }
                String result = "";

                BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
                String line;
                while ((line = br.readLine()) != null) {
                    sb.append(line + "\n");
                }
                result = sb.toString();
                Log.e("result login", result);
                br.close();

                String userToken = result.substring(result.indexOf("token") + 8, result.lastIndexOf("}") - 1);

                //set userToken in global;
                MyGlobals.getInstance().setUserToken(userToken);
                Log.e("token -> ", MyGlobals.getInstance().getUserToken());

            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                if (connection != null) {

                    connection.disconnect();
                }
            }
            return null;
        }
    }

}