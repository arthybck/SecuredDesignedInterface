package fr.tixado_d.secureddesignedinterface.Fragments;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;

import fr.tixado_d.secureddesignedinterface.Activities.LoginActivity;
import fr.tixado_d.secureddesignedinterface.Models.Users;
import fr.tixado_d.secureddesignedinterface.R;
import fr.tixado_d.secureddesignedinterface.Utils.MyGlobals;

public class SettingsFragment extends Fragment {
    private Button logoutButton, updateButton;
    private EditText lastnameText, firstnameText, emailText, cityText, ageText;
    private Users user;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.settings_fragment, container, false);

        updateButton = view.findViewById(R.id.save);
        logoutButton = view.findViewById(R.id.logout);
        lastnameText = view.findViewById(R.id.lastname);
        firstnameText = view.findViewById(R.id.firstname);
        emailText = view.findViewById(R.id.email);
        cityText = view.findViewById(R.id.city);
        ageText = view.findViewById(R.id.age);


        RequestGetProfile loginRequest = new RequestGetProfile();
        try {
            if (loginRequest.execute("http://10.0.2.2:3080/profile").get() == "Error") {
                Log.e("error put user", "Error");
            }
            else {
                Log.e("SUCCESS", "GET PROFILE !");
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }


        updateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                String firstName = firstnameText.getText().toString();
                String lastName = lastnameText.getText().toString();
                String age = ageText.getText().toString();
                String city = cityText.getText().toString();
                String email = emailText.getText().toString();
                String body;

                try {
                    body = "username=" + URLEncoder.encode(user.getUsername(), "utf-8") + "&email=" + URLEncoder.encode(email, "utf-8")
                            + "&id=" + URLEncoder.encode(lastName, "utf-8")
                            + "&lastname=" + URLEncoder.encode(lastName, "utf-8") + "&firstname=" + URLEncoder.encode(firstName, "utf-8")
                            + "&age=" + URLEncoder.encode(age, "utf-8") + "&city=" + URLEncoder.encode(city, "utf-8");

                    Log.e("BODY REQUET", body);
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                // REVOIR ENVOIE FONCTION

                RequestUpdateProfile loginRequest = new RequestUpdateProfile();
                try {
                    if (loginRequest.execute("http://10.0.2.2:3080/users").get() == "Error") {
                        Log.e("error put user", "Error");
                    }
                    else {
                        Log.e("SUCCESS", "UPDATE SUCCESS !");
                    }
                } catch (InterruptedException | ExecutionException e) {
                    e.printStackTrace();
                }
            }
        });

        logoutButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(view.getContext(), LoginActivity.class);
                startActivity(i);
            }
        });

        return view;
    }

    private class RequestGetProfile extends AsyncTask<String, String, String> {

        protected String doInBackground(String... params) {
            HttpURLConnection connection = null;

            try {
                URL url = new URL(params[0]);
                connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");
                connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
                connection.setRequestProperty("x-access-token", MyGlobals.getInstance().getUserToken());
                Log.e("Token -> ", MyGlobals.getInstance().getUserToken());
                connection.setReadTimeout(5000);
                connection.setConnectTimeout(5000);
                connection.connect();
                int status = connection.getResponseCode();
                if (status == 200 || status == 201) {
                    Log.e("Status", "Status 200 - 201 OK");
                } else {
                    Log.e("Status", "Status KO");
                    return "Error";
                }

                BufferedReader in = new BufferedReader(
                        new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();

                //print in String
                Log.e("request get Profile", response.toString());

                //Récupération de l'user
                JSONObject jsonObj;
                try {
                    jsonObj = new JSONObject(response.toString());
                    user = new Users(jsonObj.getString("username"), jsonObj.getString("email"), jsonObj.getString("_id"));
                    Log.e("User = ", user.getUserId());
                } catch (JSONException e) {
                    e.printStackTrace();
                }

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

    private class RequestUpdateProfile extends AsyncTask<String, String, String> {

        protected String doInBackground(String... params) {
            HttpURLConnection connection = null;

            try {
                URL url = new URL(params[0]);
                connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("PUT");
                connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
                connection.setRequestProperty("x-access-token", MyGlobals.getInstance().getUserToken());
                Log.e("Token -> ", MyGlobals.getInstance().getUserToken());
                connection.setReadTimeout(5000);
                connection.setConnectTimeout(5000);
                connection.connect();
                int status = connection.getResponseCode();
                if (status == 200 || status == 201) {
                    Log.e("Status", "Status 200 - 201 OK");
                } else {
                    Log.e("Status", "Status KO");
                    return "Error";
                }

                BufferedReader in = new BufferedReader(
                        new InputStreamReader(connection.getInputStream()));
                String inputLine;
                StringBuffer response = new StringBuffer();
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();

                //print in String
                Log.e("request get users", response.toString());

                //recuperation UserID
                JSONArray jsonArray = new JSONArray(response.toString());
                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject jsonobject = jsonArray.getJSONObject(i);
                    Users user = new Users(jsonobject.get("username").toString(), jsonobject.get("email").toString(), jsonobject.get("_id").toString());
                    Log.e("user ->", user.getEmail() + " " + user.getUserId());
                    //itemUsers.add(user);
                }

            } catch (IOException e) {
                e.printStackTrace();
            } catch (JSONException e) {
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
