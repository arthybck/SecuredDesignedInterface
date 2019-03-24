package fr.tixado_d.secureddesignedinterface.Fragments;

import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import fr.tixado_d.secureddesignedinterface.Activities.LoginActivity;
import fr.tixado_d.secureddesignedinterface.Adapter.CustomAdapter;
import fr.tixado_d.secureddesignedinterface.MainActivity;
import fr.tixado_d.secureddesignedinterface.Models.Users;
import fr.tixado_d.secureddesignedinterface.R;
import fr.tixado_d.secureddesignedinterface.Utils.MyGlobals;

public class HomeFragment extends Fragment {
    private ListView listOfUser;
    private ArrayList<Users> itemUsers;
    private CustomAdapter adapter;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.home_fragment, container, false);
        itemUsers = new ArrayList<>();

        RequestGetUser loginRequest = new RequestGetUser();
        try {
            if (loginRequest.execute("http://10.0.2.2:3080/users").get() == "Error") {
                Log.e("error loginrequest", "Error");
            }
            else {
                Log.e("list", String.valueOf(itemUsers.size()));
            }
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        adapter = new CustomAdapter(itemUsers, getContext());
        listOfUser = view.findViewById(R.id.listOfUser);
        listOfUser.setAdapter(adapter);
        listOfUser.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Users dataModel= itemUsers.get(position);
                TextView txtclose;
                TextView username;
                final Dialog myDialog = new Dialog(view.getContext());
                myDialog.setContentView(R.layout.custom_popup);
                txtclose = myDialog.findViewById(R.id.textclose);
                username = myDialog.findViewById(R.id.username);
                username.setText(dataModel.getUsername());
                txtclose.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        myDialog.dismiss();
                    }
                });
                myDialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
                myDialog.show();
            }
        });


        return view;
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

    }

    private class RequestGetUser extends AsyncTask<String, String, String> {

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
                Log.e("request get users", response.toString());

                //recuperation UserID
                JSONArray jsonArray = new JSONArray(response.toString());
                for (int i = 0; i < jsonArray.length(); i++) {
                    JSONObject jsonobject = jsonArray.getJSONObject(i);
                    Users user = new Users(jsonobject.get("username").toString(), jsonobject.get("email").toString(), jsonobject.get("_id").toString());
                    Log.e("user ->", user.getEmail() + " " + user.getUserId());
                    itemUsers.add(user);
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
