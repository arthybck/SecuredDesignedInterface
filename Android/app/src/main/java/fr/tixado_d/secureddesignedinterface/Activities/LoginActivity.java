package fr.tixado_d.secureddesignedinterface.Activities;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import fr.tixado_d.secureddesignedinterface.MainActivity;
import fr.tixado_d.secureddesignedinterface.R;

public class LoginActivity extends AppCompatActivity {

    private EditText EmailAddress;
    private EditText Password;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        EmailAddress = findViewById(R.id.userEmail);
        Password = findViewById(R.id.userPassword);
    }

    public static boolean isValidEmail(CharSequence target) {
        if (TextUtils.isEmpty(target)) {
            return false;
        } else {
            return android.util.Patterns.EMAIL_ADDRESS.matcher(target).matches();
        }
    }

    public void SingIn(View view) {
//        if (isValidEmail(EmailAddress.getText()) && Password.length() > 7) {
//            Log.e("isvalidEmail = ", "oui");
//            //faire appel API
//            Intent i = new Intent(this, MainActivity.class);
//            startActivity(i);
//
//        } else {
//            Log.e("invalid email password", "oui");
//        }
        Intent i = new Intent(this, MainActivity.class);
        startActivity(i);


    }
}