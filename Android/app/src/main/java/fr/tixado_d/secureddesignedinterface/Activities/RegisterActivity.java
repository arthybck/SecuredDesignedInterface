package fr.tixado_d.secureddesignedinterface.Activities;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.concurrent.ExecutionException;

import fr.tixado_d.secureddesignedinterface.R;

public class RegisterActivity extends AppCompatActivity {
    private EditText EmailAddress, Password, Username;
    private Button Register;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        Username = findViewById(R.id.username);
        EmailAddress = findViewById(R.id.userEmail);
        Password = findViewById(R.id.userPassword);
        Register = findViewById(R.id.createacc);

        Register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                RegisterBtn(view);
            }
        });

    }

    public void RegisterBtn(View view) {
        String body = null;
        try {
            body = "username=" + URLEncoder.encode(Username.getText().toString(), "utf-8")  +
                    "&email=" + URLEncoder.encode(EmailAddress.getText().toString(), "utf-8") +
                    "&password=" + URLEncoder.encode(Password.getText().toString(), "utf-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        Log.e("body -> ", body);
        RequestPostLogin loginRequest = new RequestPostLogin();
        try {
            if (loginRequest.execute("http://10.0.2.2:3080/register", body).get() == "Error") {
                Log.e("error registerrequest", "Error");
            }
            else {
                Intent i = new Intent(this, LoginActivity.class);
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
                Log.e("result register", result);
                br.close();

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
