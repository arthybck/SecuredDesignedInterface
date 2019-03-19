package fr.tixado_d.secureddesignedinterface.Fragments;

import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import fr.tixado_d.secureddesignedinterface.Activities.LoginActivity;
import fr.tixado_d.secureddesignedinterface.R;

public class SettingsFragment extends Fragment {
    private Button logoutButton;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.settings_fragment, container, false);

        logoutButton = view.findViewById(R.id.logout);

        logoutButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent i = new Intent(view.getContext(), LoginActivity.class);
                startActivity(i);
            }
        });
        return view;
    }

}
